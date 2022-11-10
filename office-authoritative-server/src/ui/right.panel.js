

import './right.panel.css';


import { AiOutlineAppstore } from "react-icons/ai";
import DropdownMenu from "./dropdown.menu.js";
import Item from './item.js';
import Panel from "./panel.js";
import TreeDropdownMenu from './tree.dropdown.menu.js';


const RightPanel = (props) => {
	const application = props.application;


	const onClickAppStore = () => {
		console.log('onclick appstore')
	}

	return (
		<div className='react-right-panel'>
			<Panel>
				<DropdownMenu icon='FaRegComment' size={24}>
					<Item name="">
						<AiOutlineAppstore name="Appstore" size={24} />
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
					<Item name="">
						<AiOutlineAppstore name="Appstore" size={24} />
					</Item>
					<Item name="">
						<AiOutlineAppstore name="Appstore" size={24} />
					</Item>
					<Item name="">
						<AiOutlineAppstore name="Appstore" size={24} />
					</Item>
				</DropdownMenu>
				<DropdownMenu icon='FaRegListAlt' size={24}>
					<Item name="">
						<AiOutlineAppstore name="Appstore" size={24} />
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
					<Item name="">
						<AiOutlineAppstore name="Appstore" size={24} />
					</Item>
					<Item name="">
						<AiOutlineAppstore name="Appstore" size={24} />
					</Item>
					<Item name="">
						<AiOutlineAppstore name="Appstore" size={24} />
					</Item>
				</DropdownMenu>
				<DropdownMenu icon='FaRegMoon' size={24}>
					<Item name="">
						<AiOutlineAppstore name="Appstore" size={24} />
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
					<Item name="">
						<AiOutlineAppstore name="Appstore" size={24} />
					</Item>
					<Item name="">
						<AiOutlineAppstore name="Appstore" size={24} />
					</Item>
					<Item name="">
						<AiOutlineAppstore name="Appstore" size={24} />
					</Item>
				</DropdownMenu>
				<DropdownMenu icon='FaRegBell' size={24}>
					<Item name="">
						<AiOutlineAppstore name="Appstore" size={24} />
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
					<Item name="">
						<AiOutlineAppstore name="Appstore" size={24} />
					</Item>
					<Item name="">
						<AiOutlineAppstore name="Appstore" size={24} />
					</Item>
					<Item name="">
						<AiOutlineAppstore name="Appstore" size={24} />
					</Item>
				</DropdownMenu>
				<TreeDropdownMenu application={application}/>
			</Panel>
		</div>
		
	);
}

export default RightPanel;
