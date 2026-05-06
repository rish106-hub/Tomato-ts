import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = ({ setShowLogin }) => {
    const { setToken, url, loadCartData } = useContext(StoreContext)
    const [currState, setCurrState] = useState("Login")
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState({ name: "", email: "", password: "" })

    const onChangeHandler = (e) => {
        setData(d => ({ ...d, [e.target.name]: e.target.value }))
    }

    const onLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register"
            const response = await axios.post(url + endpoint, data)
            if (response.data.success) {
                const token = response.data.token
                setToken(token)
                localStorage.setItem("token", token)
                await loadCartData(token)
                setShowLogin(false)
                toast.success(currState === "Login" ? "Welcome back!" : "Account created!")
            } else {
                toast.error(response.data.message)
            }
        } catch {
            toast.error("Network error. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState === "Login" ? "Sign In" : "Create Account"}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" role="button" tabIndex={0} />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />
                    )}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password (min 8 characters)' required minLength={8} />
                </div>
                <button disabled={loading}>{loading ? "Please wait..." : currState === "Login" ? "Sign In" : "Create Account"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the <a href="/privacy" target="_blank">terms of use & privacy policy</a>.</p>
                </div>
                {currState === "Login"
                    ? <p>New here? <span onClick={() => setCurrState('Sign Up')}>Create an account</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState('Login')}>Sign in</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
