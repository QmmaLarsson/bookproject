import { useState } from "react"
import type BookInterface from "../interfaces/BookInterface";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import "./HomePage.css";

const HomePage = () => {
    //State för att lagra alla böcker
    const [books, setBooks] = useState<BookInterface[]>([]);
    //State för att hantera felmeddelanden
    const [error, setError] = useState<string | null>(null);
    //State för att visa laddningsstatus
    const [loading, setLoading] = useState<boolean>(false);

    const fetchBooks = async (searchTerm: string) => {
        try {
            setLoading(true);
            setError(null);

            //Hämtar böcker från API
            const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

            const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}&maxResults=10&key=${API_KEY}`);

            if (res.ok) {
                const data = await res.json();
                setBooks(data.items || []);
            }
        } catch (error) {
            setError("Ett fel har uppstått, försök igen senare...")
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h1 style={{ fontSize: "5rem" }}>Välkommen till BookClub</h1>
            <p style={{ maxWidth: "600px", margin: "auto" }}>Din plats för böcker och recensioner! Sök, läs och dela dina boktips och låt oss tillsammans skapa en värld av läsupplevelser.</p>
            <SearchBar onSearch={fetchBooks} />

            {error && <p className="error">{error}</p>}

            <section>
                {loading && <p style={{ textAlign: "center", fontStyle: "italic" }}>Data laddas in...</p>}
                {books.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </section>
        </>
    )
}

export default HomePage