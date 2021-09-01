const graphql = require('graphql')
const _ = require('lodash')

const{GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

var books = [
    {name: 'Book1', genre: 'Fantasy', id: "1"},
    {name: 'Book2', genre: 'Sports', id: "2"},
    {name: 'Book3', genre: 'Romantic', id: "3"},
    {name: 'Book4', genre: 'Biography', id: "4"}
]


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields : () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book:{
            type: BookType,
            args: {id:{type: GraphQLString}},
            resolve(parent, args){
                //code to get data from db or other source all
                return _.find(books, {id: args.id})
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
})