
// import React, { useContext, useEffect, useState } from "react";
// import { useParams, Link, useLocation } from "react-router-dom";
// import axios from "axios";
// import { convert } from "html-to-text";
// import SharesButton from "./ShareButton";
// import { AppContext } from "../Context/AppContext";
// import Admindashboard from "../Pages/AdminDashboard/AdminDashboard";
// import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// const NewsViewPage = () => {
//   const { userData, role, backendURL } = useContext(AppContext);
//   const { news_id } = useParams();
//   const [news, setNews] = useState(null);
//   const [isSharing, setIsSharing] = useState(false);
//   const location = useLocation();
//   const [loading, setLoading] = useState(false);


//   const isWriter = role === "writer";

//   // Detect share mode
//   const urlParams = new URLSearchParams(location.search);
//   const isShareMode =
//     urlParams.get("share") === "true" ||
//     urlParams.get("shared") === "true" ||
//     location.pathname.includes("/share/") ||
//     window.location.href.includes("share=true") ||
//     window.location.href.includes("shared=true");

//   // Fetch news by ID
//   useEffect(() => {
//     if (!news_id) {
//       console.warn("No news_id found in URL params");
//       return;
//     }

//     const fetchNews = async () => {
//     //   const url = `${backendURL}/api/admin/admin-news/${news_id}`;

//       try {
//         const { data } = await axios.get(`${backendURL}/api/admin/admin-news/${news_id}`, { withCredentials: true },
        
//         );
//         if (data.success) {
//           setNews(data.news);
//         } else {
//           console.warn("News fetch failed:", data.message);
//           setNews(null);
//         }
//       } catch (error) {
//         console.error("Axios error:", error.response?.data || error.message);
//         setNews(null);
//       }
//     };

//     fetchNews();
//   }, [news_id, backendURL]);

//   // Detect share link
//   useEffect(() => {
//     if (
//       window.location.search.includes("share") ||
//       window.location.search.includes("shared") ||
//       window.location.hash.includes("share")
//     ) {
//       setIsSharing(true);
//     }
//   }, []);

//   const handleShareStart = () => setIsSharing(true);
//   const handleShareEnd = () => setIsSharing(false);

//   const hideBackButton = isShareMode || isSharing;

//   if (!news) {
//     return (
//       <div className="p-6 text-center">
//         <p className="text-gray-500 mb-4">
//           {news_id ? "Loading news..." : "No news ID provided in URL."}
//         </p>
//         <Admindashboard userInfo={userData} />
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6 md:p-8 mx-64 sm:mx-10 md:mx-20 lg:mx-40 xl:mx-64 bg-white rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
//       {/* Header */}
//       <div className="mb-4 flex justify-between items-center">
//         {!hideBackButton && (
//           <Link
//             to="/dashboard/news"
//             className="text-white underline bg-blue-800 rounded-[30%] p-2"
//           >
//             ← Back
//           </Link>
//         )}

//  {/* { news.status === 'pending' && !hideBackButton && (
//             <>
//               <FaCheckCircle
//                 onClick={() => updateStatus('active')}
//                 className={`w-8 h-8 text-green-600 cursor-pointer hover:scale-110 transition-transform ${
//                   loading ? 'opacity-50 pointer-events-none' : ''
//                 }`}
//                 title="active"
//               />
//               <FaTimesCircle
//                 onClick={() => updateStatus('Deactived')}
//                 className={`w-8 h-8 text-red-600 cursor-pointer hover:scale-110 transition-transform ${
//                   loading ? 'opacity-50 pointer-events-none' : ''
//                 }`}
//                 title="Deactive"
//               />
//             </>
//           )} */}
//         <div className={`flex items-center gap-3 ${hideBackButton ? "ml-auto" : ""}`}>
//           {!hideBackButton && (
//             <SharesButton
//               text={`Check out this news: ${news.title}`}
//               url={`${window.location.origin}${window.location.pathname}?share=true`}
//               onShareStart={handleShareStart}
//               onShareEnd={handleShareEnd}
//             />
//           )}
//         </div>
//       </div>

//       {/* News Content */}
//       <div className="flex flex-col justify-center items-center">
//         <h1 className="text-2xl font-bold mb-2 text-center">{news.title}</h1>

//         {news.imageUrl ? (
//           <img
//             src={news.imageUrl}
//             alt={news.title || "News Image"}
//             className="w-full max-w-md mb-4 rounded object-cover"
//           />
//         ) : (
//           <div className="w-full max-w-md h-64 mb-4 rounded bg-gray-200 flex items-center justify-center">
//             No Image
//           </div>
//         )}

//         <div className="flex flex-wrap gap-4 justify-center">
//           {news.category && (
//             <p className="font-semibold text-xl text-amber-500">
//               {news.category.toUpperCase()}
//             </p>
//           )}
//           {news.createdAt && (
//             <p className="text-gray-500 text-xl">
//               {new Date(news.createdAt).toLocaleDateString()}
//             </p>
//           )}
//           {userData?.writername && (
//             <p className="text-blue-700 font-medium">By {userData.writername}</p>
//           )}
//         </div>
//       </div>

//       <div className="mt-4 text-gray-700 text-justify">
//         {news.description
//           ? convert(news.description, { wordwrap: 130 })
//           : "No description available."}
//       </div>

//       {isWriter && (
//         <div className="mt-6 text-sm text-blue-600">
//           {/* Writer-specific footer */}
//         </div>
//       )}

//        { news.status === 'pending' && !hideBackButton && (
//             <div className="flex justify-end gap-6 ">
//               <FaCheckCircle
//                 onClick={() => updateStatus('Aprrove')}
//                 className={`w-8 h-8 text-green-600 cursor-pointer hover:scale-110 transition-transform ${
//                   loading ? 'opacity-50 pointer-events-none' : ''
//                 }`}
//                 title="Aprrove"
//               />
//               <FaTimesCircle
//                 onClick={() => updateStatus('Reject')}
//                 className={`w-8 h-8 text-red-600 cursor-pointer hover:scale-110 transition-transform ${
//                   loading ? 'opacity-50 pointer-events-none' : ''
//                 }`}
//                 title="Reject"
//               />
//             </div>
//           )}
//     </div>
//   );
// };

// export default NewsViewPage;




// import React, { useContext, useEffect, useState } from "react";
// import { useParams, Link, useLocation } from "react-router-dom";
// import axios from "axios";
// import { convert } from "html-to-text";
// import SharesButton from "./ShareButton";
// import { AppContext } from "../Context/AppContext";
// import Admindashboard from "../Pages/AdminDashboard/AdminDashboard";
// import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// const NewsViewPage = () => {
//   const { userData, role, backendURL } = useContext(AppContext);
//   const { news_id } = useParams();
//   const [news, setNews] = useState(null);
//   const [isSharing, setIsSharing] = useState(false);
//   const location = useLocation();
//   const [loading, setLoading] = useState(false);


//   const isWriter = role === "writer";

//   // Detect share mode
//   const urlParams = new URLSearchParams(location.search);
//   const isShareMode =
//     urlParams.get("share") === "true" ||
//     urlParams.get("shared") === "true" ||
//     location.pathname.includes("/share/") ||
//     window.location.href.includes("share=true") ||
//     window.location.href.includes("shared=true");

//   // Fetch news by ID
//   useEffect(() => {
//     if (!news_id) {
//       console.warn("No news_id found in URL params");
//       return;
//     }

//     const fetchNews = async () => {
//     //   const url = `${backendURL}/api/admin/admin-news/${news_id}`;

//       try {
//         const { data } = await axios.get(`${backendURL}/api/admin/admin-news/${news_id}`, { withCredentials: true },
        
//         );
//         if (data.success) {
//           setNews(data.news);
//         } else {
//           console.warn("News fetch failed:", data.message);
//           setNews(null);
//         }
//       } catch (error) {
//         console.error("Axios error:", error.response?.data || error.message);
//         setNews(null);
//       }
//     };

//     fetchNews();
//   }, [news_id, backendURL]);

//   // Detect share link
//   useEffect(() => {
//     if (
//       window.location.search.includes("share") ||
//       window.location.search.includes("shared") ||
//       window.location.hash.includes("share")
//     ) {
//       setIsSharing(true);
//     }
//   }, []);

//   const handleShareStart = () => setIsSharing(true);
//   const handleShareEnd = () => setIsSharing(false);

//   // Add the missing updateStatus function
//   const updateStatus = async (status) => {
//     setLoading(true);
//     try {
//       const { data } = await axios.put(
//         `${backendURL}/api/admin/update-news-status/${news_id}`,
//         { status },
//         { withCredentials: true }
//       );
      
//       if (data.success) {
//         setNews(prev => ({ ...prev, status }));
//         alert(`News ${status.toLowerCase()} successfully!`);
//       } else {
//         alert("Failed to update status");
//       }
//     } catch (error) {
//       console.error("Error updating status:", error);
//       alert("Error updating status");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const hideBackButton = isShareMode || isSharing;

//   if (!news) {
//     return (
//       <div className="p-6 text-center">
//         <p className="text-gray-500 mb-4">
//           {news_id ? "Loading news..." : "No news ID provided in URL."}
//         </p>
//         <Admindashboard userInfo={userData} />
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6 md:p-8 mx-64 sm:mx-10 md:mx-20 lg:mx-40 xl:mx-64 bg-white rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
//       {/* Header */}
//       <div className="mb-4 flex justify-between items-center">
//         {!hideBackButton && (
//           <Link
//             to="/dashboard/news"
//             className="text-white underline bg-blue-800 rounded-[30%] p-2"
//           >
//             ← Back
//           </Link>
//         )}

//  {/* { news.status === 'pending' && !hideBackButton && (
//             <>
//               <FaCheckCircle
//                 onClick={() => updateStatus('active')}
//                 className={`w-8 h-8 text-green-600 cursor-pointer hover:scale-110 transition-transform ${
//                   loading ? 'opacity-50 pointer-events-none' : ''
//                 }`}
//                 title="active"
//               />
//               <FaTimesCircle
//                 onClick={() => updateStatus('Deactived')}
//                 className={`w-8 h-8 text-red-600 cursor-pointer hover:scale-110 transition-transform ${
//                   loading ? 'opacity-50 pointer-events-none' : ''
//                 }`}
//                 title="Deactive"
//               />
//             </>
//           )} */}
//         <div className={`flex items-center gap-3 ${hideBackButton ? "ml-auto" : ""}`}>
//           {!hideBackButton && (
//             <SharesButton
//               text={`Check out this news: ${news.title}`}
//               url={`${window.location.origin}${window.location.pathname}?shared=true`}
//               onShareStart={handleShareStart}
//               onShareEnd={handleShareEnd}
//             />
//           )}
//         </div>
//       </div>

//       {/* News Content */}
//       <div className="flex flex-col justify-center items-center">
//         <h1 className="text-2xl font-bold mb-2 text-center">{news.title}</h1>

//         {news.imageUrl ? (
//           <img
//             src={news.imageUrl}
//             alt={news.title || "News Image"}
//             className="w-full max-w-md mb-4 rounded object-cover"
//           />
//         ) : (
//           <div className="w-full max-w-md h-64 mb-4 rounded bg-gray-200 flex items-center justify-center">
//             No Image
//           </div>
//         )}

//         <div className="flex flex-wrap gap-4 justify-center">
//           {news.category && (
//             <p className="font-semibold text-xl text-amber-500">
//               {news.category.toUpperCase()}
//             </p>
//           )}
//           {news.createdAt && (
//             <p className="text-gray-500 text-xl">
//               {new Date(news.createdAt).toLocaleDateString()}
//             </p>
//           )}
//           {news.writername && (
//             <p className="text-blue-700 font-medium">By {news.writername}</p>
//           )}
//         </div>
//       </div>

//       <div className="mt-4 text-gray-700 text-justify">
//         {news.description
//           ? convert(news.description, { wordwrap: 130 })
//           : "No description available."}
//       </div>

//       {isWriter && (
//         <div className="mt-6 text-sm text-blue-600">
//           {/* Writer-specific footer */}
//         </div>
//       )}

//        { news.status === 'pending' && !hideBackButton && (
//             <div className="flex justify-end gap-6 ">
//               <FaCheckCircle
//                 onClick={() => updateStatus('Approve')}
//                 className={`w-8 h-8 text-green-600 cursor-pointer hover:scale-110 transition-transform ${
//                   loading ? 'opacity-50 pointer-events-none' : ''
//                 }`}
//                 title="Approve"
//               />
//               <FaTimesCircle
//                 onClick={() => updateStatus('Reject')}
//                 className={`w-8 h-8 text-red-600 cursor-pointer hover:scale-110 transition-transform ${
//                   loading ? 'opacity-50 pointer-events-none' : ''
//                 }`}
//                 title="Reject"
//               />
//             </div>
//           )}
//     </div>
//   );
// };

// export default NewsViewPage;


import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { convert } from "html-to-text";
import SharesButton from "./ShareButton";
import { AppContext } from "../Context/AppContext";
import Admindashboard from "../Pages/AdminDashboard/AdminDashboard";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Toast } from "primereact/toast";
import toast from "react-hot-toast";

const NewsViewPage = () => {
  const { userData, role, backendURL } = useContext(AppContext);
  const { news_id } = useParams();
  const [news, setNews] = useState(null);
  const [isSharing, setIsSharing] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const isWriter = role === "writer";

  // Detect share mode
  const urlParams = new URLSearchParams(location.search);
  const isShareMode =
    urlParams.get("share") === "true" ||
    urlParams.get("shared") === "true" ||
    location.pathname.includes("/share/") ||
    window.location.href.includes("share=true") ||
    window.location.href.includes("shared=true");

  // Fetch news by ID
  useEffect(() => {
    if (!news_id) {
      console.warn("No news_id found in URL params");
      return;
    }

    const fetchNews = async () => {
      try {
        const { data } = await axios.get(`${backendURL}/api/admin/admin-news/${news_id}`, { withCredentials: true });
        if (data.success) {
          setNews(data.news);
        } else {
          console.warn("News fetch failed:", data.message);
          setNews(null);
        }
      } catch (error) {
        console.error("Axios error:", error.response?.data || error.message);
        setNews(null);
      }
    };

    fetchNews();
  }, [news_id, backendURL]);

  // Detect share link
  useEffect(() => {
    if (
      window.location.search.includes("share") ||
      window.location.search.includes("shared") ||
      window.location.hash.includes("share")
    ) {
      setIsSharing(true);
    }
  }, []);

  const handleShareStart = () => setIsSharing(true);
  const handleShareEnd = () => setIsSharing(false);

  // Add the missing updateStatus function
  const updateStatus = async (status) => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${backendURL}/api/admin/update-news-status/${news_id}`,
        { status },
        { withCredentials: true }
      );
      
      if (data.success) {
        setNews(prev => ({ ...prev, status }));
        toast.success(`News ${status.toLowerCase()} successfully!`);
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.message("Error updating status");
    } finally {
      setLoading(false);
    }
  };

  const hideBackButton = isShareMode || isSharing;

  if (!news) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500 mb-4">
          {news_id ? "Loading news..." : "No news ID provided in URL."}
        </p>
        <Admindashboard userInfo={userData} />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 mx-64 sm:mx-10 md:mx-20 lg:mx-40 xl:mx-64 bg-white rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
      {/* Header */}
      <div className="mb-4 flex justify-between items-center">
        {!hideBackButton && (
          <Link
            to="/dashboard/news"
            className="text-white underline bg-blue-800 rounded-[30%] p-2"
          >
            ← Back
          </Link>
        )}

        <div className={`flex items-center gap-3 ${hideBackButton ? "ml-auto" : ""}`}>
          {!hideBackButton && (
            <SharesButton
              text={`Check out this news: ${news.title}`}
              url={`${window.location.origin}${window.location.pathname}?shared=true`}
              onShareStart={handleShareStart}
              onShareEnd={handleShareEnd}
            />
          )}
        </div>
      </div>

      {/* News Content */}
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-2 text-center">{news.title}</h1>

        {/* Image Section */}
        {news.imageUrl ? (
          <div className="w-full max-w-md mb-4">
            <img
              src={news.imageUrl}
              alt={news.title || "News Image"}
              className="w-full rounded object-cover"
            />
            {/* Source display - only show for pressrelease and sports categories */}
            {(news.category?.toLowerCase().includes("press") || 
              news.category?.toLowerCase() === "sports" || 
              news.category?.toLowerCase() === "pressrelease") && (
              <p className="text-sm text-gray-600 mt-2 text-center italic">
                {news.newssource || news.source || ""}
              </p>
            )}
          </div>
        ) : (
          <div className="w-full max-w-md h-64 mb-4 rounded bg-gray-200 flex items-center justify-center">
            No Image
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center">
          {news.category && (
            <p className="font-semibold text-xl text-amber-500">
              {news.category.toUpperCase()}
            </p>
          )}
          {news.createdAt && (
            <p className="text-gray-500 text-xl">
              {new Date(news.createdAt).toLocaleDateString()}
            </p>
          )}
          {news.writername && (
            <p className="text-blue-700 font-medium">By {news.writername}</p>
          )}
        </div>
      </div>

      <div className="mt-4 text-gray-700 text-justify">
        {news.description
          ? convert(news.description, { wordwrap: 130 })
          : "No description available."}
      </div>

      {isWriter && (
        <div className="mt-6 text-sm text-blue-600">
          {/* Writer-specific footer */}
        </div>
      )}

      {news.status === 'pending' && !hideBackButton && (
        <div className="flex justify-end gap-6 ">
          <FaCheckCircle
            onClick={() => updateStatus('Approved')}
            className={`w-8 h-8 text-green-600 cursor-pointer hover:scale-110 transition-transform ${
              loading ? 'opacity-50 pointer-events-none' : ''
            }`}
            title="Approve"
          />
          <FaTimesCircle
            onClick={() => updateStatus('rejected')}
            className={`w-8 h-8 text-red-600 cursor-pointer hover:scale-110 transition-transform ${
              loading ? 'opacity-50 pointer-events-none' : ''
            }`}
            title="Rejected"
          />
        </div>
      )}
    </div>
  );
};

export default NewsViewPage;