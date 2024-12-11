import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, DocumentSnapshot } from "firebase/firestore";
import { User } from "firebase/auth";
import ImageDefault from '../assets/userdefault.png'
import Navbar from "../component/Navbar";

// Define a type for the user details
interface UserDetails {
    email: string;
    firstName: string;
    lastName: string;
    photo?: string; // photo is optional
}

function Profile() {
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user: User | null) => {
            if (user) {
                try {
                    const docRef = doc(db, "Users", user.uid);
                    const docSnap: DocumentSnapshot = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setUserDetails(docSnap.data() as UserDetails);
                        setLoading(false);
                    } else {
                        console.log("User data not found in Firestore");
                        setLoading(false);
                    }
                } catch (error) {
                    console.log("Error fetching user data: ", error);
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    async function handleLogout() {
        try {
            await auth.signOut();
            window.location.href = "/";
            console.log("User logged out successfully!");
        } catch (error: any) {
            console.error("Error logging out:", error.message);
        }
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="">
            <Navbar />
            {userDetails ? (
                <>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <img
                            src={userDetails.photo || ImageDefault}
                            width={60}
                            style={{ borderRadius: "50%" }}
                            alt="User Avatar"
                        />
                    </div>
                    <h3>Welcome {userDetails.firstName} 🙏🙏</h3>
                    <div>
                        <p>Email: {userDetails.email}</p>
                        <p>First Name: {userDetails.firstName}</p>
                        <p>Last Name: {userDetails.lastName}</p>
                    </div>
                    <button className="btn btn-primary" onClick={handleLogout}>
                        Logout
                    </button>
                </>
            ) : (
                <p>No user data found</p>
            )}
        </div>
    );
}

export default Profile;
