import { useStore } from "../../contexts/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { IoHeartDislikeSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { MdBackspace } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notiflix from "notiflix";
import RelatedProducts from "./RelatedProducts";
import "./wishList.scss";

export default function WishList() {
  const {
    state: { wishlist },
    removeFromWishlist,
    clearWishlist,
  } = useStore();
  const navigate = useNavigate();

  const handleRemoveWish = (item) => {
    removeFromWishlist(item);
    toast.success(`${item.name} was removed from your wishlist`, {
      autoClose: 4000,
      pauseOnFocusLoss: false,
    });
  };

  const confirmDelete = () => {
    Notiflix.Confirm.show(
      "You are about to clear wishlist",
      "Are you sure you want to clear your wishlist?",
      "PROCEED",
      "CANCEL",
      function okCb() {
        clearWishlist();
        toast.success("Your wishlist was cleared", {
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
        borderRadius: "8px",
        borderRadius: "5px",
        titleColor: "red",
        okButtonBackground: "red",
        cssAnimationStyle: "zoom",
      }
    );
  };

  return (
    <div className="wishlist">
      <p>
        <MdBackspace className="back cart_back" onClick={() => navigate(-1)} />
      </p>
      <div className="page_desc">
        <p>
          <Link to="/">Home</Link> / <span>Wishlist</span>
        </p>
      </div>
      <h1 className="wishlist_title">Your wishlist</h1>
      {!wishlist.length && (
        <p className="wishlist_empty">
          <IoHeartDislikeSharp className="wish_empty" />
          <p>You have nothing in your wishlist</p>
        </p>
      )}
      {wishlist.length ? (
        <p className="wish_length">
          You have{" "}
          <b>{wishlist.length === 1 ? "1 item" : `${wishlist.length} items`}</b>{" "}
          in your wishlist so far.
        </p>
      ) : null}
      {wishlist?.map((wish) => (
        <div key={wish.id}>
          <div className="wishlist_item">
            <div className="item_image">
              <img src={wish.preview} alt={wish.name} />
            </div>
            <div className="cart_price">
              <b>NGN</b> {wish.price - 349}
            </div>
            <Link to={`/product/${wish.id}`}>
              <FaEye className="view_item" />
            </Link>
            <button
              className="remove_item"
              onClick={() => handleRemoveWish(wish)}
            >
              <AiOutlineClose className="remove_icon" />
            </button>
          </div>
          <hr />
          <hr />
        </div>
      ))}
      {wishlist.length > 1 ? (
        <div className="clear_wishlist">
          <p>.</p>
          <button onClick={confirmDelete}>Clear wishlist</button>
        </div>
      ) : null}
      <RelatedProducts />
    </div>
  );
}
