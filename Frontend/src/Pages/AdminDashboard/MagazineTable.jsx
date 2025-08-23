import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../Context/AppContext";
const MagazineTable = () => {
  const [magazines, setMagazines] = useState([]);
  const { backendURL } = useContext(AppContext);
  const fetchMagazines = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/news/get-magazine`);
      setMagazines(data.magazines);
      // console.log(data.magazines)
    } catch (err) {
      console.error("Failed to fetch magazines", err);
    }
  };

  useEffect(() => {
    fetchMagazines();
  }, []);

  return (
    <div className="p-4 sm:p-6 w-full">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-center sm:text-left">
        All Magazines
      </h2>

      {/* Scroll container for small screens */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 sm:p-3">No</th>
              <th className="border p-2 sm:p-3">Title</th>
              <th className="border p-2 sm:p-3">Description</th>
              <th className="border p-2 sm:p-3">Date</th>
              <th className="border p-2 sm:p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {magazines.map((mag, i) => (
              <tr
                key={i}
                className="text-center hover:bg-gray-50 transition-colors"
              >
                <td className="border p-2 sm:p-3">{i + 1}</td>
                <td className="border p-2 sm:p-3 break-words">{mag.title}</td>
                <td className="border p-2 sm:p-3 break-words">
                  {mag.description}
                </td>
                {/* <td className="border p-2 sm:p-3 whitespace-nowrap">{mag.created_at}</td> */}
                <td className="border p-2 sm:p-3 whitespace-nowrap">
                  {new Date(mag.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                <td className="border p-2 sm:p-3 text-center">
                  <a
                    href={`http://localhost:5000${mag.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-1 text-xs sm:text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    View / Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MagazineTable;
