const dateUtils = require('../../../utils/date');
const { MessageEmbed } = require('discord.js');
const TurndownService = require('turndown');

module.exports.list = (message) => {
    message.channel.send(messages.WAITING).then((msgWait) =>{
        message.client.pronote.cours((res)=>{
            const actualDate = new Date();
            const embed = new MessageEmbed()
                .setTitle("Liste des cours");
            for(let cours of res){
                if(Math.abs(dateUtils.dateDiff(actualDate, new Date(cours.date))) > 9 || !cours.content[0]) continue;
                let substring;
                if(cours.content[0].title) substring = `${cours.content[0].title} - ${new Date(cours.date).toLocaleString()}`;
                else substring = `Sans titre - ${new Date(cours.date).toLocaleString()}`;
                embed.addField(`${cours.teacher[0].name} - ${cours.subject.charAt(0).toUpperCase() + cours.subject.toLowerCase().slice(1)}`, substring);
            }
            message.channel.send({embed});
            msgWait.delete();
        });
    });
};

module.exports.select = (message) => {
    message.channel.send(messages.WAITING).then((msgWait) =>{
        let turndownService = new TurndownService();
        let key = message.args[1] ? message.args[1] : 0;
        message.client.pronote.cours((res)=>{
            const cours = res[(res.length - key)-1];
            const embed = new MessageEmbed()
                .setTitle(`${cours.content[0].title} - ${cours.subject.charAt(0).toUpperCase() + cours.subject.toLowerCase().slice(1)}`)
                .setAuthor(cours.teacher[0].name)
                .setColor(cours.color);
            let desc = turndownService.turndown(cours.content[0].rawDescription);
            embed.setDescription(desc);
            message.channel.send({embed});
            msgWait.delete();
            for(let file of cours.content[0].files){
                //console.log(file(), cours.content[0].files);
                /*message.client.pronote.downloadFile(file, (err)=>{
                    if(err) console.log(err);
                    const dest = "/tmp/" + file.split("?")[0].split("/").pop();
                    message.channel.send(new MessageAttachment(dest));
                })*/
            }
        });
    });
};
