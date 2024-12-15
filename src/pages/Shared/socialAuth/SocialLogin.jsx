import { useContext } from "react";
import AuthContext from "../../../context/AuthContext/AuthContext";


const SocialLogin = () => {
    const {signInGoogle} = useContext(AuthContext);

    const handleGoogleSignIn = () =>{
        signInGoogle()
        .then(result =>{
            console.log("google sign in", result.user)
        })
        .catch(error => {
            console.log(error.message)
        })
    }
    return (
        <div className="">
            <div className="divider">OR</div>
            <button onClick={handleGoogleSignIn} className="btn">Google</button>
        </div>
    );
};

export default SocialLogin;