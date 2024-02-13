import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen">
      <h1 className="text-4xl text-center font-bold">Page Not Found</h1>
      <div className="text-center">
        <Link to="/" className="text-lg text-blue-500 font-bold underline">
          Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
