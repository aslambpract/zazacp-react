import Slider from "react-slick";
import { CarouselArrowIndex } from "src/components/carousel";
import Image from "src/components/Image";
import ImageWrapper from "./imageWrapper";

const Main = ({
  images,
  nav,
  setCurrentIndex,
  currentIndex,
  handleOpenLightbox,
  slider,
}) => {
  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (_, next) => {
      if (next > -1) {
        setCurrentIndex(next);
      }
    },
  };

  const handlePrevious = () => {
    slider.current?.slickPrev();
  };

  const handleNext = () => {
    slider.current?.slickNext();
  };

  return (
    <ImageWrapper>
      <Slider {...settings} asNavFor={nav} ref={slider}>
        {images?.map((url) => {
          return (
            <Image
              key={url}
              alt="large image"
              src={url}
              ratio="1/1"
              onClick={() => handleOpenLightbox(url)}
              sx={{ cursor: "zoom-in" }}
            />
          );
        })}
      </Slider>
      <CarouselArrowIndex
        index={currentIndex}
        total={images?.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </ImageWrapper>
  );
};

export default Main;
