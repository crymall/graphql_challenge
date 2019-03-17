const axios = require("axios");
const db = require("./index");
const util = require("./db_util");
const { key } = require("../secrets.json");

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
    if (!location.latitude || !location.longitude) {
      try {
        let geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=`;
        geoUrl += location.address.split("+").join("");
        geoUrl += `&key=${key}`;

        const geocoded = await axios.get(geoUrl);
        const geometry = geocoded.data.results[0].geometry.location;
        location.latitude = geometry.lat;
        location.longitude = geometry.lng;
      } catch (err) {
        console.log(err);
      }
    }

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

const deleteLocation = async id => {
  try {
    await db.none("DELETE FROM locations WHERE id = $1", [id]);
    return { body: `Location ${id} deleted.` };
  } catch (err) {
    return err;
  }
};

const getLocationsForOrg = async id => {
  try {
    let theLocations = await db.any(
      `SELECT name, address, latitude, longitude, org_id AS "orgId"
      FROM locations WHERE org_id = $1`,
      [id]
    );

    return theLocations;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getLocation,
  addLocation,
  updateLocation,
  deleteLocation,
  getLocationsForOrg
};
