import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Story({ story }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="py-10 px-4 bg-white rounded-lg">
      <div className="max-w-5xl mx-auto text-center">
        <Slider {...settings}>
          {story.map((story) => (
            <div
              key={story.id}
              className="p-4 border-2 shadow-lg rounded-xl mx-2"
            >
              <h3 className="text-lg font-bold mb-2">{story.customerName}</h3>
              <p className="text-gray-600">{story.story}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Story;
