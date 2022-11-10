



import './tree.dropdown.menu.css';

import FaIcon from "./fa.icon.js";
import GridMenu from './grid.menu.js';
import Item from "./item.js";
import { AiOutlineAppstore } from "react-icons/ai";

import React, { useState, useRef, useEffect } from 'react';

import { CommandFactory, CommandType } from '../commands/commands.js';
import { uuid } from '../utils/algorithms/algorithms.js';
import { ComponentType } from '../component/components.js';

import table_top_img from './../imgs/tables/table_top.png';
import table_left_img from './../imgs/tables/table_left.png';
import table_right_img from './../imgs/tables/table_right.png';
import table_bottom_img from './../imgs/tables/table_bottom.png';
import carrot_diet_fruit_img from './../imgs/carrot-diet-fruit.svg';

import chair_top_img from './../imgs/chairs/chair_top.png';
import chair_left_img from './../imgs/chairs/chair_left.png';
import chair_right_img from './../imgs/chairs/chair_right.png';
import chair_bottom_img from './../imgs/chairs/chair_bottom.png';


const TreeDropdownMenu = (props) => {
	/**
	 * @var {Application}
	 */
	const application = props.application;

	const [className, setClassName] = useState('react-tree-dropdown-menu__menu');
	const [buttonClassName, setButtonClassName] = useState('react-tree-dropdown-menu__button')

	const menuWapperRef = useRef(null);
	const squareItemRef = useRef(null);
	const largeSquareItemRef = useRef(null);
	const plantPotsRef = useRef(null);
	const tableRef = useRef(null);
	const chairRef = useRef(null);

	const closeMenu = () => {
		setClassName('react-tree-dropdown-menu__menu');
		setButtonClassName('react-tree-dropdown-menu__button');
	}

	const openMenu = () => {
		setClassName('react-tree-dropdown-menu__menu react-tree-dropdown-menu__menu--display');
		setButtonClassName('react-tree-dropdown-menu__button react-tree-dropdown-menu__button--clicked');
	}


	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuWapperRef.current && !menuWapperRef.current.contains(event.target)) {
				closeMenu();
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
		if (className != 'react-tree-dropdown-menu__menu') {
			closeMenu();
		} else {
			openMenu();
		}
	};

	const onMouseDown = (event) => {
		event.preventDefault();
		event.stopPropagation();
		

		if (squareItemRef.current && squareItemRef.current.contains(event.target)) {
			closeMenu();

			const absolute_cursor = application.getEventHandler().getAbsoluteCursor();
			const SIZE = 100;
			let props = {
				component_id: uuid(),
				action: null,
				data: {
					x: absolute_cursor.x - SIZE/2,
					y: absolute_cursor.y - SIZE/2,
					width: SIZE,
					height: SIZE,
					img: carrot_diet_fruit_img,
					type: ComponentType.DEFAULT,
				},
				type: CommandType.CREATION,
				mergeable: false,
			};
			let command = CommandFactory.create(application, props);
			command.execute();
			const component = application.getComponentTree().getComponentById(command.getComponentId());
			application.getEventHandler().selectObject(component);
			application.render();
		}

		if (largeSquareItemRef.current && largeSquareItemRef.current.contains(event.target)) {
			closeMenu();

			const absolute_cursor = application.getEventHandler().getAbsoluteCursor();
			const SIZE = 200;
			let props = {
				component_id: uuid(),
				action: null,
				data: {
					x: absolute_cursor.x - SIZE/2,
					y: absolute_cursor.y - SIZE/2,
					width: SIZE * 3/2,
					height: SIZE,
					img: table_left_img,
					type: ComponentType.DEFAULT,
				},
				type: CommandType.CREATION,
				mergeable: false,
			};
			let command = CommandFactory.create(application, props);
			command.execute();
			const component = application.getComponentTree().getComponentById(command.getComponentId());
			application.getEventHandler().selectObject(component);
			application.render();
		}

		if (plantPotsRef.current && plantPotsRef.current.contains(event.target)) {
			closeMenu();

			const absolute_cursor = application.getEventHandler().getAbsoluteCursor();
			const SIZE = 100;
			let props = {
				component_id: uuid(),
				action: null,
				data: {
					x: absolute_cursor.x - SIZE/2,
					y: absolute_cursor.y - SIZE/2,
					width: SIZE,
					height: SIZE,
					img: table_bottom_img,
					type: ComponentType.DEFAULT,
				},
				type: CommandType.CREATION,
				mergeable: false,
			};
			let command = CommandFactory.create(application, props);
			command.execute();
			const component = application.getComponentTree().getComponentById(command.getComponentId());
			application.getEventHandler().selectObject(component);
			application.render();
		}

		if (tableRef.current && tableRef.current.contains(event.target)) {
			closeMenu();

			const absolute_cursor = application.getEventHandler().getAbsoluteCursor();
			const SIZE = 600;
			let props = {
				component_id: uuid(),
				action: null,
				data: {
					x: absolute_cursor.x - SIZE/2,
					y: absolute_cursor.y - SIZE/2,
					width: SIZE,
					height: SIZE * 2/3,
					imgs: [table_bottom_img, table_left_img, table_top_img, table_right_img],
					type: ComponentType.ROTATABLE,
				},
				type: CommandType.CREATION,
				mergeable: false,
			};
			let command = CommandFactory.create(application, props);
			command.execute();
			const component = application.getComponentTree().getComponentById(command.getComponentId());
			application.getEventHandler().selectObject(component);
			application.render();
		}

		if (chairRef.current && chairRef.current.contains(event.target)) {
			closeMenu();

			const absolute_cursor = application.getEventHandler().getAbsoluteCursor();
			const SIZE = 200;
			let props = {
				component_id: uuid(),
				action: null,
				data: {
					x: absolute_cursor.x - SIZE/2,
					y: absolute_cursor.y - SIZE/2,
					width: SIZE,
					height: SIZE,
					imgs: [chair_bottom_img, chair_left_img, chair_top_img, chair_right_img],
					type: ComponentType.ROTATABLE,
				},
				type: CommandType.CREATION,
				mergeable: false,
			};
			let command = CommandFactory.create(application, props);
			command.execute();
			const component = application.getComponentTree().getComponentById(command.getComponentId());
			application.getEventHandler().selectObject(component);
			application.render();
		}
	}


	return (
		<div className='react-tree-dropdown-menu' ref={menuWapperRef}>
			<div className={buttonClassName} onClick={onClick}>
				<FaIcon name="FaTree" size={24} />
			</div>
			<div className={className} onMouseDown={onMouseDown}>
				<GridMenu>
					<Item name="" innerRef={squareItemRef}>
						<FaIcon name="FaVectorSquare" size={24}/>
					</Item>
					<Item name="" innerRef={largeSquareItemRef}>
						<AiOutlineAppstore name="Appstore" size={24}/>
					</Item>
					<Item name="" innerRef={plantPotsRef}>
						<FaIcon name="FaBullseye" size={24} />
					</Item>
					<Item name="" innerRef={tableRef}>
						<FaIcon name="FaTable" size={24} />
					</Item>
					<Item name="" innerRef={chairRef}>
						<FaIcon name="FaAccessibleIcon" size={24} />
					</Item>
					<Item name="">
						<AiOutlineAppstore name="Appstore" size={24} />
					</Item>
					<Item name="">
						<AiOutlineAppstore name="Appstore" size={24} />
					</Item>
					<Item name="">
						<AiOutlineAppstore name="Appstore" size={24} />
					</Item>
				</GridMenu>
			</div>
		</div>
	);
}




export default TreeDropdownMenu;

