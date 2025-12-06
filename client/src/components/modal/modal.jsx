import React, { useState, useEffect } from "react";
import './modal.css';

function Modal(prop) {
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal)
    }

    useEffect(() => {
        if (modal) {
            document.body.style.overflow = "hidden";   // lock scroll
        } else {
            document.body.style.overflow = "auto";     // unlock scroll
        }

        // optional cleanup when component unmounts
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [modal]);

    return (
        <>
        <button className="open" onClick={toggleModal}>
            More Info
        </button>

        {modal && (
            <div className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-box">
                    <div className="btn-cont">
                        <button className="close-btn" onClick={toggleModal}>x</button>
                    </div>
                    <div className="picture">
                        <img src={prop.pic} alt="" />
                    </div>
                    <div className="modal-info">
                        <h1 className="modal-name">{prop.name}</h1>
                        <p>Class of {prop.year}</p>
                        <p>{prop.college} College</p>
                        <p>{prop.major}</p>
                        <div className="projects-cont">
                            <a href={prop.p1} className="project">Project 1</a>
                            <a href={prop.p2} className="project">Project 2</a>
                        </div>
                        <a href={`mailto:${prop.email}`} className="contact">Talk to Me!</a>
                    </div>

                </div>
            </div>
        )}
        </>
    );
}

export default Modal;