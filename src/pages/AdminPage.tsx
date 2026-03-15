import { useEffect, useState } from "react";
import type ReviewInterface from "../interfaces/ReviewInterface";
import AdminReviewCard from "../components/AdminReviewCard";

const AdminPage = () => {
  //State för att lagra alla recensioner
  const [reviews, setReviews] = useState<ReviewInterface[]>([]);
  //State för att hantera felmeddelanden
  const [error, setError] = useState<string | null>(null);
  //State för att visa laddningsstatus
  const [loading, setLoading] = useState(false);

  //Hämtar Token från lokalStorage
  const token = localStorage.getItem("token");

  const fetchMyReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      //Hämta recensioner från API
      const res = await fetch("https://apiprojektdt210g.onrender.com/api/review/my",
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (error) {
      setError("Ett fel har uppstått, försök igen senare...")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyReviews();
  }, []);

  if (loading) return <p>Laddar data...</p>;
  if (error) return <p className="error">{error}</p>;
  if (reviews.length === 0) return <p>Du har inga recensioner än.</p>;

  return (
    <>
      <h1>Mina recensioner</h1>
      <ul>
        {reviews.map((review) => (
          <AdminReviewCard key={review._id} review={review} onUpdated={fetchMyReviews} />
        ))}
      </ul>
    </>
  );
};

export default AdminPage;
