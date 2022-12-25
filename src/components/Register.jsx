import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Register = () => {
  // const [error, setError] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { createUser, updateUser, verifyEmail, logout } =
    useContext(AuthContext);
  const handleSignUp = (data) => {
    const body = {
      name: data.name,
      email: data.email,
      number: data.number,
      address: data.address,
    };
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        handleUpdateUserProfile(data.name, body);
        if (user.email) {
          toast.success("Registered Succesfully");
          reset();
        }
      })
      .catch((err) => {
        const msg = err.message.replace(/Firebase:/g, "");
        toast.error(msg);
      });
  };

  const handleUpdateUserProfile = (displayName, body) => {
    const profile = {
      displayName: displayName,
    };
    updateUser(profile)
      .then(() => {
        verifyEmail()
          .then(() => {
            fetch(`${process.env.REACT_APP_server}/addUser`, {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(body),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.acknowledged) {
                  toast.success(
                    "Email Verification sent. Please Check Spam Folder"
                  );
                  return logout();
                }
              });
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className="container mx-auto">
      <section className="min-h-screen">
        <div className="px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 md:block hidden lg:w-6/12 mb-12 md:mb-0">
              <img
                src="https://i.ibb.co/zQkq713/vecteezy-cloud-computing-modern-flat-concept-for-web-banner-design-5879539.jpg"
                className="w-full"
                alt=""
              />
            </div>
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-900 text-gray-100">
              <h1 className="text-2xl font-bold text-center">Register</h1>
              <form
                onSubmit={handleSubmit(handleSignUp)}
                className="space-y-6 ng-untouched ng-pristine ng-valid"
              >
                <div className="space-y-1 text-sm">
                  <label htmlFor="email" className="block text-gray-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    {...register("name", { required: true })}
                    className="w-full px-4 py-3 rounded-md border border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400"
                  />
                </div>
                <div className="space-y-1 text-sm">
                  <label htmlFor="email" className="block text-gray-400">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                    className="w-full px-4 py-3 rounded-md border border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400"
                  />
                </div>
                <div className="space-y-1 text-sm">
                  <label htmlFor="password" className="block text-gray-400">
                    Mobile Number
                  </label>
                  <input
                    type="number"
                    {...register("number", { required: true })}
                    placeholder="+880*******"
                    className="w-full px-4 py-3 rounded-md border border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400"
                  />
                </div>
                <div className="space-y-1 text-sm">
                  <label htmlFor="password" className="block text-gray-400">
                    Address
                  </label>
                  <input
                    type="text"
                    {...register("address", { required: true })}
                    placeholder="Your present address"
                    className="w-full px-4 py-3 rounded-md border border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400"
                  />
                </div>
                <div className="space-y-1 text-sm">
                  <label htmlFor="password" className="block text-gray-400">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password", { required: true })}
                    placeholder="******"
                    className="w-full px-4 py-3 rounded-md border border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400"
                  />
                </div>
                {errors && (
                  <p className="px-3 text-sm text-red-600">{errors.message}</p>
                )}
                <button
                  type="submit"
                  className="block w-full p-3 text-center rounded-sm text-white bg-blue-500"
                >
                  Sign Up
                </button>
              </form>
              <p className="text-xs text-center sm:px-6 text-gray-400">
                Already Have an account?
                <Link to={"/login"} className="underline text-gray-100">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
