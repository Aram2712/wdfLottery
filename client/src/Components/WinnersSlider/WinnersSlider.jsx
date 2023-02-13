import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import surprise from '../../Images/HomePage/surprise.png';
import './WinnersSliders.css';
import { useGlobalContext } from "../../context";
import * as constants from '../../constants';


const responsive={
      superLargeDesktop: {
  
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
            slidesToSlide: 1
      },

      desktop: {
            breakpoint: { max: 3000, min: 1750 },
            items: 3,
            slidesToSlide: 1
      },
      tablet: {
            breakpoint: { max: 1750, min: 1150 },
            items: 2,
            slidesToSlide: 1
      },
      mobile: {
            breakpoint: { max: 1150, min: 0 },
            items: 1,
            slidesToSlide: 1
      }
};
function WinnersSlider(props){
      const {winners}=useGlobalContext();

return(
      <div className="winners_slider_box">
            <Carousel responsive={responsive} 
                      autoPlay={true} 
                      autoPlaySpeed={500} 
                      transitionDuration={2000} 
                      infinite={true}
                      deviceType={props.deviceType}
                  >
                  {
                        winners.map(item=>
                              <div className="winner_slider_image_box" key={item.id}>     
                                    <img src={`${constants.baseURL}`+item.winnerImg.slice(6)}/>
                                    <div className="winner_slider_image_opacity_box"></div>
                                    <div className="winner_image_info_box">
                                          <div className="winner_image_info_header_box">
                                                <span className="winner_image_info_series">SERIES NO :</span>
                                                <span className="winner_image_info_series_number">{item.drawSeriesNo}</span>
                                          </div>
                                          <div className="winner_image_info_main_box">
                                                <div className="winner_image_info_name_box">
                                                      {item.fullName}
                                                </div>
                                                <div className="winner_image_data_box">
                                                      <div className="winner_data_box">
                                                            <p className="winner_data_data">ticket no</p>
                                                            <p className="winner_data_data">draw date</p>
                                                            <p className="winner_data_data">nationality</p>
            
                                                      </div>
                                                      <div className="winner_data_value_box">
                                                            <p className="winner_data_value">:{item.ticketNo}</p>
                                                            <p className="winner_data_value">:{item.drawDate}</p>
                                                            <p className="winner_data_value">:{item.nationality}</p>
            
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                        
                              </div>
                        )
                  }      
                  {/* <div className="winner_slider_image_box">
                        <img src={surprise}/>
                        <div className="winner_slider_image_opacity_box"></div>
                  </div>

                  <div className="winner_slider_image_box">
                        <img src={surprise}/>
                        <div className="winner_slider_image_opacity_box"></div>

                  </div>
                  <div className="winner_slider_image_box"><img src={surprise}/></div>
                  <div className="winner_slider_image_box"><img src={surprise}/></div>
                  <div className="winner_slider_image_box"><img src={surprise}/></div>
                  <div className="winner_slider_image_box"><img src={surprise}/></div>    
                  <div className="winner_slider_image_box"><img src={surprise}/></div> */}
            </Carousel>
      </div>
)
}

export default WinnersSlider