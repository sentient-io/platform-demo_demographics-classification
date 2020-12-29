let state;

initialize = () => {
	state = {};
	//console.log('State initialized');
};

initialize();
//console.log('Main JS Loaded');

initialize();
//console.log('Main JS Loaded');

/* +---------------------+ */
/* | Toggle Popup Alert  | */
/* +---------------------+ */
togglePopUpAlert = (e = { alertTitle: 'Alert', alertContent: 'Alert!' }) => {
	$('#alertContent').html(e.alertContent);
	$('#alertTitle').html(e.alertTitle);
	$('#alert').modal('toggle');
};

exampleFunction = () => {
	examplePromise()
		.then(() => {})
		.catch((err) => {
			//console.log(err);
			togglePopUpAlert(
				`Error: ${err.status}`,
				err.responseText
					? JSON.parse(err.responseText).message
					: err.customErrMsg
			);
		});
};

/* +================================================================================================+ */
/* | - END - End of main.js template area. All changes above need to be update to main.js template  | */
/* +================================================================================================+ */

analyseImage = () => {
	let base64 = String(state.file.base64).split('base64,')[1];
	//console.log(base64);
	loadingStart();
	demographicsClassification(base64)
		.then((demographicsClassificationResult) => {
			loadingEnd();
			$(
				'#btn-main-function, #sample-images-container, #sample-images-text, #inline-picture-uploader'
			).hide();
			$('#btn-restart').show();
			demographicsClassificationResult.results.persons.forEach((e) => {
				//console.log(e);
				let drawOnCanvas = {
					canvasID: 'uploadedImg',
					top: e.bbox.top,
					bottom: e.bbox.bottom,
					left: e.bbox.left,
					right: e.bbox.right,
					age: Math.round(e.age),
					gender: e.gender,
					race: e.race,
				};
				canvasDrawBox(drawOnCanvas);
			});

			//console.log(
				'Success - Demographics Classification',
				demographicsClassificationResult
			);
		})
		.catch((err) => {
			loadingEnd();
			let error = JSON.parse(err.responseText);
			let errorMessage = {
				alertTitle: `Error: ${err.status}`,
				alertContent: error.message,
			};
			togglePopUpAlert(errorMessage);
			//console.log('Error - Demographics Classification', err);
		});
};

selectImage = (e) => {
	//console.log(e);
	let base64 = e.src;
	let id = e.id;
	state.file = { base64: base64, name: id, type: 'image/jpeg' };

	previewImg(e.src);
};

handleRestart = () => {
	//console.log('Restart');
	$('#s-img-preview').empty();
	$('#sample-images-container, #sample-images-text, #s-img-uploader').show();
	$('#btn-restart, #inline-picture-uploader').hide();
};
