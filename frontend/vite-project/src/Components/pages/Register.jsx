import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/autho-slice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Register = () => {
  const [seteye, updateeye] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [formdata, setformdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  let submited = async (event) => {
    event.preventDefault();
    const res = await dispatch(registerUser(formdata));
    // console.log(res);

    if (registerUser.fulfilled.match(res)) {
      toast.success(res.payload.message);

      setTimeout(() => {
        navigate("/autho/login");
      }, 1000);
    } else {
      toast.error(res.payload?.message || "Registration failed ❌");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setformdata({ ...formdata, [name]: value });
  };

  // console.log(formdata);

  return (
    <>
      <div className="w-full max-w-md space-y-8">
        <ToastContainer />
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={submited}>
          <div className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formdata.username}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none"
                placeholder="Enter your username"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formdata.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formdata.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none"
                placeholder="Create a password"
              />
              <IoEyeSharp className="text-2xl inline-block" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800 transition"
          >
            Register
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/autho/login"
              className="font-medium text-black hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
