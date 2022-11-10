
import RightPanel from "./right.panel.js";
// import UploadFile from "./upload.file.js";


const Root = (props) => {
	const application = props.application;

	return (
		<>
			<RightPanel application={application} />
		</>
	);
};

export default Root;
