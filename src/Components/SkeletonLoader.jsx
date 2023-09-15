import spiner from '../assets/ZKZg.gif'

const SkeletonLoader = () => {
    return (
      <div className="animate-pulse flex justify-center items-center bg-gray-300 h-screen w-full">
        <img 
        src={spiner} 
        alt="" 
        width="100"
        height="100" />
      </div>
    );
  };
  
  export default SkeletonLoader;