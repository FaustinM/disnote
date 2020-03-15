module.exports = {
    commands : require('./commands'),
    load : function() {
        delete require.cache[require.resolve('./commands')];
        this.commands = require('./commands');
        for(let key in this.commands) {
            if(this.commands.hasOwnProperty(key) && this.commands[key]) {
                if(this.commands[key].use) this.enable(key);
                else if(!this.commands[key].use) this.disable(key);
            }
        }
    },
    state : function(name) {
        if(!this.commands[name] || !name) return "nobody";
        switch(this.commands[name].use) {
            default :
                break;

            case "error":
                return "error";

            case false:
                return false;

            case true:
                return true;
        }
    },
    disable : function(name, type) {
        if(!this.commands[name]) return "nobody";
        try {
            this.commands[name].use = false;
            this.commands[name].code = () => console.log("Composant mal bloqué" + this.commands[name].name);
            return true;
        } catch(e) {
            console.error(e);
            return false;
        }
    },
    enable : function(name) {
        if(!this.commands[name]) return "nobody";
        try {
            this.commands[name].use = true;
            delete require.cache[require.resolve(this.commands[name].path)];
            this.commands[name].code = require(this.commands[name].path);
            return true;
        } catch(e) {
            this.commands[name].use = "error";
            this.commands[name].code = () => console.log("Composante en erreur" + this.commands[name].name);
            console.error(e);
            return false;
        }
    },
};
