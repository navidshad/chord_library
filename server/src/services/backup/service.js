
const path = require('path');
const fs = require('fs');
const startBackUp = require('../../../backup_tools/export').startBackUp;
const {createZipFile, removeFolder} = require('../../utils/ziper');

module.exports.createBackup = async () => {

	// Create backup from database and get directory
	let temporaryBackupDirectory = await startBackUp()

	// Get upload directory
	let uploadFolder = path.join(global.rootPath, 'uploads');

	let zipName = `goranee_${new Date().toISOString()}.zip`;
	let permanentBackupDirectory = path.join(global.rootPath, 'backups');
	let permanentBackupFile = path.join(permanentBackupDirectory, zipName);
	// fs.opendirSync(permanentBackupDirectory);

	await createZipFile(permanentBackupFile, [temporaryBackupDirectory, uploadFolder])
	.finally(_ => removeFolder(temporaryBackupDirectory))
}

module.exports.removeBackupFile = (filePath) => {
	let backupFile = path.join(global.rootPath, 'backups', filePath);
	fs.unlink(backupFile, (err) => {});
}

module.exports.getBackupList = () => {
	let backupDir = path.join(global.rootPath, 'backups');

	let files = fs.readdirSync(backupDir);
	
	return files;
}