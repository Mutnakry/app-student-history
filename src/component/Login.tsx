import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import SignInwithGoogle from "./SignInWIthGoogle";
import BackgroundArrow from './background/BackgroundArrow'

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setFormError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/home";
      toast.success("ចូលគណនីបានជោគជ័យ", {
        position: "top-center",
      });
    } catch (error: any) {
      console.log(error.message);
      toast.error("សូមលោកអ្នកបញ្ចល ពាក្យសម្ថាត់និងអ៊ីមែល បានត្រឹមត្រូវ​!", {
        position: "top-center",
      });
      setFormError(error.message)
    }
  };

  return (
    <div className="h-screen w-screen flex items-start justify-end bottom-0 p-10 bg-gray-100 relative " style={{ backgroundImage: "url('/images/background.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: '1' }}>
      <div>
        <div className="bg-white p-4 rounded shadow-md w-full max-w-md opacity-85">
          <form onSubmit={handleSubmit}>
            <div className="w-full justify-end flex items-end">
              <img src="/images/background.jpg" alt="" className="h-24 w-24 rounded-full" />

            </div>
            <div className="mb-4 space-y-2">
              <label htmlFor="email" className="font-NotoSansKhmer font-bold text-lg">អុីម៉ែល:*</label>

              <input
                type="email"
                className="form-control w-full p-2 border rounded"
                placeholder="សូមបញ្ចូលអ៊ីមែល​"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm mt-2">សូមលោកអ្នកបញ្ចល អុីម៉ែល បានត្រឹមត្រូវ</p>}

            </div>

            <div className="space-y-1 relative mb-4">
              <label htmlFor="password" className="font-NotoSansKhmer font-bold text-lg">ពាក្យសម្ងាត់:*</label>
              <input
                type={showPassword ? 'text' : 'password'}

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
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                )}
              </div>
              {error && <p className="text-red-500 text-sm mt-2">សូមលោកអ្នកបញ្ចល ពាក្យសម្ថាត់ បានត្រឹមត្រូវ</p>}

            </div>




            <div className="mb-4">
              <button type="submit" className="btn btn-primary w-full p-2 bg-blue-500 text-white rounded">
                ចូលគណនី
              </button>
            </div>

            <p className="forgot-password text-center text-gray-600">
              បង្កើតគណនីថ្មី​? <a href="/register" className="text-blue-500">គណនី</a>
            </p>

            <div className="mt-4">
              <SignInwithGoogle />
            </div>
          </form>

        </div>
        <BackgroundArrow />
      </div>
    </div>
  );
}

export default Login;
