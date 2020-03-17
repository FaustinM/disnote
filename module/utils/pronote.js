const pronote = require("pronote-lib");
const config = require ("../core/config");
const schedule = require('node-schedule');
const http = require('https');
const fs = require('fs');
/*import { v4 as uuidv4 } from 'uuid';*/

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
module.exports.info = (cb) => account.get_information().then(cb);
module.exports.msg = (cb) => account.get_messages(true).then(cb);
module.exports.devoir = (cb) => account.get_homework().then(cb);
module.exports.cours = (cb) => account.get_courses_content().then(cb);

module.exports.downloadFile = (url, cb) => {
    const dest = `/tmp/${url.split("?")[0].split("/").pop()}`;
    const file = fs.createWriteStream(dest);
    const request = http.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close(cb);  // close() is async, call cb after close completes.
        });
    }).on('error', function(err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
    });
}
