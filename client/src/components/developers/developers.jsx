import React from 'react';
import './developers.css'
import Dev from '../dev-card/dev';
import member from './dev-data';

function Developers() {
    return (
        <div id="team" className="devs">
            <h1 className="c-title">Meet Our Team!</h1>
            <div className="dev-cards">
                {member.map((member, index) => (
                    <Dev key={index} name={member.name} pic={member.pic} college={member.college} year={member.year}/>
                ))}
            </div>
        </div>
    );
}
export default Developers;