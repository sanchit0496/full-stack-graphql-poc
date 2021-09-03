import {useQuery, gql} from "@apollo/client";

const getBooks = gql`
    {
        books{
            name
        }
    }
`;
