import React from 'react';
import {getFunName} from '../helpers';

class StorePicker extends React.Component {

	// if we have multiple copies of a component use below,
	// else, use the this.goToStore.bind(this)
	// constructor() {
	// 	super();
	// 	this.goToStore = this.goToStore.bind(this);
	// }
	
	goToStore(e) {
		e.preventDefault();
		// grab the text 
		const slug = this.storeInput.value;
		this.context.router.transitionTo(`/store/${slug}`);
		// go to /store/:storeId
	}

	render () {
		return (
			<form className="store-selector" onSubmit={this.goToStore.bind(this)}>
				<h2>Please Enter a Store</h2>
				<input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input}} />
				<button type="submit">Visit Store ></button>
			</form>
		);
	}
}

StorePicker.contextTypes = {
	router: React.PropTypes.object
}

export default StorePicker;