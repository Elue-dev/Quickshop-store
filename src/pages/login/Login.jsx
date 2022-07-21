import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { IoIosEye, IoMdEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../contexts/AuthContext";
import "./login.scss";
import { useStore } from "../../contexts/StoreContext";
import spinnerImg from "../../assets/spinner.jpg";

export default function Login() {
  const emailRef = useRef(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [view, setView] = useState(false);
  const passwordRef = useRef(null);
  const {
    state: { previousUrl },
  } = useStore();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const redirectUser = () => {
    if (previousUrl.includes("cart")) {
      return navigate("/cart");
    }
    navigate("/dashboard");
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      setEmail("");
      setPassword("");
      redirectUser();
      setLoading(false);
      toast.success("Successfully logged in", {
        autoClose: 4000,
        pauseOnFocusLoss: false,
      });
    } catch (err) {
      if (err.message === "Firebase: Error (auth/user-not-found).") {
        setError("User not found");
        window.setTimeout(() => {
          setError("");
        }, 3000);
      }
      if (err.message === "Firebase: Error (auth/wrong-password).") {
        setError("Wrong password");
        window.setTimeout(() => {
          setError("");
        }, 3000);
      }
      if (err.message === "Firebase: Error (auth/network-request-failed).") {
        setError("Please check your internet connection");
        window.setTimeout(() => {
          setError("");
        }, 5000);
      }
      if (
        err.message ===
        "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
      ) {
        setError(
          "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later"
        );
        window.setTimeout(() => {
          setError("");
        }, 8000);
      }
    }
    setLoading(false);
  }

  const handleShowPassword = () => {
    setView(!view);
    if (passwordRef.current.type === "password") {
      passwordRef.current.setAttribute("type", "text");
    } else {
      passwordRef.current.setAttribute("type", "password");
    }
  };

  return (
    <div className="login">
      <h1>Log In</h1>
      {error && (
        <p className=" alert error">
          {" "}
          <MdOutlineReportGmailerrorred className="error_icon" /> {error}{" "}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email:</span> <br />
          <input
            type="email"
            value={email}
            ref={emailRef}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>{" "}
        <br />
        <label>
          <span>Password:</span> <br />
          <input
            type="password"
            value={password}
            ref={passwordRef}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="eye" onClick={handleShowPassword}>
            {view ? <IoIosEye /> : <IoMdEyeOff />}
          </span>
        </label>{" "}
        <br />
        <button className="btn">
          {loading ? (
            <img
              src={spinnerImg}
              style={{width: '30px', height: '30px'}}
            />
          ) : (
            "Continue"
          )}
        </button>
      </form>
      <p className="forgot_password">
        <Link to="/forgot-password">Forgot password?</Link>
      </p>
      <p className="get_account">
        New to Quick<span>Shop</span>?
        <Link to="/signup" style={{ marginLeft: ".5rem " }}>
          Sign Up
        </Link>
      </p>
    </div>
  );
}
