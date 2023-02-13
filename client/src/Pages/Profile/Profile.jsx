import React, {useState, useEffect} from "react";
import './Profile.css';
import Header from "../../Components/Header/Header";
import example from "../../Images/profile/example.png";
import Footer from "../../Components/Footer/Footer";
import empty from '../../Images/profile/userwhite.png';
import * as constants from '../../constants';
import axios from "axios";
import { useGlobalContext } from "../../context";

function Profile() {
    const bgColor = {fon:"#000F26"};
    const user=JSON.parse(localStorage.getItem('user'))
    const [mobile, setMobile]=useState(user?user.phoneNo:"");
    const [nationality, setNationality]=useState(user?user.nationality:"");
    const [dataBirth, setDataBirth]=useState(user?user.birthDay:"");
    const [passport, setPassport]=useState(user?user.passport:"");
    const [activeInputs, setActiveInputs]=useState(false)
    const [userAvatar, setUserAvatar]=useState();
    const {currency,file, setFile}=useGlobalContext();
    const [myTickets, setMyTickets]=useState([])
    // const [raffle, setRaffle]=useState([])
    const [raffleTicket, setRaffleTicket]=useState([])
    const axiosMainUrl = axios.create({
        baseURL:constants.baseURL
      });
      
    useEffect(()=>{
        fetch(`${constants.baseURL}/send_bought_draws`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify({id:user.id})
        })
        .then(response=>response.json())
        .then(result=>setMyTickets(result))
        .catch(err=>console.log(err))
        
    },[])

    useEffect(()=>{
    //     if(myTickets){
    //     for(let i=0; i<myTickets[0].length; i++){
    //         for(let j=0; j<myTickets[1].length; j++){
    //             // if(myTickets[0][i].id==myTickets[1][j]){
                    
    //             // }
    //         }
    //     }
    // }
    },[myTickets])
    console.log(myTickets)
    const activateData=()=>{
        setActiveInputs(true)
        for(let i=0;i<document.getElementsByClassName("user_data_input").length;i++){
            document.getElementsByClassName("user_data_input")[i].style.background="white";
            document.getElementsByClassName("user_data_input")[i].style.color="black"
        }
    }

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setFile(reader.result)
                setUserAvatar(e.target.files[0])
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    const submitData=()=>{
        let formData = new FormData();
        fetch(`${constants.baseURL}/users_info_apply`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify({
                mobile, nationality, dataBirth, passport
            })
        })
        .then(response=>response.json())
        .then(result=>{
            console.log(result)
            localStorage.setItem("user", JSON.stringify(result));
            if(userAvatar) { formData.append("avatar", userAvatar)
            axiosMainUrl.post('/upload_image', formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res =>{
                localStorage.setItem("user", JSON.stringify(res.data));
                window.location.reload()
            })
            .catch(err =>console.log(err))
        }
        })
        .catch(err=>console.log(err))
        setActiveInputs(false)
        for(let i=0;i<document.getElementsByClassName("user_data_input").length;i++){
            document.getElementsByClassName("user_data_input")[i].style.background="none";
            document.getElementsByClassName("user_data_input")[i].style.color="rgba(255, 255, 255, 0.6)"
        }
    }
    console.log(myTickets)
    return(
        <div className="Profile">
            <Header bgColor={bgColor}/>
            <div className="profile_main_box">
                <div className="profile_main_privet_box">
                    <h2 className="privet_user_name">Hi {user.firstName},</h2>
                    <p className="privet_user_text">Welcome to your WDF account.</p>
                </div>    
                <div className="profile_main_user_info_box">
                    <div className="user_info_data_and_edit_box">
                        <div className="user_info_datas_box">
                            <div className="user_image_div">
                                <img src={file?file:user.userImg?`${constants.baseURL}`+user.userImg.slice(6):empty} className="user_example_foto"/>
                                <i className='fas fa-camera' 
                                    style={{fontSize:'30px', position:"absolute", 
                                            zIndex:"10",bottom:"10%",left:"42%", 
                                            color:"rgba(0, 0, 0, 0.5)", cursor:"pointer"}}></i>
                                <input type="file" className="user_foto_add_input" onChange={imageHandler} multiple/>
                            </div>
                            <div className="user_info_data_name_mail_box">
                                <h4 className="user_info_data_name">{user.firstName} {user.lastName}</h4>
                                <p className="user_info_data_mail">{user.email}</p>
                            </div>
                            <div className="user_info_mobile_birth_passport_data_box">
                                <div className="user_info_mobile_birth_passport_data_left_box">
                                    <ul className="user_info_data_heads_list">
                                        <li>Mobile:</li>
                                        <li>Nationality:</li>
                                        <li>Date of Birth:</li>
                                        <li>Passport ID:</li>
                                    </ul>
                                </div>
                                <div className="user_info_mobile_birth_passport_data_right_box">
                                    <ul className="user_info_data_inputs_box">
                                        <li>
                                            <input type="tel" 
                                                onKeyDown={(event) => {
                                                    if (event.which>=96 && event.which<=109 || event.which==8) {
                                                        return true;
                                                    }
                                                    else { event.preventDefault() }
                                                }}
                                                onChange={(e)=>setMobile(e.target.value)} className="user_data_input" value={mobile}/>
                                        </li>
                                        <li>
                                            <input type="text" value={nationality} onChange={(e)=>setNationality(e.target.value)} className="user_data_input" />
                                        </li>
                                        <li>
                                            <input type="text" value={dataBirth} onChange={(e)=>setDataBirth(e.target.value)} className="user_data_input" />
                                        </li>
                                        <li>
                                            <input type="text" value={passport} onChange={(e)=>setPassport(e.target.value)} className="user_data_input" />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {activeInputs?
                        <button className="user_data_edit_btn" onClick={submitData}>Save</button>:
                        <button className="user_data_edit_btn" onClick={activateData}>Edit Profile</button>
                        }
                        
                    </div>
                    <div className="user_info_order_tickets_box">
                        <div className="user_orders_and_tickets_box">
                            <div className="user_pre_orders_box">
                                <div className="user_pre_orders_and_tickets_head_box">
                                    <h3 className="user_pre_orders_and_tickets_head">
                                        My Pre-Orders
                                    </h3>
                                </div>
                                <div className="user_pre_orders_and_tickets_number_box">
                                    <p className="user_pre_orders_and_tickets_number">{myTickets.length>0?myTickets[0].length:0}</p>
                                </div>
                            </div>
                            <div className="user_wdf_tickets_box">
                                <div className="user_pre_orders_and_tickets_head_box">
                                    <h3 className="user_pre_orders_and_tickets_head">
                                        My WDF Tickets
                                    </h3>
                                </div>
                                <div className="user_pre_orders_and_tickets_number_box">
                                    <p className="user_pre_orders_and_tickets_number">{myTickets.length>0?myTickets[1].length:0}</p>
                                </div>
                            </div>
                        </div>
                        <div className="user_orders_and_tickets_table_detail_box">
                            <h4 className="user_orders_and_tickets_table_detail_head">
                                My WDF Tickets 
                            </h4>
                            <table className="user_orders_and_tickets_table">
                                <thead>
                                    <tr>
                                        <th>Draw Title </th>
                                        <th>Draw Serial NO</th>
                                        <th>Tickets No</th>
                                        <th>Ticket Price</th>
                                        <th>Order Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        myTickets.length>0?myTickets[0].map(item=>
                                            <tr key={item.id}>
                                                <td>{item.drawtitle}</td>
                                                <td>{item.drawserialno}</td>
                                                <td>{
                                                    myTickets[1].map(v=>v.preOrderId==item.id ? <span>{v.ticketNo}<br/></span> : null)
                                                    }</td>
                                                <td>{myTickets[1].find(v=>v.preOrderId==item.id).ticketPrice}</td>
                                                <td>{item.orderstatus}</td>
                                            </tr>
                                        )
                                        :null
                                    }

                                </tbody>
                            </table>
                        </div>
                       
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Profile