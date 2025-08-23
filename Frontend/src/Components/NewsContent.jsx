// import React, { useContext, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
// import { FaEye, FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import axios from 'axios';
// // import StoreContext from '../Context/StoreContext.js';
// import { AppContext } from '../Context/AppContext';
// import { convert } from "html-to-text";
// import toast from "react-hot-toast";

// const NewsContent = () => {
//   const { store } = useContext(AppContext);
//   const [news, setNews] = useState([]);
//   const [allNews, setAllNews] = useState([]);
//   const [parPage, setParPage] = useState(10);
//   const [pages, setPages] = useState(0);
//   const [page, setPage] = useState(1);
//   const { backendURL } = useContext(AppContext);

//   const get_news = async () => {
//     try {
//       const { data } = await axios.get(`${backendURL}/api/admin/get-all-writers-news`, {
//        withCredentials: true,
//       });
//       setAllNews(data.news);
//       setNews(data.news);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     get_news();
//   }, []);

//   useEffect(() => {
//     if (news.length > 0) {
//       const calculate_page = Math.ceil(news.length / parPage);
//       setPages(calculate_page);
//     }
//   }, [news, parPage]);

//   const type_filter = (e) => {
//     if (e.target.value === "") {
//       setNews(allNews);
//       setPage(1);
//       setParPage(10);
//     } else {
//       const tempNews = allNews.filter(n => n.status === e.target.value);
//       setNews(tempNews);
//       setPage(1);
//       setParPage(10);
//     }
//   };

//   const search_news = (e) => {
//     const tempNews = allNews.filter(n => n.title.toLowerCase().includes(e.target.value.toLowerCase()));
//     setNews(tempNews);
//     setPage(1);
//     setParPage(10);
//   };

//   const [res, set_res] = useState({ id: "", loader: false });

//   const update_status = async (status, news_id) => {
//     try {
//       set_res({ id: news_id, loader: true });

//       const { data } = await axios.put(`${backendURL}/api/admin/update-news-status/${news_id}`, { status }, {
//         withCredentials: true,
//       });

//       set_res({ id: "", loader: false });
//       toast.success(data.message);
//       console.log(data)
//       get_news();
//     } catch (error) {
//       set_res({ id: "", loader: false });
//       toast.error(error.response?.data?.message || "Error updating status");
//     }
//   };
 

//   return (
//     <div>
//       <div className="px-4 py-1 flex flex-col sm:flex-row gap-2 sm:gap-x-2">
//         <select
//           onChange={type_filter}
//           className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10 p-4 w-full sm:w-auto"
//         >
//           <option value="">----select type----</option>
//           <option value="pending">Pending</option>
//           <option value="Approved">Approved</option>
//           <option value="rejected">Rejected</option>
//         </select>
//         <input
//           type="text"
//           onChange={search_news}
//           placeholder="Search News"
//           className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10 w-full sm:w-auto"
//         />
//       </div>

//       {/* Responsive horizontal scroll wrapper */}
//       <div className="relative overflow-x-auto p-4">
//         <table className="w-full text-sm text-left text-slate-600 min-w-[700px] sm:min-w-full">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//             <tr>
//               <th className="px-7 py-3">No</th>
//               <th className="px-7 py-3">Title</th>
//               <th className="px-7 py-3">Image</th>
//               <th className="px-7 py-3">Category</th>
//               <th className="px-7 py-3">Description</th>
//               <th className="px-7 py-3">Date</th>
//               <th className="px-7 py-3">Status</th>
//               <th className="px-7 py-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {news.length > 0 && news.slice((page - 1) * parPage, page * parPage).reverse().map((n, i) => (
//               <tr key={n._id} className="bg-white border-b">
//                 <td className="px-6 p-4">{i + 1}</td>
//                 <td className="px-6 p-4">{n.title.slice(0, 15)}</td>
//                 <td className="px-6 p-4"><img className="w-[40px] h-[40px]" src={n.imageUrl} alt="news" /></td>
//                 <td className="px-6 p-4">{n.category}</td>
//                 <td className="px-6 p-4">{convert(n.description).slice(0, 15)}</td>
//                 <td className="px-4 py-2">{new Date(n.createdAt).toLocaleDateString()}</td>
                

//                 <td className="px-6 p-4">
//                   <span className={`px-2 py-[2px] rounded-lg text-xs ${n.status === "pending" ? "bg-blue-100 text-blue-800" : n.status === "Approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
//                     {n.status}
//                   </span>
//                 </td>
//                 {/* <td className="px-6 p-4">
//                   <div className="flex gap-2 items-center flex-wrap">
                    
//                       <>
//                         <FaCheckCircle
//                           onClick={() => update_status("Approved", n.news_id)}
//                           className={`w-5 h-5 cursor-pointer text-green-600 hover:scale-110 transition-transform ${res.loader && res.id === n.news_id ? "opacity-50 cursor-not-allowed" : ""}`}
//                         />
//                         {n.status === "pending" && (
//                           <FaTimesCircle
//                             onClick={() => update_status("Reject", n.news_id)}
//                             className={`w-5 h-5 cursor-pointer text-red-600 hover:scale-110 transition-transform ${res.loader && res.id === n.news_id ? "opacity-50 cursor-not-allowed" : ""}`}
//                           />
//                         )}
//                       </>
                  
//                     <Link
//                       to={`/dashboard/news/view/${n.news_id}`}
//                       className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50 text-white"
//                     >
//                       <FaEye />
//                     </Link>
                  
//                   </div>
//                 </td> */}
//                 <td className="px-6 p-4">
//   <div className="flex gap-2 items-center flex-wrap">
//     {/* Show Approve & Reject buttons only when news is pending */}
//     {n.status === "pending" && (
//       <>
//         <FaCheckCircle
//           onClick={() => update_status("Approved", n.news_id)}
//           className={`w-5 h-5 cursor-pointer text-green-600 hover:scale-110 transition-transform ${res.loader && res.id === n.news_id ? "opacity-50 cursor-not-allowed" : ""}`}
//         />
//         <FaTimesCircle
//           onClick={() => update_status("rejected", n.news_id)}
//           className={`w-5 h-5 cursor-pointer text-red-600 hover:scale-110 transition-transform ${res.loader && res.id === n.news_id ? "opacity-50 cursor-not-allowed" : ""}`}
//         />
//       </>
//     )}

//     {/* Always show view button */}
//     <Link
//       to={`/dashboard/news/view/${n.news_id}`}
//       className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50 text-white"
//     >
//       <FaEye />
//     </Link>
//   </div>
// </td>

//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination controls wrapped with flex-wrap */}
//       <div className="flex flex-wrap items-center justify-end px-4 gap-3 text-slate-600">
//         <div className="flex gap-x-3 justify-center items-center w-full sm:w-auto">
//           <p className="px-4 py-3 font-semibold text-sm whitespace-nowrap">News Pages</p>
//           <select
//             value={parPage}
//             onChange={(e) => { setParPage(parseInt(e.target.value)); setPage(1); }}
//             className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10'
//           >
//             <option value="10">10</option>
//             <option value="20">20</option>
//             <option value="30">30</option>
//             <option value="40">40</option>
//           </select>
//         </div>
//         <p className="px-6 py-3 font-semibold text-sm whitespace-nowrap">
//           {(page - 1) * parPage + 1}/{news.length} - of {pages}
//         </p>
//         <div className="flex items-center gap-x-3">
//           <IoIosArrowBack
//             onClick={() => { if (page > 1) setPage(page - 1); }}
//             className="w-5 h-5 cursor-pointer"
//           />
//           <IoIosArrowForward
//             onClick={() => { if (page < pages) setPage(page + 1); }}
//             className="w-5 h-5 cursor-pointer"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewsContent;



import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FaEye, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from 'axios';
import { AppContext } from '../Context/AppContext';
import { convert } from "html-to-text";
import toast from "react-hot-toast";

const NewsContent = () => {
  const { backendURL } = useContext(AppContext);
  const [news, setNews] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [parPage, setParPage] = useState(10);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);
  const [res, set_res] = useState({ id: "", loader: false });

  // Fetch news from backend
  const get_news = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/admin/get-all-writers-news`, {
        withCredentials: true,
      });

      // Sort newest first so page 1 always has latest news
      const sortedNews = data.news.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setAllNews(sortedNews);
      setNews(sortedNews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_news();
  }, []);

  // Update pages count when news or perPage changes
  useEffect(() => {
    if (news.length > 0) {
      setPages(Math.ceil(news.length / parPage));
    }
  }, [news, parPage]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // Filter by status
  const type_filter = (e) => {
    const val = e.target.value;
    if (val === "") {
      setNews(allNews);
    } else {
      setNews(allNews.filter(n => n.status === val));
    }
    setPage(1);
  };

  // Search by title
  const search_news = (e) => {
    const val = e.target.value.toLowerCase();
    setNews(allNews.filter(n => n.title.toLowerCase().includes(val)));
    setPage(1);
  };

  // Update status for news
  const update_status = async (status, news_id) => {
    try {
      set_res({ id: news_id, loader: true });

      const { data } = await axios.put(`${backendURL}/api/admin/update-news-status/${news_id}`, { status }, {
        withCredentials: true,
      });

      set_res({ id: "", loader: false });
      toast.success(data.message);
      get_news();
    } catch (error) {
      set_res({ id: "", loader: false });
      toast.error(error.response?.data?.message || "Error updating status");
    }
  };

  // Slice news for current page
  const currentPageData = news.slice((page - 1) * parPage, page * parPage);

  return (
    <div>
      {/* Filter & Search */}
      <div className="px-4 py-1 flex flex-col sm:flex-row gap-2 sm:gap-x-2">
        <select onChange={type_filter} className="px-3 py-2 rounded-md border border-gray-300 focus:border-green-500 h-10 w-full sm:w-auto">
          <option value="">----select type----</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <input
          type="text"
          onChange={search_news}
          placeholder="Search News"
          className="px-3 py-2 rounded-md border border-gray-300 focus:border-green-500 h-10 w-full sm:w-auto"
        />
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto p-4">
        <table className="w-full text-sm text-left text-slate-600 min-w-[700px] sm:min-w-full">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-7 py-3">No</th>
              <th className="px-7 py-3">Title</th>
              <th className="px-7 py-3">Image</th>
              <th className="px-7 py-3">Category</th>
              <th className="px-7 py-3">Description</th>
              <th className="px-7 py-3">Date</th>
              <th className="px-7 py-3">Status</th>
              <th className="px-7 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((n, i) => (
              <tr key={n._id} className="bg-white border-b">
                <td className="px-6 p-4">{(page - 1) * parPage + i + 1}</td>
                <td className="px-6 p-4">{n.title.slice(0, 15)}</td>
                <td className="px-6 p-4"><img className="w-[40px] h-[40px]" src={n.imageUrl} alt="news" /></td>
                <td className="px-6 p-4">{n.category}</td>
                <td className="px-6 p-4">{convert(n.description).slice(0, 15)}</td>
                <td className="px-4 py-2">{new Date(n.createdAt).toLocaleDateString()}</td>
                {/* <td className="px-6 p-4">
                  <span className={`px-2 py-[2px] rounded-lg text-xs ${n.status === "pending" ? "bg-blue-100 text-blue-800" : n.status === "Approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {n.status}
                  </span>
                </td> */}

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
                  <div className="flex gap-2 items-center flex-wrap">
                    {n.status === "pending" && (
                      <>
                        <FaCheckCircle
                          onClick={() => update_status("approved", n.news_id)}
                          className={`w-5 h-5 cursor-pointer text-green-600 hover:scale-110 transition-transform ${res.loader && res.id === n.news_id ? "opacity-50 cursor-not-allowed" : ""}`}
                        />
                        <FaTimesCircle
                          onClick={() => update_status("rejected", n.news_id)}
                          className={`w-5 h-5 cursor-pointer text-red-600 hover:scale-110 transition-transform ${res.loader && res.id === n.news_id ? "opacity-50 cursor-not-allowed" : ""}`}
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
      <div className="flex flex-wrap items-center justify-end px-4 gap-3 text-slate-600">
        <div className="flex gap-x-3 justify-center items-center w-full sm:w-auto">
          <p className="px-4 py-3 font-semibold text-sm whitespace-nowrap">News Pages</p>
          <select
            value={parPage}
            onChange={(e) => { setParPage(parseInt(e.target.value)); setPage(1); }}
            className='px-3 py-2 rounded-md border border-gray-300 focus:border-green-500 h-10'
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
          </select>
        </div>
        <p className="px-6 py-3 font-semibold text-sm whitespace-nowrap">
          {(page - 1) * parPage + 1} - {Math.min(page * parPage, news.length)} of {news.length}
        </p>
        <div className="flex items-center gap-x-3">
          <IoIosArrowBack onClick={() => page > 1 && setPage(page - 1)} className="w-5 h-5 cursor-pointer" />
          <IoIosArrowForward onClick={() => page < pages && setPage(page + 1)} className="w-5 h-5 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default NewsContent;
