const messages = require('../../variable/message.js');

module.exports = function(message) {
    if(!message.args[0]) message.channel.send(messages.ARGUMENT_NOBODY.replace("%1", "1"));
    else {
        switch(message.args[0]) {
            case "purge":
                require("./mod/purge")(message);
                break;
        }
    }
};
