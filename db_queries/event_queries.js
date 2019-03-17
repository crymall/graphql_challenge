const db = require("./index");
const util = require("./db_util");

const addEvent = async myEvent => {
  try {
    util.toSnakeCase(myEvent);
    const queryString = util.craftInsertString(myEvent, "events");
    await db.none(queryString);
    return myEvent;
  } catch (err) {
    return err;
  }
};

const getEvent = async id => {
  try {
    const theEvent = await db.one(
      `SELECT id, name, event_date AS "eventDate", event_time AS "eventTime",
      description, org_id AS "orgId", created_at AS "createdAt", updated_at AS "updatedAt"
      FROM events WHERE id = $1`,
      [id]
    );
    return theEvent;
  } catch (err) {
    return err;
  }
};

module.exports = { addEvent, getEvent };
