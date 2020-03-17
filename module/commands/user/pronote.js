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
                    message.client.pronote.marks((res)=>{
                        const embed = new MessageEmbed()
                            .setTitle("Moyenne de la classe");
                        if(res[0]) embed.addField("Premier trimestre", res[0].averages.studentClass);
                        if(res[1]) embed.addField("Deuxième trimestre", res[1].averages.studentClass);
                        if(res[2]) embed.addField("Troisième trimestre", res[2].averages.studentClass);
                        message.channel.send({embed});
                        msgWait.delete();
                    });
                });
                break;
            case "info":
                require('./pronote/info')(message);
                break;

            case "msg":
                if(config.OWNER_ID !== message.author.id) {
                    message.channel.send(messages.NOT_ENOUGHT_PERM);
                    return;
                }
                require('./pronote/message')(message);
                break;

            case "liste-cours":
                require('./pronote/cours').list(message);
                break;

            case "cours":
                require('./pronote/cours').select(message);
                break;

            case "liste-info":
                message.channel.send(messages.WAITING).then((msgWait) =>{
                    message.client.pronote.info((res)=>{
                        const embed = new MessageEmbed()
                            .setTitle("Liste des informations");
                        for(let info of res){
                            let substring;
                            if(info.title) substring = `${info.title} - ${new Date(info.time).toLocaleString()}`;
                            else substring = `Sans titre - ${new Date(info.time).toLocaleString()}`;
                            embed.addField(info.teacher, substring);
                        }
                        message.channel.send({embed});
                        msgWait.delete();
                    });
                });
                break;

            case "liste-devoir":
                message.channel.send(messages.WAITING).then((msgWait) =>{
                    message.client.pronote.devoir((res)=>{
                        const embed = new MessageEmbed()
                            .setTitle("Liste des devoirs");
                        for(let devoir of res){
                            const title = `${devoir.subject.charAt(0).toUpperCase() + devoir.subject.toLowerCase().slice(1)} - Du ${new Date(devoir.since).toLocaleString()} Pour ${new Date(devoir.until).toLocaleString()}`;
                            embed.addField(title, devoir.content);
                        }
                        message.channel.send({embed});
                        msgWait.delete();
                    });
                });
                break;

        }
    }
};
