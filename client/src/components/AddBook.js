import React from 'react'
import {useQuery, gql} from "@apollo/client";


const getAuthors = gql`
    {
        authors{
            name
            id
        }
    }
`;


export default function AddBook() {
    const{loading, error, data} = useQuery(getAuthors)
    
    function authorList(){
        if(loading){
            return <p>Loading</p>
        }
        if(error){
            return <p>Error</p>
        }else{
            return data.authors.map((author) => {
                return <option key = {author.id} value = {author.id}>{author.name}</option>
            })
        }
    }
    return (
        <div>
            <form id="add-book">
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select>
                        <option>Select Author</option>
                        {authorList()}
                    </select>
                </div>
                <button>+</button>
            </form>        
        </div>
    )
}