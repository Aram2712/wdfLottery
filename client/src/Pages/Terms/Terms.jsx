import React, {useEffect} from "react";
import './Terms.css';
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

function Terms() {
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
                    TERMS OF USE
                </h3>
            </div>
            <div className="terms_main_box">
                <h4 className="terms_head_text">
                    Changes to this Site or these Terms
                </h4>
                <p className="terms_main_text">
                    These terms apply to all use of this website and by using this website you agree that you have read and accepted these terms. 
                    This website is made available for use in connection with your participation in any of the promotions run by us.
                    You may as part of your use copy electronically and print portions of the website but you should not use such access or content to generate income of any kind. 
                    Any other use of materials on this website without our prior written permission is prohibited. 
                    The intellectual property in all design, text, graphics and other material and the selection or arrangement of such material in this website is owned by us and/or our respective licensors. 
                    We do not make any representations, warranties or terms of any kind in respect of this website or its contents other than those required by law.
                    All information and/or data included in and/or on this website is made available for guidance only. Your use of such information and/or data is therefore entirely at your own risk. 
                    This website may include links to websites and/or services owned and/or operated by participating companies and/or third parties. 
                    These are provided for your convenience and we are not responsible for and do not give any warranties or make any representations regarding any such websites and/or services and are not responsible for or liable in relation to the content or your use of such websites.
                    Due to the nature of the Internet, we do not promise full and error free operation of this website at all times. The product images displayed on this site may vary from the actual item, please contact our customer service for further information.

                </p>
                <h4 className="terms_head_text">
                    Changes to the Terms of Use
                </h4>
                <p className="terms_main_text">
                    We may revise and update these Terms of Use from time to time in our sole discretion. 
                    If you have a registered account we will provide you an email notifying you of any update to these Terms of Use at least one week prior to any changes going into effect. 
                    All changes are effective immediately when we post them, and apply to all access to and use of the Website thereafter. 
                    Your continued use of the Website following the posting of revised Terms of Use means that you accept and agree to the changes.
                    You are expected to check this page from time to time when you access this Website so you are aware of any changes, as they are binding on you.

                </p>
            </div>
        <Footer/>
        </div>
    )
}

export default Terms