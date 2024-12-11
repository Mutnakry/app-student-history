import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase"; // Ensure these are correctly exported
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import Google from '../assets/image.png'

function SignInwithGoogle() {
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        if (user) {
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            firstName: user.displayName,
            photo: user.photoURL,
            lastName: "", // Consider capturing this info from user input later
          });
          toast.success("User logged in successfully", { position: "top-center" });
          window.location.href = "/profile"; // Or use useNavigate for programmatic navigation
        }
      })
      .catch((error) => {
        toast.error(error.message, { position: "top-center" });
      });
  };

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img className="h-8" src={Google} alt="Google sign-in" />
      </div>
    </div>
  );
}

export default SignInwithGoogle;
