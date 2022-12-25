import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";

const ForgotPass = () => {
    const {resetPassword} = useContext(AuthContext)
    const handleResetPassword = e =>{
        e.preventDefault()
        resetPassword(e.target.email.value)
        .then(()=>{e.target.reset()
        toast.success(`Password Link sent to ${e.target.email.value}`)
        })
        .catch(err=>console.log(err))
    }
  return (
    <>
      <input type="checkbox" id="forgot-pass" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="forgot-pass"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold mb-5">
            Do you want change password?
          </h3>
          <form onSubmit={(e) => handleResetPassword(e)} className="flex gap-2">
            <label className="input-group input-group-md">
              <span>Email</span>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="input input-bordered w-full"
              />
            </label>
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPass;
