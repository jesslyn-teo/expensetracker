import { auth, provider } from "../../configs/firebase-config";
import { signInWithPopup } from 'firebase/auth';
import { useNavigate, Navigate } from "react-router-dom";
import  useGetUserInfo from "../../hooks/useGetUserInfo"

function Auth(){
    const navigate = useNavigate();
    const { isAuth } = useGetUserInfo();

    const signInWithGoogle = async () => {
        const results = await signInWithPopup(auth, provider);
        const authInfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true,
        }
        localStorage.setItem("auth", JSON.stringify(authInfo));
        navigate("/et");
    };

    if(isAuth) {
        return <Navigate to="/et" />
    }

    return (
        <div className="login-page">
            <p>Sign In with Google to Continue</p>
            <button className="login-btn" onClick={signInWithGoogle}>
                {" "}
                Sign In
            </button>
        </div>
    );
}

export default Auth;