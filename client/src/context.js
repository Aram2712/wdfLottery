import React, { useState, useContext, createContext } from "react";
// import { useSelector } from "react-redux";
import milion from './Images/HomePage/milion.png';
import car from './Images/HomePage/car.png';
import bike from './Images/HomePage/bike.png';
import italia from './Images/HomePage/italia.png';
import egypt from './Images/HomePage/egypt.png';
// import './usePagination';
import Carousel from "react-multi-carousel";
import winner from './Images/HomePage/surprise.png';



const AppContext = createContext()

const AppProvider = ({ children }) => {

    const [showSignin, setShowSignin] = useState(true);
    const [showSignup, setShowSignup] = useState(false);
    const [showForgot, setShowForgot] = useState(false);
    const [chooseNumber, setChooseNumber] = useState(false)
    const [address, setAddress]=useState(window.location.pathname)
    const [allTickets, setAllTickets] = useState(true);
    const [oddTickets, setOddTickets] = useState(false);
    const [evenTickets, setEvenTickets] = useState(false);
    const [lucky, setLucky] = useState(false);
    const [searchYourTicket, setSearchYourTicket]=useState(false)
    const [currency, setCurrency]=useState("INR");
    const [file, setFile]=useState()
    const [winners, setWinners]=useState([])
    const [refId, setRefId]=useState("")
    const [showPayments, setShowpayments]=useState(false);

    const showAllTickets=()=>{
        setAllTickets(true);
        setOddTickets(false);
        setEvenTickets(false);
        setLucky(false);
        setSearchYourTicket(false)

    }

    const showOddTickets=()=>{
        setAllTickets(false);
        setOddTickets(true);
        setEvenTickets(false);
        setLucky(false);
        setSearchYourTicket(false)
    }

    const showEvenTickets=()=>{
        setAllTickets(false);
        setOddTickets(false);
        setEvenTickets(true);
        setLucky(false);
        setSearchYourTicket(false)

    }

    const showLucky=()=>{
        setAllTickets(false);
        setOddTickets(false);
        setEvenTickets(false);
        setLucky(true)
        setSearchYourTicket(false)

    }

    const showSearchTicket=()=>{
        setAllTickets(false);
        setOddTickets(false);
        setEvenTickets(false);
        setLucky(false);
        setSearchYourTicket(true)
    }

    const showOnlySignin = () => {
        setShowSignin(true);
        setShowSignup(false);
        setShowForgot(false);
    }

    const showOnlySignup = () => {
        setShowSignin(false);
        setShowSignup(true);
        setShowForgot(false);

    }

    const showOnlyForgot = () => {
        setShowSignin(false);
        setShowSignup(false);
        setShowForgot(true);

    }



    // const winners=[
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },
    //     {
    //         id:1,
    //         img:winner,
    //         seriesNumber:"MM555",
    //         name:"rafael pelegrini",
    //         ticketNumber:"1111",
    //         drawDate:"03.03.03",
    //         nationality:"Armenia",
    //         ticketBought:"In-Store"
    //     },

    // ]

    const captchaNames=["Light", "Book", "Umbrella", "Car", "Cloud"]

    return <AppContext.Provider value={{

        showSignin,
        showSignup,
        showForgot,
        showOnlySignin,
        showOnlySignup,
        showOnlyForgot,
        currency,
        setCurrency,
        chooseNumber,
        setChooseNumber,
        address,
        showAllTickets,
        showEvenTickets,
        showOddTickets,
        showLucky,
        allTickets,
        oddTickets,
        evenTickets,
        lucky,
        showPayments,
        setShowpayments,
        searchYourTicket,
        showSearchTicket,
        captchaNames,
        winners,
        setWinners,
        file, 
        setFile

    }}>
        {children}
    </AppContext.Provider>
}


const useGlobalContext = () => {
    return useContext(AppContext)
}


export  { AppProvider, useGlobalContext }