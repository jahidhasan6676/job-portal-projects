import Lottie from 'lottie-react';
import React, { useContext } from 'react';
import registerLottieData from '../../assets/lottie/register.json';
import AuthContext from '../../context/AuthContext/AuthContext';
import SocialLogin from '../Shared/socialAuth/SocialLogin';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
const SignIn = () => {
    const {loginUser} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
   
    const from = location.state || "";

    const handleSignIn = e =>{
       
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password);


        loginUser(email,password)
        .then(result => {
            console.log("sign In", result.user.email);
        })
        .catch(error => {
            console.log(error)
        })
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left w-96">
                    <Lottie animationData={registerLottieData}></Lottie>

                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className="text-2xl font-bold text-center">Login Now</h1>
                    <form onSubmit={handleSignIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">SignIn</button>
                        </div>
                    </form>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default SignIn;