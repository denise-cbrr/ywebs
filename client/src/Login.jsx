// import React, { useState } from 'react';

// function Login() {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     function handleSubmit(event) {
//         event.preventDefault();
//     }
//     return (
//         <div>
//             <div >
//                 <form onSubmit={handleSubmit}>
//                     <div>
//                         <label htmlFor="email">Email</label>
//                         <input type="email" placeholder='Enter Your Email' 
//                         onChange={e => setEmail(e.target.value)}/>
//                     </div>
//                     <div>
//                         <label htmlFor="password">Password</label>
//                         <input type="password" placeholder='Enter Your Password'
//                         onChange={e => setPassword(e.target.value)}/>
//                     </div>
//                     <div>
//                         <button type="submit">Login</button>
//                     </div>
//                 </form>
//             </div>
//         </div>)}
import React, { useState } from 'react';
import axios from 'axios';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        axios.post("http://localhost:8080/login", {
            email: email,
            password: password
        })
        .then(res => {
            console.log(res.data);

            if (res.data.role === "developer") {
                alert("Developer login successful");
            } else {
                alert("Client login successful");
            }
        })
        .catch(err => {
            alert("Login failed");
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input 
                        type="email"
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input 
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
}
export default Login;