import React from "react";
import "./faqs.css";
import Card from "../card/card";
import qas from "./faqsData";

function Faqs() {
    return(
        <div id="#faqs" className="faqs">
            <h1 className="c-title">Got Questions?</h1>
            <div className="card-cont">
                {qas.map((qas, index) =>  (
                    <Card key={index} q={qas.q} a={qas.a}/>
                ))}
            </div>
            <p className="small-text">hover over the cards! :)</p>
        </div>
    );
}

export default Faqs;