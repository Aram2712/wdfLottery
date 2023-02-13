import React, {useState} from "react";
import { useSelector } from "react-redux";
import {Link, useNavigate} from 'react-router-dom';
import './Header.css';
import Logo from '../../Images/HomePage/smalllogo.png';
import money from '../../Images/HomePage/money.png';
import faqs from '../../Images/HomePage/faqs.png';
import help from '../../Images/HomePage/help.png';
import empty from '../../Images/HomePage/empty.png';
import {useGlobalContext} from "../../context";
import * as constants from "../../constants";


function Header(props) {
      const [openMenu, setOpenMenu]=useState(false);
      const [openMoneyList, setOpenMoneyList]=useState(false);
      const [openUserMenu, setOpenUserMenu]=useState(false);
      const currencys = useSelector(state => state.currencys);
      const user=JSON.parse(localStorage.getItem("user"))
      const navigate=useNavigate();
      const {currency, setCurrency, file}=useGlobalContext();
      const logout = () => {
            navigate("/");
            localStorage.clear();
            window.location.reload();
      }
      return(
            <div className="Header" style={{backgroundColor:props.bgColor ? props.bgColor.fon : "#010204"}}>
                  <div className="lobo_box">
                        <Link to="/" className="homepage_link"><img src={Logo} className="logo_image"/></Link>
                  </div>
                  <div className="search_help_signin_box">
                        {/* <div className="search_box">
                              <i className="fa fa-search" style={{fontSize:"18px", color:"white"}}></i>
                              <input type="text" className="search_input" style={{backgroundColor:props.bgColor ? props.bgColor.fon : "#010204"}}/>      
                        </div>   */}
                        <div className="help_box">
                              <h3 className="help_head"><Link className="help_head" to="/about_us">About</Link></h3>
                        </div>
                        <div className="FAQ_box">
                              <h3 className="help_head"><Link className="help_head" to="/help">FAQ</Link></h3>
                        </div>
                        {/* <div className="select_money_box" onClick={()=>setOpenMoneyList(!openMoneyList)}>
                              <h3 className="help_head">{currency}</h3>
                              {!openMoneyList?
                                    <i className="fa fa-angle-down arrow_icon" style={{fontSize:"15px", color:"white"}}></i>:
                                    <i className="fa fa-angle-up arrow_icon" style={{fontSize:"15px", color:"white"}}></i>
                              }
                              <div className="currency_list_box" style={{display:openMoneyList?"flex":"none"}}>
                                    <ul className="currency_list">
                                          {
                                                currencys.map((item,index)=>
                                                            
                                                <li key={index}  onClick={()=>setCurrency(item.currency)} >
                                                      <img src={item.flag} 
                                                            className="flag_icon"/>
                                                            {item.currency}
                                                </li>
                                                )
                                          }
                                    </ul>
                              </div>
                              
                        </div> */}
                            
                        <div className="user_image_box">
                              <div className="user_img_box">
                                    <img src={file?file:user && user.userImg?`${constants.baseURL}`+user.userImg.slice(6):empty} className="user_image"/>
                              </div>
                        </div>
                        <div className="signin_box">
                              {
                                    user?
                                    <div className="user_name_arrow_box" onClick={()=>setOpenUserMenu(!openUserMenu)}>
                                          <p className="user_firstName_lastName" 
                                                style={{color:openUserMenu?"#05CDD8":"#FFFFFF"}}>{user.firstName}  {user.lastName}</p>
                                          {
                                                !openUserMenu?
                                                <i className="fa fa-angle-down arrow_icon" 
                                                      style={{fontSize:"15px", color:"white"}}
                                                ></i>
                                                :
                                                <i className="fa fa-angle-up arrow_icon" 
                                                      style={{fontSize:"15px", color:"#05CDD8"}}
                                                ></i>
                                          }
                                    </div>
                                    :
                                    <Link to = "/authorization" className="authorization_link"><button className="signin">SIGN IN</button></Link>
                              }
                              {
                                  openUserMenu &&          
                                    <div className="user_profile_logout_hidden_menu">
                                          <div className="user_hidden_menu_profile_box">
                                                <Link to="/profile" className="user_profile_link">Profile</Link>
                                          </div>
                                          <div className="user_hidden_menu_logout_box" onClick={logout}>
                                                Log Out
                                          </div>
                                    </div>
                              }

                        </div>
                        
                  </div>  
                  <div className="hamburger_bar">
                        {
                              !user?
                              <Link to="/authorization" className="authorization_link mobile_link_signin"><button className="signin mobile_signin_button">SIGN IN</button></Link>
                              :null
                        }
                        {/* <i className="fa fa-search mobile_fa_search" style={{fontSize:"18px", color:"white"}}></i> */}
                        {/* <input type="text" className="mobile_search_input"/>  */}
                        <i className="fa fa-bars" style={{fontSize:"30px", color:"white"}}
                                                 onClick={()=>setOpenMenu(!openMenu)}></i>
                  </div>   
                  <div className="hidden_menu_box" style={{display:openMenu?"flex":"none"}}>
                        <div className="hidden_menu_icon_box">
                              <div className="user_image_box">
                                    <img src={file?file:user && user.userImg?`${constants.baseURL}`+user.userImg.slice(6):empty} className="site_logo"/>
                                        
                              </div>
                              <img src={help} className="menu_icon"/>
                              <img src={faqs} className="menu_icon"/>  
                              {user?
                                    <img src={money} className="menu_icon"/>                    
                              :null
                              }                  


                        </div>
                        <div className="hidden_menu_links_box">
                              <div className="logo_exit_box">
                                   <div className="site_logo_box">
                                   <img src={Logo} className="phone_menu_user_image"/>  
                                    </div>
                                    {
                                          user?
                                          <p className="user_firstName_lastName" style={{fontSize:"15px", lineHeight:"25px"}}>{user.firstName} <br/>{user.lastName}</p>
                                          : null
                                    }

                                    <i className="fa-solid fa-xmark" onClick = {()=>setOpenMenu(false)}></i>
                              </div>
                              <ul className="hidden_menu_links_list">
                                    <li className="help_head"><Link to="/about_us">About</Link></li>
                                    <li className="help_head"><Link to="/help">FAQ</Link></li>
                                    {/* <li className="help_head" onClick={()=>setOpenMoneyList(!openMoneyList)}>{currency} 
                                          {!openMoneyList?
                                                <i className="fa fa-angle-down arrow_icon" style={{fontSize:"24px", color:"white"}}></i>:
                                                <i className="fa fa-angle-up arrow_icon" style={{fontSize:"24px", color:"white"}}></i>
                                          }
                                          <div className="hidden_menu_currency_list_box" style={{display:openMoneyList?"flex":"none"}}>
                                                <ul className="currency_list">
                                                      {
                                                            currencys.map((item,index)=>
                                                                        
                                                            <li key={index}  onClick={()=>setCurrency(item.currency)} >
                                                                  <img src={item.flag} 
                                                                        className="flag_icon"/>
                                                                        {item.currency}
                                                            </li>
                                                            )
                                                      }
                                                </ul>
                                          </div>
                                    </li> */}
                                    {
                                          user?<li className="help_head">
                                                <Link to="/profile" className="user_profile_link link_to_profile">Profile</Link>

                                          </li>:null
                                    }
                                    {
                                          user? <li className="help_head" onClick={logout}>
                                                Log Out
                                          </li>:null
                                    }

                                    {/* <li className="hidden_menu_signin_li">
                                   
                                    </li> */}
                                    

                              </ul>
                        </div>
                  </div>   
            </div>
      )
}

export default Header