import SkeletonLoader from "./SkeletonLoader";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

/* eslint-disable react/prop-types */
const HeaderDetail = ({ movie, isLoading }) => {
    return (
      <>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <header
        data-testid="movie-poster"
        className="relative h-96 bg-cover bg-center rounded-lg"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 flex items-center  justify-center">
          <PlayCircleIcon sx={{fill: 'white', fontSize: '5rem'}}/>
        </div>
      </header>
      )}
      </>
    );
  };
  
  export default HeaderDetail;