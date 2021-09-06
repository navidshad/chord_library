const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');

module.exports.removeFolder = (path) => {
	return new Promise((done, reject) => {

		exec(`rm -rf ${path}`, (err, out) => {
			if(err) reject(err);
			else done();
		});

	})
}

module.exports.getSize = (file) => {
	return new Promise((done, reject) => {
		fs.stat(file, (err, state) => {
			if(err) reject(err)
			else done(state.size / (1024*1024))
		});
	});
}

module.exports.createZipFile = (zipPath='/file.zip', compressingFilesAndFolders=[]) => {

	let command = `zip -r ${zipPath} ${compressingFilesAndFolders.join(' ')}`;

	// Recognize directory
	let dirParts = zipPath.split(path.sep)
	dirParts.splice(dirParts.length-1, 1)
	let directory = dirParts.join(path.sep);

	// Create directory if it dosent exist
	fs.mkdirSync(directory, {recursive: true});

	return new Promise((done, reject) => {

		exec(command, (error, outSTR) => {

			if(error) {
				console.log(outSTR.trim());
				reject(outSTR);
			}
			else done();

		});

	});
}