import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
	constructor() {
		super();

		this.renderInventory = this.renderInventory.bind(this);
		this.handleChange = this.handleChange.bind(this);
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
		return (
			<div>
				<h2>Inventory</h2>
				{Object.keys(this.props.fishes).map(this.renderInventory)}
				<AddFishForm addFish={this.props.addFish} />
				<button onClick={this.props.loadSamples}>Load Sample Fishes</button>
			</div>
		);
	}
}

export default Inventory;