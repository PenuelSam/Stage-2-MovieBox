/* eslint-disable react/prop-types */
import TopRated from '../assets/Group 52.png'
import related from '../assets/related.png'
import showTime from '../assets/showTime.png'
const MovieDescription = ({ movie, genreArr }) => {
    return (
      <div className="container flex   justify-between items-center mx-auto p-4">
            <div className=''>
            <div className="flex justify-start items-start gap-2 text-[#404040] font-[600] flex-col md:flex-row md:items-start -950:px-8">
            
            <p data-testid="movie-title">{movie.title}</p>
            <div className="-950:hidden">•</div>

          
            <p data-testid="movie-release-date">{new Date(movie.release_date).toUTCString()}</p>
            <div className="-950:hidden">•</div>

            
            <p data-testid="movie-runtime">{movie.runtime}mins</p>

            
            <div className="text-mainRed text-sm font-bold flex gap-4 flex-wrap">
              {genreArr.map((genre) => (
                <p key={genre.id} className="border-[1px] border-[#F8E7EB] rounded-[20px] p-2">
                  {genre.name}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 md:w-[50%] w-[100%]">
              <p data-testid="movie-overview">{movie.overview}</p>

              <p>
                Director:{" "}
                <span className="text-mainRed">Lorem</span>
              </p>

              <p>
                Writers:{" "}
                <span className="text-mainRed">Lorem</span>
              </p>

              <p>
                Stars:{" "}
                <span className="text-mainRed">Lorem</span>
              </p>

              
              <div>
                <img src={TopRated} alt="" className='w-[100%]' />
              </div>
            </div>
            </div>
            <div className=' hidden md:block absolute right-[-5%] '>
                <div>
                <img src={showTime} alt="" className='my-5 w-[70%]'  />
                </div>
                <div>
                  
                  <img src={related} alt="" className='my-5 w-[70%]' />
                </div>
            </div>
      </div>
    );
  };
  
  export default MovieDescription;