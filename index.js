import pkg from "apollo-server";
const { ApolloServer, gql } = pkg;
const persons = [
  {
    name: "Negi",
    phone: "46368882",
    street: "Llauca",
    city: "Callo",
    age: 15,
    id: "12458-1254-778-45",
  },
  {
    name: "Midu",
    phone: "147852",
    street: "CAlle Fronted",
    city: "Barcelona",
    age: 68,
    id: "124587896-1254-778-45",
  },
  {
    name: "TOny",
    phone: "14785212322",
    street: "CAlle Fullstack",
    city: "Santa",
    age: 16,
    id: "1254-778-45",
  },
  {
    name: "Boajack",
    street: "CAlle Back 90",
    city: "Los Angeles",

    age: 24,

    id: "1-778-45",
  },
];

//describiendo los datos
//La exclamacion hace obligatoria el campo !
const typeDefinitions = gql`
  type Address {
    street: String!
    city: String!
  }
  type Person {
    name: String!
    phone: String
    address: Address!
    check: String!
    age: Int!
    canDrink: String!
    id: ID!
  }
  type Query {
    personCount: Int!
    allPersons: [Person]!
    findPerson(name: String!): Person
  }
`;
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (root, args) => {
      const { name } = args;
      return persons.find((person) => person.name === name);
    },
  },
  Person: {
    //creacion de campos calculados
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
    check: () => "ok",
    canDrink: (root) => (root.age > 18 ? "Si" : "No"),
  },
};

const server = new ApolloServer({
  resolvers,
  typeDefs: typeDefinitions,
});

server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
