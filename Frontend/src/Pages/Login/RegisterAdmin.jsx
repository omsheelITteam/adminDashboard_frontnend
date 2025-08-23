import React, { useContext, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { SyncLoader } from "react-spinners";
import {images} from '../../assets/assets'
const RegisterAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [role, setRole] = useState("admin");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [bio, setWriterBio] = useState("");
  const [adminImg, setadminImg] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false); // ✅ track form validity

  const { backendURL } = useContext(AppContext);
  const navigate = useNavigate();

  // ✅ client-side validation
  const validate = (fieldValues = {}) => {
    const newErrors = { ...errors };

    if ("name" in fieldValues) {
      newErrors.name = !fieldValues.name
        ? "Name is required"
        : "";
    }
    if ("email" in fieldValues) {
      newErrors.email = !fieldValues.email
        ? "Email is required"
        : !/\S+@\S+\.\S+/.test(fieldValues.email)
        ? "Enter a valid email"
        : "";
    }
    if ("mobileNumber" in fieldValues) {
      newErrors.mobileNumber = !fieldValues.mobileNumber
        ? "Mobile number is required"
        : !/^\d{10}$/.test(fieldValues.mobileNumber)
        ? "Enter a valid 10-digit number"
        : "";
    }
    if ("password" in fieldValues) {
      newErrors.password = !fieldValues.password
        ? "Password is required"
        : fieldValues.password.length < 6
        ? "Password must be at least 6 characters"
        : "";
    }
    if ("bio" in fieldValues) {
      newErrors.bio = !fieldValues.bio ? "Bio is required" : "";
    }
    if ("adminImg" in fieldValues) {
      newErrors.adminImg = !fieldValues.adminImg ? "Profile image is required" : "";
    }

    setErrors(newErrors);
  };

  // ✅ check form validity live
  useEffect(() => {
    const noErrors =
      name &&
      email &&
      mobileNumber &&
      password &&
      bio &&
      adminImg &&
      Object.values(errors).every((err) => err === "");

    setIsFormValid(noErrors);
  }, [name, email, mobileNumber, password, bio, adminImg, errors]);

  // ✅ submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // final validation before submit
    validate({ name, email, mobileNumber, password, bio, adminImg });
    if (!isFormValid) {
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("adminName", name);
      formData.append("adminEmail", email);
      formData.append("adminMobile", Number(mobileNumber));
      formData.append("adminPassword", password);
      formData.append("adminBio", bio);
      formData.append("adminImage", adminImg);
      formData.append("Role", role);

      const { data } = await axios.post(
        `${backendURL}/api/admin/register-admin`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data.success) {
        toast.success("Your registration was successful 🎉");
        setName("");
        setEmail("");
        setMobileNumber("");
        setRole("admin");
        setPassword("");
        setWriterBio("");
        setadminImg("");
        navigate("/verify-email");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("Email already exists ❌");
      } else {
        toast.error("Server error, please try again later");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row w-full min-h-screen items-center gap-6 p-6 justify-center">
        {/* Carousel Section */}
        <div className="lg:w-2/6 rounded-lg">
          <div className="w-full flex items-center justify-center rounded-lg">
            <Carousel className="w-[540px] h-full">
              <Carousel.Item>
                <Image src={images.signupImage1} className="d-block w-full h-full object-contain rounded"/>
              </Carousel.Item>
              <Carousel.Item>
                <Image src={images.signupImage2} className="d-block w-full h-full object-contain rounded"/>
              </Carousel.Item>
              <Carousel.Item>
                <Image src={images.signupImage3} className="d-block w-full h-full object-contain rounded"/>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-xl p-10">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 text-center sm:text-left">
            <Image src={images.navbarLogo} width={60} height={60} className="rounded-full shadow-md"/>
            <h2 className="text-3xl font-extrabold">
              Welcome To <span className="text-yellow-500">MyStartup</span>NEWS
            </h2>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            {/* Upload Image */}
            <div className="text-center">
              <label htmlFor="writer-img" className="cursor-pointer inline-block">
                <Image
                  src={adminImg ? URL.createObjectURL(adminImg) : images.profileImg}
                  width={90}
                  height={90}
                  className="bg-gray-100 rounded-full shadow-md object-cover"
                />
              </label>
              <input
                type="file"
                id="writer-img"
                className="hidden"
                onChange={(e) => {
                  setadminImg(e.target.files[0]);
                  validate({ adminImg: e.target.files[0] });
                }}
              />
              <p className="mt-2 text-sm text-gray-500">Upload Your Image</p>
              {errors.adminImg && <p className="text-red-500 text-xs">{errors.adminImg}</p>}
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    validate({ name: e.target.value });
                  }}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                  placeholder="Enter Your Name"
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Your Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validate({ email: e.target.value });
                  }}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                  placeholder="Enter Your Email"
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => {
                    setMobileNumber(e.target.value);
                    validate({ mobileNumber: e.target.value });
                  }}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                  placeholder="Enter Mobile Number"
                />
                {errors.mobileNumber && <p className="text-red-500 text-xs">{errors.mobileNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Contributor Role</label>
                <select
                  value={role}
                  disabled
                  className="w-full rounded-lg border px-4 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
                >
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validate({ password: e.target.value });
                }}
                className="w-full border rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="Enter Your Password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>

            {/* About */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">About You</label>
              <textarea
                rows={4}
                value={bio}
                onChange={(e) => {
                  setWriterBio(e.target.value);
                  validate({ bio: e.target.value });
                }}
                className="w-full border rounded-lg px-4 py-2 resize-none focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="Tell us about yourself..."
              />
              {errors.bio && <p className="text-red-500 text-xs">{errors.bio}</p>}
            </div>

            {/* Submit */}
            <button
              className="w-full bg-yellow-500 rounded-lg py-3 text-white font-semibold hover:bg-yellow-600 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={!isFormValid || loading}
            >
              {loading ? <SyncLoader color="#fff" size={8} /> : "Register"}
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Already Have an Account?{" "}
              <Link to="/loginAdmin" className="text-yellow-500 font-semibold hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
};

export default RegisterAdmin;
