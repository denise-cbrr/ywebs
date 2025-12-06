import React from "react";
import "./faqs.css";
import Card from "../card/card";
import faqs from "./faqs";

function Faqs() {
    return(
        <div id="faqs" className="faqs">
            <h1 className="c-title">Got Questions?</h1>
            <div className="card-cont">
                {faqs.map((faqs, index) =>  (
                    <Card q={faqs.q} a={faqs.a}/>
                ))}
            </div>
            <p className="small">hover over the cards! :)</p>
        </div>
    );
}

export default Faqs;