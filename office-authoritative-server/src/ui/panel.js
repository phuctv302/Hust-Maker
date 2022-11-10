import './panel.css';


const Panel = (props) => {
	return (
		<div className='react-panel'>
			{props.children}
		</div>
	);
};


export default Panel;

