import { useState, useEffect } from "react";
// import { fetchShows } from "../../services/api";
import CarouselSlide from "../../components/Carousel/Carousel";
import "./Home.css";
import { Link } from "react-router-dom";


const genreMapping = {
  1: "Personal Growth",
  2: "True Crime and Investigative Journalism",
  3: "History",
  4: "Comedy",
  5: "Entertainment",
  6: "Business",
  7: "Fiction",
  8: "News",
  9: "Kids and Family",
};

function Home() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://podcast-api.netlify.app/shows");
        const data = await response.json();
        setPodcasts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + " ...";
    }
    return description;
  };

  return (
    <>
      <CarouselSlide />
      <div className="main-container">
        {podcasts.map((show) => (
          <div key={show.id} className="show-card">
            <Link to={`/podcast/${show.id}`}>
              <img src={show.image} alt={show.title} className="show-image" />
              <div className="show-details">
                <h2 className="show-title">{show.title}</h2>
                <p className="show-season">
                  <span className="maindesign">Seasons:</span> {show.seasons}
                </p>
                <p className="show-genre">
                  <span className="maindesign">Genres: </span>
                  {show.genres
                    .map((genreId) => genreMapping[genreId])
                    .join(", ")}
                </p>
                <p className="show-description">
                  <span className="maindesign">Description:</span>
                  {truncateDescription(show.description, 150)}
                </p>
                <p className="show-update">
                  <span className="maindesign">Updated:</span>{" "}
                  {new Date(show.updated).toLocaleDateString("en-GB")}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
