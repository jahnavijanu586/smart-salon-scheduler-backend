import { useEffect, useState } from "react";
import { getPractitioners } from "../services/practitionerService";
import Navbar from "../components/Navbar";

function Practitioners() {
  const [practitioners, setPractitioners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPractitioners();
  }, []);
  if (loading) {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">
        Loading Practitioners...
      </h1>
    </div>
  );
}

  const loadPractitioners = async () => {
    try {
      const data = await getPractitioners();
      setPractitioners(data);
    } catch (error) {
      setError("Failed to load practitioners");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="p-10">
          Loading practitioners...
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
          Practitioners
        </h1>

        {practitioners.length === 0 ? (
          <p>No practitioners found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practitioners.map((p) => (
              <div
                key={p.id}
                className="border rounded-lg shadow-md hover:shadow-xl transition p-5 bg-white"
              >
                <h2 className="text-xl font-bold mb-2">
                  {p.name}
                </h2>

                <p>
                  <strong>Specialty:</strong> {p.specialty}
                </p>

                <p>
                  <strong>Experience:</strong> {p.experience}
                </p>

                <p>
                  <strong>Rating:</strong> {p.rating}
                </p>

                <p>
                  <strong>Salon ID:</strong> {p.salon_id}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Practitioners;