
import './button.css';
import React, { useState } from 'react';


const Button = (props) => {
	const [display, setDisplay] = useState('react-button');

	const onClick = () => {
		if (props && props.onClick) {
			props.onClick();
		}

		if (display != 'react-button') {
			setDisplay('react-button');
		} else {
			setDisplay('react-button react-button--clicked');
		}
	};

	return (
		<div className={display} onClick={onClick}>
			<div>{props.children}</div>
			<div>{props.name}</div>
		</div>
	);
};


export default Button;

