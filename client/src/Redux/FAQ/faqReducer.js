const faqState=[
    {
        id:1,
        question:"What payment method do you accept online?",
        answer:"We accept online Visa, Mastercard credit and debit card.",
        isopen:false
    },
    {
        id:2,
        question:"Can we take online tickets by using a debit card?",
        answer:"Any bank card with an access of online usage can transact succesfully on our website. But some banks have restrictions, too. So we suggest you contact yourbank and get their feedback.",
        isopen:false
    },
    {
        id:3,
        question:"Is it possible to refund my ticket after the draw?",
        answer:"No, once you purchase your ticket and once the draw takes place your ticket is non-refundable.",
        isopen:false
    },
    {
        id:4,
        question:"Can I reserve a ticket number?",
        answer:"Yes, you can reserve.",
        isopen:false
    },
    {
        id:5,
        question:"What other payment method do you accept if I don't have a credit/debit card?",
        answer:"We accept cash payment via telegraphic transfer",
        isopen:false
    },
    {
        id:6,
        question:"Can tickets be canceled?",
        answer:"In most cases, once you purchase a ticket and it’s been printed out, it can’t be canceled. We suggest that you take all of the possible precautions to make sure that the numbers on the play slip are the ones you wanted to play before confirming the purchase.",
        isopen:false
    },
    {
        id:7,
        question:"How soon after the draw takes place can I claim the prize of a winning ticket?",
        answer:"You can claim your prize as soon as the draw is finished, and the results are verified and published. This process can take up to a few hours, depending on the game.",
        isopen:false
    },
    {
        id:8,
        question:"How long do I have to claim my prize?",
        answer:"The time available to claim prizes depends on the jurisdiction and game in question.",
        isopen:false
    },

    {
        id:10,
        question:"Is there a way to make sure that my ticket can only be claimed by me?",
        answer:"Possession is nine-tenths of the law. Keep the winning ticket safe and tell as few people as possible. If the ticket is signed, this will further indicate ownership and any prizes that are due because of it.",
        isopen:false
    },
    {
        id:11,
        question:"How do I claim my prize?",
        answer:"The process to claim a prize depends on the game and the jurisdiction where the ticket was obtained.",
        isopen:false
    },
    {
        id:12,
        question:"Can I purchase lottery tickets by phone or mail?",
        answer:"No, the only way to purchase lottery tickets without leaving your home is online.",
        isopen:false
    },

]

const faqReducer = (state=faqState, action) => {
    if(action.type=="open"){
        return state.map(v=>v.id==action.id?{...v, isopen:!v.isopen}:{...v})
    }
    else{
        return state
    }
}

export default faqReducer