import React from "react";
import "./about.css";

function About() {
    return(
        <div id="about" className="about">
            <h1 className="c-title">What is "ywebs"?</h1>
            <div className="about-info">
                <div className="info">
                    <p>ywebs is a student-run web development program creating partnerships between student developers and student clients. 
                        We give aspiring developers a creative outlet and the chance to practice their skills, grow their portfolios, and serve their fellow students.
                        <br />
                        <br />
                        Whether you need a personal portfolio, club site, or a kickstarter for your business, ywebs is here to assist you. 
                        We ensure that our student developers have the proper training to provide you with a website that surpasses your expectations.
                        <br />
                        <br />
                        We believe that all students should have access to high-quality, free, personalized websites that are tailored to their needs and can impress any recruiter. 
                        At the same time, we also provide industry-like experience to student developers, mimicking tech environments, helping them grow for their future careers.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default About;