
import './item.css';


const Item = (props) => {
	return (
		<div className='react-item' onClick={props.onClick} id={props.id} ref={props.innerRef}>
			<div>{props.children}</div>
			<div>{props.name}</div>
		</div>
	);
};


export default Item;

