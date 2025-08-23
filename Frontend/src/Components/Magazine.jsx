
import React, { useContext, useState } from "react";
import axios from "axios";
// import StoreContext from "../Context/StoreContext";
import {AppContext} from "../Context/AppContext";
import { toast } from "react-toastify";
const MagazineUpload = () => {
  const { userData } = useContext(AppContext);
  const [type, setType] = useState("file");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title) return alert("Title is required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("type", type);
    if (type === "file") formData.append("magazine", file);
    else formData.append("url", url);

    try {
      setLoading(true);
      await axios.post("http://localhost:5500/api/admin/upload-magazine", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      // alert("Uploaded!");
      toast.success("Magazine uploaded successfully!");
      setTitle("");
      setDescription("");
      setFile(null);
      setUrl("");
    } catch (err) {
      console.error("Upload failed:", err);
      // alert("Upload failed");
      toast.error("Failed to upload magazine. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mt-8 mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Upload Magazine</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border rounded"
          rows={4}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="file">Upload File</option>
          <option value="url">Use URL</option>
        </select>
        {type === "file" ? (
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            required
            className="w-full"
          />
        ) : (
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Magazine URL"
            required
            className="w-full p-2 border rounded"
          />
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default MagazineUpload;
