const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type User {
        _id: ID!
        email: String!
        password: String
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: String!
    }

    type RegisterData {
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
        visitors: [Visitor!]
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

    type Visitor {
        _id: ID!
        lastName: String!
        firstname: String!
        email: String!
        password: String
        meetups: [Meetup!]
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

    input VisitorInput {
        lastName: String!
        firstname: String!
        email: String!
        password: String!
        meetups: [ID!]
    }

    type RootQuery {
        meetups: [Meetup!]!
        expertises: [Expertise!]!
        visitors: [Visitor!]!
        speakers: [Speaker!]!
        adminLogin(email: String!, password: String!): AuthData!
        visitorLogin(email: String!, password: String!): AuthData!
    }

    type RootMutation {
        createUser(userInput: UserInput): AuthData
        createMeetup(meetupInput: MeetupInput): Meetup
        deleteMeetup(meetupId: ID!): Meetup!
        createSpeaker(speakerInput: SpeakerInput): Speaker
        createExpertise(expertiseInput: ExpertiseInput): Expertise
        createVisitor(visitorInput: VisitorInput): Visitor
        bookMeetup(meetupId: ID!): Meetup
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
