import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
	
	constructor() {
		super();

		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		this.removeFromOrder = this.removeFromOrder.bind(this);
		this.updateFish = this.updateFish.bind(this);
		this.removeFish = this.removeFish.bind(this);

		// set initial state
		this.state = {
			fishes: {},
			order: {}
		};
	}

	componentWillMount() {
		// this runs right before this app is rendered
		this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
			context: this,
			state: 'fishes'
		});

		//check if there is any order in localstorage
		const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

		if (localStorageRef) {
			this.setState({
				order: JSON.parse(localStorageRef)
			});
		}
	}

	componentWillUnMount() {
		base.removeBinding(this.ref);
	}

	componentWillUpdate(nextProps, nextState) {
		// console.log('Something changed');
		// console.log({nextProps, nextState});
		localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
	}

	addFish(fish) {
		// update our state
		// ... -> takes everything from object and spread it into new fishes state 
		const fishes = {...this.state.fishes};
		// add in new fish
		const timestamp = Date.now();
		fishes['fish-'+timestamp] = fish;
		// set state
		this.setState({ fishes: fishes });
		// you could do { fishes }
	}

	updateFish(key, updatedFish) {
		const fishes = {...this.state.fishes};
		fishes[key] = updatedFish;
		this.setState({ fishes });
		// ({ fishes: fishes })
	}

	removeFish(key) {
		const fishes = {...this.state.fishes}
		// delete does not work with firebase
		fishes[key] = null;
		this.setState({ fishes });
	}

	loadSamples() {
		this.setState({
			fishes: sampleFishes
		});
	}

	addToOrder(key) {
		const order = {...this.state.order};
		//update the new number of fish ordered
		order[key] = order[key] + 1 || 1;
		// ^ either add if already ordered or set to 1
		this.setState({ order });
		// could be { order: order }
	}

	removeFromOrder(key) {
		const order = {...this.state.order};
		delete order[key];
		this.setState({ order });
	}

	render () {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
					<ul className="list-of-fishes">
						{
							Object
								.keys(this.state.fishes)
								.map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
						}
					</ul>
				</div>
				<Order 
					fishes={this.state.fishes} 
					order={this.state.order} 
					params={this.props.params}
					removeFromOrder={this.removeFromOrder}
				/>
				<Inventory 
					addFish={this.addFish} 
					loadSamples={this.loadSamples} 
					fishes={this.state.fishes}
					updateFish={this.updateFish}
					removeFish={this.removeFish}
				/>
			</div>
		);
	}
}

export default App;