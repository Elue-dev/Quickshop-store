import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../contexts/StoreContext";
import { BiLoader } from "react-icons/bi";
import { FaOpencart } from "react-icons/fa";
import { MdBackspace } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./productDetails.scss";

export default function ProductDetails() {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const navigate = useNavigate();
  const {
    state: { cart, wishlist },
    addToCart,
    addToWishlist,
    removeFromWishlist,
  } = useStore();

  useEffect(() => {
    const prodDetail = async () => {
      const details = await fetch(process.env.REACT_APP_API + id);
      const detailsData = await details.json();
      setItem(detailsData);
    };

    prodDetail();
  }, []);

  useEffect(() => {
    setSelectedImg(item.preview);
  }, [item.preview]);

  const [selectedImg, setSelectedImg] = useState(null);

  const handleAddItem = () => {
    addToCart(item);
    toast.success(`${item.name} was added to your cart`, {
      autoClose: 5000,
      pauseOnFocusLoss: false,
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const handleAddWishlist = () => {
    addToWishlist(item);
    toast.success(`${item.name} was added to your wishlist`, {
      autoClose: 5000,
      pauseOnFocusLoss: false,
    });
  };

  const handleRemoveWishlist = (product) => {
    removeFromWishlist(product);
    toast.success(`${product.name} was removed from your wishlist`, {
      autoClose: 5000,
      pauseOnFocusLoss: false,
    });
  };

  if (item.length === 0) {
    return (
      <div className="spinner details_spinner">
        <BiLoader />
      </div>
    );
  }

  return (
    <div className="product_details">
      <p className="back det_back" onClick={() => navigate(-1)}>
        <MdBackspace />
      </p>
      <div className="page_desc desc_link">
        <p>
          <Link to="/">Home</Link> / <span>Product detail</span>
        </p>
      </div>
      <h1>Product Detail</h1>
      <div className="details_row">
        <div className="product_detail_container">
          <div className="image_container">
            <img src={selectedImg} alt={item.name} id="large_img" style={{border: '2px solid grey'}} />
          </div>

          <div className="small_images_container">
            {item.photos?.map((photo) => (
              <img
                key={photo}
                src={photo}
                alt={item.name}
                className="small_image"
                id="small_img"
                style={{border: selectedImg === photo ? '2px solid grey' : ''}}
                onClick={() => setSelectedImg(photo)}
              />
            ))}
          </div>
        </div>

        <div className="details_texts">
          <p className="detail_name">{item.name}</p>
          <p>{item.description}.</p>
          <p>
            <b>Product brand: </b>
            {item.brand}
          </p>
          <p className="detail_price">
            <span>NGN {item.price}</span>
            <span>NGN {item.price - 349}</span>
          </p>
          {cart.some((c) => c.id === item.id) ? (
            <button disabled className="btn add_to_cart disabled">
              In cart
            </button>
          ) : (
            <button onClick={handleAddItem} className="btn add_to_cart">
              Add to cart
            </button>
          )}
          {wishlist.some((w) => w.id === item.id) ? (
            <button
              onClick={() => handleRemoveWishlist(item)}
              className="btn buy_now"
            >
              Remove from wishlist
            </button>
          ) : (
            <button onClick={handleAddWishlist} className="btn buy_now">
              Add to wishlist
            </button>
          )}{" "}
          <br />
          <Link to="/cart" className="go_to_cart">
            Go to cart <FaOpencart className="go_to_cart_icon" />
          </Link>
        </div>
      </div>
    </div>
  );
}
