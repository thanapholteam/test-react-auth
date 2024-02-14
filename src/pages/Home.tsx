// import './home.css';

const Home = () => {
  return (
    <div className="flex flex-col justify-between">
      {/* HERO */}
        <div className="flex flex-col items-center p-32">
          <img className="w-[200px] animate-fade-up" src="./images/lock_logo.png"></img>
          <h1 className="text-5xl text-blue-500 font-bold my-5 animate-fade-up animate-delay-500">Authentication Prototype</h1>
          <h2 className="text-lg font-medium text-gray-700">A web application with two-factor authentication service</h2>
        </div>
      {/* BUILT WITH */}
        <div className="text-center">
          <div className="flex flex-col p-10 w-full gap-10 bg-gradient-to-t from-blue-950 to-blue-700">
          <h1 className="text-white font-bold text-3xl animate-fade-up animate-delay-700">Built with</h1>
          <div className="flex justify-center">
            <div className="flex flex-col gap-3 justify-between">
              <div className="animate-fade-up animate-delay-1000">
                <img className="w-[200px] px-2 animate-[spin_30s_linear_infinite]" src="./images/react.png"></img>
              </div>
              <h1 className="text-white font-bold">React(TS)</h1>
            </div>
            <h1 className="text-4xl mx-10 my-auto text-white">+</h1>
            <div className="flex flex-col gap-1 justify-between">
            <div className="animate-fade-up animate-delay-1000">
                <img className="w-[200px] px-3 animate-infinite animate-wiggle" src="./images/nestjs.png"></img>
              </div>
              <h1 className="text-white font-bold">Nest.js</h1>
            </div>
          </div>
          </div>
        </div>
      {/* TEAM */}
      {/* <div className="text-center">Team Kabigon and friends</div> */}
      </div>
  );
};

export default Home;
