/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import logo from "../assets/Logo.png";
import menu from "../assets/Menu.png";
import imdb from "../assets/IMDB.png";
import SearchIcon from "@mui/icons-material/Search";
import berry from "../assets/berry.png";
import image from "../assets/Button.png";

const Header1 = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <header className="fixed top-0 right-0 left-0 py-4">
      <div className="container mx-auto flex-col sm:flex-row overflow-x-hidden flex items-center justify-between">
        <img src={logo} alt="MovieBox Logo" className="w-32" />
        <div className="flex relative items-center">
          <input
            type="text"
            placeholder="What do you want to watch?"
            value={query}
            onChange={handleInputChange}
            className=" h-[2rem] w-[10rem] sm:w-[35rem] text-white pl-5 bg-transparent border rounded-md focus:outline-none"
          />
          <SearchIcon
            onClick={handleSearch}
            sx={{ fill: "white" }}
            className="absolute right-2 cursor-pointer"
          />
        </div>
        <div className="">
          <img src={menu} alt="" />
        </div>
      </div>
    </header>
  );
};

const Header = () => {
  const [randomMovie, setRandomMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmNhYTU2ODEwZjM1Mjk0NTA1MzJkZGJkZDZiYjU4YSIsInN1YiI6IjYzMmNhN2ZmNTU5MzdiMDA3YzA4YWZhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rtnf31SPKvcYQpwzFOFm7X_ORuuShkXNSrSD1OonveQ",
      },
    };

    // Fetch a random top-rated movie from the API
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        const randomIndex = Math.floor(Math.random() * response.results.length);
        const randomMovieData = response.results[randomIndex];
        setRandomMovie(randomMovieData);
      })
      .catch((err) => console.error(err));
  }, []);

  const searchMovies = (query) => {
    setSearchQuery(query);
    // Fetch movies based on the search query
    // You can use a similar approach as fetching top-rated movies
  };

  const backgroundImageStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${randomMovie?.backdrop_path})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <header className="h-screen relative" style={backgroundImageStyle}>
      <Header1 onSearch={searchMovies} search={searchQuery} />
      <div className=" h-[285px] absolute left-10 top-52 w-[404px] flex flex-col justify-center items-start text-white">
        <h1 className="text-4xl font-semibold">{randomMovie?.title}</h1>
        <div className="flex items-center gap-10 pt-3">
          <div className="flex items-center justify-center gap-2">
            <div>
              <img src={imdb} alt="" />
            </div>
            <p>{randomMovie?.popularity}</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div>
              <img src={berry} alt="" />
            </div>
            <p>{randomMovie?.genre_ids[1]}%</p>
          </div>
        </div>
        <p className="my-5">{randomMovie?.overview}</p>
        <div>
          <img src={image} alt="" />
        </div>
      </div>
    </header>
  );
};

export default Header;
