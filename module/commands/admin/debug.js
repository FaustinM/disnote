const messages = require('../../variable/message.js');
const date = require('../../utils/date');
const config = require('../../core/config');
const os = require('os');

module.exports = function(message) {
    if(!message.args[0]) message.channel.send(messages.ARGUMENT_NOBODY.replace("%1", "1"));
    else {
        switch(message.args[0]) {

            case "msg":
                if(!message.args[1]) message.channel.send(messages.ARGUMENT_NOBODY.replace("%1", "2"));
                else if(!messages[message.args[1]]) message.channel.send(messages.TEST_MSG_NOBODY);
                else {
                    message.author.send(messages[message.args[1].toUpperCase()]);
                    message.channel.send(messages.DM_SEND)
                }
                break;

            case "info":
                let embed = require('../../variable/embed/debugEmbed');
                embed.addField("Version du bot", config.VERSION);
                embed.addField("Machine hôte", os.hostname());
                embed.addField("Uptime (hôte)", date.toHHMMSS(os.uptime()));
                embed.addField("Uptime (bot)", date.toHHMMSS(process.uptime()));
                message.channel.send({embed}).then(()=> embed = null);
                break;

            case "ping":
                message.channel.send("Pong ! " + Math.round(message.client.ws.ping) + "ms");
                break;

            case "restart":
                if(message.author.id === config.OWNER_ID) {
                    message.channel.send("Redémarrage...").then(() => {
                        process.kill(process.pid, "SIGINT");
                    });
                } else {
                    message.channel.send(messages.OWNER_INVALID);
                }
                break;
        }
    }
};
