import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import img1 from "../assets/profileDefault.png";
import img2 from "../assets/check.png";
import { Toast } from "primereact/toast";
import { ProgressBar } from "primereact/progressbar";
import { FaInstagram, FaFacebookF, FaTwitter, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { FaCoins as FaCoinsV6 } from "react-icons/fa6";
import { IoNewspaperOutline } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import SharesButton from "./ShareButton";

const ViewProfile = () => {
  const { id } = useParams();
  const [writer, setWriter] = useState(null);
  const [news, setNews] = useState([]);
  const [statusCounts, setStatusCounts] = useState({ pending: 0, approved: 0, rejected: 0 });
  const [redeeming, setRedeeming] = useState(false);
  const [value, setValue] = useState(0);

  const toast = useRef(null);
  const interval = useRef(null);
  const location = useLocation();
  const isSharedView = new URLSearchParams(location.search).get("shared") === "true";

  // Fetch writer profile by id
  const fetchWriterProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:5500/api/admin/get-reg-writer-by-id/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setWriter({
          ...res.data.writer,
          // points: res.data.writer.points || 0,
        });
        setNews(res.data.writer.newsuploaded || []);
      }

      console.log("WriterProfile URL id:", id);
    } catch (error) {
      console.error("Error fetching writer profile", error);
    }
  };

  // Calculate status counts whenever news changes
 

  
  useEffect(() => {
    fetchWriterProfile();
    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [id]);

  if (!writer) return <p className="p-4">Loading writer profile...</p>;

  const isWriterProfile = writer.role === `${writer.role}`;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <Toast ref={toast} position="top-center" className="custom-toast" />

      {/* Profile Info */}
      <div className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6">
        <img
          src={writer.writerimage || img1}
          alt="Writer"
          className="w-[142px] h-[142px] rounded-full object-cover"
        />

        <div className="text-center sm:text-left">
          <p className="text-lg"><strong>Name:</strong> {writer.name}</p>
          {/* <p className="text-lg"><strong>WriterId:</strong> {writer.writeridcard}</p> */}
          <p className="text-lg"><strong>Email:</strong> {writer.email}</p>
          <p className="text-lg"><strong>Role:</strong> {writer.contributor}</p>
          <p className="text-lg"><strong>Bio:</strong> {writer.writerbio}</p>

          {/* {!isSharedView && (
            <div className="mt-4 flex flex-row gap-3">
              {isWriterProfile && (
                <SharesButton
                  text={`Check out ${writer.writername}'s profile!`}
                  url={`${window.location.origin}${window.location.pathname}?shared=true`}
                />
              )}
            </div>
          )} */}
        </div>
      </div>


    

      {/* Social Media */}
      <div className="mt-8 flex justify-center p-4 gap-6 text-xl">
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-pink-600 hover:scale-110 p-3 shadow-lg duration-200"><FaInstagram /></a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-blue-700 hover:scale-110 p-3 shadow-lg duration-200"><FaFacebookF /></a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-sky-500 hover:scale-110 p-3 shadow-lg duration-200"><FaTwitter /></a>
        <a href="https://wa.me/" target="_blank" rel="noreferrer" className="text-green-500 hover:scale-110 p-3 shadow-lg duration-200"><FaWhatsapp /></a>
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${writer.email}`}
          target="_blank"
          rel="noreferrer"
          className="text-red-500 hover:scale-110 p-3 shadow-lg duration-200"
        >
          <FaEnvelope />
        </a>
      </div>
    </div>
  );
};

export default ViewProfile;