import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import ForgotPass from './ForgotPass';

const Login = () => {
    const {signin,logout} = useContext(AuthContext)
    const navigate = useNavigate()
    const {register, handleSubmit, formState: { errors },reset} = useForm()
    const handleLogin = (data) =>{
        signin(data.email, data.password)
        .then(result => {
            const user = result.user;
            if(user.emailVerified){
                reset()
                navigate('/user')
                return toast.success(`Welcome ${user?.displayName}`)
            }else{
                toast.error("Please Verify Email First. {Check Spam folder}")
                return logout()
            }
        })
        .catch(err => {
          if(err){
            toast.error(err.message)
          }
        })
    }
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
              <h1 className="text-2xl font-bold text-center">Login</h1>
              <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-6 ng-untouched ng-pristine ng-valid"
              >
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
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password", { required: true })}
                    placeholder="******"
                    className="w-full px-4 py-3 rounded-md border border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400"
                  />
                </div>
                {errors && <p className="px-3 text-sm text-red-600">{errors.message}</p>}
                <label htmlFor='forgot-pass' className="underline text-gray-100 cursor-pointer">Forgot password?</label>
                <button
                  type="submit"
                  className="block w-full p-3 text-center rounded-sm text-white bg-blue-500"
                >
                  Login
                </button>
              </form>
              <p className="text-xs text-center sm:px-6 text-gray-400">
                Don't Have an account?
                <Link to={"/register"} className="underline text-gray-100">
                  Register now
                </Link>
              </p>
            </div>
          </div>
        </div>
        <ForgotPass></ForgotPass>
      </section>
    </div>
    );
};

export default Login;