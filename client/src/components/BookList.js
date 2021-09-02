import {useQuery, gql} from "@apollo/client";

const getBooks = gql`
    {
        books{
            name
        }
    }
`;


function BookList() {
    const{loading, error, data} = useQuery(getBooks)
    if(loading){
        return <p>Loading</p>
    }
    if(error){
        return <p>Error</p>
    }


    return (
        <div>
            <ul id="book-list">

            </ul>
            {
                data.books.map((book) => {
                    return <li>{book.name}</li>
                })
            }
        </div>
    );
}

export default BookList;