import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";

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
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="py-10 px-4 rounded-lg">
      <div className=" mx-auto text-center rounded-lg" style={theme}>
      <Slider {...settings}>
      {childrenArray.map((element, index) => (
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
