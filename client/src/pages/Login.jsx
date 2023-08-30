import axios from '../api'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";

let emptyForm = {
    username: '',
    password: '',
    email: ''
}

function Login() {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    let [form, setForm] = useState(emptyForm)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const authResponse = await axios.post('/auth/login', form)
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

            navigate('/cats')

        } catch (err) {

            console.log(err)
            alert(err.response.data.error)

        }
    }

    return (
        <div className="body">
            <div className="container" id="container" >
                <div className="form-container log-in-container">
                    <form onSubmit={handleSubmit}>
                        <h1>Log in</h1>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={handleChange}
                            value={form.username}
                            placeholder="Username"
                        />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            value={form.password}
                            placeholder="Password"
                        />
                        <button>Log In</button><br />
                        <a href="#">Forgot your password?</a>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default Login;