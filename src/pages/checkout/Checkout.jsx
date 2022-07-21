import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useStore } from "../../contexts/StoreContext";
import { MdBackspace } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import "./checkout.scss";

export default function Checkout() {
  const { user } = useAuth();
  const {
    state: { cart },
    products,
    clearCart,
  } = useStore();
  const [total, setTotal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTotal(
      cart.reduce(
        (total, current) => total + Number(current.price - 349) * current.qty,
        0
      )
    );
  }, [cart]);

  const config = {
    public_key: process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: total,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    redirect_url: "https://quickshopapp.netlify.app/",
    customer: {
      email: user.email,
    },
    customizations: {
      title: "QuickShop checkout",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared", { autoClose: 1000, pauseOnFocusLoss: false });
  };

  return (
    <div className="checkout">
      <p style={{ paddingTop: "2rem" }}>
        <MdBackspace className="back cart_back" onClick={() => navigate(-1)} />
      </p>
      <div className="page_desc">
        <p>
          <Link to="/">Home</Link> / <span>Checkout</span>
        </p>
      </div>
      {cart.length ? (
        <>
          <h1 className="heading">Confirm your order</h1>
          <p>
            Reciepient: <b>{user.email}</b>
          </p>
          <div className="heading_grid">
            <p>Product</p>
            <p>Name</p>
            <p>Price</p>
          </div>
          {cart.map((product) => (
            <div key={product.id}>
              <div className="details_grid">
                <img src={product.preview} alt={product.name} />
                <p>{product.name}</p>
                <p>
                  <b>NGN</b> {product.price - 349}
                </p>
              </div>
              <hr /> <br />
            </div>
          ))}
          <div className="pay_grid">
            <p>.</p>
            <button
              className="pay_btn"
              onClick={() => {
                handleFlutterPayment({
                  callback: (response) => {
                    console.log(response);
                    closePaymentModal();
                    handleClearCart();
                  },
                  onClose: () => {},
                });
              }}
            >
              Pay NGN{total}
            </button>
          </div>
        </>
      ) : (
        <h1>Nothing to checkout</h1>
      )}

      {cart.length ? (
        <div style={{ paddingTop: "3rem" }} className="cards">
          For flutterwave cards to test with in the payment page, use any of the
          cards in this
          <a
            href="https://developer.flutterwave.com/docs/integration-guides/testing-helpers/"
            style={{ color: "#bb5353" }}
          >
            Link
          </a>
        </div>
      ) : null}
    </div>
  );
}
