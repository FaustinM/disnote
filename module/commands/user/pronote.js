const messages = require('../../variable/message.js');
const date = require('../../utils/date');
const config = require('../../core/config');
const os = require('os');
const { MessageEmbed } = require('discord.js');

module.exports = function(message) {
    if(!message.args[0]) message.channel.send(messages.ARGUMENT_NOBODY.replace("%1", "1"));
    else {
        switch(message.args[0]) {
            case "moyenne":
                message.channel.send(messages.WAITING).then((msgWait) =>{
                    require('../../utils/pronote').marks((res)=>{
                        const embed = new MessageEmbed()
                            .setTitle("Moyenne de la classe")
                            .addField("Premier trimestre", res[0].averages.studentClass)
                            .addField("Deuxième trimestre", res[1].averages.studentClass)
                        message.channel.send({embed});
                        msgWait.delete();
                    });
                });
                break;
        }
    }
};
