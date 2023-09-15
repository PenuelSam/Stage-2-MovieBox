import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeaderDetail from './HeaderDetail';
import MovieDescription from './MovieDescription';
import Sidebar from './Sidebar';

const MovieDetail = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [genreArr, setGenreArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  

  useEffect(() => {
    const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmNhYTU2ODEwZjM1Mjk0NTA1MzJkZGJkZDZiYjU4YSIsInN1YiI6IjYzMmNhN2ZmNTU5MzdiMDA3YzA4YWZhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rtnf31SPKvcYQpwzFOFm7X_ORuuShkXNSrSD1OonveQ'; // Replace with your TMDb API key
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    };

    // Fetch movie details including the image URL
    fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data);
        setGenreArr(data.genres);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
      });
  }, [id]);

  console.log(movieDetails);

  return (
    <div className='flex gap-10'>
      {movieDetails && (
        <>
            <Sidebar movie={movieDetails} />
          <div className='flex-1'>
          <HeaderDetail movie={movieDetails} isLoading={isLoading} />
          <MovieDescription movie={movieDetails} genreArr={genreArr} />
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;