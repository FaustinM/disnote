const { MessageEmbed, MessageAttachment } = require('discord.js');
const TurndownService = require('turndown');

module.exports = (message) => {
    message.channel.send(messages.WAITING).then((msgWait) =>{
        let turndownService = new TurndownService();
        let key = message.args[1] ? message.args[1] : 0;
        message.client.pronote.info((res)=>{
            const embed = new MessageEmbed()
                .setTitle(res[key].title)
                .setAuthor(res[key].teacher);
            let desc = turndownService.turndown(res[key].content);
            embed.setDescription(desc);
            message.channel.send({embed});
            msgWait.delete();
            for(let file of res[key].files){
                message.client.pronote.downloadFile(file, (err)=>{
                    if(err) console.log(err);
                    const dest = "/tmp/" + file.split("?")[0].split("/").pop();
                    message.channel.send(new MessageAttachment(dest));
                })
            }
        });
    });
};
