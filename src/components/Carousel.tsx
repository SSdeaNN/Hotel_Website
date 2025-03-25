"use client";

import dynamic from 'next/dynamic';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <Slider {...settings}>
      <div>
        <img
          src="LOL_nose.jpeg"
          alt="Vista al Paraíso"
          className="w-150 h-150 rounded-lg"
        />
      </div>
      <div>
        <img
          src="cuartos.jpeg"
          alt="Vista al Paraíso"
          className="w-150 h-150 rounded-lg"
        />
      </div>
      <div>
        <img
          src=" cuarto2.jpeg"
          alt="Vista al Paraíso"
          className="w-150 h-150 rounded-lg"
        />
      </div>
    </Slider>
  );
};

export default Carousel;