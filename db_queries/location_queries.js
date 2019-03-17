const db = require("./index");
const util = require("./db_util");

const addLocation = async location => {
  try {
    util.toSnakeCase(location);
    const queryString = util.craftInsertString(location, "locations");
    await db.none(queryString);
    return location;
  } catch (err) {
    return err;
  }
};

const getLocation = async id => {
  try {
    const theLoc = await db.one("SELECT * FROM locations WHERE id = $1", [id]);
    return theLoc;
  } catch (err) {
    return err;
  }
};

module.exports = { addLocation, getLocation };
