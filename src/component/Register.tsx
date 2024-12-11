import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db} from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SignInwithGoogle from "./SignInWIthGoogle";
import BackgroundArrow from './background/BackgroundArrow';

function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [repassword, setRepassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setFormError] = useState<string>("");

  const navigate = useNavigate();

  const HandleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== repassword) {
      toast.error("សូមបញ្ជាក់ពាក្យសម្ថាត់សាជាថ្មី!", { position: "top-center" });
      setFormError("ពាក្យសម្ថាត់មិនត្រូវគ្នាទេ");
      return;
    }

    // Check for email format (basic validation)
    const emailPattern = /^[^@]+@\w+(\.\w+)+\w$/;
    if (!emailPattern.test(email)) {
      setFormError("អ៊ីម៉ែលមិនត្រឹមត្រូវ!");
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        // Save user info to Firestore
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: "",
        });
      }

      console.log("User Registered Successfully!!");
      navigate("/"); // Use navigate instead of window.location.href
      toast.success("User Registered Successfully!!", { position: "top-center" });
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message, { position: "top-center" });
    }
  };


  return (
    <div
      className="h-screen w-screen flex items-start justify-end bottom-0 p-10 bg-gray-100 relative"
      style={{
        backgroundImage: "url('/images/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: "1",
      }}
    >
      <div>
        <div className="bg-white p-4 rounded shadow-md w-full max-w-md opacity-85">
          <form onSubmit={HandleRegister}>
            <div className="w-full justify-end flex items-end">
              <img src="/images/background.jpg" alt="" className="h-24 w-24 rounded-full" />
            </div>

            {/* First Name */}
            <div className="mb-2 space-y-2">
              <label htmlFor="fname" className="font-NotoSansKhmer font-bold text-lg">
                នាមខ្លួន : *
              </label>
              <input
                type="text"
                className="form-control w-full p-2 border rounded"
                placeholder="សូមបញ្ចូលឈ្មោះ"
                value={fname}
                required
                onChange={(e) => setFname(e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div className="mb-2 space-y-2">
              <label htmlFor="lname" className="font-NotoSansKhmer font-bold text-lg">
                នាមត្រកូល : *
              </label>
              <input
                type="text"
                className="form-control w-full p-2 border rounded"
                placeholder="សូមបញ្ចូលនាមត្រកូល"
                value={lname}
                required
                onChange={(e) => setLname(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="mb-2 space-y-2">
              <label htmlFor="email" className="font-NotoSansKhmer font-bold text-lg">
                អុីម៉ែល : *
              </label>
              <input
                type="email"
                className="form-control w-full p-2 border rounded"
                placeholder="សូមបញ្ចូលអ៊ីមែល"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="space-y-1 relative mb-4">
              <label htmlFor="password" className="font-NotoSansKhmer font-bold text-lg">
                ពាក្យសម្ងាត់ : *
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="input_text"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="សូមបញ្ចូលពាក្យសម្ងាត់របស់អ្នក"
              />
              <div
                className="absolute top-10 right-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </div>
              {/* Display error message */}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            {/* Repassword */}
            <div className="space-y-1 relative mb-4">
              <label htmlFor="repassword" className="font-NotoSansKhmer font-bold text-lg">
                បញ្ជាក់ពាក្យសម្ងាត់ : *
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="input_text"
                required
                value={repassword}
                onChange={(e) => setRepassword(e.target.value)}
                placeholder="សូមបញ្ចូលបញ្ជាក់ពាក្យសម្ងាត់"
              />
              <div
                className="absolute top-10 right-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <button type="submit" className="btn btn-primary w-full p-2 bg-blue-500 text-white rounded">
                បង្កើតគណនី
              </button>
            </div>
          </form>
          <SignInwithGoogle />
        </div>
        <BackgroundArrow />
      </div>
    </div>
  );
}
export default Register;
