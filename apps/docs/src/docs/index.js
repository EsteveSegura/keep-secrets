
const basicInfo = require('./basicInfo');
const servers = require('./servers');
const tags = require('./tags');
const todos = require('./secrets');
const components = require('./components');

module.exports = {
    ...basicInfo,
    ...servers,
    ...tags,
    ...todos,
    ...components,
};