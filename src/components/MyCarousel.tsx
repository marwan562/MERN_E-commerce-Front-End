import Image from "next/image";
import { SwiperSlide } from "swiper/react";

type TProps = {
  img: string;
};

const MyCarousel = ({ img }: TProps) => {
  return (
    <SwiperSlide>
      <Image src={img} alt="instagram" width={500} height={500} />
    </SwiperSlide>
  );
};
export default MyCarousel;
