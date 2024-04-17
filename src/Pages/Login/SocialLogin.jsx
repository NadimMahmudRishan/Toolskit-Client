import {
  // FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import google from "../../assets/icon/google.png";
// import facebook from "../../assets/icon/facebook.png";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import app from "../../firebase/firebase.config";

const SocialLogIn = () => {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  // const facebookProvider = new FacebookAuthProvider();

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleLoginSuccess = () => {
    navigate(from, { replace: true });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "successfully logged in.",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleLoginError = (error) => {
    console.error(error.message);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Login failed. Please try again.",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const saveUserToServer = (user) => {
    const saveUser = { name: user.displayName, email: user.email };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(saveUser),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        // Check if the response content type is JSON
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return res.json();
        } else {
          // Handle non-JSON response (e.g., display an error message)
          throw new Error("Non-JSON response from the server");
        }
      })
      .then(handleLoginSuccess)
      .catch((error) => {
        handleLoginError(error);
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const newUser = result.user;
        saveUserToServer(newUser);
      })
      .catch((error) => {
        handleLoginError(error);
      });
  };

  // const handleFacebookLogin = () => {
  //   signInWithPopup(auth, facebookProvider)
  //     .then((result) => {
  //       const loggedUserFacebook = result.user;
  //       saveUserToServer(loggedUserFacebook);
  //     })
  //     .catch((error) => {
  //       handleLoginError(error);
  //     });
  // };

  return (
    <div className="mt-2">
      <div>
        <button onClick={handleGoogleLogin} className="flex items-center gap-4 justify-center border-2 px-28 py-2 border-gray-300 rounded-sm">
          <img className="w-6 h-6 rounded-full" src={google} alt="" />
          <p className="text-base">Google</p>
        </button>
      </div>
    </div>
  );
};

export default SocialLogIn;
