const db = require("./index");

const addOrganization = async name => {
  try {
    await db.none("INSERT INTO organizations(name) VALUES ($1)", [name]);
    return { name: name };
  } catch (err) {
    return err;
  }
};

const getOrganization = async id => {
  try {
    const theOrg = await db.one(
      `SELECT id, name, created_at AS "createdAt",
      updated_at AS "updatedAt" FROM organizations WHERE id = $1`,
      [id]
    );
    return theOrg;
  } catch (err) {
    return err;
  }
};

module.exports = { addOrganization, getOrganization };
