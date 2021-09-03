import {gql} from "@apollo/client";


const getBooks = gql`
    {
        books{
            name
            id
        }
    }
`;


const getAuthors = gql`
    {
        authors{
            name
            id
        }
    }
`;

export {getBooks, getAuthors};