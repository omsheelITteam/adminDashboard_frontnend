import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../Context/AppContext";

const DailyPulseTable = () => {
  const [dailyPulse, setDailypulse] = useState([]);
  const { backendURL } = useContext(AppContext);

  // fetch function
  const fetchDailyPulse = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/news/get-daily-pulse`);
      if (data.success) {
        setDailypulse(data.res);
        // console.log("Daily Pulse:", data.res);
      } else {
        console.log("No Daily Pulse available");
      }
    } catch (err) {
      console.error("Failed to fetch daily pulse", err);
    }
  };

  // call fetch on mount
  useEffect(() => {
    fetchDailyPulse();
  }, []);

  return (
    <div className="p-4 sm:p-6 w-full">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-center sm:text-left">
        Daily Pulse
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 sm:p-3">No</th>
              <th className="border p-2 sm:p-3">Title</th>
              <th className="border p-2 sm:p-3">Description</th>
              <th className="border p-2 sm:p-3">Date</th>
              <th className="border p-2 sm:p-3">Images</th>
            </tr>
          </thead>
          <tbody>
            {dailyPulse.map((pulse, i) => (
              <tr
                key={i}
                className="text-center hover:bg-gray-50 transition-colors"
              >
                <td className="border p-2 sm:p-3">{i + 1}</td>
                <td className="border p-2 sm:p-3 break-words">{pulse.title}</td>
                <td className="border p-2 sm:p-3 break-words">
                  {pulse.description}
                </td>
                <td className="border p-2 sm:p-3 whitespace-nowrap">
                  {new Date(pulse.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="border p-2 sm:p-3">
                  <div className="w-full flex items-center justify-center">
                    <img
                      src={pulse.images[0]}
                      alt="dailyPulseImage"
                      className="w-full max-w-[120px] h-auto aspect-square object-cover rounded-md"
                    />
                  </div>


                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyPulseTable;
