import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { BiLoader } from "react-icons/bi";
import { GrStatusGood } from "react-icons/gr";
import "./updateEmail.scss";

export default function Update() {
  const { updateMail, updatePass, user } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();

    if (email === user.email) {
      setError(
        "This email is already your active email address, please try a different email"
      );
      window.setTimeout(() => {
        setError("");
      }, 7000);
      return;
    }

    try {
      setLoading(true);
      await updateMail(email);
      setLoading(false);
      setEmail("");
      setMessage("Your email has been successfully changed.");
      window.setTimeout(() => {
        setMessage("REDIRECTING...");
      }, 3000);
      window.setTimeout(() => {
        navigate("/dashboard");
      }, 8000);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handle} className="form">
      <h1 className="update">Update Email</h1>
      <br />
      <div className="update_desc">
        <p>
          A confirmation email will be sent to you after you update your email
          (Ensure to check your spam folder)
        </p>
      </div>
      {error && (
        <p className="alert error update_error">
          <MdOutlineReportGmailerrorred className="error_icon" />
          <span>{error}</span>
        </p>
      )}
      {message && (
        <p className="alert message">
          {" "}
          <GrStatusGood
            className="message_icon"
            style={{ color: "#fff" }}
          />{" "}
          {message}{" "}
        </p>
      )}
      <label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter new email"
          required
        />
      </label>
      <button type="submit">{loading ? <BiLoader /> : "Proceed"}</button>
    </form>
  );
}
