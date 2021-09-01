const graphql = require('graphql')
const _ = require('lodash')

const{GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt} = graphql;

var books = [
    {name: 'Book1', genre: 'Fantasy', id: "1"},
    {name: 'Book2', genre: 'Sports', id: "2"},
    {name: 'Book3', genre: 'Romantic', id: "3"},
    {name: 'Book4', genre: 'Biography', id: "4"}
]


var authors = [
    {name: 'Author1', age: 20, id: "1"},
    {name: 'Author2', age: 28, id: "2"},
    {name: 'Author3', age: 35, id: "3"},
    {name: 'Author4', age: 42, id: "4"}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields : () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields : () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book:{
            type: BookType,
            args: {id:{type: GraphQLID}},
            resolve(parent, args){
                //code to get data from db or other source all
                return _.find(books, {id: args.id})
            }
        },
        author:{
            type: AuthorType,
            args: {id:{type: GraphQLID}},
            resolve(parent, args){
                //code to get data from db or other source all
                return _.find(authors, {id: args.id})
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
})