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
