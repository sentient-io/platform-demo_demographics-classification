/* +---------------------------------------+ */
/* | Call Demographics Classifications API | */
/* +---------------------------------------+ */
demographicsClassification = (base64) => {
	return new Promise((resolve, reject) => {
		console.log('Demographics Classifications API');

		$.ajax({
			method: 'POST',
			url:
				'https://apis.sentient.io/microservices/cv/democlass/v0/getpredictions',
			headers: { 'x-api-key': apikey, 'Content-Type': 'application/json' },
			data: JSON.stringify({ image_base64: base64 }),
			success: (result) => {
				resolve(result);
			},
			error: (err) => {
				reject(err);
			},
		});
	});
};
