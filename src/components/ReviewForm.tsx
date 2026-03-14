import { useState } from "react";

interface ReviewFormProps {
    bookId: string;
    onReviewAdded: () => void;
}

const ReviewForm = ({ bookId, onReviewAdded }: ReviewFormProps) => {

    //State för att lagra texten i recensionen
    const [reviewText, setReviewText] = useState("");
    //Text för att lagra betyget i recensionen
    const [rating, setRating] = useState(1);
    //State för att hantera felmeddelanden
    const [error, setError] = useState<string | null>(null);
    //State för att visa ett bekräftelsemeddelande när recensionen har sparats
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);
        setSuccess(null);

        try {
            //Hämta token från localStorage
            const token = localStorage.getItem("token");

            //Gör ett POST-anrop
            const res = await fetch("https://apiprojektdt210g.onrender.com/api/review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    bookId,
                    reviewText,
                    rating
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Kunde inte skapa recension");
            }

            setSuccess("Recension sparad!");

            setReviewText("");
            setRating(1);

            //Uppdatera recensioner i BookPage
            onReviewAdded();

        } catch (error) {
            setError("Ett fel har uppstått, försök igen senare...");
        }
    };

    return (
        <div>
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
        </div>
    );
};

export default ReviewForm;