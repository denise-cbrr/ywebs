import React from "react";
import './dev.css';
import Modal from "../modal/modal";

function Dev(prop) {

    const name = prop.name;
    const college = prop.college;
    const year = prop.year;
    const pic = prop.pic;
    const major = prop.major;
    const email = prop.email;
    const p1 = prop.p1;
    const p2 = prop.p2;
    const pname = prop.pname;
    
    return (
        <div className="dev-card">
            <div className="dev-info">
                <div className="dev-pic">
                    <img src={pic} alt="" />
                </div>
                <div className="dev-text">
                    <h1 className="name">{name}</h1>
                    <p className="college-year">{college}, Class of {year}</p>
                    <Modal name={name} college={college} email={email} year={year} pic={pic} major={major} p1={p1} p2={p2} pname={pname} />
                </div>
            </div>


        </div>

    );
}

export default Dev;