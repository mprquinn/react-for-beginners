import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component {
	constructor() {
		super();

		this.renderInventory = this.renderInventory.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.renderLogin = this.renderLogin.bind(this);
		this.authenticate = this.authenticate.bind(this);
		this.logout = this.logout.bind(this);
		this.authHandler = this.authHandler.bind(this);
		this.state = {
			uid: null,
			owner: null
		}
	}

	componentDidMount() {

		base.onAuth((user) => {
			if(user) {
				this.authHandler(null, {user});
			}
			// onAuth returns the user data from the login (the authData)
		}); // firebase function

	}

	handleChange(e, key) {
		const fish = this.props.fishes[key];
		// take a copy of that fish and update it w the new data
		// console.log(e.target.name, e.target.value);

		const updatedFish = {
			...fish,
			[e.target.name]: e.target.value
		}

		this.props.updateFish(key, updatedFish);
	}

	renderLogin() {
		return(
			<nav className="Login">
				<h2>Inventory</h2>
				<p>Sign in to manage your inventory</p>
				<button className="github" onClick={() => this.authenticate('github')}>
					Log in With Github
				</button>
				<button className="facebook" onClick={() => this.authenticate('facebook')}>
					Log in With Facebook
				</button>
				<button className="twitter" onClick={() => this.authenticate('twitter')}>
					Log in With Twitter
				</button>
			</nav>
		)
	}

	authenticate(provider) {
		console.log(`Trying to log in with ${provider}`);
		// console.log(base);
		base.authWithOAuthPopup(provider, this.authHandler);
	}

	logout() {
		base.unauth();
		this.setState({ uid: null })
		// firebase function??
	}

	authHandler(err, authData) {
		console.log(authData);
		if (err) {
			console.error(err);
			return;
		}

		// grab the store info
		const storeRef = base.database().ref(this.props.storeId);

		// query the firebase once for the store data
		storeRef.once('value', (snapshot) => {
			const data = snapshot.val() || {};

			// claim as our own if there is no owner already
			if(!data.owner) {
				storeRef.set({
					owner: authData.user.uid
				});
			}

			this.setState({
				uid: authData.user.uid,
				owner: data.owner || authData.user.uid
			});
		});
	}

	renderInventory(key) {
		const fish = this.props.fishes[key];
		return (
			<div className="fish-edit" key={key}>
				<input type="text" name="name" defaultValue={fish.name} placeholder="Fish Name" onChange={(e) => this.handleChange(e, key)} />
				<input type="text" name="price" defaultValue={fish.price} placeholder="Fish Price" onChange={(e) => this.handleChange(e, key)} />
				<select name="status" defaultValue={fish.status} placeholder="Fish Status" onChange={(e) => this.handleChange(e, key)}>
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea type="text" name="desc" defaultValue={fish.desc} placeholder="Fish Desc" onChange={(e) => this.handleChange(e, key)} />
				<input type="text" name="image" defaultValue={fish.image} placeholder="Fish Image" onChange={(e) => this.handleChange(e, key)} />
				<button onClick={(e) => this.props.removeFish(key)}>Remove Fish</button>
			</div>
		)
	}

	render () {
		const logout = <button onClick={(e) => this.logout()}>Log Out</button>
		// you could also write (e) => this.logout() as 
		// check if they are not logged in
		if(!this.state.uid) {
			return <div>{this.renderLogin()}</div>
		}

		// check if they are the owner of the store
		if(this.state.uid !== this.state.owner) {
			return(
				<div>
					<p>Sorry, you are not the store owner</p>
					{logout}
				</div>

			)
		}

		return (
			<div>
				<h2>Inventory</h2>
				{logout}
				{Object.keys(this.props.fishes).map(this.renderInventory)}
				<AddFishForm addFish={this.props.addFish} />
				<button onClick={this.props.loadSamples}>Load Sample Fishes</button>
			</div>
		);
	}
}


Inventory.propTypes = {
	fishes: React.PropTypes.object.isRequired,
	updateFish: React.PropTypes.func.isRequired,
	removeFish: React.PropTypes.func.isRequired,
	addFish: React.PropTypes.func.isRequired,
	loadSamples: React.PropTypes.func.isRequired,
	storeId: React.PropTypes.string.isRequired
};

export default Inventory;