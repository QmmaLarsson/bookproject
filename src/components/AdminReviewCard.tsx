import { useState } from "react";
import type ReviewInterface from "../interfaces/ReviewInterface";
import "./AdminReviewCard.css";

const AdminReviewCard = ({ review, onUpdated }: { review: ReviewInterface; onUpdated: () => void; }) => {
    //State som styr om recensionen är i redigeringsläge eller inte
    const [isEditing, setIsEditing] = useState(false);
    //State som sparar texten i recensionen när man redigerar
    const [text, setText] = useState(review.reviewText);
    //State som sparar betyget i recensionen när man redigerar
    const [rating, setRating] = useState(review.rating);
    //State för att hantera felmeddelanden
    const [error, setError] = useState<string | null>(null);
    //State som hanterar spara
    const [saving, setSaving] = useState(false);

    //Hämtar Token från lokalStorage
    const token = localStorage.getItem("token");

    const saveReview = async () => {
        //Validera texten
        if (text.trim().length < 1) {
            setError("Recensionen måste vara minst 1 tecken.");
            return;
        }

        //Validera betyget
        if (rating < 1 || rating > 5) {
            setError("Betyget måste vara mellan 1 och 5.");
            return;
        }

        try {
            setSaving(true);
            setError(null);

            //PUT-anrop till API
            const res = await fetch(
                `https://apiprojektdt210g.onrender.com/api/review/${review._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify({ reviewText: text, rating }),
                }
            );

            //Om uppdateringen lyckas stängs redigera-läget och listan uppdateras
            if (res.ok) {
                setIsEditing(false);
                onUpdated();
            }
        } catch (error) {
            setError("Ett fel har uppstått, försök igen senare...")
        } finally {
            setSaving(false);
        }
    };

    const deleteReview = async () => {
        if (!window.confirm("Är du säker på att du vill ta bort denna recension?")) return;

        try {
            const res = await fetch(
                `https://apiprojektdt210g.onrender.com/api/review/${review._id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: "Bearer " + token
                    },
                }
            );

            //Om delete lyckas uppdateras listan
            if (res.ok) {
                onUpdated();
            }
        } catch (error) {
            setError("Ett fel har uppstått, försök igen senare...")
        }
    };

    return (
        <li className="admin-review-card">
            {review.bookThumbnail && (
                <img src={review.bookThumbnail} alt={review.bookTitle} />
            )}
            <h3>{review.bookTitle || "Okänd bok"}</h3>
            {isEditing ? (
                <form>
                    <label><b>Betyg:</b></label>
                    <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                    <br />
                    <label><b>Recension:</b></label>
                    <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} />
                    <br />
                    <button type="button" onClick={saveReview} disabled={saving}>
                        Spara
                    </button>
                    <button type="button" onClick={() => setIsEditing(false)}>
                        Avbryt
                    </button>
                </form>
            ) : (
                <>
                    <p><b>Betyg:</b> {review.rating}/5</p>
                    <p>{review.reviewText}</p>
                    <button onClick={() => setIsEditing(true)}>Redigera</button>
                    <button onClick={deleteReview}>Ta bort</button>
                </>
            )}
            {error && <p className="error">{error}</p>}
            <p>Postad: {new Date(review.createdAt).toLocaleDateString()}</p>
        </li>
    );
};

export default AdminReviewCard;