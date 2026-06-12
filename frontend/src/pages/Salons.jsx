import { useEffect, useState } from "react";
import { getSalons } from "../services/salonService";
import Navbar from "../components/Navbar";

function Salons() {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSalons();
  }, []);

  const loadSalons = async () => {
    try {
      const data = await getSalons();

      console.log("Salons Data:", data);

      setSalons(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load salons");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
  return (
    <>
      <Navbar />
      <div className="p-10">
        <h1 className="text-3xl font-bold">
          Loading salons...
        </h1>
      </div>
    </>
  );
}

if (error) {
  return (
    <>
      <Navbar />
      <div className="p-10">
        <h1 className="text-3xl font-bold text-red-500">
          {error}
        </h1>
      </div>
    </>
  );
}

  return (
    <>
        <Navbar />
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Salons
      </h1>

      {salons.length === 0 ? (
        <p>No salons found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salons.map((salon) => (
            <div
              key={salon.id}
              className="border rounded-lg shadow-md hover:shadow-xl transition p-5 bg-white"
            >
              <h2 className="text-xl font-bold mb-3">
                {salon.name}
              </h2>

              {salon.location && (
                <p className="mb-2">
                  <strong>Location:</strong>{" "}
                  {salon.location}
                </p>
              )}

              {salon.description && (
                <p className="mb-2">
                  <strong>Description:</strong>{" "}
                  {salon.description}
                </p>
              )}

              {salon.address && (
                <p className="mb-2">
                  <strong>Address:</strong>{" "}
                  {salon.address}
                </p>
              )}

              {salon.phone && (
                <p className="mb-2">
                  <strong>Phone:</strong>{" "}
                  {salon.phone}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}

export default Salons;