
import './upload.file.css';

import FaIcon from "./fa.icon.js";
import { useState, useRef, useEffect } from 'react';


const UploadFile = (props) => {
	const [selectedFile, setSelectedFile] = useState();
	const [preview, setPreview] = useState();

	useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined)
			return
		}

		const objectUrl = URL.createObjectURL(selectedFile)
		setPreview(objectUrl)

		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl)
	}, [selectedFile]);

	const onDragEnter = (event) => {
		event.stopPropagation();
		event.preventDefault();

		console.log("on drag enter");
	}

	const onDragOver = (event) => {
		event.stopPropagation();
		event.preventDefault();

		console.log("on drag over");
	}

	const onDrop = (event) => {
		event.stopPropagation();
		event.preventDefault();

		if (!event.dataTransfer.files || event.dataTransfer.files.length === 0) {
			console.log("on drag drop but not hav file");
			setSelectedFile(undefined)
			return
		}

		setSelectedFile(event.dataTransfer.files[0])
	}

	const onDragLeave = (event) => {
		event.stopPropagation();
		event.preventDefault();

		console.log("on drag leave");
	}

	const onDragEnd = (event) => {
		event.stopPropagation();
		event.preventDefault();

		console.log("on drag end");
	}

	const upload = (event) => {
		console.log('upload image');
	}

	return (
		<div className='upload-file'>
			<div className='upload-file-container'>
				<div className='upload-file-container__content'>
					<form 
						className='upload-file-container__content--form'
						onDragEnter={onDragEnter}
						onDragOver={onDragOver}
						onDrop={onDrop}
						onDragLeave={onDragLeave}
						onDragEnd={onDragEnd}
					>
						{selectedFile &&  <img src={preview} className='upload-file-container__content--form-preview' /> }
						<div>
							<FaIcon name="FaImages" size={60} color="#8D9EFF" />	
						</div>
						<div className='upload-file-container__content--form-text'>Drag & Drop</div>
						<div className='upload-file-container__content--form-text-inline'>
							<div>or&nbsp;</div>
							<div className='upload-file-container__content--form-link'>Browse</div>
						</div>
					</form>
				</div>
				<div className='upload-file-container__footer'>
					<button className='upload-file-container__footer--button' onClick={upload}>Upload</button>
				</div>
			</div>
		</div>
	)
}



export default UploadFile;

