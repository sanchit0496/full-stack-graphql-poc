const graphql = require('graphql')
const Author = require('../models/author.js')
const Book = require('../models/book.js')
const _ = require('lodash')

const{GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt
, GraphQLList} = graphql;

// var books = [
//     { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
//     { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
//     { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
//     { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
//     { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
//     { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
// ];

// var authors = [
//     { name: 'Patrick Rothfuss', age: 44, id: '1' },
//     { name: 'Brandon Sanderson', age: 42, id: '2' },
//     { name: 'Terry Pratchett', age: 66, id: '3' }
// ];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields : () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                // will return the author of the book
                // return _.find(authors, {id: parent.authorId})
                return Author.findById(parent.authorId)
            }
        }
    })
})


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields : () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        book:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //return all the books written by author
                // return _.filter(books, {authorId: parent.id})
                return Book.find({authorId: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book:{
            type: BookType,
            args: {id:{type: GraphQLID}},
            resolve(parent, args){
                //gets the book detail from ID provided
                // return _.find(books, {id: args.id})
                return Book.findById(args.id)
            }
        },
        author:{
            type: AuthorType,
            args: {id:{type: GraphQLID}},
            resolve(parent, args){
                //gets the author detail from ID provided
                // return _.find(authors, {id: args.id})
                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // returns all the books
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                // returns all the authors
                return Author.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addAuthor:{
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook:{
            type: BookType,
            args:{
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorId: {type: GraphQLID}
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
});


module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})