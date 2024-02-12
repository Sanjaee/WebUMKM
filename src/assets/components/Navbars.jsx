import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "boxicons";
import api from "../../utils/api"; // Import your API module

const Navbars = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    try {
      // Perform search using API call
      const data = await api.getItems();
      const filteredResults = data.filter((item) =>
        item.nama_product.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(filteredResults);
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleResultClick = (result) => {
    // Perform an action when a search result is clicked
    // For example, navigate to a product page based on the clicked result
    console.log("Clicked result:", result);
    // Add your navigation logic here
    // For demonstration purposes, I'm just clearing the search input and hiding the results.
    setSearchQuery("");
    setShowResults(false);
  };

  // Hide results when clicking outside the search input
  useEffect(() => {
    const handleClickOutside = () => {
      if (searchResults.length > 0) {
        setShowResults(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchResults]);

  return (
    <div className="w-full  flex justify-between items-center  h-20 border px-3 fixed bg-white top-0 z-50 shadow-sm sm:h-[120px]">
      {/* mobile */}
      <div className="flex relative">
        <svg
          className="mr-2 absolute top-1 pl-2"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="var(--NN500, #8D96AA)"
        >
          <path d="M20.53 19.46l-4.4-4.4a7.33 7.33 0 10-1.07 1.06l4.41 4.41a.77.77 0 001.06 0 .77.77 0 000-1.07zm-15.78-9a5.75 5.75 0 115.75 5.75 5.76 5.76 0 01-5.75-5.72v-.03z"></path>
        </svg>
        <input
          className="border focus:border-none focus:outline-none focus:ring p-1 rounded-lg pl-8"
          type="text"
          placeholder="Cari di Tokopedia"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        {/* Display search results */}
        {showResults && (
          <div className="absolute top-full left-0 w-full bg-white border border-t-0 rounded-b-lg">
            {searchResults.map((result) => (
              <div key={result._id} onClick={() => handleResultClick(result)}>
                <Link to={`/products/${result._id}`}>
                  <div className="p-2 cursor-pointer hover:bg-gray-100">
                    {result.nama_product}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center">
        <Link to="/notification" className="mr-3">
          <div className="relative">
            <p className="absolute top-0 right-0 text-xs text-white bg-red-500 rounded-full w-4 h-4 flex justify-center items-center">
              1
            </p>
            <box-icon name="bell"></box-icon>
          </div>
        </Link>
        <Link to="/cart" className="mr-3">
          <box-icon name="cart"></box-icon>
        </Link>
        <button>
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="var(--NN900, #2E3137)"
          >
            <path d="M5 6.75h14a.75.75 0 1 0 0-1.5H5a.75.75 0 0 0 0 1.5Zm14 4.5H5a.75.75 0 1 0 0 1.5h14a.75.75 0 1 0 0-1.5Zm-14 6h14a.75.75 0 1 1 0 1.5H5a.75.75 0 1 1 0-1.5Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbars;
