import "./home.scss";
import heroImage from "../../assets/shop.png";
import Products from "./Products";
import Slider from "../../components/slider/Slider";

export default function Home() {
  return (
    <div className="home">
      <div className='hero' style={{ background: `url(${heroImage})`, backgroundPosition: 'left'}}>
          <div className="hero_text">
            <h2>Shop for your favourites at <br /> <span className='name'>Quick<span>Shop</span></span></h2>
          </div>
      </div>
      {/* <Slider /> */}
      <div className="products">
        {" "}
        <Products />
      </div>
    </div>
  );
}
