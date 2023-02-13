import React, {useState} from "react";
import './Footer.css';
import instagram from '../../Images/HomePage/Instagram.png';
import linkedin from '../../Images/HomePage/LinkedIn.png';
import twitter from '../../Images/HomePage/Twitter.png';
import facebook from '../../Images/HomePage/Facebook.png';
import smalllogo from '../../Images/HomePage/smalllogo.png';
import subscribeimage from '../../Images/HomePage/subscribe.gif'
import {Link} from "react-router-dom";
import * as constants from "../../constants";


function Footer() {
      const user=JSON.parse(localStorage.getItem('user'));
      const [subscribeMail, setSubscribeMail]=useState();
      const [subscribe, setSubscribe]=useState(false);
      const [errorSubscribe, setErrorSubscribe]=useState(false);

      const submitSubscribe=(e)=>{
            if(subscribeMail){
                  e.preventDefault();
                  fetch(`${constants.baseURL}/subscribe`,{
                        method:"POST",
                        headers:{
                              "Content-Type":"application/json"
                        },
                        body:JSON.stringify({
                              mail:subscribeMail
                        })
                  })
                  .then(response=>response.json())
                  .then(result=>{
                        if(result){
                              setSubscribe(true);
                        }
                  })
                  .catch(err=>console.log(err))
            }
            else{
                  setErrorSubscribe(true)
            }
      }
      return(
            <div className="Footer">
                  <div className="footer_subscribe_box">
                        <form className="footer_subscribe_form" onSubmit={submitSubscribe}>
                              <p className="footer_subscribe_text">Subscribe to WDF NewsLetter</p>
                              <input type="email"  className="footer_subscribe_input"
                                    placeholder="Your Email" 
                                    value={subscribeMail} onChange={(e)=>setSubscribeMail(e.target.value)} 
                                    style={{border:errorSubscribe?"1px solid red":"none"}}/>
                              <input type="submit" className="footer_subscribe_button" value="subscribe"/>
                        </form>
                  </div>
                  {
                        subscribe?
                  
                  <div className="subscribe_alert_box">
                        <div className="subscribe_alert_exit_box">
                              <i className="fa-solid fa-xmark exit_signup_modal" style={{marginRight:"20px", fontSize:"20px"}} onClick={()=>{setSubscribe(false); setSubscribeMail("")}}></i>
                        </div>
                        <img src={subscribeimage} className="subscribe_image"/>
                        <p className="subscribe_alert_text">
                              Check your inbox.
                              We’ve sent you a confirmation email. Just confirm your address to get our promo and news updates.
                        </p>
                  </div>
                  :null
                  }
                  <div className="footer_main_box">
                        <div className="footer_social_media_box">
                              <img src={smalllogo} className="small_logo"/>
                              <p className="footer_social_media_text">
                              Launched in February 2023, the World Duty Free has <br/> captured 
                              the imagination of travellers around the globe<br/> offering one-in-5,000 chances to win INR 1 Crore .</p>
                                
                              <div className="footer_social_media_icons_box">
                                    <img src={facebook} className="social_media_icon"/>
                                    <img src={linkedin} className="social_media_icon"/>
                                    <img src={twitter} className="social_media_icon"/>
                                    <img src={instagram} className="social_media_icon"/>
                              </div>
                              
                        </div>
                        <div className="footer_company_box">
                              <h3 className="footer_company_head">Company</h3>
                              <ul className="footer_company_list">
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/about_us">About</Link></li>
                                    <li><Link to="/winners">Winners</Link></li>

                              </ul>
                        </div>
                        <div className="footer_services_box">
                              <h3 className="footer_services_head">Services</h3>
                              <ul className="footer_services_list">
                                    <li><Link to="/privacy">Privacy</Link></li>
                                    <li><Link to="/terms">Terms</Link></li>
                                    <li><Link to="/help">FAQ</Link></li>

                              </ul>

                        </div>
                        <div className="footer_contact_box">
                    
     
                              <h3 className="footer_contact_head">Contact Us</h3>
                              <ul className="footer_contact_list">
                                    {/* <li>
                                          <i className="fa fa-phone contact_icon" style={{fontSize:"20px", color:"white"}}></i>
                                          <span>0000000</span>
                                    </li> */}
                                          
                                    <li>
                                          <i className="fa fa-envelope contact_icon" style={{fontSize:"20px", color:"white"}}></i>
                                          <span>info@wdflottery.com</span>
                                    </li>
                                    <li>
                                          <i className="fa fa-map-marker contact_icon" style={{fontSize:"20px", color:"white"}}></i>
                                          <span className="wdf_address_span">8 Rothbury Rd, Hove BN3 5LH, UK</span>
                                    </li>

                              </ul>
             
                        </div>
                  </div>
                  <div className="footer_reserved_box">
                        <p className="footer_reserved_text">© WDF February 2023. All rights reserved.</p>
                  </div>
            </div>
      )
}

export default Footer
                                    

