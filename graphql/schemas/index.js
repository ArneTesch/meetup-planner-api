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
        speakers: [Speaker!]
    }

    type Speaker {
        _id: ID!
        name: String!
        age: Float!
        nationality: String!
        expertise: Expertise!
        avatar: String
    }

    type Expertise {
        _id: ID!
        title: String!
        domain: String!
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
        speakers: [ID!]
    }

    input SpeakerInput {
        name: String!
        age: Float!
        expertise: ID!
        nationality: String!
        avatar: String
    }

    input ExpertiseInput {
        title: String!
        domain: String!
    }

    type RootQuery {
        meetups: [Meetup!]!
        expertises: [Expertise!]!
        login(email: String!, password: String!): AuthData!
    }

    type RootMutation {
        createUser(userInput: UserInput): User
        createMeetup(meetupInput: MeetupInput): Meetup
        createSpeaker(speakerInput: SpeakerInput): Speaker
        createExpertise(expertiseInput: ExpertiseInput): Expertise
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
