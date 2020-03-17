require('dotenv').config();

// Librairie
const Discord = require("discord.js");
const Ora = require("ora");

// Core Module
const manager = require("./module/core/gestionCommands");
const config = require("./module/core/config");

// Module de gestion de commande
const gestionCommands = require("./module/commands/admin/gestion");

// Fichiers de constantes
const messages = require("./module/variable/message");

// Fichiers utilitaire
let dbUtils = require("./module/utils/dbUtils");


// Constantes
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

// Gestion des événements du bot
bot.on("guildMemberAdd", (member) => {
    if(!member.user.bot) {
        //member.send(messages.JOIN);
    }
});

bot.on("message", message => {
    // Gestionnaire de commandes administrateurs
    message.args = message.content.toLowerCase().split(" ");
    message.command = message.args.shift().toLowerCase();

    if(message.command === "!gestion") {
        gestionCommands(message, manager);
        return;
    }
    for(let key in manager.commands) {
        if(manager.commands.hasOwnProperty(key) && message.command === config.PREFIX + manager.commands[key].name) {
            if(!manager.commands[key].msg && !message.guild) {
                message.channel.send(messages.DM_BLOCK);
                break;
            }
            if(!message.member.hasPermission(manager.commands[key].perm)){
                message.channel.send(messages.NOT_ENOUGHT_PERM);
                break
            }

            switch(manager.state(manager.commands[key].name)) {
                default :
                    break;

                case "error":
                    message.channel.send(messages.COMMANDS_ERROR);
                    break;

                case false:
                    message.channel.send(messages.COMMANDS_OFF);
                    break;

                case true:
                    manager.commands[key].code(message, dbUtils);
            }
            break;
        }
    }
});

// Gestion des événements d'arrets
process.on("SIGINT", function() {
    bot.destroy();
    bot.pronote.stopWorkers();
    //dbUtils.client.close();
});
process.on("SIGTERM", function() {
    bot.destroy();
    bot.pronote.stopWorkers();
    //dbUtils.client.close();
});

// Initialisation
const spinners = {
    verification : new Ora("Vérification des variables d'environement").start(),
    discord : new Ora("Connexion à l'api Discord"),
    pronote : new Ora("Connexion à Pronote"),
};

if(!TOKEN || !(process.env.URI || config.URL_DB)) {
    spinners.verification.fail("Erreur lors de la vérification des données !");
    process.exit(78); // Code : Problème à la vérification
} else {
    spinners.verification.succeed("Toutes les données sont disponible !");
}

/*dbUtils.client.connect(function(error) {
    if(error){
        spinners.dbS.fail("Erreur lors de la connexion à la base de donnée...");
        process.exit(1); // Code : Problème à la connexion à la DB
    }
    spinners.dbS.succeed("Connecté à la base de donnée !");
});*/

try {
    bot.pronote = require('./module/utils/pronote');
    bot.pronote.init(() => spinners.pronote.succeed("Connecté à Pronote"));
} catch(e) {
    console.error(e);
    spinners.discord.fail("Erreur lors de la connexion à Pronote...");
    process.exit(2);
}

bot.login(TOKEN).catch((error) => {
    spinners.discord.fail("Erreur lors de la connexion à Discord...");
    process.exit(1); // Code : Problème à la connexion à Discord
});
bot.on("ready", function() {
    spinners.discord.succeed("Connecté à l'api Discord !");
});

manager.load();


