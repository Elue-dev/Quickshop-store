import { useEffect, useState } from "react";
import { useStore } from "../../contexts/StoreContext";
import { useAuth } from "../../contexts/AuthContext";
import { MdDelete } from "react-icons/md";
import { ImPriceTags } from "react-icons/im";
import { IoIosPricetag } from "react-icons/io";
import { BsFillBasket3Fill } from "react-icons/bs";
import { TbBasketOff } from "react-icons/tb";
import { MdBackspace } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RelatedProducts_ from "./RelatedProducts_";
import Notiflix from "notiflix";
import "./cart.scss";

export default function Cart() {
  const {
    state: { cart },
    dispatch,
    removeFromCart,
    clearCart,
  } = useStore();
  const [total, setTotal] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setTotal(
      cart.reduce(
        (total, current) => total + Number(current.price - 349) * current.qty,
        0
      )
    );
  }, [cart]);
  // console.log(cart[0].qty)

  const handleRemoveItem = (product) => {
    removeFromCart(product);
    toast.success(`${product.name} was removed from your cart`, {
      autoClose: 4000,
      pauseOnFocusLoss: false,
      position: toast.POSITION.TOP_LEFT,
    });
  };

  useEffect(() => {
    dispatch({
      type: "SAVE_URL",
      payload: "",
    });
  }, [dispatch, cart]);

  const url = window.location.href;

  const handleCheckoutRedirect = () => {
    if (user) {
      navigate("/checkout");
    } else {
      dispatch({
        type: "SAVE_URL",
        payload: url,
      });
      toast.info("Add an account to checkout", {
        autoClose: 4000,
        pauseOnFocusLoss: false,
      });
      navigate("/login");
    }
  };

  const confirmDelete = () => {
    Notiflix.Confirm.show(
      "You are about to clear your cart",
      "Are you sure you want to clear your cart?",
      "PROCEED",
      "CANCEL",
      function okCb() {
        clearCart();
        toast.success("Your cart was cleared", {
          autoClose: 4000,
          pauseOnFocusLoss: false,
          position: toast.POSITION.TOP_LEFT,
        });
      },
      function cancelCb() {
        console.log("Deleted");
      },
      {
        width: "320px",
        borderRadius: "5px",
        titleColor: "red",
        okButtonBackground: "red",
        cssAnimationStyle: "zoom",
      }
    );
  };

  return (
    <div className="cart">
      <p style={{ paddingTop: "2rem" }}>
        <MdBackspace className="back cart_back" onClick={() => navigate(-1)} />
      </p>
      <div className="page_desc">
        <p>
          <Link to="/">Home</Link> / <span>Cart</span>
        </p>
      </div>
      <h1 className="cart_title">Your cart</h1>
      {!cart.length && (
        <p className="cart_empty">
          <TbBasketOff className="basket_empty" /> <br />
          Your Quick<span>Shop</span> Cart is Empty <br />
          <Link to="/">Start shopping</Link>
        </p>
      )}
      {cart.length ? <hr /> : null}
      {cart?.map((item) => (
        <div key={item.id}>
          <div className="cart_item">
            <div className="item_image">
              <Link to={`/product/${item.id}`}>
                <img src={item.preview} alt={item.name} />
              </Link>
            </div>
            <div className="cart_name"> {item.name}</div>
            <div className="cart_price">
              <b>NGN</b> {item.price - 349}
            </div>
            <div>
              <b>Quantity:</b>
              &nbsp;{" "}
              <select
                type="number"
                onChange={(e) =>
                  dispatch({
                    type: "CHANGE_QTY",
                    payload: {
                      id: item.id,
                      qty: e.target.value,
                    },
                  })
                }
                className="count_input"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </select>
              <br />
            </div>
            <button
              className="remove_item"
              onClick={() => handleRemoveItem(item)}
            >
              <MdDelete className="remove_icon" />
            </button>
          </div>
          <hr />
          <hr />
        </div>
      ))}
      {cart.length > 1 ? (
        <div className="clear_cart_row">
          <p>.</p>
          <p className="clear_cart" onClick={confirmDelete}>
            Clear cart
          </p>
          {/* onClick={() => confirmDelete(id, imageUrl, name)} */}
        </div>
      ) : null}
      {cart.length ? (
        <div className="summary">
          <h2 className="summary_title">Summary</h2>
          <p>
            <BsFillBasket3Fill className="summary_icon" />
            <b>
              <i>Number of Products:</i>
            </b>{" "}
            {cart.length}
          </p>
          <p>
            <ImPriceTags className="summary_icon" />
            <b>
              <i>Total cost:</i>
            </b>
            NGN {total}
          </p>
          <Link
            to="/checkout"
            onClick={handleCheckoutRedirect}
            className="checkout_btn"
          >
            Checkout
          </Link>
        </div>
      ) : null}
      <RelatedProducts_ />
    </div>
  );
}
