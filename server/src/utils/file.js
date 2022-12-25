const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');

function readDir(dir) {
	let list = []

	try {
		list = fs.readdirSync(dir);
	} catch (error) {
		debugger
	}

	return list;
}

module.exports.removeFolder = (path) => {
	return new Promise((done, reject) => {

		exec(`rm -rf ${path}`, (error, out) => {
			if (error) console.log(error.message);
			if (error && error.killed) reject(error);
			else done();
		});

	})
}

module.exports.removeFolderContent = (dir) => {

	return new Promise(async (done, reject) => {
		let list = readDir(dir)

		for (const item of list) {
			const itemPath = path.join(dir, item);
			try {
				await module.exports.removeFolder(itemPath)
			} catch (error) {
				reject(error)
				break;
			}
		}

		done();
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
	let command = `unzip -o ${zipPath}`;

	if (dest)
		command += ` -d ${dest}`

	return new Promise((done, reject) => {
		exec(command.trim(), (error, outSTR) => {

			if (error) console.log(error.message);

			if (error && error.killed) {
				reject({
					mesage: error.message
				});
			} else {
				done();
			}
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

			if (error) console.log(error.message);

			if (error && error.killed) {
				reject({
					mesage: error.message
				});
			} else done();
		});
	});
}

module.exports.moveFile = (source, dest, name = '') => {
	let command = `mv "${source}" "${dest}"`;

	if (dest && name) command += '/' + name;

	// Create directory if it dosent exist
	fs.mkdirSync(dest, {
		recursive: true
	});

	return new Promise((done, reject) => {
		exec(command, (error, outSTR) => {
			if (error) console.log(error.message);
			if (error && error.killed) reject(outSTR);
			else done();
		});

	});
}

module.exports.moveFolderContent = async (source, dest) => {
	// Create directory if it dosent exist
	fs.mkdirSync(dest, {
		recursive: true
	});

	let movingList = readDir(source);

	for (const item of movingList) {
		const itemPath = path.join(source, item);

		try {
			await module.exports.moveFile(itemPath, dest)
		} catch (error) {
			throw error;
			break;
		}
	}
}