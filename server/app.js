const ModularRest = require('modular-rest');
const Path = require('path');

ModularRest.createRest({
    port: '3001',
    componentDirectory: Path.join(__dirname, 'src/services'),
    uploadDirectory: Path.join(__dirname, 'uploads'),
    cors: {
        origin: 'http://localhost:3000'
    }
})