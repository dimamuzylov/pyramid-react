import { HTMLAttributes, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import './DaysPicker.css';
import { postEvent } from '@tma.js/sdk-react';

type DaysPickerProps = HTMLAttributes<unknown> & {
  days: number[];
  onDaysChange?: (days: number) => void;
};

function DaysPicker({ days, onDaysChange, className }: DaysPickerProps) {
  const [swiper, setSwiper] = useState<SwiperClass>();

  return (
    <Swiper
      onSwiper={(swiper) => setSwiper(swiper)}
      modules={[EffectCoverflow]}
      effect='coverflow'
      coverflowEffect={{
        rotate: 0,
        depth: 300,
        modifier: 1,
        slideShadows: false,
      }}
      spaceBetween={40}
      slidesPerView={'auto'}
      grabCursor={true}
      centeredSlides={true}
      initialSlide={1}
      onSlideChange={(e) => {
        onDaysChange?.(days[e.activeIndex]);

        postEvent('web_app_trigger_haptic_feedback', {
          type: 'impact',
          impact_style: 'medium',
        });
      }}
      className={className}
    >
      {days.map((day, index) => (
        <SwiperSlide key={day} className='font-semibold'>
          <span
            className='text-5xl'
            onClick={() => {
              swiper?.slideTo(index);
            }}
          >
            {day}
          </span>
          <span className='text-2xl'>days</span>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default DaysPicker;
