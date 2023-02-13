import React, {useEffect} from "react";
import './Help.css';
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import {useSelector, useDispatch} from "react-redux";

function Help() {
    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior:"smooth"

        });
    },[])
    const bgColor = {fon:"#000F26"};
    const faq=useSelector(state=>state.faq);
 
    const dispatch=useDispatch();
    console.log(faq)
    const openHidden=(e)=>{
        dispatch({
            type:"open",
            id:e.id
        })
    }
    return(
        <div className="Help">
            <Header bgColor={bgColor}/>
            <div className="help_head_box">
                <h3 className="help_headtext">
                    Help Center
                </h3>
                <p className="help_head_text">Frequently asked questions</p>
            </div>
            <div className="help_main_box">
                {
                    faq.map(item=>
                        <div className="help_select" key={item.id} onClick={openHidden.bind(this,item)} style={{height:item.isopen?"120px":"50px", cursor:"pointer"}}>
                            <div className="text_and_row_box">
                                <p className="help_text" >{item.question}</p>
                                <i className={item.isopen?"fa fa-angle-up":"fa fa-angle-down"}  style={{fontSize:"16px", cursor:"pointer", color:"rgba(255, 255, 255, 0.5)"}}></i>
                            </div>
                            <div className="help_select_hidden_box" >
                                <p className="help_hidden_text">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="help_questions_box">
                <h4 className="help_questions_head">
                    Still have a question?
                </h4>
                <p className="help_questions_text">
                    If you cannot find answer to you question in our FAQ, you can <br/> always  <span>contact us.</span>
                </p>
            </div>
            <Footer/>
        </div>
    )
}

export default Help