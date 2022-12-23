const path = require('path');
const fs = require('fs');

const startBackUp = require('../../../backup_tools/export').startBackUp;

const {
	createZipFile,
	removeFolder,
	getSize,
	moveFile,
} = require('../../utils/file');

module.exports.createBackup = async () => {

	// Create backup from database and get directory
	let temporaryBackupDirectory = await startBackUp()

	// Get upload directory
	let uploadFolder = path.join(global.rootPath, 'uploads');

	let zipName = `goranee_${new Date().toISOString()}.zip`;
	let permanentBackupDirectory = path.join('backups');
	let permanentBackupFile = path.join(permanentBackupDirectory, zipName);
	// fs.opendirSync(permanentBackupDirectory);

	let assetsPaths = [temporaryBackupDirectory, uploadFolder]
	assetsPaths = assetsPaths.map(asset => './' + asset.split('/server')[1])

	await createZipFile(permanentBackupFile, assetsPaths)
		.finally(_ => removeFolder(temporaryBackupDirectory))
}

module.exports.removeBackupFile = (filePath) => {
	let backupFile = path.join(global.rootPath, 'backups', filePath);
	fs.unlink(backupFile, (err) => {});
}

module.exports.getBackupList = async () => {
	let backupDir = path.join(global.rootPath, 'backups');

	let files = [];

	try {
		files = fs.readdirSync(backupDir);
	} catch (error) {

	}

	let backupList = [];

	try {
		for (let i = 0; i < files.length; i++) {
			const file = path.join(backupDir, files[i]);
			let size = await getSize(file);

			if(!file.endsWith('.zip')) continue

			backupList.push({
				title: files[i],
				size
			})
		}
	} catch (error) {
		console.log(error);
	}

	return backupList;
}

module.exports.insertBackup = async (file) => {
	let name = file.name.split(' ').join('-')
	return moveFile(file.path, './backups', name);
}