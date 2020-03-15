const messages = require('../../variable/message.js');
const data = require('../../variable/help');

module.exports = function(message) {

    if(!message.args[0]){
        let embed = Object.assign({},require('../../variable/embed/help'));
        for(let command of data) embed.addField(command.name, command.description);
        message.reply({embed}).then(()=> embed = null);
    }
    else {
        for(let command of data){
            if(command.name === message.args[0]){
                let embed = Object.assign({},require('../../variable/embed/help'));
                embed.setTitle("Description de " + command.name);
                embed.setDescription(command.description);
                if(command.subcommands.length === 0){
                    embed.addField(":frowning2: Aucune sous-commande n'existe pour cette commande", "\u200B");
                    break;
                }
                for(let subCommand of command.subcommands) embed.addField(subCommand.name, subCommand.description);

                message.reply({embed}).then(()=> embed = null);
                return;
            }
        }
        message.channel.send(messages.HELP_NOBODY)
    }


};
