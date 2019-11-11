const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type User {
        _id: ID!
        email: String!
        password: String!
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: String!
    }

    type Meetup {
        _id: ID!
        title: String!
        description: String!
        date: String!
        location: String!
        speakers: [String!]
    }

    input UserInput {
        email: String!
        password: String!
    }

    input MeetupInput {
        title: String!
        description: String!
        date: String!
        location: String!
        speakers: [String!]
    }

    type RootQuery {
        meetups: [Meetup!]!
        login(email: String!, password: String!): AuthData!
    }

    type RootMutation {
        createUser(userInput: UserInput): User
        createMeetup(meetupInput: MeetupInput): Meetup
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
