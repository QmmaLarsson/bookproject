import type BookInterface from "../interfaces/BookInterface";
import { Link } from "react-router-dom";

//Komponent som visar en bok från Google Books API
const BookCard = ({ book }: { book: BookInterface }) => {
    return (
        <article>
            {/*Visa bild om det finns*/}
            {book.volumeInfo.imageLinks?.thumbnail && (
                <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                />
            )}

            <h3>{book.volumeInfo.title}</h3>

            {/*Visa författare om det finns*/}
            {book.volumeInfo.authors && (
                <p>{book.volumeInfo.authors.join(", ")}</p>
            )}

            <Link to={"/book/" + book.id}>
                <button>Läs mer</button>
            </Link>
        </article>
    );
};

export default BookCard;