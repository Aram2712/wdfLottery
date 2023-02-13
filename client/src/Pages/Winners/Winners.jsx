import React, {useState, useEffect} from "react";
import  './Winners.css';
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Slider from "react-slick";
import {useGlobalContext} from "../../context";
import * as constants from "../../constants";

function Winners() {
    const bgColor = {fon:"#000F26"};
    const [winners, setWinners]=useState([]);
    const [dataWinners, setDataWinners]=useState([]);

    useEffect(()=>{
        fetch(`${constants.baseURL}/send_winners`,)
        .then(response=>response.json())
        .then(result=>setWinners(result))
        .catch(err=>console.log(err))
    },[])

    useEffect(()=>{
        for(let i=0; i<winners.length; i+=50){
            let arr=winners.slice(i,i+50)
            setDataWinners(dataWinners=>{return [...dataWinners, arr]})
        }
    },[winners])

    const settings={
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        accessibility:true,
        arrows:false,
        customPaging: function(i) {
            return (
                <a className="slide_indicators">
                    {i+1}
                </a>
            )
        }
    };

    return(
        <div className="Winners">
            <Header bgColor={bgColor}/>
            <div className="wdf_winners_header_box">
                <h4 className="winners_dute_free_head">
                    World Duty Free
                </h4>
                <h3 className="wdf_lottery_winner_head">
                    WDF Lottery Winners
                </h3>
            </div>
            <div className="wdf_winners_slider_box">
                <Slider {...settings}>
                    {
                        dataWinners.map((item, index)=>
                            <div key={index} className="carusel_item_winners_box">
                                {
                                    item.map((v,i)=><div key={i} className="carusel_item_small_winners_box">
                                        <div className="wdf_winner_image_box">
                                            <img src={`${constants.baseURL}/`+v.winnerImg.slice(6)} className="wdf_winner_image"/>
                                        </div>
                                        <div className="wdf_winner_data_box">
                                            <div className="wdf_winner_date_box">
                                                <p className="wdf_winner_or_date">{v.drawDate}</p>
                                            </div>
                                            <div className="wdf_winner_person_box">
                                                <p className="wdf_winner_series_text">SERIES NO : {v.drawSeriesNo}</p>
                                                <p className="wdf_winner_name_text">{v.fullName}</p>
                                                <div className="winner_wdf_big_data_box">
                                                    <div className="winner_wdf_data_box">
                                                        <p className="wdf_winner_data_data">Ticket No</p>
                                                        <p className="wdf_winner_data_data">Draw Date</p>
                                                        <p className="wdf_winner_data_data">Nationality</p>

                                                    </div>
                                                    <div className="winner_wdf_data_value_box">
                                                        <p className="wdf_winner_data_value">: {v.ticketNo}</p>
                                                        <p className="wdf_winner_data_value">: {v.drawDate}</p>
                                                        <p className="wdf_winner_data_value">: {v.nationality}</p>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)
                                }
                            </div>
                        )
                    }
                </Slider>
            </div>
        </div>
    )
}

export default Winners
