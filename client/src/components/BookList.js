import {useQuery, gql} from "@apollo/client";

const getBooks = gql`
  {
    books {
      name
    }
  }
`;

function BookList() {
  const {loading, error, data} = useQuery(getBooks);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;
  console.log(data);
  return (
    <div>
      <ul id="book-list">
        {data.books.map(book => (
          <li key={book.id}>{book.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;