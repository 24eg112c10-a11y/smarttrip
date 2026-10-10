
import { useState } from "react";
import "./App.css";

const trips = [
  {
    id: 1,
    name: "Goa Beach Escape",
    location: "Goa, India",
    category: "Beach",
    budget: 12000,
    days: 3,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1000",
    description: "Enjoy golden beaches, beautiful sunsets, exciting water sports, and Goa's vibrant atmosphere.",
    highlights: ["Baga Beach", "Fort Aguada", "Water sports", "Sunset views"],
    itinerary: [
      "Day 1: Arrival, hotel check-in, and beach visit",
      "Day 2: Explore Fort Aguada and enjoy water sports",
      "Day 3: Shopping, breakfast, and departure",
    ],
  },
  {
    id: 2,
    name: "Ooty Hill Station",
    location: "Ooty, Tamil Nadu",
    category: "Mountains",
    budget: 9000,
    days: 3,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000",
    description: "Relax in the cool mountain air, explore tea gardens, and enjoy scenic hill views.",
    highlights: ["Botanical Garden", "Tea gardens", "Ooty Lake", "Mountain views"],
    itinerary: [
      "Day 1: Arrival and explore Ooty town",
      "Day 2: Tea gardens, Botanical Garden, and Ooty Lake",
      "Day 3: Breakfast, local shopping, and departure",
    ],
  },
  {
    id: 3,
    name: "Kerala Nature Retreat",
    location: "Kerala, India",
    category: "Nature",
    budget: 15000,
    days: 4,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1000",
    description: "Experience lush greenery, peaceful backwaters, scenic landscapes, and local cuisine.",
    highlights: ["Alleppey backwaters", "Munnar", "Tea plantations", "Local food"],
    itinerary: [
      "Day 1: Arrive and explore the local area",
      "Day 2: Visit tea plantations and scenic viewpoints",
      "Day 3: Enjoy a backwater experience",
      "Day 4: Breakfast and departure",
    ],
  },
  {
    id: 4,
    name: "Manali Adventure",
    location: "Manali, Himachal Pradesh",
    category: "Adventure",
    budget: 18000,
    days: 4,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1000",
    description: "Discover mountain scenery, charming villages, and exciting outdoor adventures.",
    highlights: ["Solang Valley", "Hadimba Temple", "Mountain views", "Local market"],
    itinerary: [
      "Day 1: Arrival and local sightseeing",
      "Day 2: Solang Valley excursion",
      "Day 3: Visit Hadimba Temple and the local market",
      "Day 4: Breakfast and departure",
    ],
  },
  {
    id: 5,
    name: "Jaipur Heritage Tour",
    location: "Jaipur, Rajasthan",
    category: "Culture",
    budget: 10000,
    days: 3,
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=1000",
    description: "Explore royal forts, colorful markets, historic architecture, and traditional Rajasthani food.",
    highlights: ["Hawa Mahal", "Amber Fort", "City Palace", "Local markets"],
    itinerary: [
      "Day 1: Arrival and visit Hawa Mahal",
      "Day 2: Explore Amber Fort and City Palace",
      "Day 3: Shopping and departure",
    ],
  },
];

const categories = [
  "All",
  "Beach",
  "Mountains",
  "Nature",
  "Adventure",
  "Culture",
];

const tourDayOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14];

function formatPrice(price) {
  return `₹${price.toLocaleString("en-IN")}`;
}

export default function App() {
  const [page, setPage] = useState("trips");
  const [selectedTrip, setSelectedTrip] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [tourDays, setTourDays] = useState(3);
  const [travelers, setTravelers] = useState(1);
  const [travelDate, setTravelDate] = useState("");
  const [travelerName, setTravelerName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const filteredTrips = trips.filter((trip) => {
    const query = search.trim().toLowerCase();

    const matchesSearch =
      trip.name.toLowerCase().includes(query) ||
      trip.location.toLowerCase().includes(query) ||
      trip.category.toLowerCase().includes(query) ||
      trip.description.toLowerCase().includes(query) ||
      trip.highlights.some((item) =>
        item.toLowerCase().includes(query)
      );

    const matchesCategory =
      category === "All" || trip.category === category;

    return matchesSearch && matchesCategory;
  });

  function goToPage(nextPage) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openTrip(trip) {
    setSelectedTrip(trip);
    setTourDays(trip.days);
    setTravelers(1);
    setConfirmation("");
    goToPage("details");
  }

  function startBooking() {
    setConfirmation("");
    goToPage("booking");
  }

  function submitBooking(event) {
    event.preventDefault();

    const code =
      "ST" + Math.random().toString(36).slice(2, 8).toUpperCase();

    setConfirmation(
      `Demo booking successful! Reference: ${code}.`
    );

    goToPage("confirmation");
  }

  function resetSearch() {
    setSearch("");
    setCategory("All");
  }

  const dailyBudget = selectedTrip
    ? selectedTrip.budget / selectedTrip.days
    : 0;

  const totalPrice = selectedTrip
    ? Math.round(dailyBudget * tourDays * travelers)
    : 0;

  const estimatedPerTraveler = selectedTrip
    ? Math.round(dailyBudget * tourDays)
    : 0;

  return (
    <div className="app">
      <header className="navbar">
        <button
          className="brand"
          onClick={() => goToPage("trips")}
        >
          ✈ SmartTrip
        </button>

        <button
          className="nav-link"
          onClick={() => goToPage("trips")}
        >
          Explore Trips
        </button>
      </header>

      <main className="container">
        {/* TRIPS AND SEARCH PAGE */}
        {page === "trips" && (
          <>
            <section className="hero">
              <p className="eyebrow">
                YOUR NEXT ADVENTURE STARTS HERE
              </p>

              <h1>Find your perfect getaway.</h1>

              <p>
                Discover amazing destinations and plan your next journey.
              </p>

              <button
                className="hero-button"
                onClick={() =>
                  document
                    .getElementById("destination-search")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Destinations ↓
              </button>
            </section>

            <section
              className="search-section"
              id="destination-search"
            >
              <h2>Find Your Destination</h2>

              <p>
                Search by destination, location, attraction, or trip type.
              </p>

              <form
                className="search-bar"
                onSubmit={(event) => event.preventDefault()}
              >
                <span className="search-icon">🔎</span>

                <input
                  type="search"
                  placeholder="Search Goa, Ooty, Kerala, beaches..."
                  aria-label="Search destinations"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                />

                {search && (
                  <button
                    type="button"
                    className="clear-search"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}

                <button type="submit" className="search-button">
                  Search
                </button>
              </form>

              <div className="category-filters">
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={
                      category === item ? "filter-active" : ""
                    }
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </section>

            <section className="results-section">
              <div className="results-heading">
                <div>
                  <h2>
                    {search.trim() || category !== "All"
                      ? "Search Results"
                      : "Popular Trips"}
                  </h2>

                  <p>
                    {filteredTrips.length}{" "}
                    {filteredTrips.length === 1 ? "trip" : "trips"} found
                  </p>
                </div>

                {(search || category !== "All") && (
                  <button
                    className="reset-button"
                    onClick={resetSearch}
                  >
                    Clear Filters
                  </button>
                )}
              </div>

              {filteredTrips.length > 0 ? (
                <div className="trip-grid">
                  {filteredTrips.map((trip) => (
                    <article className="trip-card" key={trip.id}>
                      <div className="trip-image-wrap">
                        <img
                          src={trip.image}
                          alt={trip.name}
                          loading="lazy"
                        />

                        <span className="image-category">
                          {trip.category}
                        </span>
                      </div>

                      <div className="trip-card-content">
                        <h3>{trip.name}</h3>

                        <p className="trip-location">
                          📍 {trip.location}
                        </p>

                        <p className="trip-duration">
                          🗓 {trip.days} days
                        </p>

                        <p className="trip-description">
                          {trip.description}
                        </p>

                        <div className="trip-card-bottom">
                          <div>
                            <small>From</small>
                            <strong>{formatPrice(trip.budget)}</strong>
                            <small>per traveler</small>
                          </div>

                          <button onClick={() => openTrip(trip)}>
                            View Trip →
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <div className="no-results-icon">🔍</div>

                  <h3>No destinations found</h3>

                  <p>
                    Try another place or select a different category.
                    You can search Goa, Ooty, Kerala, Manali, or Jaipur.
                  </p>

                  <button
                    className="primary-button"
                    onClick={resetSearch}
                  >
                    Show All Trips
                  </button>
                </div>
              )}
            </section>
          </>
        )}

        {/* TRIP DETAILS PAGE */}
        {page === "details" && selectedTrip && (
          <section className="details-page">
            <button
              className="back-button"
              onClick={() => goToPage("trips")}
            >
              ← Back to trips
            </button>

            <div className="details-hero">
              <img
                className="details-image"
                src={selectedTrip.image}
                alt={selectedTrip.name}
              />

              <div className="details-title">
                <span className="category">
                  {selectedTrip.category}
                </span>

                <h1>{selectedTrip.name}</h1>

                <p className="location">
                  📍 {selectedTrip.location}
                </p>

                <p className="description">
                  {selectedTrip.description}
                </p>
              </div>
            </div>

            <div className="info-grid">
              <div className="info-box">
                <span>Duration</span>
                <strong>{selectedTrip.days} days</strong>
              </div>

              <div className="info-box">
                <span>Estimated budget</span>
                <strong>{formatPrice(selectedTrip.budget)}</strong>
              </div>

              <div className="info-box">
                <span>Trip type</span>
                <strong>{selectedTrip.category}</strong>
              </div>
            </div>

            <div className="details-section">
              <h2>Trip Highlights</h2>

              <ul className="highlights">
                {selectedTrip.highlights.map((item) => (
                  <li key={item}>✓ {item}</li>
                ))}
              </ul>
            </div>

            <div className="details-section">
              <h2>Day-by-Day Itinerary</h2>

              <div className="itinerary">
                {selectedTrip.itinerary.map((item, index) => (
                  <div className="itinerary-item" key={item}>
                    <span className="day-number">
                      Day {index + 1}
                    </span>

                    <p>{item.replace(/^Day \d+:\s*/, "")}</p>
                  </div>
                ))}
              </div>

              <p className="demo-note">
                The itinerary above shows the standard trip plan.
                Your selected duration can be changed when booking.
              </p>
            </div>

            <div className="booking-bar">
              <div>
                <span>Estimated budget</span>
                <h2>{formatPrice(selectedTrip.budget)}</h2>
                <small>Per traveler · Standard trip duration</small>
              </div>

              <button
                className="primary-button"
                onClick={startBooking}
              >
                Book This Trip →
              </button>
            </div>
          </section>
        )}

        {/* BOOKING PAGE */}
        {page === "booking" && selectedTrip && (
          <section className="form-page">
            <button
              className="back-button"
              onClick={() => goToPage("details")}
            >
              ← Back to trip details
            </button>

            <div className="page-heading">
              <p className="eyebrow">YOUR JOURNEY STARTS HERE</p>

              <h1>Book Your Trip</h1>

              <p>
                Fill in your details for {selectedTrip.name}.
              </p>
            </div>

            <div className="selected-summary">
              <img
                src={selectedTrip.image}
                alt={selectedTrip.name}
              />

              <div>
                <span className="category">
                  {selectedTrip.category}
                </span>

                <h3>{selectedTrip.name}</h3>

                <p>
                  {tourDays} {tourDays === 1 ? "day" : "days"} ·{" "}
                  {selectedTrip.location}
                </p>

                <strong>
                  {formatPrice(estimatedPerTraveler)} per traveler
                </strong>
              </div>
            </div>

            <form
              className="booking-form"
              onSubmit={submitBooking}
            >
              <label>
                Lead traveler full name

                <input
                  type="text"
                  value={travelerName}
                  onChange={(event) =>
                    setTravelerName(event.target.value)
                  }
                  required
                  minLength={2}
                  placeholder="Enter full name"
                />
              </label>

              <label>
                Email address

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  placeholder="you@example.com"
                />
              </label>

              {/* NEW: SELECT TOUR DURATION */}
              <label>
                Number of tour days

                <select
                  value={tourDays}
                  onChange={(event) =>
                    setTourDays(Number(event.target.value))
                  }
                  required
                >
                  {tourDayOptions.map((day) => (
                    <option key={day} value={day}>
                      {day} {day === 1 ? "day" : "days"}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Travel date

                <input
                  type="date"
                  value={travelDate}
                  onChange={(event) =>
                    setTravelDate(event.target.value)
                  }
                  min={new Date().toLocaleDateString("en-CA")}
                  required
                />
              </label>

              <label>
                Number of travelers

                <select
                  value={travelers}
                  onChange={(event) =>
                    setTravelers(Number(event.target.value))
                  }
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "traveler" : "travelers"}
                    </option>
                  ))}
                </select>
              </label>

              <div className="total-box">
                <div>
                  <span>Estimated total</span>

                  <small>
                    {formatPrice(estimatedPerTraveler)} per traveler
                    {" × "}{travelers}
                  </small>
                </div>

                <strong>{formatPrice(totalPrice)}</strong>
              </div>

              <button
                className="primary-button full-button"
                type="submit"
              >
                Confirm Demo Booking
              </button>

              <p className="demo-note">
                This is a frontend demo. No real reservation,
                email, or payment is processed.
              </p>
            </form>
          </section>
        )}

        {/* CONFIRMATION PAGE */}
        {page === "confirmation" && selectedTrip && (
          <section className="confirmation-page">
            <div className="success-icon">✓</div>

            <p className="eyebrow">SMARTTRIP BOOKING</p>

            <h1>You're all set!</h1>

            <p className="confirmation-message">
              {confirmation}
            </p>

            <p className="confirmation-subtitle">
              Here is your demo booking summary.
            </p>

            <div className="selected-summary confirmation-summary">
              <img
                src={selectedTrip.image}
                alt={selectedTrip.name}
              />

              <div>
                <h3>{selectedTrip.name}</h3>

                <p>📍 {selectedTrip.location}</p>

                <p>
                  Tour duration: {tourDays}{" "}
                  {tourDays === 1 ? "day" : "days"}
                </p>

                <p>Travel date: {travelDate}</p>

                <p>Lead traveler: {travelerName}</p>

                <p>Email: {email}</p>

                <p>
                  Travelers: {travelers}
                </p>

                <strong>
                  Estimated total: {formatPrice(totalPrice)}
                </strong>
              </div>
            </div>

            <button
              className="primary-button"
              onClick={() => {
                resetSearch();
                goToPage("trips");
              }}
            >
              Explore More Trips
            </button>
          </section>
        )}
      </main>

      <footer className="footer">
        <p>
          © 2026 SmartTrip · Discover somewhere wonderful.
        </p>

        <small>Explore more. Worry less. Travel happy.</small>
      </footer>
    </div>
  );
}
