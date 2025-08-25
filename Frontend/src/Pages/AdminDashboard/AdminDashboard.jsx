


// import React, { useContext, useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaEye, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import axios from "axios";
// import { AppContext } from "../../Context/AppContext";
// import { convert } from "html-to-text";
// import toast from "react-hot-toast";

// const Admindashboard = () => {
//   const { userData, backendURL } = useContext(AppContext);
//   const [news, setNews] = useState([]);
//   const [allNews, setAllNews] = useState([]);
//   const [parPage, setParPage] = useState(5);
//   const [pages, setPages] = useState(0);
//   const [page, setPage] = useState(1);
//   const [res, setRes] = useState({ id: "", loader: false });
//   const [counts, setCounts] = useState({
//     total: 0,
//     pending: 0,
//     approved: 0,
//     rejected: 0,
//     writer: 0,
//     magazine: 0,
//     dailypulse: 0,
//   });

//   const [writers, setWriters] = useState([]);
//   const [magazine, setMagazines] = useState([]);
//   const [dailypulse, setDailypulse] = useState([]);
//   const navigate = useNavigate();
//   const { pathname } = useLocation();

//   const getAllNews = async () => {
//     try {
//       const { data } = await axios.get(`${backendURL}/api/admin/get-all-writers-news`, {
//         withCredentials: true,
//       });
//       setAllNews(data.news);
//       setNews(data.news);

//       setCounts({
//         total: data.news.length,
//         pending: data.news.filter((n) => n.status.toLowerCase() === "pending").length,
//         approved: data.news.filter((n) => n.status.toLowerCase() === "approved").length,
//         rejected: data.news.filter((n) => n.status.toLowerCase() === "rejected").length,
//         writer: data.news.filter((n) => n.createdByRole === "writer").length,
//         magazine: counts.magazine,
//         dailypulse: counts.dailypulse,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getAllNews();
//   }, []);

//   useEffect(() => {
//     if (news.length > 0) {
//       setPages(Math.ceil(news.length / parPage));
//     }
//   }, [news, parPage]);

//   const searchNewsByTitle = (e) => {
//     const value = e.target.value.toLowerCase();
//     const filtered = allNews.filter((n) => {
//       return (
//         n.title?.toLowerCase().includes(value) ||
//         n.writerName?.toLowerCase().includes(value) ||
//         n.category?.toLowerCase().includes(value) ||
//         n.date?.includes(value)
//       );
//     });
//     setNews(filtered);
//     setPage(1);
//   };

//   const updateStatus = async (status, newsId) => {
//     try {
//       setRes({ id: newsId, loader: true });
//       const { data } = await axios.put(
//         `${backendURL}/api/admin/update-news-status/${newsId}`,
//         { status: status.toLowerCase() },
//         { withCredentials: true }
//       );
//       toast.success(data.message);
//       await getAllNews();
//       setRes({ id: "", loader: false });
//     } catch (error) {
//       setRes({ id: "", loader: false });
//       toast.error(error.response?.data?.message || "Error updating status");
//     }
//   };

//   const getAllWriters = async () => {
//     try {
//       const { data } = await axios.get(`${backendURL}/api/admin/get-all-writers`, {
//         withCredentials: true,
//       });
//       setWriters(data.writers);
//       setCounts((prev) => ({ ...prev, writer: data.writers?.length || 0 }));
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const getAllMagazines = async () => {
//     try {
//       const { data } = await axios.get(`${backendURL}/api/news/get-magazine`, {
//         withCredentials: true,
//       });
//       if (data.success) {
//         setMagazines(data.magazines);
//         setCounts((prev) => ({ ...prev, magazine: data.magazines.length }));
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const getAllDailypulse = async () => {
//     try {
//       const { data } = await axios.get(`${backendURL}/api/news/get-daily-pulse`, {
//         withCredentials: true,
//       });
//       if (data.success) {
//         setDailypulse(data.res[0]);
//         setCounts((prev) => ({ ...prev, dailypulse: data.count }));
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   useEffect(() => {
//     getAllWriters();
//     getAllMagazines();
//     getAllDailypulse();
//   }, []);

//   return (
//     <div className="mt-4 px-2 sm:px-4">
//       {/* Counts */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
//         <div className="w-full p-6 flex flex-col items-center justify-center rounded-md bg-white text-black">
//           <span className="text-xl font-bold">{counts.total}</span>
//           <span className="text-md">Total News</span>
//         </div>
//         <div className="w-full p-6 flex flex-col items-center justify-center rounded-md bg-white text-black">
//           <span className="text-xl font-bold">{counts.pending}</span>
//           <span className="text-md">Pending News</span>
//         </div>
//         <div className="w-full p-6 flex flex-col items-center justify-center rounded-md bg-white text-black">
//           <span className="text-xl font-bold">{counts.approved}</span>
//           <span className="text-md">Approved News</span>
//         </div>
//         <div className="w-full p-6 flex flex-col items-center justify-center rounded-md bg-white text-black">
//           <span className="text-xl font-bold">{counts.rejected}</span>
//           <span className="text-md">Rejected News</span>
//         </div>
//         <div className="w-full p-6 flex flex-col items-center justify-center rounded-md bg-white text-black">
//           <span className="text-xl font-bold">{counts.writer}</span>
//           <span className="text-md">Writers</span>
//         </div>
//         <button
//           onClick={() => navigate("/dashboard/magazineTable")}
//           className={`w-full p-6 flex flex-col items-center justify-center rounded-md bg-white text-black ${pathname === "/dashboard/magazineTable" ? "bg-gray-100 font-semibold" : ""}`}
//         >
//           <span className="text-xl font-bold">{counts.magazine}</span>
//           <span className="text-md">Magazines</span>
//         </button>
//         <button
//           onClick={() => navigate("/dashboard/dailypulseTable")}
//           className={`w-full p-6 flex flex-col items-center justify-center rounded-md bg-white text-black ${pathname === "/dashboard/dailypulseTable" ? "bg-gray-100 font-semibold" : ""}`}
//         >
//           <span className="text-xl font-bold">{counts.dailypulse}</span>
//           <span className="text-md">Daily Pulse</span>
//         </button>
//       </div>

//       {/* Search */}
//       <div className="p-2 sm:p-4 mt-5 bg-white">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4">
//           <input
//             type="text"
//             onChange={searchNewsByTitle}
//             placeholder="Search"
//             className="w-full sm:w-1/3 px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-yellow-500 h-10"
//           />
//         </div>

//         {/* Table */}
//         <div className="relative overflow-x-auto">
//           <table className="min-w-[800px] w-full text-sm text-left text-slate-600">
//             <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3">No</th>
//                 <th className="px-6 py-3">Image</th>
//                 <th className="px-6 py-3">Title</th>
//                 <th className="px-6 py-3">Author</th>
//                 <th className="px-6 py-3">Category</th>
//                 <th className="px-6 py-3">Description</th>
//                 <th className="px-6 py-3">Date</th>
//                 <th className="px-6 py-3">Status</th>
//                 <th className="px-6 py-3">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {news.length > 0 &&
//                 news.slice((page - 1) * parPage, page * parPage).reverse().map((n, i) => (
//                   <tr key={n._id} className="bg-white border-b">
//                     <td className="px-6 p-4">{i + 1 + (page - 1) * parPage}</td>
//                     <td className="px-6 p-4">
//                       <img className="w-[40px] h-[40px]" src={n.imageUrl} alt="news" />
//                     </td>
//                     <td className="px-6 p-4">{n.title.slice(0, 15)}</td>
//                     <td className="px-6 p-4">{n.writerName}</td>
//                     <td className="px-6 p-4">{n.category}</td>
//                     <td className="px-6 p-4">{convert(n.description || "").slice(0, 20)}</td>
//                     <td className="px-4 py-2">{new Date(n.createdAt).toLocaleDateString()}</td>
//                     <td className="px-6 p-4">
//                       <span className={`px-2 py-[2px] rounded-lg text-xs ${
//                         n.status.toLowerCase() === "Approved"
//                           ? "bg-green-100 text-green-800"
//                           : n.status.toLowerCase() === "pending"
//                           ? "bg-blue-100 text-blue-800"
//                           : n.status.toLowerCase() === "rejected"
//                           ? "bg-red-100 text-red-800"
//                           : "bg-gray-100 text-gray-800"
//                       }`}>
//                         {n.status}
//                       </span>
//                     </td>
//                     <td className="px-6 p-4">
//                       <div className="flex items-center gap-x-2">
//                         {n.status.toLowerCase() === "pending" && (
//                           <>
//                             <FaCheckCircle
//                               onClick={() => updateStatus("Approved", n.news_id)}
//                               className={`w-5 h-5 cursor-pointer text-green-600 hover:scale-110 transition-transform ${res.loader && res.id === n.news_id ? "opacity-50 cursor-not-allowed" : ""}`}
//                             />
//                             <FaTimesCircle
//                               onClick={() => updateStatus("rejected", n.news_id)}
//                               className={`w-5 h-5 cursor-pointer text-red-600 hover:scale-110 transition-transform ${res.loader && res.id === n.news_id ? "opacity-50 cursor-not-allowed" : ""}`}
//                             />
//                           </>
//                         )}
//                         <Link
//                           to={`/dashboard/news/view/${n.news_id}`}
//                           className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50 text-white"
//                         >
//                           <FaEye />
//                         </Link>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 sm:px-10 mt-4 text-slate-600">
//           <div className="flex gap-2 items-center">
//             <p className="font-semibold text-sm">News Pages</p>
//             <select
//               value={parPage}
//               onChange={(e) => {
//                 setParPage(parseInt(e.target.value));
//                 setPage(1);
//               }}
//               className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10"
//             >
//               <option value="5">5</option>
//               <option value="10">10</option>
//               <option value="15">15</option>
//               <option value="20">20</option>
//             </select>
//           </div>

//           <p className="font-semibold text-sm">
//             {(page - 1) * parPage + 1}/{news.length} - of {pages}
//           </p>

//           <div className="flex items-center gap-x-3">
//             <IoIosArrowBack
//               onClick={() => page > 1 && setPage(page - 1)}
//               className="w-5 h-5 cursor-pointer"
//             />
//             <IoIosArrowForward
//               onClick={() => page < pages && setPage(page + 1)}
//               className="w-5 h-5 cursor-pointer"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admindashboard;



import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import { AppContext } from "../../Context/AppContext";
import { convert } from "html-to-text";
import toast from "react-hot-toast";

const Admindashboard = () => {
  const { userData, backendURL } = useContext(AppContext);
  const [news, setNews] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [parPage, setParPage] = useState(10);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);
  const [res, setRes] = useState({ id: "", loader: false });
  const [counts, setCounts] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    writer: 0,
    magazine: 0,
    dailypulse: 0,
  });

  const [writers, setWriters] = useState([]);
  const [magazine, setMagazines] = useState([]);
  const [dailypulse, setDailypulse] = useState([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Auto-scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // Get all news sorted by newest first
  const getAllNews = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/admin/get-all-writers-news`, {
        withCredentials: true,
      });

      const sortedNews = data.news.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setAllNews(sortedNews);
      setNews(sortedNews);

      setCounts({
        total: sortedNews.length,
        pending: sortedNews.filter((n) => n.status.toLowerCase() === "pending").length,
        approved: sortedNews.filter((n) => n.status.toLowerCase() === "approved").length,
        rejected: sortedNews.filter((n) => n.status.toLowerCase() === "rejected").length,
        writer: sortedNews.filter((n) => n.createdByRole === "writer").length,
        magazine: counts.magazine,
        dailypulse: counts.dailypulse,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllNews();
  }, []);

  useEffect(() => {
    if (news.length > 0) {
      setPages(Math.ceil(news.length / parPage));
    }
  }, [news, parPage]);

  // Search by title/author/category/date
  const searchNewsByTitle = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = allNews.filter((n) => {
      return (
        n.title?.toLowerCase().includes(value) ||
        n.writerName?.toLowerCase().includes(value) ||
        n.category?.toLowerCase().includes(value) ||
        n.date?.includes(value)
      );
    });
    setNews(filtered);
    setPage(1);
  };

  // Update status
  const updateStatus = async (status, newsId) => {
    try {
      setRes({ id: newsId, loader: true });
      const { data } = await axios.put(
        `${backendURL}/api/admin/update-news-status/${newsId}`,
        { status: status.toLowerCase() },
        { withCredentials: true }
      );
      toast.success(data.message);
      await getAllNews();
      setRes({ id: "", loader: false });
    } catch (error) {
      setRes({ id: "", loader: false });
      toast.error(error.response?.data?.message || "Error updating status");
    }
  };

  // Get writers, magazines, daily pulse counts
  const getAllWriters = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/admin/get-all-writers`, {
        withCredentials: true,
      });
      setWriters(data.writers);
      setCounts((prev) => ({ ...prev, writer: data.writers?.length || 0 }));
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllMagazines = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/news/get-magazine`, {
        withCredentials: true,
      });
      if (data.success) {
        setMagazines(data.magazines);
        setCounts((prev) => ({ ...prev, magazine: data.magazines.length }));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllDailypulse = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/news/get-daily-pulse`, {
        withCredentials: true,
      });
      if (data.success) {
        setDailypulse(data.res[0]);
        setCounts((prev) => ({ ...prev, dailypulse: data.count }));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllWriters();
    getAllMagazines();
    getAllDailypulse();
  }, []);

  return (
    <div className="mt-4 px-2 sm:px-4">
      {/* Counts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
        <div className="w-full p-6 flex flex-col items-center justify-center rounded-md bg-white text-black">
          <span className="text-xl font-bold">{counts.total}</span>
          <span className="text-md">Blogs</span>
        </div>
        <div className="w-full p-6 flex flex-col items-center justify-center rounded-md bg-white text-black">
          <span className="text-xl font-bold">{counts.pending}</span>
          <span className="text-md">Pending Blogs</span>
        </div>
        <div className="w-full p-6 flex flex-col items-center justify-center rounded-md bg-white text-black">
          <span className="text-xl font-bold">{counts.approved}</span>
          <span className="text-md">Approved Blogs</span>
        </div>
        <div className="w-full p-6 flex flex-col items-center justify-center rounded-md bg-white text-black">
          <span className="text-xl font-bold">{counts.rejected}</span>
          <span className="text-md">Rejected Blogs</span>
        </div>
        <div className="w-full p-6 flex flex-col items-center justify-center rounded-md bg-white text-black">
          <span className="text-xl font-bold">{counts.writer}</span>
          <span className="text-md">Contributors</span>
        </div>
        <button
          onClick={() => navigate("/dashboard/magazineTable")}
          className={`w-full p-6 flex flex-col items-center justify-center rounded-md bg-white text-black ${pathname === "/dashboard/magazineTable" ? "bg-gray-100 font-semibold" : ""}`}
        >
          <span className="text-xl font-bold">{counts.magazine}</span>
          <span className="text-md">Magazines</span>
        </button>
        <button
          onClick={() => navigate("/dashboard/dailypulseTable")}
          className={`w-full p-6 flex flex-col items-center justify-center rounded-md bg-white text-black ${pathname === "/dashboard/dailypulseTable" ? "bg-gray-100 font-semibold" : ""}`}
        >
          <span className="text-xl font-bold">{counts.dailypulse}</span>
          <span className="text-md">Daily Pulse</span>
        </button>
      </div>

      {/* Search */}
      <div className="p-2 sm:p-4 mt-5 bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4">
          <input
            type="text"
            onChange={searchNewsByTitle}
            placeholder="Search"
            className="w-full sm:w-1/3 px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-yellow-500 h-10"
          />
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto">
          <table className="min-w-[800px] w-full text-sm text-left text-slate-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">No</th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Author</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {news.length > 0 &&
                news
                  .slice((page - 1) * parPage, page * parPage)
                  .map((n, i) => (
                    <tr key={n._id} className="bg-white border-b">
                      <td className="px-6 p-4">{(page - 1) * parPage + i + 1}</td>
                      <td className="px-6 p-4">
                        <img className="w-[40px] h-[40px]" src={n.imageUrl} alt="news" />
                      </td>
                      <td className="px-6 p-4">{n.title.slice(0, 15)}</td>
                      <td className="px-6 p-4">{n.writername}</td>
                      <td className="px-6 p-4">{n.category}</td>
                      <td className="px-6 p-4">{convert(n.description || "").slice(0, 20)}</td>
                      <td className="px-4 py-2">{new Date(n.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 p-4">
                        <span
                          className={`px-2 py-[2px] rounded-lg text-xs ${
                            n.status.toLowerCase() === "approved"
                              ? "bg-green-100 text-green-800"
                              : n.status.toLowerCase() === "pending"
                              ? "bg-blue-100 text-blue-800"
                              : n.status.toLowerCase() === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {n.status}
                        </span>
                      </td>
                      <td className="px-6 p-4">
                        <div className="flex items-center gap-x-2">
                          {n.status.toLowerCase() === "pending" && (
                            <>
                              <FaCheckCircle
                                onClick={() => updateStatus("approved", n.news_id)}
                                className={`w-5 h-5 cursor-pointer text-green-600 hover:scale-110 transition-transform ${
                                  res.loader && res.id === n.news_id
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }`}
                              />
                              <FaTimesCircle
                                onClick={() => updateStatus("rejected", n.news_id)}
                                className={`w-5 h-5 cursor-pointer text-red-600 hover:scale-110 transition-transform ${
                                  res.loader && res.id === n.news_id
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }`}
                              />
                            </>
                          )}
                          <Link
                            to={`/dashboard/news/view/${n.news_id}`}
                            className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50 text-white"
                          >
                            <FaEye />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 sm:px-10 mt-4 text-slate-600">
          <div className="flex gap-2 items-center">
            <p className="font-semibold text-sm">News per page</p>
            <select
              value={parPage}
              onChange={(e) => {
                setParPage(parseInt(e.target.value));
                setPage(1);
              }}
              className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10"
            >
              {/* <option value="5">5</option> */}
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>

          <p className="font-semibold text-sm">
            {news.length === 0
              ? "0"
              : `${(page - 1) * parPage + 1}-${Math.min(page * parPage, news.length)} of ${
                  news.length
                }`}
          </p>

          <div className="flex items-center gap-x-3">
            <IoIosArrowBack
              onClick={() => page > 1 && setPage(page - 1)}
              className="w-5 h-5 cursor-pointer"
            />
            <IoIosArrowForward
              onClick={() => page < pages && setPage(page + 1)}
              className="w-5 h-5 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;
