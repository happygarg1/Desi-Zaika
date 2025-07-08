import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import heroimage from "@/assets/vid.mp4?url";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchtext, setsearchtext] = useState<string>("");
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen flex items-center justify-center text-white">
      {/* Background Video */}
      <video
        src={heroimage}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50" />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10 text-center">
        <h1 className="font-bold md:font-extrabold md:text-5xl text-4xl">
          Order Food Anytime & Anywhere
        </h1>
        <p className="mt-4 text-lg">
          Welcome to DesiZaika! Where every bite feels like home. Taste the finest flavors in town and experience a dining journey like never before!
        </p>

        {/* Search Bar */}
        <div className="relative flex items-center gap-2 mt-6 max-w-lg mx-auto">
          <Search className="absolute left-3 text-gray-500" />
          <Input
            type="text"
            value={searchtext}
            placeholder="Search restaurant by name, city & country"
            onChange={(e) => setsearchtext(e.target.value)}
            className="pl-10 pr-4 py-2 w-full shadow-lg rounded-md text-black dark:text-white"
          />
          <Button
            onClick={() => navigate(`/search/${searchtext}`)}
            className="border bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md dark:bg-slate-200"
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
