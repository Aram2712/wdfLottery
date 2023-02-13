import React, {useState, useEffect} from "react";
import './HomePage.css';
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Carousel from '../../Components/Carousel/Carousel.jsx';
import WinnersSlider from "../../Components/WinnersSlider/WinnersSlider.jsx";
import {useGlobalContext} from '../../context';
import { Link } from 'react-router-dom';
import * as constants from "../../constants";

function HomePage() {
      const [surprise, setSurprise] = useState([]);
      const {winners,setWinners}=useGlobalContext();
      // useEffect(()=>{
      //       const options = {
      //             method: 'POST',
      //             credentials: 'include',
      //             headers: {accept: 'application/json', 'content-type': 'application/json'
      //       }
      //           };
                
      //           fetch('https://checkout.payzcart.com/api/v1/create/transaction', options)
      //             .then(response => response.json())
      //             .then(response => console.log(response))
      //             .catch(err => console.error(err));
      // },[])

      useEffect(()=>{
            fetch(`${constants.baseURL}/get_raffles`,{
                  method:"GET",
                  headers:{
                      "Content-Type":"application/json",
                      'Authorization':`Bearer ${localStorage.getItem('token')}`
                  }
            })
            .then(response=>response.json())
            .then(result=>setSurprise(result))
            .catch(err=>console.log(err))
      },[])

      useEffect(()=>{
            fetch(`${constants.baseURL}/send_winners`,)
            .then(response=>response.json())
            .then(result=>setWinners(result))
            .catch(err=>console.log(err))
      },[])
      
      const saveRaffle=(e)=>{
            localStorage.setItem("raffleId",JSON.stringify(e))
      }
     
      return(
            <div className="HomePage">
      
                  <Header/>
                  <div className="slider_box">
                        <Carousel/>
                        
                  </div>
                  <div className="surprise_box">
                        {
                              surprise.map(item=>
                                    <div className="surprise_example_box" key={item.title}>
                                          <div className="surprise_example_top_box">
                                                <img src={`${constants.baseURL}/`+item.raffleImg.slice(6)} className="surprise_image"/>
                                                <div className="surprise_example_top_opacity_box">
                                                      <h2 className="surprise_example_top_opacity_head">{item.title}</h2>
                                                </div>
                                          </div>
                                          <div className="surprise_example_bottom_box">
                                                <button className="choose_number_button"><Link className="link_to_choose_page" onClick={saveRaffle.bind(this,item)} to="/choosepage">Choose Your Number</Link></button>
                                                <p className="surprise_example_bottom_text">
                                                      {item.raffleDesc}
                                                </p>
                                          </div>
                                    </div>      
                              )
                        }
                        
                  </div>
                  <div className="winners_box">
                        <div className="winners_header_box">
                              <h4 className="winners_rated_users">Our top rated by users</h4>
                              <h2 className="winners_head">Our Winners</h2>
                        </div>
                        <div className="winner_carousel_box">
                              <WinnersSlider/>
                        </div>

                  </div>
            <Footer/>
            </div>
      )
}

export default HomePage