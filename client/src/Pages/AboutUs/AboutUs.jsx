import React, {useEffect} from "react";
import "./AboutUs.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import logo from "../../Images/Authorization/logo.png";
import person1 from "../../Images/About/person1.png";
import person2 from "../../Images/About/person2.png";
import person3 from "../../Images/About/person3.png";
import * as constants from '../../constants';

function AboutUs() {
    const bgColor = {fon:"#000F26"};
    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior:"smooth"
        });
        fetch(`${constants.baseURL}/about_us`,{
            method:"GET",
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response=>response.text())
        .then(result=>console.log(result))
        .catch(err=>console.log(err))
    },[])
    return(
        <div className="AboutUs">
            <Header bgColor={bgColor}/>
            <div className="about_welcome_box">
                <div className="about_welcome_text_box">
                    <h2 className="about_welcome_head_text">
                        Welcome to WDF Lottery. A safe space and platform to feel you Lucky!
                    </h2>
                </div>
                <div className="about_welcome_image_box">
                </div>
            </div>
            <div className="about_logo_text_box">
                <div className="about_logo_box">
                    <img src={logo} className="about_logo"/>
                    <p className="about_logo_text">About Us</p>
                </div>
                <div className="about_text_box">
                    <p className="about_text_box_text">
                        World Duty Free is a lottery page,  in which  you are able to buy tickets and try your luck and succeed. There are   different types of draw . You can win cars,   millions, trips, motorbikes, etc.  To buy tickets you should register for the lottery. Choosing the desired tickets, you should add  them to the cart.   The tickets in the cart  will be unavailable for others within 20  minutes. From each draw you are able to buy maximum 10 tickets.  The draw takes place only after all the tickets are sold out.
                        We will inform you the date and time of the  draw  through your E-mails. Since its opening in February 2023, World Duty Free has grown into one of the biggest travel retail operators in the world. Our goal is to present people unforgettable  and  pleasent moments.
                    </p>
                </div>
                <div className="about_fon_box">

                </div>
              
            </div>
            <div className="about_welcome_present_box">
                <div className="about_welcome_present_image_box">
                </div>
                <div className="about_welcome_present_text_box">
                    <p className="about_text_box_text">
                       We want to give feeling of success and confidence to our users, to make them fullfill with motivation and relief. It boosts excitement, gives an opportunity to challenge yourself and make a lifechanging step with us.
                        The lottery can be both fun and mind-blowing. For most of us, our dreams of winning big in the lottery will never materialise. But just buying a ticket can give us a warm, thrilling feeling of anticipation while we wait for the lucky numbers to be drawn.
                    </p>
                </div>
            </div>
            {/* <div className="about_our_team_box">
                <div className="about_our_team_head_box">
                    <p className="about_our_team_head">
                        Our Team
                    </p>
                </div>
                <div className="about_our_team_person_box">
                    <div className="team_person_box">
                        <img src={person1} className="team_person"/>
                    </div>
                    <p className="team_person_name">
                        Vke Dolores
                    </p>
                    <p className="team_person_work">
                        Founder
                    </p>
                </div>
                <div className="about_our_team_person_box">
                        <div className="team_person_box">
                            <img src={person2} className="team_person"/>
                        </div>
                        <p className="team_person_name">
                            Nabugodonosor Paravyan
                        </p>
                        <p className="team_person_work">
                            Co-Founder
                        </p>
                </div>
                <div className="about_our_team_person_box">
                    <div className="team_person_box">
                            <img src={person3} className="team_person"/>
                    </div>
                    <p className="team_person_name">
                            Gyulnar Dxtrikyan
                    </p>
                    <p className="team_person_work">
                        CEO
                    </p>
                </div>
            </div>
            <div className="about_founder_box">
                <div className="about_founder_text_box">
                    <h2 className="about_founder_head_text">
                        Our Founder
                    </h2>
                    <p className="about_founder_text">
                        This is World Duty Free lottery page,  in which  the users are able to buy tickets and try their  luck and succeed. 
                        There are   different types of raffle . Users  can win cars,   millions, trips, motorbikes, etc.  
                        To buy tickets the users should register the page. Choosing the desired tickets, the user should add  them to cart.   
                        The tickets in the cart  will be unavailable for others within 20  minutes.   
                    </p>
                </div>
                <div className="about_founder_image_box">
                </div>
            </div> */}
            <Footer/>
        </div>
    )
}

export default AboutUs