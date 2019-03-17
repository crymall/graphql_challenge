const orgQueries = require("../db_queries/org_queries");
const locQueries = require("../db_queries/location_queries");
const evQueries = require("../db_queries/event_queries");

const root = {
  getOrganization: ({ id }) => orgQueries.getOrganization(id),
  addOrganization: ({ input }) => orgQueries.addOrganization(input),
  getOrganizationForLoc: ({ input }) =>
    orgQueries.getOrganizationForFKey(input),
  getOrganizationForEvent: ({ input }) =>
    orgQueries.getOrganizationForFKey(input),
  getLocation: ({ id }) => locQueries.getLocation(id),
  addLocation: ({ input }) => locQueries.addLocation(input),
  updateLocation: ({ input }) => locQueries.updateLocation(input),
  deleteLocation: ({ id }) => locQueries.deleteLocation(id),
  getLocationsForOrg: ({ id }) => locQueries.getLocationsForOrg(id),
  getEvent: ({ id }) => evQueries.getEvent(id),
  addEvent: ({ input }) => evQueries.addEvent(input),
  updateEvent: ({ input }) => evQueries.updateEvent(input),
  deleteEvent: ({ id }) => evQueries.deleteEvent(id),
  getEventsForOrg: ({ id }) => evQueries.getEventsForOrg(id)
};

module.exports = { ...root };
