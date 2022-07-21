import { useEffect, useState } from "react";
import { useStore } from "../../contexts/StoreContext";
import { BsCartPlus, BsCartCheck } from "react-icons/bs";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { FaRegEye } from "react-icons/fa";
import { BiLoader } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Products() {
  const {
    state: { cart },
    products,
    setProducts,
    addToCart,
  } = useStore();
  const [term, setTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const fetchProducts = await fetch(process.env.REACT_APP_API);
      const jsonData = await fetchProducts.json();
      setProducts(jsonData);
    };

    getProducts();

    setFilteredProducts(
      products.filter((prod) =>
        prod.name.toLowerCase().includes(term.toLowerCase())
      )
    );
  }, [term, products]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to your cart`, {
      autoClose: 4000,
      pauseOnFocusLoss: false,
      position: toast.POSITION.TOP_LEFT,
    });
  };

  if (products.length === 0) {
    return (
      <div className="spinner">
        <BiLoader />
      </div>
    );
  }

  return (
    <div className="products_section">
      <div className="input">
        <input
          type="search"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search products..."
          className="search"
        />
      </div>
      <h1 className="heading">PRODUCTS</h1>
      {term && (
        <p className="search_filter">
          Products including <i>'{term}'</i>
        </p>
      )}
      {filteredProducts.length === 0 && (
        <span>
          <HiOutlineEmojiSad className="sad_icon" />
          &nbsp; No products matches your search
        </span>
      )}
      <div className="products_data">
        {filteredProducts?.map((product) => (
          <div className="products_card" key={product.id}>
            <div className="products_details">
              <div className="items_icon">
                {cart.some((p) => p.id === product.id) ? (
                  <>
                    <BsCartCheck className="add_item_icon" />
                    <Link to={`/product/${product.id}`}>
                      <FaRegEye className="details_icon" />
                    </Link>
                  </>
                ) : (
                  <>
                    <BsCartPlus
                      className="add_item_icon"
                      onClick={() => handleAddToCart(product)}
                    />
                    <Link to={`/product/${product.id}`}>
                      <FaRegEye className="details_icon" />
                    </Link>
                  </>
                )}
              </div>
              <div className="product_image">
                <img src={product.preview} alt={product.name} />
              </div>
              <div className="product_texts">
                <h2>{product.name}</h2>
                <p>
                  <b>Brand:</b> {product.brand}
                </p>
                <p>
                  <b>Price:</b> NGN {product.price - 349}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
