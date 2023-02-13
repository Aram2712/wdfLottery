import React, {useState, useEffect} from "react";
import './ChoosePageCar.css';
import {Link} from 'react-router-dom';
import { useGlobalContext } from "../../context";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ChooseWinnerCar from "../../Components/ChooseWinner/ChooseWinnerCar";
import car from "../../Images/ChooseImage/Car.png";
import bike from "../../Images/ChooseImage/Moto.jpg";
import milion from "../../Images/ChooseImage/Crore.svg";
import model from "../../Images/ChooseImage/model.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import available from "../../Images/ChooseImage/available.png";
import soldout from "../../Images/ChooseImage/soldout.png";
import notStarted from "../../Images/ChooseImage/notStarted.png";
import * as constants from "../../constants";

function ChoosePage() {
    const bgColor = {fon:"#000F26"};
    const [raffles, setRaffles]=useState([])
    const [thisraffle, setThisRaffle]=useState(JSON.parse(localStorage.getItem("raffleId")))
    const {winners} = useGlobalContext();

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: raffles.length>= 3 ? 3 :raffles.length== 2 ? 2 : 1,
        slidesToScroll: 1,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
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
                    initialSlide: 1,
                    arrows:false
                }
            },
        ]
    };
    const [api, setApi]=useState(()=>thisraffle.title=="Mega Millions"?"million_raffle":"vehicle_raffle_infos")
    console.log(winners)
    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior:"smooth"

        });

        fetch(`${constants.baseURL}/${api}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify({id:thisraffle.id})
        })
        .then(response=>response.json())
        .then(result=>setRaffles(result))
        .catch(err=>console.log(err))
    },[])

    
    const concretRaffle=(e)=>{
        localStorage.setItem("concretRaffle", JSON.stringify(e))
    }
    console.log(raffles)
    return(
        <div className="ChoosePage">
            <Header bgColor={bgColor}/>
                <div className="choose_page_top_box">
                    <div className="choose_page_top_text_box">
                        <h4 className="world_duty_free">
                            World Duty Free
                        </h4>
                        <h2 className="surprise_luxury_head">
                            {
                            
                            thisraffle.title=="Surprise Car"? "Surprise Luxury Cars" : thisraffle.title=="Surprise Bike"?
                            "Surprise Luxury Bikes":"Surprise Mega Million"
                            }
                        </h2>
                        <p className="surprise_luxury_text">
                            The Finest Surprise Promotion is now in its<br/> 
                            5th year, making it the longest-running <br/>promotion in the world
                        </p>
                
                    </div>
                    <div className="choose_page_top_image_box">
                        <img src = {thisraffle.title=="Surprise Car"?car:thisraffle.title=="Surprise Bike"?bike:milion} className="choose_big_image"/>
                    </div>
                </div>
                <div className="buy_tickets_head_box">
                    <h4 className="choose_your_lucky_number">
                        Choose your lucky number
                    </h4>
                    <h2 className="buy_tickets_head">
                        Buy Tickets
                    </h2>
                </div>
                <div className="tickets_carusel_box">
                    <Slider {...settings} >
                        {
                            raffles.map(item=>
                                <div className="carusel_slide_box" key={item.id}>
                                    <div className="slide_image_box">
                                        {
                                            thisraffle.title=="Mega Millions"? 
                                            <img src={`${constants.baseURL}/`+item.imgPath.slice(6)}  className="clientsCarousel"/>
                                            :
                                            <img src={`${constants.baseURL}/`+item.vehicleImage.slice(6)}  className="clientsCarousel"/>

                                        }
                                        {
                                            item.status=="Available"?
                                            <img src={available} className="slide_image_status_image"/>
                                            :item.status=="Is not started yet"?
                                            <img src={notStarted} className="slide_image_status_image"/>
                                            :
                                            <img src={soldout} className="slide_image_status_image"/>
                                        }

                                    </div>
                                    <div className="slide_series_number_box">
                                        <p className="slide_series_number_text">
                                            SERIES NO: {item.seriesNo}
                                        </p>
                                    </div>
                                    <div className="slide_data_box">

                                        <h4 className="product_name">
                                            {item.name?item.name:item.subRaffleTitle} 
                                        </h4>
                                        {item.exterior_color?
                                        <p className="pruduct_color">
                                            {item.exterior_color}
                                        </p>:null}
                                        
                                            {
                                                item.solution?
                                                <p className="product_prize_price">
                                                    Prize Money:
                                                    <i className="fa fa-inr" aria-hidden="true" style={{color:"rgba(255,255,255,0.8)",padding:"0 7px"}}></i>{item.solution}
                                                </p>
                                                :null
                                            }
                                       
                                        <h3 className="product_count">
                                            {item.ticketCount} <span>Tickets</span> 
                                        </h3>

                                        <Link to="/buy_tickets" onClick={concretRaffle.bind(this,item)} className="link_to_buy_tickets">
                                            
                                            <button className="ticket_remaining_button">
                                            Tickets Remaining   </button>
                                        </Link>
                                        <h3 className="product_prize_price">
                                            Ticket Price: <i className="fa fa-inr" aria-hidden="true" style={{color:"rgba(255,255,255,0.8)",padding:"0 7px"}}></i>{item.price}
                                        </h3>
                                    </div>
                                </div>
                            
                            )
                        }


                    </Slider>
                </div>
                <ChooseWinnerCar winners={winners}/>
            <Footer/>
        </div>
    )
}

export default ChoosePage