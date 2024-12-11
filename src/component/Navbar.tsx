import React, { useState, useEffect, useRef } from 'react';
import { auth, db } from "../firebase";
import { doc, getDoc, DocumentSnapshot } from "firebase/firestore";
import { User } from "firebase/auth";
import ImageDefault from '../assets/logo.jpg';
import { FaCamera, FaSearch } from "react-icons/fa";

// Define a type for the user details
interface UserDetails {
    email: string;
    firstName: string;
    lastName: string;
    photo?: string;
}

function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState(""); // Search term state



    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user: User | null) => {
            if (user) {
                try {
                    const docRef = doc(db, "Users", user.uid);
                    const docSnap: DocumentSnapshot = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setUserDetails(docSnap.data() as UserDetails);
                    } else {
                        console.log("User data not found in Firestore");
                    }
                } catch (error) {
                    console.log("Error fetching user data: ", error);
                }
            }
            setLoading(false);
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

    const product = [
        { id: 1, name: "ABC" },
        { id: 2, name: "Gasber" },
        { id: 3, name: "Cambodia" },
        { id: 4, name: "Furniture" },
        { id: 5, name: "Books" },
        { id: 6, name: "Game" },
    ];


    // Filter products based on the search term
    const filteredProducts = product.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <nav className="bg-sky-700/50 border-gray-300 dark:bg-gray-900 md:w-full w-[768px]">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 md:space-x-12 space-x-2">
                    <a href="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={ImageDefault} className="h-8 w-8 rounded-full" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">មិត្ដភក្ដិបឋម​🙏</span>
                    </a>

                    <div className="relative flex-1">
                        <input
                            type="text"
                            className=" border whitespace-nowrap px-4 py-2 outline-none bg-gray-50 focus:border-blue-500 text-sm w-full"
                            placeholder="តើអ្នកកំពុងស្វែរករូបភាពអ្វី?"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute right-3 top-3 text-gray-500 text-lg" />
                        {searchTerm && (
                            <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                {filteredProducts.length > 0 ? (
                                    <ul className="py-2 text-sm text-gray-700">
                                        {filteredProducts.map((item) => (
                                            <li
                                                key={item.id}
                                                className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                                            >
                                                {item.name}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="py-2 px-4 text-gray-500 text-sm">
                                        មិនមានផលិតផលទេ!
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className='flex space-x-4'>
                        <div className="flex items-center space-x-4">
                            <a href="/classroom" className="text-blue-800">
                                ចូលគណនី
                            </a>
                            <span className="text-gray-400">ឬ</span>
                            <a href="/showroom" className="text-blue-800">
                                ចុះឈ្មោះ
                            </a>
                            <a   href="/createproduct" className="flex px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg items-center space-x-2">
                                <FaCamera />
                                <span>ដាក់រូបភាព</span>
                            </a>
                        </div>

                        {/* Profile and Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button onClick={() => setIsDropdownOpen(prev => !prev)} className="focus:outline-none">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={userDetails?.photo || ImageDefault}
                                    alt="User Avatar"
                                />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg z-50">
                                    <div className="px-4 py-3">
                                        {loading ? (
                                            <span className="block text-sm text-gray-500">Loading...</span>
                                        ) : userDetails ? (
                                            <>
                                                <span className="block text-sm font-medium text-gray-900 dark:text-white">
                                                    {userDetails.lastName}  {userDetails.firstName} 🙏
                                                </span>
                                                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                                                    {userDetails.email}
                                                </span>

                                            </>
                                        ) : (
                                            <span className="block text-sm text-gray-500">No user data</span>
                                        )}
                                    </div>
                                    <ul className="py-2">
                                        <li>
                                            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                                Sign out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </nav>
        </div>
    );
}

export default Navbar;
