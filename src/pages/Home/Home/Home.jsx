import Banner from "../Banner/Banner";
import BrandName from "../BrandName/BrandName";
import OurServices from "../OurServices/OurServices";
import Reviews from "../Reviews/Reviews";
import Works from "../Works/Works";
import FAQs from "../FAQ/FAQs";

const Home = () => {
  return (
    <div>
      <Banner />
      <Works />
      <OurServices />
      <BrandName />
      <Reviews />
      <FAQs />
    </div>
  );
};

export default Home;
