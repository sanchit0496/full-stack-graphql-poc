import {useQuery, gql} from "@apollo/client";
import {getBooksQuery} from "../queries/queries";

export default function BookList() {
    const{loading, error, data} = useQuery(getBooksQuery)
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
                    return <li key = {book.id}>{book.name}</li>
                })
            }
        </div>
    );
}