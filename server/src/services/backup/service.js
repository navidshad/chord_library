const path = require('path');
const fs = require('fs');

const {
	startBackUp
} = require('../../../backup_tools/export');

const {
	importCollections
} = require('../../../backup_tools/import');

const {
	createZipFile,
	unzip,
	removeFolder,
	getSize,
	moveFile,
} = require('../../utils/file');

module.exports.createBackup = async () => {

	// Create backup from database and get directory
	const temporaryBackupDirectory = await startBackUp()

	// Get upload directory
	const uploadFolder = path.join(global.rootPath, 'uploads');

	const time = new Date().toISOString().split('.')[0].replace('T', '_')
	const zipName = `goranee_${time}.zip`;
	const permanentBackupDirectory = path.join('backups');
	const permanentBackupFile = path.join(permanentBackupDirectory, zipName);
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

			if (!file.endsWith('.zip')) continue

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

module.exports.restore = (filename) => {

	return new Promise(async (resolve, reject) => {

		const list = await module.exports.getBackupList().catch(reject);
		if (!list) return;

		if (!list.findIndex(item => item.title == filename) == -1) {
			reject({
				message: `The requested backup file couldn't find.`,
			})
			return;
		}

		const serverDir = path.join(__dirname, '../../../')
		const newUploadPath = path.join(__dirname, '../../../backups/uploads')
		const newCollectionsPath = path.join(__dirname, '../../../backups/collections')

		// Remove old data
		//
		await removeFolder(newUploadPath)
		await removeFolder(newCollectionsPath)

		// Unzip back up file
		//
		const backupDir = path.join(__dirname, '../../../backups')
		const filePath = path.join(backupDir, filename)

		let done = await unzip(filePath, backupDir)
			.then(_ => true)
			.catch(reject)

		if (!done) return;

		// Move upload file
		//
		await removeFolder(serverDir + 'uploads')
		done = await moveFile(newUploadPath, serverDir)
			.then(_ => true)
			.catch(reject)

		if (!done) return;

		// Restore docs
		//
		let collectionFiles = fs.readdirSync(newCollectionsPath);
		collectionFiles = collectionFiles.map(item => path.join(newCollectionsPath, item))

		done = await importCollections(collectionFiles)
			.then(_ => true)
			.catch(reject)

		if (done)
			resolve();

		// Remove data
		//
		await removeFolder(newCollectionsPath)
	})

}