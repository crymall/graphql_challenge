const toSnakeCase = obj => {
  if (obj.eventDate) {
    obj.event_date = obj.eventDate;
    delete obj.eventDate;

    if (obj.eventTime) {
      obj.event_time = obj.eventTime;
      delete obj.eventTime;
    }
  }

  if (obj.orgId) {
    obj.org_id = obj.orgId;
    delete obj.orgId;
  }

  return obj;
};

const craftInsertString = (obj, type) => {
  const keys = Object.keys(obj);
  const values = Object.values(obj);

  let queryString = `INSERT INTO ${type}(`;

  keys.forEach((key, i) => {
    i < keys.length - 1
      ? (queryString += `${key}, `)
      : (queryString += `${key}) VALUES (`);
  });

  values.forEach((value, i) => {
    if (i < values.length - 1) {
      typeof value === "string"
        ? (queryString += `'${value}', `)
        : (queryString += `${value}, `);
    } else {
      typeof value === "string"
        ? (queryString += `'${value}')`)
        : (queryString += `${value})`);
    }
  });

  return queryString;
};

const craftUpdateString = (id, obj, type) => {
  console.log(id, obj, type);
  const keys = Object.keys(obj);

  let queryString = `UPDATE ${type} SET `;

  keys.forEach((key, i) => {
    if (i < keys.length - 1) {
      typeof obj[key] === "string"
        ? (queryString += `${key} = '${obj[key]}', `)
        : (queryString += `${key} = ${obj[key]}, `);
    } else {
      typeof obj[key] === "string"
        ? (queryString += `${key} = '${obj[key]}' `)
        : (queryString += `${key} = ${obj[key]} `);
    }
  });

  queryString += `WHERE id = ${id}`;

  return queryString;
};

module.exports = { toSnakeCase, craftInsertString, craftUpdateString };
