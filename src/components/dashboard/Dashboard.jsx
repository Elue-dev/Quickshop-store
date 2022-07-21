import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { RiDashboardFill } from "react-icons/ri";
import { BiLogOutCircle } from "react-icons/bi";

import {
  BsHeart,
  BsForwardFill,
  BsFillPatchQuestionFill,
} from "react-icons/bs";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { MdBackspace } from "react-icons/md";
import { useStore } from "../../contexts/StoreContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./dashboard.scss";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const {
    state: { cart, wishlist },
  } = useStore();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const [cartDropdown, setCardDropdown] = useState(false);

  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      navigate("/");
      toast.success(`Successfully logged out ${user.email}`, {
        autoClose: 4000,
        pauseOnFocusLoss: false,
        color: "#000",
      });
    } catch (err) {
      setError(err.messsge);
    }
  };

  return (
    <div className="dashboard">
      <p>
        <MdBackspace className="back cart_back" onClick={() => navigate(-1)} />
      </p>
      <div className="page_desc">
        <p>
          <Link to="/">Home</Link> / <span>Dashboard</span>
        </p>
      </div>
      <div className="user">
        <FaUserCircle size={40} color="#fff" />
        <h4 style={{ marginTop: "1rem" }}>{user?.displayName || user.email}</h4>
        <b>(DASHBOARD)</b>
      </div>
      <RiDashboardFill size={20} color="#bb5353" />
      &nbsp; Welcome to your Dashboard, <b>{user.displayName || user.email}!</b>
      <p className="dashboard_header"></p>
      <br />
      <p>
        Your email: <b>{user.email}</b>
      </p>
      Update this email?
      <Link to="/reset-email">
        <span style={{ color: "#bb5353", marginLeft: ".3rem" }}>
          <b>Reset here &rarr;</b>
        </span>
      </Link>
      <div className="wishlist_details">
        <div className="dashboard_wishlist">
          <p className="dash_wish" onClick={() => setDropdown(!dropdown)}>
            <BsHeart className="dash_icon" /> <b>WISHLIST</b>
            {dropdown ? (
              <IoIosArrowDropdown size={20} />
            ) : (
              <IoIosArrowDropup size={20} />
            )}
          </p>
          <p className={dropdown ? "wishlist_count show" : "wishlist_count"}>
            <BsForwardFill /> You have{" "}
            <b>
              {wishlist.length === 1 ? "1 item" : `${wishlist.length} items`}{" "}
            </b>{" "}
            in your wishlist so far
          </p>
          {wishlist.length ? (
            <div
              className={
                dropdown ? "dashboard_products show" : "dashboard_products"
              }
            >
              <p className="prod_details">
                {wishlist.length === 1 ? "IT INCLUDES:" : "THEY INCLUDE:"}
              </p>
              <div>
                {wishlist.map((product) => (
                  <li key={product.id}>
                    {product.name}
                    &nbsp;(<span style={{ color: "#bb5353" }}>NGN</span>{" "}
                    {product.price})
                  </li>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="cart_details">
        <p className="dash_cart" onClick={() => setCardDropdown(!cartDropdown)}>
          <GiShoppingCart className="dash_icon" /> <b>CART</b>
          {cartDropdown ? (
            <IoIosArrowDropdown size={20} />
          ) : (
            <IoIosArrowDropup size={20} />
          )}
        </p>
        <p className={cartDropdown ? "cart_count show" : "cart_count"}>
          <BsForwardFill /> You have{" "}
          <b>{cart.length === 1 ? "1 item" : `${cart.length} items`} </b> in
          your cart so far
        </p>
      </div>
      {cart.length ? (
        <div
          className={
            cartDropdown ? "dashboard_products show" : "dashboard_products"
          }
        >
          <p className="prod_details">
            {cart.length === 1 ? "DETAILS ARE:" : "THEY INCLUDE:"}
          </p>
          <div>
            {cart.map((product) => (
              <li key={product.id}>
                {product.name}
                &nbsp;(<span style={{ color: "#bb5353" }}>NGN</span>{" "}
                {product.price})
              </li>
            ))}
          </div>
          <p className="dash_checkout">
            <BsFillPatchQuestionFill size={20} color="#bb5353" />
            &nbsp; Ready to checkout{" "}
            {cart.length === 1 ? "this product" : "these products"}?{" "}
            <Link to="/checkout" className="start">
              <b>Start now &rarr;</b>
            </Link>
          </p>
        </div>
      ) : null}
      <button className="dashboard_btn shop_btn">
        <Link to="/">Keep shopping</Link>
      </button>
      <button className="dashboard_btn logout_btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
