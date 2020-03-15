module.exports = [
    {
        name : "!debug",
        description : "Toutes les commandes pour vérifier l'état du bot",
        subcommands : [
            {
                name : "!debug msg <identifiant>",
                description : "Permet de tester les différents messages du bot",
            },
            {
                name : "!debug info",
                description : "Permet d'obtenir les différentes informations du bot",
            },
            {
                name : "!debug ping",
                description : "Permet de vérifier que le bot est en ligne ainsi que d'avoir son ping"
            },
            {
                name : "!debug restart",
                description : "Permet de redémarrer le bot (seul Faustin peut le faire)"
            },
        ],
    },
    {
        name : "!pronote",
        description : "Toutes les commandes sur Pronote",
        subcommands : [
            {
                name : "!pronote moyenne",
                description : "Permet d'obtenir la moyenne",
            },
        ],
    },
    {
        name : "!help <commande>",
        description : "Permet d'en savoir plus à propos d'une commande",
    },

];
