import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
	render () {
		const tp = this.props;

		const isAvailable = tp.details.status === 'available';
		const buttonText = isAvailable? 'Add to Order' : 'Sold Out';

		return (
			<li className="menu-fish">
				<img src={tp.details.image} alt={tp.details.name} />
				<h3 className="fish-name">
					{this.props.details.name}
					<span className="price">{formatPrice(tp.details.price)}</span>
				</h3>
				<p>
					{tp.details.desc}
				</p>
				<button disabled={!isAvailable}>{buttonText}</button>
			</li>
		);
	}
}

export default Fish;