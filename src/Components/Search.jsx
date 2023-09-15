import  { useEffect, useState } from "react";
import Preloader from "./Preloader";
import SearchCard from "./SearchCard";

export default function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const searchMovies = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTc5Yzk0ZDBiMDYxNzA2ZTMzNWE0NjZhMWEyZDVkNSIsInN1YiI6IjY0ZmYwZTg3ZWZlYTdhMDEzN2QxYmZhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9IvEzXnOqz4mp2KOOk36OFKHp8MLGjJlPUUJZSkI5Ao",
      },
    };
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=1`,
      searchMovies
    )
      .then((response) => response.json())
      .then((response) => {
        if (searchInput === "") {
             console.log(" ");
        } else if (searchInput !== "") {
          setIsLoading(false);
          return setMovieData(
            response.results.filter((movie) => {
              return movie.poster_path;
            })
          );
        }
      })
      .catch((err) => console.error(err));
  }, [searchInput]);

  function getInput(e) {
    setSearchInput(e.target.value);
  }

  

  const movieCardEls = movieData.slice(0, 10).map((data) => {
    return (
      <SearchCard
        title={data.title}
        path={data.poster_path}
        key={data.id}
        genreId={data.genre_ids}
        date={data.release_date}
        id={data.id}
        rating={data.rating}
        isLoading={isLoading}
      />
    );
  });

  return (
    // Container for Header
    <div className="flex w-[100%] justify-between items-center relative top-10 left-0 px-8 -720:p-2 -720:flex-col -720:items-start -720:gap-4">
      {/* container for logo */}
      <div>
        <img src={logo} className="-720:hidden" alt="" />
        <img src={logoMob} className="-720:block hidden" alt="" />
      </div>

      {/* container for search bar */}
      <div className="relative -720:w-[90%] w-[50%] search-container">
        <input
          className="bg-transparent border-2 border-white px-4 py-2 text-white w-[100%] rounded"
          type="text"
          placeholder="What do you want to watch?"
          onChange={getInput}
        />
        <img
          className="absolute right-2 top-[50%] translate-y-[-50%] cursor-pointer"
          src={search}
          alt=""
        />

        {/* container for search results */}
        {searchInput ? (
          <div className="search-results absolute top-[120%] rounded-lg py-4 w-[100%] bg-white flex flex-col items-center max-h-[50vh] overflow-y-scroll gap-4">
            <p className="text-black text-2xl font-semibold">
              Search results for: {searchInput}
            </p>
            <Preloader  />
            {movieCardEls}
          </div>
        ) : (
          <div></div>
        )}

        {searchInput.length > 2 && movieData.length == 0 ? (
          <div className="absolute top-[120%] rounded-lg w-[100%] bg-white text-black text-3xl p-8 text-center max-h-[40vh] gap-4">
            Movie not found
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div className="flex justify-center items-center text-white gap-4 -720:absolute -720:top-4 -400:top-4  -720:right-4">
        <p>Sign In</p>
        <div className="bg-mainRed w-[40px] h-[40px] p-2 rounded-[50%] flex flex-col justify-center items-center gap-[6px]">
          <div className="w-[90%] rounded-[3px] bg-white h-[3px]"></div>
          <div className="w-[90%] rounded-[3px] bg-white h-[3px]"></div>
        </div>
      </div>
    </div>
  );
}