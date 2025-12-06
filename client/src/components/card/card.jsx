import React from "react";
import './card.css';

function Card(prop) {
    return (
        <div className="card-wrapper">
            <div className="card">
                <div className="card-front">
                    <h1 className="question">{prop.q}</h1>
                </div>
                <div className="card-back">
                    <p className="answer">
                        {prop.a}
                    </p>
                </div>
            </div>
        </div>

    );
}

export default Card;