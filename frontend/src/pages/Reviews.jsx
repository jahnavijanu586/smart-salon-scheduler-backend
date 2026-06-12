import { useEffect, useState } from "react";
import { getReviews, createReview } from "../services/reviewService";
import Navbar from "../components/Navbar";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [salonId, setSalonId] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const data = await getReviews();
      setReviews(data);
    } catch (error) {
      setError("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      await createReview({
        customer_name: customerName,
        salon_id: Number(salonId),
        rating: Number(rating),
        comment: comment
      });

      alert("Review Added");

      setCustomerName("");
      setSalonId("");
      setRating("");
      setComment("");

      loadReviews();

    } catch (error) {
      alert("Failed to submit review");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="p-10">
          Loading reviews...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="p-10 text-red-500">
          {error}
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="p-10">

        <h1 className="text-3xl font-bold mb-6">
          Reviews
        </h1>

        <div className="border p-5 rounded mb-6">

          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="border p-2 w-full mb-3"
          />

          <input
            type="number"
            placeholder="Salon ID"
            value={salonId}
            onChange={(e) => setSalonId(e.target.value)}
            className="border p-2 w-full mb-3"
          />

          <input
            type="number"
            placeholder="Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border p-2 w-full mb-3"
          />

          <textarea
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border p-2 w-full mb-3"
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit Review
          </button>

        </div>

        {reviews.length === 0 ? (
          <p>No reviews found.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="border p-4 rounded mb-4 shadow hover:shadow-xl transition bg-white"
            >
            <p>
                <strong>Customer:</strong> {review.customer_name}
            </p>

            <p>
                <strong>Salon ID:</strong> {review.salon_id}
            </p>

            <p>
                <strong>Rating:</strong> ⭐ {review.rating}
            </p>

            <p>
                <strong>Comment:</strong> {review.comment}
            </p>
            </div>
          ))
        )}

      </div>
    </>
  );
}

export default Reviews;