let Router = require('koa-router');
let name = 'backup';

const {reply} = require('@modular-rest/server')

const service = require('./service');

let backup = new Router();

backup.get('/', async (ctx) => {
    await service.createBackup()
	.then(_ => {
		ctx.body = reply.create('s');
	}).catch(error => {
		console.log(error);
		ctx.status = 500;
		ctx.body = reply.create('f', {message:'Backup request faild, please inform the administrative.'});
	})
});

backup.get('/list', async (ctx) => {
    
	try {
		ctx.body = reply.create('s', {
			list: await service.getBackupList(),
		})
	} catch (error) {
		ctx.status = 500;
		ctx.body = reply.create('f', error);
	}
});

backup.delete('/:fileName', (ctx) => {
	let fileName = ctx.params.fileName;
	service.removeBackupFile(fileName);

	ctx.body = reply.create('s');
})
 
module.exports.name = name;
module.exports.main = backup;