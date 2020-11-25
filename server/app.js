const ModularRest = require('modular-rest');
const Path = require('path');

ModularRest.createRest({
    componentDirectory: Path.join(__dirname, 'src/services'),
    uploadDirectory: Path.join(__dirname, 'uploads')
})