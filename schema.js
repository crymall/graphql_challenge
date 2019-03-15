const schemaString = `
  type Organization {
    name: String
  }

  type Location {
    name: String
    address: String
    latitude: Float
    longitude: Float
    orgId: Int
  }

  type Event {
    name: String
    eventDate: String
    eventTime: String
    description: String
    orgId: Int
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
  }

  type Mutation {
    addOrganization(input: OrganizationInput): Organization
    addLocation(input: LocationInput): Location
  }
`;

module.exports = { schemaString: schemaString };
