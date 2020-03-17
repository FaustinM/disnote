module.exports = {
    debug : {
        path : "../commands/admin/debug",
        code : function() {
            console.log("Composant mal gérée !" + this.name)
        },
        use : true,
        name : "debug",
        msg : false,
        perm : "ADMINISTRATOR"
    },
    mod : {
        path : "../commands/admin/mod",
        code : function() {
            console.log("Composant mal géré !" + this.name)
        },
        use : true,
        name : "mod",
        msg : false,
        perm : "MANAGE_MESSAGES"
    },
    pronote : {
        path : "../commands/user/pronote",
        code : function() {
            console.log("Composant mal gérée !" + this.name)
        },
        use : true,
        name : "pronote",
        msg : false
    },
    help : {
        path : "../commands/admin/help",
        code : function() {
            console.log("Composant mal gérée !" + this.name)
        },
        use : true,
        name : "help",
        msg : true,
    },
};
