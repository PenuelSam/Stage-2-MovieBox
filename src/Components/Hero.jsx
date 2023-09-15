/* eslint-disable react/prop-types */
import  { useState, useEffect } from "react";
import imdb from "../assets/IMDB.png";
import berry from "../assets/berry.png";
import { Link } from "react-router-dom";
import Preloader from "./Preloader";



const MovieCard = ({id,  title, image, popularity, genre_ids, release_date, isLoading }) => (
  <div className="p-4 overflow-x-hidden">  
  {isLoading ? (<Preloader />) :(
    <Link to={`/movie/${id}`}>
    <div data-testid="movie-card" className="bg-white h-[513px] w-[250px] rounded-lg shadow-lg overflow-hidden">
      <img data-testid="movie-poster" src={image} alt={title} className="w-full object-cover" />
      <div className="p-4">
        <span data-testid="movie-release_date" className="text-[#b6b5b5]">USA,{release_date}</span>
        <h3 data-testid="movie-title" className="text-xl font-semibold mb-2">{title}</h3>
        <div className="flex gap-5">
        <div className="flex items-center justify-center gap-2">
            <div>
              <img src={imdb} alt="" />
            </div>
            <p data-testid="movie-popularity">{popularity} / 100</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div>
              <img src={berry} alt="" />
            </div>
            <p data-testid="movie-genre_ids">{genre_ids[0]}%</p>
          </div>
        </div>
      </div>
    </div>
    </Link>
  )}
  </div>
);

const Hero = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmNhYTU2ODEwZjM1Mjk0NTA1MzJkZGJkZDZiYjU4YSIsInN1YiI6IjYzMmNhN2ZmNTU5MzdiMDA3YzA4YWZhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rtnf31SPKvcYQpwzFOFm7X_ORuuShkXNSrSD1OonveQ'
      }
    };

    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
      .then(response => response.json())
      .then(response => {
        setMovies(response.results)
        setTimeout(() => {
          setIsLoading(false);
        }, 2000); 
      })
      .catch(err => console.error(err));
  }, []);

  // Slice the first 10 movies
  const topTenMovies = movies.slice(0, 10);
  console.log('top 10',topTenMovies)

  return (
    <div className="container overflow-x-hidden mx-auto p-4 grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-4 gap-4">
      {topTenMovies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          description={movie.overview}
          popularity={movie.vote_average}
          genre_ids={movie.genre_ids}
          id={movie.id}
          release_date={movie.release_date}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}

export default Hero;