import React, {useEffect} from "react";
import './PrivacyPolicy.css';
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

function Privacy() {
    const bgColor = {fon:"#000F26"};
    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior:"smooth"

        });
    },[])

    return(
        <div className="Terms">
            <Header bgColor={bgColor}/>
            <div className="terms_head_box">
                <h3 className="terms_head_text">
                    Privacy policy
                </h3>
            </div>
            <div className="terms_main_box">
                <h4 className="terms_head_text">
                    WDF Lottery manufacturing LLC
                </h4>
                <p className="terms_main_text">
                    We respect your privacy and are committed to protecting your personal information. 
                    You always have the right to request information about your stored data, its origin, its recipients, 
                    and the purpose of its collection at no charge. We guarantee that when you communicate with us, your personal 
                    information, including your name, shipping address(es), e-mail address, payment records and banking and credit 
                    accounts will be kept private and secure. In this privacy policy, we explain how we collect and use your data. 
                    We recommend that you read the privacy policy applicable to each such website before submitting any personal 
                    information to such a site. We will not be responsible for the content, function or information collection 
                    policies of any external website. The data collected on this website are processed by the website operator. 
                    The operator's contact details can be found in the website's required legal notice.
                </p>
                <h4 className="terms_head_text">
                    How do we collect your data?
                </h4>
                <p className="terms_main_text">
                    Some data is collected when you provide it to us. If you elect to register for our website, we collect:
                </p>
                <ul style={{padding:"0 0 0 20px"}}>
                    <li className="terms_main_text">Your email or facebook address</li>
                    <li className="terms_main_text">A password</li>
                    <li className="terms_main_text">Your location (country, state, territory or possession) </li>
                    <li className="terms_main_text">Your name</li>
                    <li className="terms_main_text">Your birthdate</li>
                    <li className="terms_main_text"> Your address</li>
                    <li className="terms_main_text">Phone number</li>
                    <li className="terms_main_text">Passport number</li>

                </ul>
                <h4 className="terms_head_text">
                    How We Use the Information
                </h4>
                <p className="terms_main_text">
                    Navigational information is only used for internal purposes to enhance the customer shopping experience and 
                    site usability and is not shared with any outside parties. Financial information is used to check the user's 
                    qualifications and bill the user for products and services. How do we use your personal information? 
                    We take data protection law seriously, so below we have set out exactly how and why we use your information, 
                    and what our legal basis is to be able to use your information in each way.
                </p>
            </div>
        <Footer/>
        </div>
    )
}

export default Privacy