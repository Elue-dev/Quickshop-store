import { useState, useEffect, useContext } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { IoIosEye, IoMdEyeOff } from "react-icons/io";
import { ImCheckmark } from "react-icons/im";
import { GoPrimitiveDot } from "react-icons/go";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signup.scss";
import { ModeContext } from "../../contexts/ModeContext";
import { useStore } from "../../contexts/StoreContext";
import spinnerImg from "../../assets/spinner.jpg";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signup, googleSignIn, facebookSignIn, updateName } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState(false);
  const passwordRef = useRef(null);
  const [caseCondition, setCaseCondition] = useState(false);
  const [numberCondition, setNumberCondition] = useState(false);
  const [charCondition, setCharCondition] = useState(false);
  const [lengthCondition, setLengthCondition] = useState(false);
  const [passwordComplete, setPasswordComplete] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const { mode } = useContext(ModeContext);
  const {
    state: { previousUrl },
  } = useStore();

  const redirectUser = () => {
    if (previousUrl.includes("cart")) {
      return navigate("/cart");
    }
    navigate("/dashboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      await updateName(displayName);
      setEmail("");
      setPassword("");
      toast.success("Successfully signed up", {
        autoClose: 5000,
        pauseOnFocusLoss: false,
      });
      redirectUser();
      setLoading(false);
    } catch (err) {
      if (err.message === "Firebase: Error (auth/email-already-in-use).") {
        setError("Email already in use");
        window.setTimeout(() => {
          setError("");
        }, 5000);
      }
      if (
        err.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        setError("Password should be at least 6 characters");
        window.setTimeout(() => {
          setError("");
        }, 3000);
      }
      if (err.message === "Firebase: Error (auth/invalid-email).") {
        setError("Invalid email");
        window.setTimeout(() => {
          setError("");
        }, 5000);
      }
      if (err.message === "Firebase: Error (auth/network-request-failed).") {
        setError("Please check your internet connection");
        window.setTimeout(() => {
          setError("");
        }, 5000);
      }
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      redirectUser();
      toast.success("Google sign in was successful", {
        autoClose: 5000,
        pauseOnFocusLoss: false,
      });
    } catch (err) {
      if (err.message === "Firebase: Error (auth/popup-closed-by-user).") {
        setError("Google sign in failed. (You exited the google sign in)");
        window.setTimeout(() => {
          setError("");
        }, 3500);
      }
      if (err.message === "Firebase: Error (auth/network-request-failed).") {
        setError("Google sign in failed.");
        window.setTimeout(() => {
          setError("");
        }, 3500);
      }
    }
  };
  const handleFacebookSignIn = async () => {
    try {
      await facebookSignIn();
      redirectUser();
      toast.success("Facebook sign in was successful", {
        autoClose: 5000,
        pauseOnFocusLoss: false,
      });
    } catch (err) {
      if (err.message === "Firebase: Error (auth/popup-closed-by-user).") {
        setError("Facebook sign in failed. (You exited the facebook sign in)");
        window.setTimeout(() => {
          setError("");
        }, 3500);
      }
      if (err.message === "Firebase: Error (auth/network-request-failed).") {
        setError("Facebook sign in failed.c");
        window.setTimeout(() => {
          setError("");
        }, 3500);
      }
    }
  };

  const handleShowPassword = () => {
    setView(!view);
    if (passwordRef.current.type === "password") {
      passwordRef.current.setAttribute("type", "text");
    } else {
      passwordRef.current.setAttribute("type", "password");
    }
  };

  useEffect(() => {
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setCaseCondition(true);
    } else {
      setCaseCondition(false);
    }
    if (password.match(/([0-9])/)) {
      setNumberCondition(true);
    } else {
      setNumberCondition(false);
    }
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setCharCondition(true);
    } else {
      setCharCondition(false);
    }
    if (password.length > 5 && password.length <= 12) {
      setLengthCondition(true);
    } else {
      setLengthCondition(false);
    }

    if (caseCondition && numberCondition && charCondition && lengthCondition) {
      setPasswordComplete(true);
    } else {
      setPasswordComplete(false);
    }
  }, [
    password,
    caseCondition,
    numberCondition,
    charCondition,
    lengthCondition,
    passwordComplete,
  ]);

  return (
    <div className="signup">
      <h1>Create Account</h1>
      <div className="oAuth_signin">
        <button onClick={handleGoogleSignIn} className="btn oAuth__signin">
          <div>
            <FcGoogle className="google_icon" />
          </div>
          <div className={`google ${mode}`}>Continue with google</div>
        </button>
        <button onClick={handleFacebookSignIn} className="btn oAuth__signin">
          <div>
            <FaFacebook className="meta_icon" />
          </div>
          <div className={`facebook ${mode}`}>Continue with facebook</div>
        </button>
      </div>
      {error && (
        <p className="alert error">
          {" "}
          <MdOutlineReportGmailerrorred className="error_icon" /> {error}{" "}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          <span>Name:</span> <br />
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </label>{" "}
        <br />
        <label>
          <span>Email:</span> <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>{" "}
        <br />
        <label>
          <span>Password:</span> <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPassFocus(true)}
            required
            ref={passwordRef}
            placeholder="At least 6 characters"
          />
          <span className="eye" onClick={handleShowPassword}>
            {view ? <IoIosEye /> : <IoMdEyeOff />}
          </span>
        </label>{" "}
        <br />
        <div className={passFocus ? "indicator show" : "indicator"}>
          <span>Password must include:</span>
          <ul>
            <li className={caseCondition ? "green" : "red"}>
              {caseCondition ? <ImCheckmark /> : <GoPrimitiveDot />}
              &nbsp; Uppercase & lowercase letters
            </li>
            <li className={lengthCondition ? "green" : "red"}>
              {lengthCondition ? <ImCheckmark /> : <GoPrimitiveDot />}
              &nbsp; 6-12 characters
            </li>
            <li className={numberCondition ? "green" : "red"}>
              {numberCondition ? <ImCheckmark /> : <GoPrimitiveDot />}
              &nbsp; At least a number
            </li>
            <li className={charCondition ? "green" : "red"}>
              {charCondition ? <ImCheckmark /> : <GoPrimitiveDot />}
              &nbsp; At least one special character (!@#$%^&*)
            </li>
          </ul>
        </div>
        {passwordComplete && (
          <button className="btn">
            {loading ? (
              <img
                src={spinnerImg}
                alt="loading..."
                style={{ width: "30px", height: "30px" }}
              />
            ) : (
              "Continue"
            )}
          </button>
        )}
        {!passwordComplete && (
          <button disabled className="btn disabled">
            Continue
          </button>
        )}
      </form>
      <p className="get_account">
        Have a Quick<span>Shop</span> account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
