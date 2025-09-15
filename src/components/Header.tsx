import { FaChevronLeft } from "react-icons/fa6";
import StatusBar from "./StatusBar";

function Header() {
  return (
    <header className="flex flex-col h-11 sticky top-0 left-0 w-full z-50 px-6">
      <div>
        <StatusBar />
      </div>
      <div className="flex justify-between items-center">
        {/* Back Button */}
        <button className="flex  justify-center items-center gap-1.5 text-gray-800">
          <div className="text-[22px]">
            <FaChevronLeft />
          </div>
          <div className="text-lg font-sf-pro-display">Back</div>
        </button>

        {/* Title */}
        <h1 className="font-bold text-lg text-gray-900 font-sf-pro-display">
          Dashboard
        </h1>

        {/* Profile Avatar */}
        <img
          src="/s_image.png"
          alt="profile"
          className="w-10 h-10 rounded-full border border-gray-300 object-cover"
        />
      </div>
    </header>
  );
}

export default Header;
