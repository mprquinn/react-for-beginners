import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
	
	constructor() {
		super();

		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);

		// set initial state
		this.state = {
			fishes: {},
			order: {}
		};
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

	render () {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
					<ul className="list-of-fishes">
						{
							Object
								.keys(this.state.fishes)
								.map(key => <Fish key={key} details={this.state.fishes[key]} />)
						}
					</ul>
				</div>
				<Order />
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
			</div>
		);
	}
}

export default App;