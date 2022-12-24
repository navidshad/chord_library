const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');

module.exports.removeFolder = (path) => {
	return new Promise((done, reject) => {

		exec(`rm -rf ${path}`, (err, out) => {
			if (err) reject(err);
			else done();
		});

	})
}

module.exports.getSize = (file) => {
	return new Promise((done, reject) => {
		fs.stat(file, (err, state) => {
			if (err) reject(err)
			else done(state.size / (1024 * 1024))
		});
	});
}

module.exports.unzip = (zipPath, dest) => {
	let command = `unzip ${zipPath}`;

	if (dest)
		command += ` -d ${dest}`

	return new Promise((done, reject) => {
		exec(command, (error, outSTR) => {

			if (error && error.killed) {
				reject({
					mesage: error.message
				});
			} else done();
		});
	});
}

module.exports.createZipFile = (zipPath = '/file.zip', compressingFilesAndFolders = []) => {

	const command = `zip -r ${zipPath} ${compressingFilesAndFolders.join(' ')}`;

	// Recognize directory
	let dirParts = zipPath.split(path.sep)
	dirParts.splice(dirParts.length - 1, 1)
	let directory = dirParts.join(path.sep);

	// Create directory if it dosent exist
	fs.mkdirSync(directory, {
		recursive: true
	});

	return new Promise((done, reject) => {

		exec(command, (error, outSTR) => {

			console.log(outSTR.trim());

			if (error && error.killed) {
				reject({
					mesage: error.message
				});
			} else done();
		});
	});
}

module.exports.moveFile = (source, dest, name = '') => {
	let command = `mv "${source}" "${dest}/${name}"`;

	// Create directory if it dosent exist
	fs.mkdirSync(dest, {
		recursive: true
	});

	return new Promise((done, reject) => {

		exec(command, (error, outSTR) => {

			if (error && error.killed) reject(outSTR);
			else done();
		});

	});
}