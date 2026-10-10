
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [budget, setBudget] = useState(20000);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/destinations")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load destinations");
        return res.json();
      })
      .then(setPlaces)
      .catch((err) => {
        console.error(err);
        setError("Could not load destinations. Check your backend.");
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = places.filter((p) =>
    (p.name || "").toLowerCase().includes(search.toLowerCase()) &&
    (category === "all" || p.category === category) &&
    Number(p.budget) <= budget
  );

  return (
    <div className="app">
      <header className="navbar">
        <h2>✈ SmartTrip</h2>
        <span>Discover your next adventure</span>
      </header>

      <section className="hero">
        <p className="eyebrow">YOUR JOURNEY STARTS HERE</p>
        <h1>Find your perfect escape.</h1>
        <p>Explore incredible destinations that match your interests and budget.</p>
        <input
          placeholder="Search destinations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <main className="content">
        <div className="filters">
          <div>
            <label htmlFor="category">Travel interest</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All destinations</option>
              <option value="beach">Beach</option>
              <option value="hill">Hill stations</option>
              <option value="nature">Nature</option>
              <option value="mountain">Mountains</option>
              <option value="history">History</option>
            </select>
          </div>

          <div className="budget">
            <label htmlFor="budget">
              Maximum budget: ₹{budget.toLocaleString("en-IN")}
            </label>
            <input
              id="budget"
              type="range"
              min="5000"
              max="20000"
              step="1000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
            />
          </div>
        </div>

        <h2>Explore destinations</h2>
        <p className="muted">
          {loading ? "Loading..." : `${filtered.length} places match your preferences`}
        </p>

        {loading && <p>Loading destinations...</p>}
        {error && <p className="empty">{error}</p>}

        {!loading && !error && (
          <>
            <div className="grid">
              {filtered.map((place) => (
                <article className="card" key={place.id}>
                  <img
                    src={place.image || "https://placehold.co/600x400?text=SmartTrip"}
                    alt={place.name}
                  />
                  <div className="card-body">
                    <span className="tag">{place.category}</span>
                    <h3>{place.name}</h3>
                    <p>{place.description}</p>
                    <div className="card-bottom">
                      <strong>₹{Number(place.budget).toLocaleString("en-IN")}</strong>
                      <span>Estimated budget</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="empty">No destinations found. Try changing your filters.</p>
            )}
          </>
        )}
      </main>

      <footer>Made for explorers ❤️ · SmartTrip</footer>
    </div>
  );
}

export default App;
