import React from "react";
import "./services.css";

function Services() {
    return(
        <div id="services" className="services">
            <div className="box">
                <div className="left-side">
                    <div className="title-cont">
                        <h1 className="l-title" style={{color: "white"}}>
                            <span className="i">Need a website?</span>
                        </h1>

                        <h1 className="l-title" style={{color: "white"}}>We've got your back.</h1>
                    </div>
                    <div className="info-cont">
                        <p>We're here to help you create a high-quality, professional website for any purpose. 
                            Explore the styles and availability of our student developers below, and reach out when you're ready to start. 
                            Our team is here to help every step of the way.</p>
                    </div>
                    <a className="btn" href="#team">Build Your Next Project</a>
                </div>
        
                <div className="img-cont">
                    <img src="web.png" alt="website" />
                </div>

            </div>
            

        </div>
    );
}

export default Services;