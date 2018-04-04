var yaml = require('node-yaml-config');
var config = yaml.load(__dirname + '/../config.yaml');

module.exports = (prop) => {
    if(config.hasOwnProperty(prop)){
        return config[prop];
    }
    return null;
};