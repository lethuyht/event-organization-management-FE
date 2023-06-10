import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Image } from 'antd';
import styled from '@emotion/styled';

const SliderComponent = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    const images = [
        'https://polaris-event.s3.ap-southeast-1.amazonaws.com/static/Slideshow/home_slideshow.jpg',
        'https://polaris-event.s3.ap-southeast-1.amazonaws.com/static/Slideshow/home_slideshow1.jpg',
        'https://polaris-event.s3.ap-southeast-1.amazonaws.com/static/Slideshow/home_slideshow3.jpg',
    ];

    const SlideShowStyles = styled.div`
    background: #00081e;
    .slider-wrapper {
        max-width: 100px; 
        margin: 0 auto;
        margin-top: 20px;
    }

    .ant-image{
        width:100%
    }
    
`;

    return (
        <SlideShowStyles>
            <Slider {...settings} >
                {images.map((image, index) => (
                    <div key={index} className='w-full'>
                        <Image src={image} preview={false} height={600} style={{ width: "100%" }} />

                    </div>
                ))}
            </Slider>
        </SlideShowStyles>
    );
};

export default SliderComponent;