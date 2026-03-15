import type ReviewInterface from "../interfaces/ReviewInterface";
import "./ReviewCard.css";

const ReviewCard = ({ review }: { review: ReviewInterface }) => {
    const username =
        typeof review.user === "object" ? review.user.username : "Anonym";

    return (
        <li>
            <p>
                <b>{username}</b> ({review.rating}/5)
            </p>
            <p>{review.reviewText}</p>
        </li>
    );
};

export default ReviewCard;