import Navbars from "../components/Navbars";
import Products from "../components/Products";
import SliderTop from "../components/Slider";

const Home = () => {
  return (
    <div className=" justify-center items-center flex flex-col">
      <Navbars />
      <SliderTop />
      <Products />
    </div>
  );
};

export default Home;
