
import * as Icons from "react-icons/fa";
import { IconContext } from "react-icons";


const FaIcon = (props) => {
	const IconComponent = Icons[props.name];
	const COLOR = props.color ? props.color : "#000000";

	if (!IconComponent) {
		return (
			<Icons.FaBeer size={props.size} />
		);
	}

	return (
		<IconContext.Provider value={{ color: COLOR}}>
			<div>
				<IconComponent size={props.size} />
			</div>
		</IconContext.Provider>
	);
}


export default FaIcon;
