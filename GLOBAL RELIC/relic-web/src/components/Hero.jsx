import { setGlobalState, useGlobalState } from '../store'

const Hero = () => {
  const [ stats ] = useGlobalState('stats')

  const scrollToProjects = () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })
  }


  return (
    <div className="text-center bg-white text-gray-800 py-24 px-6">
      <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
        <span className="text-red-600">Global Relic</span>
        <br />
        <span className="capitalize">Democratizing access to Funding</span>
      </h1>
      <button
        className="inline-block px-7 py-3 bg-transparent text-red-600 font-medium text-sm
                      leading-snug uppercase hover:text-red-700 hover:bg-gray-100
                      focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200
                      transition duration-150 ease-in-out rounded-full"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      onClick={() => setGlobalState('modal', 'scale-100')}
      >
        Create a Campaign
      </button>
      <button
        className="inline-block px-7 py-3 bg-transparent text-red-600 font-medium text-sm
        leading-snug uppercase hover:text-red-700 hover:bg-gray-100
        focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200
        transition duration-150 ease-in-out rounded-full"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        onClick={scrollToProjects}
      >
       Contribute to a Campaign
      </button>
      <div className="flex justify-center items-center mt-10">
        <div className="flex flex-col justify-center items-center h-20 border border-gray-200 shadow-md w-full">
          <span className="text-lg font-bold text-red-900 leading-5">
          {/* {stats.totalProjects} */}
          </span>
          <span>Campaigns</span>
        </div>
        <div className="flex flex-col justify-center items-center h-20 border border-gray-200 shadow-md w-full">
          <span className="text-lg font-bold text-red-900 leading-5">
          {/* {stats.totalContributions} */}
          </span>
          <span>Contributions</span>
        </div>
        <div className="flex flex-col justify-center items-center h-20 border border-gray-200 shadow-md w-full">
          <span className="text-lg font-bold text-red-900 leading-5">
           {/* {stats.totalDonations} Celo */}
          </span>
          <span>Amount Donated</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
