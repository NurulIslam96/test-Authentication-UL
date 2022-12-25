import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";

const ChangePassModal = () => {
  const { setNewPassword } = useContext(AuthContext);
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    setNewPassword(e.target.password.value)
      .then(() => {
        e.target.reset()
        toast.success("Password changed Successfully");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <input type="checkbox" id="change-pass" className="modal-toggle" />
      <div className="modal text-black">
        <div className="modal-box relative">
          <label
            htmlFor="change-pass"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold mb-5">
            Do you want change password?
          </h3>
          <form onSubmit={(e) => handleUpdatePassword(e)} className="flex">
            <label className="input-group input-group-md">
              <span>New Password</span>
              <input
                type="password"
                name="password"
                placeholder="Type here"
                className="input input-bordered"
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

export default ChangePassModal;
