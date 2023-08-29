import axios from "../api";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";

let emptyForm = {
    username: '',
    password: '',
    email: ''
}

function Register() {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    let [form, setForm] = useState(emptyForm)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const authResponse = await axios.post('/auth/register', form)
            const token = authResponse.data.token

            if (!token) {
                setForm(emptyForm)
                return
            }

            localStorage.setItem("token", token)

            const userResponse = await axios.get('/api/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })


            dispatch(addUser(userResponse.data))

            navigate('/login')

        } catch (err) {

            console.log(err)
            alert(err.response.data.error)

        }
    }
    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
        // This effect will run after the component is mounted
        setShowAnimation(true);
    }, []);

    return (
        <div className="body">
            <div>
                    <h1>Hello, There!</h1>
                    <p>Don't have an account? Sign Up Free</p>
                </div>
            <div >
                <div className="form-container sign-up-container">
                    <form onSubmit={handleSubmit}>
                        <>Create Account </> <br />
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={handleChange}
                            value={form.username}
                            placeholder="Name"
                        /> <br />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            value={form.email}
                            placeholder="Email"
                        /> <br />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            value={form.password}
                            placeholder="Password"
                        /><br /><br />
                        <button>Sign Up</button>
                    </form>
                </div>
                
            </div>
        </div>
    );
}

export default Register;