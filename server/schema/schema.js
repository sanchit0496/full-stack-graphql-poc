const graphql = require('graphql')
const{GraphQLObjectType, GraphQLString} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields : () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {genre: GraphQLString}
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
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
})