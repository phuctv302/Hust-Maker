
import './dropdown.menu.css';

import FaIcon from "./fa.icon.js";
import GridMenu from './grid.menu.js';

import React, { useState, useRef, useEffect } from 'react';



const DropdownMenu = (props) => {
	const [className, setClassName] = useState('react-dropdown-menu__menu');
	const [buttonClassName, setButtonClassName] = useState('react-dropdown-menu__button')

	const menuWapperRef = useRef(null);


	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuWapperRef.current && !menuWapperRef.current.contains(event.target)) {
				setClassName('react-dropdown-menu__menu');
				setButtonClassName('react-dropdown-menu__button');
			}
		}

		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};

	}, [menuWapperRef]);


	const onClick = () => {
		if (className != 'react-dropdown-menu__menu') {
			setClassName('react-dropdown-menu__menu');
			setButtonClassName('react-dropdown-menu__button');
		} else {
			setClassName('react-dropdown-menu__menu react-dropdown-menu__menu--display');
			setButtonClassName('react-dropdown-menu__button react-dropdown-menu__button--clicked');
		}
	};


	return (
		<div className='react-dropdown-menu' ref={menuWapperRef}>
			<div className={buttonClassName} onClick={onClick}>
				<FaIcon name={props.icon} size={props.size} />
			</div>
			<div className={className} onMouseDown={props.onMouseDown}>
				<GridMenu>
					{props.children}
				</GridMenu>
			</div>
		</div>
	);
}

export default DropdownMenu;
