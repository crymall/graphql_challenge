const schemaString = `
  type Organization {
    id: Int
    name: String
    createdAt: String
    updatedAt: String
  }

  type Location {
    id: Int
    name: String
    address: String
    latitude: Float
    longitude: Float
    orgId: Int
    createdAt: String
    updatedAt: String
  }

  type Event {
    id: Int
    name: String
    eventDate: String
    eventTime: String
    description: String
    orgId: Int
    createdAt: String
    updatedAt: String
  }

  input OrganizationInput {
    name: String!
  }

  input LocationInput {
    name: String!
    address: String
    latitude: Float
    longitude: Float
    orgId: Int!
  }

  input EventInput {
    name: String!
    eventDate: String!
    eventTime: String
    description: String
    orgId: Int!
  }

  type Query {
    getOrganization(id: ID!): Organization
    getLocation(id: ID!): Location
    getEvent(id: ID!): Event
  }

  type Mutation {
    addOrganization(input: OrganizationInput): Organization
    addLocation(input: LocationInput): Location
    addEvent(input: EventInput): Event
  }
`;

module.exports = { schemaString: schemaString };
