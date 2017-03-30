import React from 'react';


const Header = (props) => {
	return (
		<header className="top">
			<h1>
				Catch
				<span className="ofThe">
					<span className="of">of</span>
					<span className="the">the</span>
				</span>
				Day
			</h1>
			<h3 className="tagline"><span>{props.tagline}</span></h3>
		</header>
	);
}

// function Header () {

// }

Header.propTypes = {
	tagline: React.PropTypes.string.isRequired
}

// how to define proptypes for other devs (required & type of string)

export default Header;