const db = require("./index");
const util = require("./db_util");

const getLocation = async id => {
  try {
    const theLoc = await db.one(
      `SELECT name, address, latitude, longitude, org_id AS "orgId"
      FROM locations WHERE id = $1`,
      [id]
    );
    return theLoc;
  } catch (err) {
    return err;
  }
};

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

const updateLocation = async input => {
  try {
    util.toSnakeCase(input.body);
    const updateString = util.craftUpdateString(
      input.id,
      input.body,
      "locations"
    );
    await db.none(updateString);
    return input.body;
  } catch (err) {
    return err;
  }
};

module.exports = { getLocation, addLocation, updateLocation };
