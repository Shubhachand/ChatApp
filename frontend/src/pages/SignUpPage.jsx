import React, { useState } from "react";
import { MessagesSquare } from "lucide-react";
import { Link } from "react-router";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
// import { axiosInstance } from "../lib/axios";
import { signup } from "../lib/api";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();
  const {
    mutate: signupMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });
  const handleSignup = (e) => {
    e.preventDefault();
    // Handle signup logic here
    signupMutation(signupData);
    console.log("Signup Data:", signupData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-800"
      data-theme="aqua"
    >
      <div className="border border-blue-200 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-white/90 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300">
        {/* Left Side Form */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
          {/* Logo */}
          <div className="mb-8 flex items-center gap-2">
            <MessagesSquare className="size-10 text-cyan-600 drop-shadow" />
            <span className="text-4xl font-extrabold font-mono bg-gradient-to-r from-blue-700 to-cyan-400 bg-clip-text text-transparent tracking-wider">
              SyncTalk
            </span>
          </div>

          {/* {error message if any} */}
          {error && (
            <div className="alert alert-error mb-2 text-sm">
              <span>{error.response.data.message}</span>
            </div>
          )}
          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-blue-800">
                Create an Account
              </h2>
              <p className="text-sm text-blue-900/70">
                Join SyncTalk and start your seamless chatting experience.
              </p>
            </div>

            {/* Full Name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-blue-700 font-semibold">
                  Full Name
                </span>
              </label>
              <input
                type="text"
                placeholder="Shubham"
                className="input input-bordered w-full bg-white/80 border-cyan-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 text-blue-900"
                value={signupData.fullName}
                onChange={(e) =>
                  setSignupData({ ...signupData, fullName: e.target.value })
                }
                required
              />
            </div>

            {/* Email */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-blue-700 font-semibold">
                  Email
                </span>
              </label>
              <input
                type="email"
                placeholder="shubham@gmail.com"
                className="input input-bordered w-full bg-white/80 border-cyan-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 text-blue-900"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
                required
              />
            </div>

            {/* Password */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-blue-700 font-semibold">
                  Password
                </span>
              </label>
              <input
                type="password"
                placeholder="*********"
                className="input input-bordered w-full bg-white/80 border-cyan-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 text-blue-900"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-md hover:from-cyan-400 hover:to-blue-500 transition-all"
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
            {/* Already have an account? */}
            <p className="text-sm text-center text-blue-700 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-cyan-600 font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>

        {/* Right Side Image */}
        <div className="hidden lg:block lg:w-1/2 bg-gradient-to-tr from-cyan-100 via-blue-100 to-white">
          <img
            src="/Video call-amico.png"
            alt="Signup Illustration"
            className="object-cover h-full w-full p-8"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
