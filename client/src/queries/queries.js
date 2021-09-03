import {useQuery, gql} from "@apollo/client";

const getBooksQuery = gql`
  query {
    books{
      name
      id
    }
  }
`

// query for getting ONE book
const getBookQuery = gql`
  query($id: ID){
    book(id: $id){
      id
      name
      genre
      author{
        id
        name
        age
        books{
          name
          id
        }
      }
    }
  }
`

const getAuthorsQuery = gql`
  query {
    authors{
      name
      id
    }
  }
`

// mutation($variable) << allows variables to be passed to the mutation
const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
      id
    }
  }
`

export { getBooksQuery, getAuthorsQuery, addBookMutation };