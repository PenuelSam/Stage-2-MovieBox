/* eslint-disable react/prop-types */
import  { useState, useEffect } from "react";
import imdb from "../assets/IMDB.png";
import berry from "../assets/berry.png";
import heart from "../assets/Heart.png"
import { Link } from "react-router-dom";
import Preloader from "./Preloader";



const MovieCard = ({id,  title, image, popularity, genre_ids, date, isLoading,  }) => {
  const [active, setActive] = useState(false)
  
  return (
  <div className="p-4 overflow-x-hidden">  
  {isLoading ? (<Preloader />) :(
    
      
    <div data-testid="movie-card" className="bg-white relative    h-[570px] w-[250px] rounded-lg shadow-lg overflow-hidden">
    <div onClick={() => {
          setActive(!active);
        }} className={active ? 'bg-red-500 cursor-pointer absolute z-50 right-5 top-2 w-6 h-6  flex items-center justify-center rounded-full':`absolute cursor-pointer z-50 right-5 top-2 w-6 h-6 bg-gray-200 flex items-center justify-center rounded-full`}>
      <img src={heart} alt=""  />
      </div>
      <Link to={`/movie/${id}`}>
      <img data-testid="movie-poster" src={image} alt={title} className="w-full z-10 object-cover" />
      <div className="p-4">
        <span data-testid="movie-release_date" className="text-[#b6b5b5]">USA,{new Date(date).toUTCString()}</span>
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
          <div>
          </div>
        </div>
      </div>
      </Link>
    </div>
    
  )}
  </div>
)};

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
        setMovies(response.results);
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
    <div className="flex flex-col w-[100%] gap-16 items-center">
    <div className="flex flex-col md:flex-row justify-between w-[90%] my-5">
        <h3 className="text-4xl font-bold">Featured Movies</h3>

        <p className="text-mainRed cursor-pointer">
          See more <span className="font-bold">{">"}</span>
        </p>
      </div>
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
          date={movie.release_date}
          isLoading={isLoading}
          
        />
      ))}
    </div>
    </div>
  );
}

export default Hero;