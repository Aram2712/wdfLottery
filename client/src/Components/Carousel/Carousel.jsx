import React from "react";
import './Carousel.css';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import image1 from '../../Images/HomePage/banner1.jpg';
import image2 from '../../Images/HomePage/Banner2.jpg';
import image3 from '../../Images/HomePage/fon.png';


const fadeImages=[
      {
      url: image1,
      caption: 'First Slide'
      },
      {
      url: image2,
      caption: 'Second Slide'
      }
      ];

const buttonStyle = {
      display:"none"
      };

const properties = {
      prevArrow: <button style={{ ...buttonStyle }}></button>,
      nextArrow: <button style={{ ...buttonStyle }}></button>
      }

function Slider() {
  
      return(
            <div className="slide-container">
                  <Fade {...properties} autoplay={true} duration={1000} transitionDuration={1000}>
                        {fadeImages.map((fadeImage, index) => (
                        <div className="each-fade" key={index}>
                              <div className="image-container">
                                    <img src={fadeImage.url} className="slider_image"/>
                              </div>
                        
                        </div>
                        ))}
                  </Fade>
                  <div className="opacity_box">
                              <p className="opacity_top_text">win $ 1.000.000 every Month</p>
                              <h3 className="opacity_head_text">You Can Big Win</h3>
                              <p className="opacity_bottom_text">
                                    Your chosen numbers can make something amazing happen.<br/> Try your chance. It’s your turn!
                              </p>
                  </div>
            </div>
      )
}

export default Slider;