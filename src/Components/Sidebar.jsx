
import home from "../assets/Home.png";
import movies from "../assets/Movie Projector.png";
import tv from "../assets/TV Show.png";
import calender from "../assets/Calendar.png";
import logout from "../assets/Logout.png";
import logo from "../assets/tv.png";

const Sidebar = () => {

  return (
    <>
      

      
      <div
        className=' relative border rounded-br-[40px] hidden md:flex top-0  flex-col items-center py-4 gap-14 w-[50%] left-0 max-w-[250px] -950:absolute -950:shadow-xl -950:bg-white -950:z-[8] min-h-[100vh] -950:pt-[100px] -950:overflow-y-scroll -400:w-[80%]'
      >
        
        <div className="flex items-center justify-start w-[90%] gap-4">
          <img src={logo} alt="" />
          <p className="font-bold text-xl">MovieBox</p>
        </div>

        
        <div className="dashboard-lower items-center flex flex-col gap-6 w-[100%]">
          
          <span className="">
            <img src={home} alt="" />
            <p className="font-bold text-[#666]">Home</p>
          </span>
          <span className="bg-softRed border-r-[4px] border-mainRed">
            <img src={movies} alt="" />
            <p className="font-extrabold text-mainRed">Movies</p>
          </span>
          <span className="">
            <img src={tv} alt="" />
            <p className="font-bold text-[#666]">Tv Series</p>
          </span>
          <span className="">
            <img src={calender} alt="" />
            <p className="font-bold text-[#666]">Upcoming</p>
          </span>

          
          <div className="border-[1px] w-[90%] max-w-[180px] rounded-xl p-4 border-mainRed flex flex-col gap-3">
            <p className="font-[700] text-[#454545]">Play movie quizzes and earn free tickets</p>
            <p className="text-[#666]">50k people are playing now</p>

            <div className="text-mainRed bg-softRed w-[100%] max-w-[140px] rounded-[20px] text-center font-[600] p-2 cursor-pointer">
              Start playing
            </div>
          </div>


          <span>
            <img src={logout} alt="" /> <p>Logout</p>
          </span>
        </div>
      </div>
    </>
  );
}

export default Sidebar