import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;
    navigate(`/Search/${encodeURIComponent(trimmedQuery)}`);
    setSearchQuery("");
  };

  return (
    <form
      onSubmit={handleSearch}
      className="hidden md:flex items-center bg-[#F2F2F2] rounded-lg px-2"
    >
      <button type="submit" aria-label="Search" className="p-2">
        <CiSearch className="text-[22px] text-[#757575]" />
      </button>

      <input
        name="q"
        aria-label="Search products"
        type="search"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="text-[16px] py-[12px] px-[8px] text-[#757575] w-full bg-transparent focus:outline-none"
        autoComplete="off"
        maxLength={100}
      />
    </form>
  );
};

export default SearchBar;
