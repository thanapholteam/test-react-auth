import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[600px] flex flex-col justify-center items-center gap-4">
      <h1 className="text-4xl text-center font-bold text-gray-700">Page Not Found</h1>
      <div className="text-center">
        <Link to="/" className="block text-lg bg-blue-600 px-10 py-1 text-white hover:bg-blue-700 rounded-md">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
