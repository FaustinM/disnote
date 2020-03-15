module.exports = {
    URL_DB : "mongodb://localhost:27017",
    NAME_DB : "rp-discord",
    VERSION : "Intégration de Pronote",
    OWNER_ID : "140123457001226241",
    PREFIX : "!",
    PRONOTE : {username: process.env.PRONOTE_USER, password: process.env.PRONOTE_PASS, url : process.env.PRONOTE_URL, cas: "none"}
};
