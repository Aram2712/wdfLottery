import React, {useState, useEffect} from "react";
import './ChooseWinner.css';
import Carousel from "react-multi-carousel";
import machine from '../../Images/ChooseImage/machine.png';
import shoxq from '../../Images/ChooseImage/shoxq.png';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as constants from "../../constants";

function ChooseWinnerCar(props) {
    const [winner, setWinner]=useState([]);
    const [thisraffle, setThisRaffle]=useState(JSON.parse(localStorage.getItem("raffleId")))

    useEffect(()=>{
            fetch(`${constants.baseURL}/send_winners`,)
            .then(response=>response.json())
            .then(result=>{
                if(thisraffle.title=="Surprise Car"){
                    const carWinnerArray=result.filter(v=>v.drawTitle=="Surprise Car");
                    setWinner(carWinnerArray)
                }
                else if(thisraffle.title=="Surprise Bike"){
                    const bikeWinnerArray=result.filter(v=>v.drawTitle=="Surprise Bike");
                    setWinner(bikeWinnerArray)
                }
                else {
                    const milionWinnerArray=result.filter(v=>v.drawTitle=="Mega Million");
                    setWinner(milionWinnerArray)
                }
            })

            .catch(err=>console.log(err))
    },[])

    const settings={
        dots: false,
        infinite: true,
        slidesToShow:  winner.length>= 3 ? 3 :winner.length== 2 ? 2 : 1,
        slidesToScroll: 1,
        speed: 2000,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,

        responsive: [

            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: winner.length>= 2 ? 2 : 1,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    dots: false
                }
            },
            {
                breakpoint: 649,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    initialSlide: 1
                }
            },
        ]
    };
    return(
        <div className="ChooseWinner">
            <h4 className="top_rated_users">
                Our top rated by users
            </h4>
            <h3 className="choose_our_winner">
                Our Winners
            </h3>
            <div className="choose_winner_carusel_box">
                <Slider {...settings} >
                    {
                        winner.length>0?winner.map(item=>

                            <div className="choose_winner_slide" key={item.id}>
                                <img src={`${constants.baseURL}/`+item.winnerImg.slice(6)} className="choose_winner_image"/>
                                <div className="choose_winner_series_box">
                                    <p className="choose_winner_series_number">SERIES NO: {item.drawSeriesNo}</p>
                                    
                                </div>
                            </div>
                        )
                        :null

                    }
                    {/* <div className="choose_winner_slide">
                        <img src={machine} className="choose_winner_image"/>
                        <div className="choose_winner_series_box">
                            <p className="choose_winner_series_number">SERIES NO: Car 1815</p>
                        </div>
                    </div>     
                    <div className="choose_winner_slide">
                        <img src={machine} className="choose_winner_image"/>
                        <div className="choose_winner_series_box">
                            <p className="choose_winner_series_number">SERIES NO: Car 1815</p>
                            
                        </div>
                    </div>
                    <div className="choose_winner_slide">
                        <img src={machine} className="choose_winner_image"/>
                        <div className="choose_winner_series_box">
                            <p className="choose_winner_series_number">SERIES NO: Car 1815</p>
                            
                        </div>
                    </div>      
                    <div className="choose_winner_slide">
                        <img src={machine} className="choose_winner_image"/>
                        <div className="choose_winner_series_box">
                            <p className="choose_winner_series_number">SERIES NO: Car 1815</p>
                            
                        </div>
                    </div>       */}

                </Slider>


            </div>
        </div>
    )
}

export default ChooseWinnerCar