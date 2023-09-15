/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import imdb from "../assets/IMDB.png"
import tomato from "../assets/berry.png"
import Preloader from "./Preloader";

const SearchCard = ({title, path, date, id, rating, isLoading}) => {
    const [genreEls, setGenreEls] = useState([]);

  function getPicUrl(pic_path) {
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${pic_path}`;
  }

  useEffect(() => {
    const genres = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTc5Yzk0ZDBiMDYxNzA2ZTMzNWE0NjZhMWEyZDVkNSIsInN1YiI6IjY0ZmYwZTg3ZWZlYTdhMDEzN2QxYmZhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9IvEzXnOqz4mp2KOOk36OFKHp8MLGjJlPUUJZSkI5Ao",
      },
    };
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", genres)
      .then((response) => response.json())
      .then((response) =>
        setGenreEls((gen) => {
          let test = gen.genreId.map((genre) => {
            let genObj = response.genres.find((genreArrObj) => {
              return genreArrObj.id === genre;
            });

            return genObj.name;
          });

          return test;
        })
      )
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="relative">
      {/* favourties container */}
      <div
        className= 'absolute top-4 right-4 p-2 rounded-[50%] bg-favourite z-[10]'
      >
        <img src="" className="" alt="" />
      </div>

      {isLoading ? (
      <Preloader />
      ) :(
        <Link to={`/movies/${id}`}>
        <div
          data-testid="movie-card"
          className="flex flex-col items-start w-[100%] gap-4 relative"
        >
          {/* movie poster */}
          <div className="w-[100%] relative">
            <img
              data-testid="movie-poster"
              className="w-[100%]"
              src={getPicUrl(path)}
              alt="movie-poster"
            />
            
          </div>

          {/* movie details */}
          <div className="flex flex-col items-start gap-[6px]">
            {/* year of release and region */}
            <div className="text-movieGray">
              Release date:
              <span data-testid="movie-release-date"> {new Date(date).toUTCString()}</span>
            </div>

            {/* movie title */}
            <h3 data-testid="movie-title" className="font-bold">
              {title}
            </h3>

            {/* rating */}
            <div className="flex w-[100%] justify-between">
              {/* imdb rating */}
              <div className="flex gap-[4px] items-center">
                <img src={imdb} className="h-[100%]" alt="" />
                <p className="text-sm">{rating * 10}/100</p>
              </div>

              {/* rotten tomato rating */}
              <div className="flex gap-[4px] items-center">
                <img src={tomato} className="h-[100%]" alt="" />
                <p className="text-sm">{rating * 10}%</p>
              </div>
            </div>

            {/* movie genre */}
            <div className="text-movieGray font-bold">
              {genreEls.join(", ")}
            </div>
          </div>
        </div>
      </Link>
      )}
    </div>
  )
}

export default SearchCard