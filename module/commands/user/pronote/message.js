const { MessageEmbed, MessageAttachment } = require('discord.js');
const TurndownService = require('turndown');

module.exports = (message) => {
    message.channel.send(messages.WAITING).then((msgWait) =>{
        message.client.pronote.msg((res)=>{
            console.log(res);
            msgWait.delete();
        });
    });
};
