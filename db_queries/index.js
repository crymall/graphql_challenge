const pgp = require("pg-promise")({});
const connectionString = "postgres://localhost/challenge";
const db = pgp(connectionString);

module.exports = db;
