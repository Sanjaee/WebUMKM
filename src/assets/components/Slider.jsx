import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderTop = () => {
  const sliderRef = useRef(null);

  const settings = {
    infinite: true,
    speed: 500,
    autoplaySpeed: 2000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const sliderData = [
    {
      id: 1,
      imageUrl:
        "https://images.tokopedia.net/img/cache/500/VxWOnu/2024/2/7/93985d6c-e90b-4383-b122-18fd7b5f927f.jpg",
      altText: "Slide 1",
    },
    {
      id: 2,
      imageUrl:
        "https://images.tokopedia.net/img/cache/500/VxWOnu/2024/2/5/483f3bbb-3863-4e6f-a4d4-cf9f0ac9ddd8.jpg",
      altText: "Slide 2",
    },

    {
      id: 4,
      imageUrl:
        "https://images.tokopedia.net/img/cache/500/VxWOnu/2024/2/7/01d68c69-c5e9-45a8-ad62-acdff2cbf556.jpg",
      altText: "Slide 2",
    },
  ];

  return (
    <div className="relative w-full max-w-[1200px] mt-20 sm:mt-32 sm:rounded-xl sm:pr-6 sm:pl-6">
      <Slider {...settings} ref={sliderRef}>
        {sliderData.map((slide) => (
          <div
            key={slide.id}
            className="flex justify-between items-center h-[129.986px] sm:h-[166.662px]   relative md:h-[240px] sm:rounded-xl"
          >
            <img
              className="object-cover object-center h-full w-full sm:rounded-xl"
              src={slide.imageUrl}
              alt={slide.altText}
              loading="lazy"
            />
          </div>
        ))}
      </Slider>
      <div className="absolute top-1/2 transform -translate-y-1/2 left-4 ">
        <button
          className="text-black font-bold text-2xl hidden sm:block"
          onClick={() => sliderRef.current.slickPrev()}
        >
          <span className="sr-only">Previous</span>
          {"<"}
        </button>
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-4 ">
        <button
          className="text-black font-bold text-2xl bg-white  rounded-full hidden sm:block"
          onClick={() => sliderRef.current.slickNext()}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default SliderTop;
