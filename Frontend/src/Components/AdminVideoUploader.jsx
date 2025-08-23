import React, { useContext, useState } from "react";
import axios from "axios";
import { FiUpload } from "react-icons/fi";
import { AppContext } from "../Context/AppContext";
import toast from "react-hot-toast";

const AdminVideoUploader = () => {
  const { userData, backendURL } = useContext(AppContext); // using appcontext
  const [uploadType, setUploadType] = useState("file");
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
    setMessage("");
    setProgress(0);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!userData || !userData.id) {
      return setMessage("Unauthorized. Please log in.");
    }

    const formData = new FormData();
    formData.append("uploadType", uploadType);

    if (uploadType === "file") {
      if (!videoFile) return setMessage("Please select a video file.");
      formData.append("liveVideo", videoFile);
    } else if (uploadType === "url") {
      if (!videoUrl.trim()) return setMessage("Please enter a video URL.");
      formData.append("liveVideo", videoUrl);
    }

    try {
      setUploading(true);
      setMessage("");

      const res = await axios.post(
        `${backendURL}/api/admin/upload-live-video`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, 
          onUploadProgress: (e) => {
            const percent = Math.round((e.loaded * 100) / e.total);
            setProgress(percent);
          },
        }
      );

      // console.log(res.data);
      setMessage("Video uploaded successfully!");
      toast.success("Video uploaded successfully!");
      setVideoFile(null);
      setVideoUrl("");
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Upload failed.");
      toast.error("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white border rounded shadow mt-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <FiUpload className="text-blue-600 text-3xl sm:text-4xl" />
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Upload Live Video
        </h2>
      </div>

      <form onSubmit={handleUpload} className="space-y-5">
        <select
          value={uploadType}
          onChange={(e) => setUploadType(e.target.value)}
          className="w-full border rounded p-3 text-base sm:text-lg"
        >
          <option value="file">Upload Video File</option>
          <option value="url">Use Video URL</option>
        </select>

        {uploadType === "file" ? (
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="block w-full text-sm sm:text-base border rounded p-2 sm:p-3"
          />
        ) : (
          <input
            type="text"
            placeholder="Enter video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="block w-full text-sm sm:text-base border rounded p-2 sm:p-3"
          />
        )}

        {/* {progress > 0 && uploadType === "file" && (
          <div className="w-full bg-gray-200 rounded h-5 overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-blue-600 transition-all"
            />
          </div>
        )} */}

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded text-base sm:text-lg transition"
        >
          {uploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>

      {message && (
        <div className="mt-5 text-center text-sm sm:text-base text-gray-700">
          {message}
        </div>
      )}
    </div>
  );
};

export default AdminVideoUploader;
