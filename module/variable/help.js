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
            {
                name : "!pronote liste-cours",
                description : "Permet d'obtenir le contenu des cours (7j avant et après)",
            },
            {
                name : "!pronote liste-info",
                description : "Permet d'obtenir la liste des informations",
            },
            {
                name : "!pronote liste-devoir",
                description : "Permet d'obtenir la liste des devoirs",
            },
            {
                name : "!pronote cours <id dans la liste en partant du dernier cour>",
                description : "Permet d'obtenir un cours. Si il n'y a pas de id, le dernier est donné",
            },
            {
                name : "!pronote info <id dans la liste>",
                description : "Permet d'obtenir une info et ses fichiers. Si il n'y a pas de id, le dernier est donné",
            },
        ],
    },
    {
        name : "!help <commande>",
        description : "Permet d'en savoir plus à propos d'une commande",
    },
    {
        name : "!mod",
        description : "Commandes de modérations (permissions gérer les messages)",
        subcommands : [
            {
                name : "!mod purge <nb>",
                description : "Permet de purger les <nb> derniers messages",
            },
        ]
    },
];
