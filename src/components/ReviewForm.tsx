import { useState, useEffect } from "react";

const ReviewForm = ({ bookId, bookTitle, bookThumbnail, onReviewAdded }: { bookId: string; bookTitle: string; bookThumbnail?: string; onReviewAdded: () => void; }) => {
    //State för att lagra texten i recensionen
    const [reviewText, setReviewText] = useState("");
    //Text för att lagra betyget i recensionen
    const [rating, setRating] = useState(1);
    //State för att hantera felmeddelanden
    const [error, setError] = useState<string | null>(null);
    //State för att visa ett bekräftelsemeddelande när recensionen har sparats
    const [success, setSuccess] = useState<string | null>(null);
    //State för att hålla koll på om användaren är inloggad
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    //Hämtar token från lokalStorage
    const token = localStorage.getItem("token");

    //Kolla om användaren är inloggad
    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);
        setSuccess(null);

        //Validera texten
        if (reviewText.trim().length < 1) {
            setError("Recensionen måste vara minst 1 tecken.");
            return;
        }

        //Validera betyget
        if (rating < 1 || rating > 5) {
            setError("Betyget måste vara mellan 1 och 5.");
            return;
        }

        try {
            //Gör ett POST-anrop
            const res = await fetch("https://apiprojektdt210g.onrender.com/api/review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    bookId,
                    bookTitle,
                    bookThumbnail,
                    reviewText,
                    rating
                })
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Kunde inte skapa recension");
                return;
            }

            //Om anropet lyckades
            if (res.ok) {
                setSuccess("Recension sparad!");
                setReviewText("");
                setRating(1);

                //Uppdatera recensioner i BookPage
                onReviewAdded();
            }
        } catch (error) {
            setError("Ett fel har uppstått, försök igen senare...");
        }
    };

    return (
        <div>
            {/*Om användaren inte är inloggad, visa meddelande*/}
            {!isLoggedIn ? (
                <p>Du måste logga in för att skriva en recension</p>
            ) : (
                <>
                    <h3>Skriv en recension</h3>

                    {/*Formulär för att lägga till recension*/}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Betyg:</label>
                            <select
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                            >
                                {/*Alternativ i select-boxen*/}
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <option key={num} value={num}>
                                        {num}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Recension:</label>
                            <textarea
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Skicka recension</button>
                        {error && <p className="error">{error}</p>}
                        {success && <p>{success}</p>}
                    </form>
                </>
            )}
        </div>
    );
};

export default ReviewForm;