const messages = require('../../../variable/message.js');


module.exports = (message) => {
    const number = message.args[1];
    if(isNaN(number)) {
        message.channel.send(messages.NAN);
        return;
    }
    message.channel.messages.fetch({limit: number})
        .then(fMessages => {
            message.channel.bulkDelete(fMessages);
            message.channel.send(messages.PURGE_SUCCESS.replace('%1', number)).then(msg => msg.delete({timeout : 1500}));
        })
        .catch(err => {
            console.log("Error while doing Bulk Delete");
            console.log(err);
        });

};
