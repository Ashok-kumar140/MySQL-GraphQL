export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    # todos: [Todo!]
  }
  type Todo {
    id: ID!
    title: String!
    iscompleted: Boolean!
    user_id:Int!
    user: User!
  }
  type Query {
    users: [User]
    user(id: ID!): User
    todos: [Todo]
    todo(id: ID!): Todo
    todoListbyUserId(user_id:Int!):[Todo]
  }
  type Mutation {
    addUser(name: String!, email: String!): User
    addTodo(title: String!, user_id: Int!,iscompleted:Boolean!): Todo
    updateTodo(id: ID!, title: String, iscompleted: Boolean): Todo
    deleteUser(id: ID!): [User]
    deleteTodo(id: ID!): Boolean
  }
  
`;
