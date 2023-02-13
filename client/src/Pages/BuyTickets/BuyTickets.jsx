import React, { useState, useEffect, useRef } from "react";
import './BuyTickets.css';
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer"
import {useGlobalContext} from "../../context";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import umbrella from '../../Images/ChooseImage/Umbrella.png';
import book from '../../Images/ChooseImage/Book.png';
import cloud from '../../Images/ChooseImage/Cloud.png';
import light from "../../Images/ChooseImage/Light.png";
import car from "../../Images/ChooseImage/carcaptcha.png";
import * as constants from "../../constants";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";


function BuyTickets() {
    ReactModal.setAppElement('#root');
    const user=JSON.parse(localStorage.getItem('user'))
    const [raffle, setRaffle]=useState(JSON.parse(localStorage.getItem("raffleId")))
    const [concretRaffle, setConcretRaffle]=useState(JSON.parse(localStorage.getItem("concretRaffle")))
    const bgColor = {fon:"#000F26"};
    const [productallTickets, setProductallTickets] = useState([]);
    const [productOddTickets, setProductOddTickets]=useState([]);
    const [productEvenTickets, setProductEvenTickets]=useState([]);
    const [productLucky, setProductLucky]=useState([]);
    const [allTicketsCount, setAllTicketsCount]=useState(0)
    const [oddTicketsCount, setOddTicketsCount]=useState(0)
    const [evenTicketsCount, setEvenTicketsCount]=useState(0)
    const [search, setSearch]=useState("");
    const [searchTicketData, setSearchTicketData]=useState([]);
    const {showAllTickets, showEvenTickets, showOddTickets, 
           showLucky, allTickets, oddTickets, evenTickets, lucky,searchYourTicket,
           showSearchTicket,captchaNames,showPayment, currency}=useGlobalContext();
    const [tickets, setTickets]=useState([])       
    const [seeAlert, setSeeAlert]=useState(false);
    const [card, setCard]=useState([])
    const [captcha, setCaptcha]=useState(captchaNames[Math.floor(Math.random()*captchaNames.length)])
    const [clickCaptcha, setClickCaptcha]=useState("");
    const [errorCaptcha, setErrorCaptcha]=useState(false);
    const [valute, setValute]=useState();
    const [exchange, setExchange] = useState()
    const navigate=useNavigate();

    // useEffect(()=>{

    //     fetch('https://v6.exchangerate-api.com/v6/415dab593a9c66ec81868e53/latest/INR')
    //         .then(response => response.json())
    //         .then(result => {
    //              setValute(result.conversion_rates)  
    //         })
    //         .catch(err => console.error(err));
    // },[currency])

    // useEffect(()=>{
    //     for(let key in valute){
    //         if(key==currency){
    //             setExchange(valute[key])
    //         }
    //     }
    // },[valute])
    
    useEffect(()=>{
        fetch(`${constants.baseURL}/get_raffle&tickets`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify({id:concretRaffle.id, raffle_id:raffle.id})
        })
        .then(response=>response.json())
        .then(result=>setTickets(result))
        .catch(err=>console.log(err))
    },[])

    useEffect(()=>{
        let arrOdd=[];
        let arrEven=[]
        for(let i=0; i<tickets.length; i++){
            setAllTicketsCount(tickets.length);
            if(i%2==0){
                arrOdd.push(tickets[i]);
            }
            else if(i%2!=0){
                arrEven.push(tickets[i]);
            }
        }
        setOddTicketsCount(arrOdd.length);
        setEvenTicketsCount(arrEven.length);

        if(allTickets){
            for(let i=0; i<tickets.length; i+=1000){
                let arr=tickets.slice(i,i+1000)
                setProductallTickets(productallTickets=>{return [...productallTickets, arr]})
            }
            setProductOddTickets([]);
            setProductEvenTickets([]);
            setProductLucky([])
        }  

        else if(oddTickets){
            let arr=[];
            for(let i=0; i<tickets.length; i++){
                if(parseInt(tickets[i].ticketNo)%2==0){
                    arr.push(tickets[i]);
                }
            }
            for(let i=0; i<arr.length; i+=1000){
                let odd=arr.slice(i,i+1000)
                setProductOddTickets(productOddTickets=>{return [...productOddTickets, odd]})
            }
            setProductallTickets([]);
            setProductEvenTickets([]);
            setProductLucky([])
        }

        else if(evenTickets){
            let arr=[];
            for(let i=0; i<tickets.length; i++){
                if(parseInt(tickets[i].ticketNo)%2!=0){
                    arr.push(tickets[i]);
                }
            }
            setEvenTicketsCount(arr.length);

            for(let i=0; i<arr.length; i+=1000){
                let even=arr.slice(i,i+1000)
                setProductEvenTickets(productEvenTickets=>{return [...productEvenTickets, even]})
            }
            setProductOddTickets([]);
            setProductallTickets([]);
            setProductLucky([])
        }

        else if(lucky){
            findLuckyTicket();
            setProductOddTickets([]);
            setProductallTickets([]);
            setProductEvenTickets([])
        }    
    },[tickets, allTickets, oddTickets, evenTickets, lucky, card])
    
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
    // const scrollTo = (ref) => {
    //     if (ref && ref.current /* + other conditions */) {
    //       ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    //     }
    //   }
    const showToCard=(e)=>{
        let buyCard=tickets.find(v=>v.id==e.id);
        let searchToCard=card.find(v=>v.id==e.id)
        console.log(e)
        if(buyCard && !searchToCard && card.length<10){
            setCard(card=>{return [...card,buyCard]})
            setTickets(tickets.map(v=>v.id==e.id?{...v, isBuy:true}:{...v}))
            setProductallTickets([]);
            setProductOddTickets([]);
            setProductEvenTickets([]);
            setProductLucky([]);
        }
        if(window.innerWidth<=567) {
            setSeeAlert(true);
            setTimeout(()=>setSeeAlert(false),4000)
        }
        setSearch("")
        
    }

   
    const findLuckyTicket=()=>{
        let ticketLucky=tickets[Math.floor(Math.random()*tickets.length)]
        setProductLucky([ticketLucky]);
    }
    const searchTicket=()=>{
        showSearchTicket()
            let ticket=tickets.find(v=>v.ticketNo==search)
            if(ticket){
                setSearchTicketData([ticket])
            }
    }
    const buyCardTickets=()=>{
        if(card.length>0){
            let price=card?card.reduce((a,b)=>a+parseInt(b.ticketPrice),0):"0"
            let numbers=card.map(item=>item.ticketNo)
            localStorage.setItem("price",JSON.stringify(price));
            price>0?navigate("/payment"):null;
            let ticketsId=card.map(item=>item.id);
            let refId = 'REF_' + Math.floor(Math.random() * 1000000);
            let dataPayment={
                id:user.id,
                raffleId:raffle.id,
                concretRaffleId:concretRaffle.id,
                ticketsId:ticketsId,
                price:price,
                refId,
                currency:currency,
                ticketNumbers:numbers
            }
            localStorage.setItem("dataPayment", JSON.stringify(dataPayment))
        }

        else{
            setErrorCaptcha(true);
        }
        // localStorage.setItem("price",JSON.stringify(price))
        // if(captcha==clickCaptcha){
        //     setErrorCaptcha(false);
        //     let ticketsId=card.map(item=>item.id)
        //     const price=card.reduce((a,b)=>a+Math.round(exchange*parseInt(b.ticketPrice)),0)
        //     let refId = 'REF_' + Math.floor(Math.random() * 1000000);
        //     localStorage.setItem("refId",JSON.stringify(refId))
        //     fetch(`${constants.baseURL}/buy_tickets`,{
        //         method:"POST",
        //         headers:{
        //             "Content-Type":"application/json",
        //             'Authorization':`Bearer ${localStorage.getItem('token')}`
        //         },
                // body:JSON.stringify(
                //     {
                //     id:user.id,
                //     raffleId:raffle.id,
                //     concretRaffleId:concretRaffle.id,
                //     ticketsId:ticketsId,
                //     price:price,
                //     refId,
                //     currency:currency,
                // })
        //     })
        //     .then(response=>response.json())
        //     .then(result=>console.log(result))
        //     .catch(err=>console.log(err))
            
        // }
  
    }

    const deleteCard=(e)=>{
        setCard(card.filter(v=>v.id!==e.id));
        setTickets(tickets.map(v=>v.id==e.id?{...v, isBuy:false}:{...v}))
        setProductallTickets([]);
        setProductOddTickets([]);
        setProductEvenTickets([]);
        setProductLucky([]);
    }


    return(
        <div className="BuyTickets">
            <Header bgColor={bgColor}/>
            <div className="product_info_box">
                <div className="product_info_image_box">
                    {
                       concretRaffle.vehicleImage? <img src={`${constants.baseURL}/`+concretRaffle.vehicleImage.slice(6)} className="product_image"/>
                       :
                       <img src={`${constants.baseURL}/`+concretRaffle.imgPath.slice(6)} className="product_image"/>
                    }
                    
                    <div className="arrow_box">
                        <p className="product_name_number">{concretRaffle.seriesNo}</p>
                    </div>
                </div>
                <div className="product_info_data_box">
                    <div className="product_name_box">
                        <h4 className="product_name_text">
                            {concretRaffle.name}
                        </h4>
                    </div>
                    <div className="product_series_remaining_box">
                        <p className="product_series_text">Series No:  <span className="product_series_span">{concretRaffle.seriesNo}</span></p>
                        <p className="product_series_text product_series2">Tickets remaining:   <span className="product_series_span"> {concretRaffle.ticketCount}</span></p>
                    </div>
                    <div className="product_xaracter_box">
                        <div className="product_xaracter_left_box">
                            <ul className="product_xaracter_type_list">
                                {
                                    concretRaffle.engine?<li>Engine <span>:</span></li>:null
                                }
                                {
                                    concretRaffle.capacity? <li>Capacity  <span>:</span></li>:null
                                }
                                {
                                    concretRaffle.output?<li>Output <span>:</span></li>:null
                                }
                                {
                                    concretRaffle.transmission?<li>Transmission <span>:</span></li>:null
                                }
                                {
                                    concretRaffle.exterior_color?<li>Exterior Color <span>:</span></li>:null
                                }
                                {
                                    concretRaffle.interior_trim?<li>Interior Trim <span>:</span></li>:null
                                }
                                {
                                    concretRaffle.wheels?<li>Wheels <span>:</span></li>:null
                                }
                                
                            </ul>
                        </div>
                        <div className="product_xaracter_right_box">
                            <ul className="product_xaracter_value_list">
                                {
                                    concretRaffle.engine?<li>{concretRaffle.engine}</li>:null
                                }
                                {
                                    concretRaffle.capacity?<li>{concretRaffle.capacity} </li>:null
                                }
                                {
                                    concretRaffle.output?<li>{concretRaffle.output}</li>:null
                                }
                                {
                                    concretRaffle.transmission?<li>{concretRaffle.transmission}</li>:null
                                }
                                {
                                    concretRaffle.exterior_color?<li>{concretRaffle.exterior_color}</li>:null
                                }
                                {
                                    concretRaffle.interior_trim?<li>{concretRaffle.interior_trim}</li>:null
                                }
                                {
                                    concretRaffle.wheels?<li>{concretRaffle.wheels}</li>:null
                                }

                            </ul>
                        </div>
                    </div>
                    {
                        concretRaffle.solution?
                        <div className="product_ticket_price_box">
                        <div className="product_ticket_price_left_box">
                            <ul className="product_xaracter_type_list">
                                <li>PRIZE MONEY  <span>:</span></li>
                            </ul>
                        </div>
                        <div className="product_ticket_price_right_box">
                            <ul className="product_xaracter_value_list product_ticket_price_list">
                                <li>{tickets.length!=0 ? concretRaffle.solution:"0"} <span>{currency}</span> </li>
                            </ul>
                        </div>
                    </div>
                    :null
                    }
                    <div className="product_ticket_price_box">
                        <div className="product_ticket_price_left_box">
                            <ul className="product_xaracter_type_list">
                                <li>PRICE / TICKET <span>:</span></li>
                            </ul>
                        </div>
                        <div className="product_ticket_price_right_box">
                            <ul className="product_xaracter_value_list product_ticket_price_list">
                                <li>{tickets.length!=0 ? tickets[0].ticketPrice :"0"} <span>{currency}</span> </li>
                            </ul>
                        </div>
                    </div>

                    <div className="DISCLAIMER_box">
                        <p className="DISCLAIMER_text">DISCLAIMER: Ticket items purchashed online will be E-mailed to you</p>
                    </div>
                </div>
            </div>
            <div className="buy_tickets_main_head_box">
                <h4 className="buy_tickets_main_head">Select From Available Tickets</h4>
            </div>
            <div className="product_tickets_main_box">
                <div className="product_tickets_and_header_box">
                    <div className="product_tickets_head_box">
                        <div className="product_tickets_all_box" 
                            style={{background:allTickets?"#000F26":"linear-gradient(to top, rgba(0, 255, 245, 0.5) 24.26%, rgba(0, 255, 245, 0.2) 100.01%)",
                                    height:allTickets?"100%":"80%",
                                    borderRadius:allTickets?"0px":"5px",
                                }}
                            onClick={showAllTickets}>
                            <p style={{color:allTickets?"#05CDD8":"white"}} className="product_tickets_menu_text">ALL {allTicketsCount}</p>
                        </div>
                        <div className="product_tickets_odd_box"
                            style={{background:oddTickets?"#000F26":"linear-gradient(to top, rgba(0, 255, 245, 0.5) 24.26%, rgba(0, 255, 245, 0.2) 100.01%)",
                                    height:oddTickets?"100%":"80%",
                                    borderRadius:oddTickets?"0px":"5px"}}
                            onClick={showOddTickets}>
                            <p style={{color:oddTickets?"#05CDD8":"white"}} className="product_tickets_menu_text">EVEN {oddTicketsCount}</p>
                        </div>
                        <div className="product_tickets_even_box"
                            style={{background:evenTickets?"#000F26":"linear-gradient(to top, rgba(0, 255, 245, 0.5) 24.26%, rgba(0, 255, 245, 0.2) 100.01%)",
                                    height:evenTickets?"100%":"80%",
                                    borderRadius:evenTickets?"0px":"5px"}}
                            onClick={showEvenTickets}>
                            <p style={{color:evenTickets?"#05CDD8":"white"}} className="product_tickets_menu_text">ODD  {evenTicketsCount}</p>
                        </div>
                        <div className="product_tickets_lucky_box"
                            style={{background:lucky?"#000F26":"linear-gradient(to top, rgba(0, 255, 245, 0.5) 24.26%, rgba(0, 255, 245, 0.2) 100.01%)",
                                height:lucky?"100%":"80%",
                                borderRadius:lucky?"0px":"5px"}}
                            onClick={showLucky}>
                            <p style={{color:lucky?"#05CDD8":"white"}} className="product_tickets_menu_text">I’m Feeling Lucky</p>
                        </div>
                        <input type="text" className="product_tickets_search_input" 
                            placeholder="Search" value={search} 
                            onChange={(e)=>setSearch(e.target.value)}
                        />
                        <button className="product_tickets_search_button" onClick={searchTicket}>GO</button>
                    </div>
                    <div className="product_tickets_slide_box">
                        
                        <Slider {...settings} >
                            {allTickets?
                                productallTickets.map((item, index)=>
                                    <div key={index} className="carusel_item_box"  >
                                        {
                                            item.map((v,i)=><div key={i} style={{background:v.isBuy?"white":"linear-gradient(rgb(0,63,80), rgb(0,135,142))"}} className="carusel_item_small_box" onClick={showToCard.bind(this,v)}>
                                                <p className="item_data_name_text" style={{color:v.isBuy?"rgb(0,63,80)":"white"}}>{concretRaffle.seriesNo}</p>
                                                <p className="item_data_number_text" style={{color:v.isBuy?"rgb(0,63,80)":"white"}}>{v.ticketNo}</p>
                                            </div>)
                                        }
                                    </div>
                                )
                                :oddTickets?productOddTickets.map((item, index)=>
                                <div key={index} className="carusel_item_box">
                                    {
                                        item.map((v,i)=><div key={i} className="carusel_item_small_box" style={{background:v.isBuy?"white":"linear-gradient(rgb(0,63,80), rgb(0,135,142))"}}  onClick={showToCard.bind(this,v)}>
                                            <p className="item_data_name_text" style={{color:v.isBuy?"rgb(0,63,80)":"white"}}>{concretRaffle.seriesNo}</p>
                                            <p className="item_data_number_text" style={{color:v.isBuy?"rgb(0,63,80)":"white"}}>{v.ticketNo}</p>
                                        </div>)
                                    }
                                </div>
                                )
                                :evenTickets?productEvenTickets.map((item, index)=>
                                <div key={index} className="carusel_item_box" >
                                    {
                                        item.map((v,i)=><div key={i} className="carusel_item_small_box" style={{background:v.isBuy?"white":"linear-gradient(rgb(0,63,80), rgb(0,135,142))"}}  onClick={showToCard.bind(this,v)}>
                                          <p className="item_data_name_text" style={{color:v.isBuy?"rgb(0,63,80)":"white"}}>{concretRaffle.seriesNo}</p>
                                            <p className="item_data_number_text" style={{color:v.isBuy?"rgb(0,63,80)":"white"}}>{v.ticketNo}</p>
                                        </div>)
                                    }
                                </div>
                                )
                                :lucky?productLucky.map((v, i)=>
                                    <div key={i} className="carusel_item_lucky_search_box" >
                                        <div  className="carusel_item_lucky_search_small_box" 
                                            onClick={showToCard.bind(this,v)} 
                                            style={{background:v.isBuy?"white":"linear-gradient(rgb(0,63,80), rgb(0,135,142))"}}>
                                            <p className="item_data_name_text" style={{color:v.isBuy?"rgb(0,63,80)":"white"}}>{concretRaffle.seriesNo}</p>
                                            <p className="item_data_number_text" style={{color:v.isBuy?"rgb(0,63,80)":"white"}}>{v.ticketNo}</p>
                                        </div>
                                        <i class="fa fa-refresh" 
                                            style={{fontSize:"32px", color:"rgba(0, 255, 245, 0.5)",marginLeft:"30%", cursor:"pointer"}}
                                            onClick={findLuckyTicket}>
                                        </i>
                                        <p className="lucky_try_again_text">TRY AGAIN</p>
                                    </div>   
                                )
                                :searchYourTicket? searchTicketData.map((v,i)=>
                                    <div key={i} className="carusel_item_lucky_search_box" >
                                        <div  className="carusel_item_lucky_search_small_box" 
                                            onClick={showToCard.bind(this,v)} 
                                            style={{background:v.isBuy ? "white" : "linear-gradient(rgb(0,63,80), rgb(0,135,142))"}}> 
                                           
                                            <p className="item_data_name_text" style={{color:v.isBuy?"rgb(0,63,80)":"white"}}>{concretRaffle.seriesNo}</p>
                                            <p className="item_data_number_text" style={{color:v.isBuy?"rgb(0,63,80)":"white"}}>{v.ticketNo}</p>
                                        </div>
                                    </div>
                                    
                                )
                                :null
                            }
                        </Slider>
                        {
                            !lucky?
                            <p className="page_shows_text">Every page shows up to 1000 tickets</p>:null
                        }
                    </div>
                </div>
                <div className="buy_tickets_basket_and_note_box">
                    <div className="product_tickets_basket_box">
                        <div className="product_tickets_basket_head_box">
                            <h4 className="product_tickets_basket_head">
                                Your Selection
                            </h4>
                        </div>  
                        <div className="buy_tickets_box">
                            {
                                card.map((v,i)=>
                                    <div className="buy_tickets_card" key={v.id}>
                                        <p className="item_data_name_text" >{concretRaffle.seriesNo}</p>
                                        <p className="item_data_number_text">{v.ticketNo}</p>
                                        <div className="buy_ticket_hidden_box" onClick={deleteCard.bind(this,v)}>
                                            <i className="fa fa-close" style={{fontSize:"16px", borderRadius:"50%", padding:"5px 10px", backgroundColor:"#008189", color:"white",border:"1px solid"}}></i>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="dottline_box"></div>
                        <div className="dottline_box"></div>

                        <div className="buy_tickets_price_box">
                            <div className="product_tickets_basket_head_box">
                                <h4 className="buy_tickets_head">
                                    Your Selection
                                </h4>
                            </div>   
                            <div className="buy_tickets_price">
                                <p className="buy_all_tickets_price">
                                    {card?
                                        card.reduce((a,b)=>a+parseInt(b.ticketPrice),0):"0"
                                    } <span>{currency}</span>     
                                </p>       
                            </div>
                        </div>    
                        <div className="dottline_box"></div>
                        <div className="dottline_box"></div>  
                        <div className="captcha_and_buynow_box">
                            {/* <div className="captcha_and_buynow_head_box">
                                <h5 className="captcha_head">
                                    Click or Tap on <span>{captcha}</span>
                                </h5>
                            </div>
                            <div className="captcha_image_box" >
                                <div className="captcha_image_small_box" 
                                    onClick={()=>setClickCaptcha("Light")}
                                    style={{background:clickCaptcha=="Light"?"rgba(0, 255, 245, 0.5)":"none"}}>
                                    <img src={light} className="captcha_image"/>
                                </div>
                                <div className="captcha_image_small_box" 
                                    onClick={()=>setClickCaptcha("Book")}
                                    style={{background:clickCaptcha=="Book"?"rgba(0, 255, 245, 0.5)":"none"}}>
                                    <img src={book} className="captcha_image"/>
                                </div>
                                <div className="captcha_image_small_box"    
                                    onClick={()=>setClickCaptcha("Umbrella")}
                                    style={{background:clickCaptcha=="Umbrella"?"rgba(0, 255, 245, 0.5)":"none"}}>
                                    <img src={umbrella} className="captcha_image"/>
                                </div>
                                <div className="captcha_image_small_box" 
                                    onClick={()=>setClickCaptcha("Car")}
                                    style={{background:clickCaptcha=="Car"?"rgba(0, 255, 245, 0.5)":"none"}}>
                                    <img src={car} className="captcha_image"/>
                                </div>
                                <div className="captcha_image_small_box" 
                                    onClick={()=>setClickCaptcha("Cloud")}
                                    style={{background:clickCaptcha=="Cloud"?"rgba(0, 255, 245, 0.5)":"none"}}>
                                    <img src={cloud} className="captcha_image"/>
                                </div>
                            </div>
                            {
                                errorCaptcha?<p className="error_captcha_text">Error</p>:null
                            } */}
                            <div className="buy_tickets_button_box">
                                <button className="buy_tickets_button" onClick={buyCardTickets}>BUY NOW</button>
                            </div>
                        </div>    
                        
                    </div>
                    <div className="product_tickets_buy_note_text_box">
                        <p className="product_tickets_buy_note_text">
                            <span>NOTE: </span>
                            Tickets added to the cart will be on hold for 20 minutes after which 
                            they will become available purchase by other customers.
                        </p>
                    </div>
                </div>
                <div className="select_alert_div" style={{display:seeAlert?"flex":"none"}}>
                    {/* <div className="select_alert_exit_box">
                        <i class="fa fa-close" 
                            style={{fontSize:"20px", color:"rgba(255,255,255,0.5)", margin:"10px", cursor:"pointer"}}
                            onClick={()=>setSeeAlert(false)}></i>
                    </div>     */}
                    <p className="select_alert_text">
                        Your ticket is  selected. Scroll down to buy it. 
                    </p>       
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default BuyTickets