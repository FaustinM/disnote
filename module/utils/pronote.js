const pronote = require("pronote-lib");
const config = require ("../core/config");
const schedule = require('node-schedule');

let account;

module.exports.worker = [];
module.exports.init = (cb) => {
    exports.connect(cb);
    module.exports.worker.push(schedule.scheduleJob('*/30 * * * *', function(fireDate){
        exports.end();
        exports.connect();
    }));
};
module.exports.connect = (cb) => account = new pronote.User(config.PRONOTE, cb);
module.exports.end = () => account = null;
module.exports.stopWorkers = () => exports.worker.forEach((worker)=>worker.cancel());

module.exports.marks = (cb) => account.get_marks().then(cb);
