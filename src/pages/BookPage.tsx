// pages/BookPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type BookInterface from "../interfaces/BookInterface";
import type ReviewInterface from "../interfaces/ReviewInterface";
import ReviewForm from "../components/ReviewForm";
import ReviewCard from "../components/ReviewCard";

//Sida som visar en enskild bok och dess recensioner
const BookPage = () => {
    const { bookId } = useParams<{ bookId: string }>();

    //State för att lagra alla böcker
    const [book, setBook] = useState<BookInterface | null>(null);
    //State för att lagra alla recensioner
    const [reviews, setReviews] = useState<ReviewInterface[]>([]);
    //State för att hantera felmeddelanden
    const [error, setError] = useState<string | null>(null);
    //State för att visa laddningsstatus
    const [loading, setLoading] = useState<boolean>(false);

    //Hämtar recension från API
    const fetchReviews = async () => {
        try {
            const resReviews = await fetch(`https://apiprojektdt210g.onrender.com/api/review?bookId=${bookId}`);

            if (resReviews.ok) {
                const dataReviews = await resReviews.json();
                setReviews(dataReviews);
            }

        } catch (error) {
            setError("Ett fel har uppstått, försök igen senare...");
        }
    };

    //Rensar bort onödiga tecken från texten
    const cleanText = (text: string) => text.replace(/<[^>]*>?/gm, "");

    //Hämtar böcker och recensioner när sidan laddas in
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                //Hämtar bok från API
                const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

                const resBook = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${API_KEY}`);
                if (resBook.ok) {
                    const dataBook = await resBook.json();
                    setBook(dataBook);
                }

                //Hämtar recension från API
                await fetchReviews();

            } catch (error) {
                setError("Ett fel har uppstått, försök igen senare...");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [bookId]);

    if (loading) return <p style={{ textAlign: "center", fontStyle: "italic" }}>Data laddas in...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!book) return <p className="error">Boken hittades inte.</p>;

    return (
        <>
            {/*Bokinformation*/}
            <h1>{book?.volumeInfo?.title || "Ingen titel tillgänglig"}</h1>
            <p>Författare: {book?.volumeInfo?.authors?.join(", ") || "Okänd"}</p>
            {book?.volumeInfo?.imageLinks?.thumbnail && (
                <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title || "Ingen titel"}
                />
            )}
            <p>{cleanText(book?.volumeInfo?.description || "Ingen beskrivning tillgänglig")}</p>

            {/*Recensioner*/}
            <h2>Recensioner</h2>
            {reviews.length === 0 && <p>Inga recensioner än.</p>}

            <ul>
                {reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                ))}
            </ul>

            {/*Formilär*/}
            {bookId && (
                <ReviewForm bookId={bookId} onReviewAdded={fetchReviews} />
            )}
        </>
    );
};

export default BookPage;