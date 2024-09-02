import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { grayDarkTheme, grayLightTheme, lightTheme } from "../../redux/reducers/theme/themeReducers";

function MySlider({ slidesToShow, children }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow ?? 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    draggable: true,
    
  };
  
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className="py-10 px-4 rounded-lg">
      <div className=" mx-auto text-center rounded-lg" style={theme}>
      <Slider {...settings}>
          {children.map((element, index) => (
            <div key={index} className="p-2">
                {element}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default MySlider;
