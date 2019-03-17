const db = require("./index");
const util = require("./db_util");

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

const updateEvent = async input => {
  try {
    util.toSnakeCase(input.body);
    const updateString = util.craftUpdateString(input.id, input.body, "events");
    await db.none(updateString);
    return input.body;
  } catch (err) {
    return err;
  }
};

const deleteEvent = async id => {
  try {
    await db.none("DELETE FROM events WHERE id = $1", [id]);
    return { body: `Event ${id} deleted.` };
  } catch (err) {
    return err;
  }
};

module.exports = { getEvent, addEvent, updateEvent, deleteEvent };
