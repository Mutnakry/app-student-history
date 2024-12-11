// import React, { useEffect, useState } from 'react';
// import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
// import { getStorage, ref, getDownloadURL } from 'firebase/storage';
// import { db } from '../firebase';
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
// import { FaSearch } from 'react-icons/fa';
// import { MdNavigateNext } from 'react-icons/md';
// import { GrFormPrevious } from 'react-icons/gr';
// import { motion, AnimatePresence } from 'framer-motion';
// import Navbar from './Navbar';

// // Define the type for classroom items
// interface ClassroomItem {
//     id: string;
//     name: string;
//     imageUrl?: string;
// }

// const ShowRoom: React.FC = () => {
//     const [classRoom, setClassRoom] = useState<ClassroomItem[]>([]);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const itemsPerPage = 5; // Adjust the number of items per page

//     // Reference to the 'classroom' collection in Firestore
//     const valuesClassRoom = collection(db, 'classroom');

//     useEffect(() => {
//         getClassRoom();
//     }, []);

//     // Fetch classroom data from Firestore
//     const getClassRoom = async () => {
//         setLoading(true);
//         try {
//             const snapshot = await getDocs(valuesClassRoom);
//             const dataList: ClassroomItem[] = snapshot.docs.map(doc => ({
//                 id: doc.id,
//                 ...(doc.data() as Omit<ClassroomItem, 'id'>),
//             }));
//             setClassRoom(dataList);
//         } catch (error) {
//             console.error('Error fetching data: ', error);
//             toast.error('Error fetching classroom data');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Delete a person document from Firestore
//     const deletePerson = async (id: string, imageUrl?: string) => {
//         // Show confirmation dialog
//         const confirmDelete = window.confirm('Are you sure you want to delete this document and its image?');

//         if (!confirmDelete) {
//             return;
//         }

//      try {
//     if (imageUrl) {
//         const storage = getStorage();
//         const imageRef = ref(storage, imageUrl);
//         await deleteObject(imageRef);
//         toast.success('Image deleted from Firebase Storage');
//     }
// } catch (imageError) {
//     console.error('Error deleting image: ', imageError);
//     toast.error('Error deleting image');
// }

//     };



//     // Filter classroom data based on the search term
//     const filteredClassRoom = classRoom.filter(item =>
//         item.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // Calculate total pages
//     const totalPages = Math.ceil(filteredClassRoom.length / itemsPerPage);

//     // Get the current page's items
//     const currentItems = filteredClassRoom.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//     );

//     // Handle pagination
//     const paginate = (pageNumber: number) => {
//         setCurrentPage(pageNumber);
//     };



//     // const saveImage = async (imageUrl: string, imageName: string) => {
//     //     try {
//     //         // Get the Firebase storage reference for the image
//     //         const storage = getStorage();
//     //         const imageRef = ref(storage, imageUrl);

//     //         // Get the download URL of the image
//     //         const downloadURL = await getDownloadURL(imageRef);

//     //         // Create a temporary anchor element to trigger the download
//     //         const link = document.createElement('a');
//     //         link.href = downloadURL;
//     //         link.download = imageName; // The name of the image to save as
//     //         document.body.appendChild(link);
//     //         link.click(); // Trigger the download
//     //         document.body.removeChild(link); // Clean up the DOM
//     //     } catch (error) {
//     //         console.error('Error downloading the image: ', error);
//     //         toast.error('Failed to download image');
//     //     }
//     // };


//     // const saveImage = async (imageUrl: string, imageName: string) => {
//     //     try {
//     //         // Get the Firebase storage reference for the image
//     //         const storage = getStorage();
//     //         const imageRef = ref(storage, imageUrl);

//     //         // Get the download URL of the image
//     //         const downloadURL = await getDownloadURL(imageRef);

//     //         // Make sure the URL is valid
//     //         if (!downloadURL) {
//     //             toast.error('Image URL is not available.');
//     //             return;
//     //         }

//     //         // Create a temporary anchor element to trigger the download
//     //         const link = document.createElement('a');
//     //         link.href = downloadURL;
//     //         link.download = imageName; // The name of the image to save as
//     //         link.target = '_blank'; // Open the link in a new tab

//     //         // Trigger the download
//     //         link.click();

//     //         // Clean up the DOM
//     //         document.body.removeChild(link);
//     //     } catch (error) {
//     //         console.error('Error downloading the image: ', error);
//     //         toast.error('Failed to download image');
//     //     }
//     // };


//     const saveImage = async (imageUrl: string, imageName: string) => {
//         try {
//             // Get the Firebase storage reference for the image
//             const storage = getStorage();
//             const imageRef = ref(storage, imageUrl);

//             // Get the download URL of the image
//             const downloadURL = await getDownloadURL(imageRef);

//             if (!downloadURL) {
//                 toast.error('Image URL is not available.');
//                 return;
//             }

//             // Create a temporary anchor element to trigger the download
//             const link = document.createElement('a');
//             link.href = downloadURL;
//             link.download = imageName; // The name of the image to save as

//             // Append the link to the body
//             document.body.appendChild(link);

//             // Trigger the download by clicking the link
//             link.click();

//             // Remove the link after the download is triggered
//             document.body.removeChild(link);
//         } catch (error) {
//             console.error('Error downloading the image: ', error);
//             toast.error('Failed to download image');
//         }
//     };




//     return (
//         <div>
//             <Navbar />
//             <div className="body_div px-2 pt-4">
//                 <h2 className="font-bold text-2xl mb-4">ទាញយកទិន្នន័យបន្ទប់</h2>

//                 <div className="flex justify-end w-full">
//                     <div className="relative mb-6 w-full max-w-sm">
//                         <input
//                             type="text"
//                             className="w-full border px-4 py-2 rounded outline-none bg-gray-50 focus:border-blue-500 text-sm"
//                             placeholder="តើអ្នកកំពុងស្វែរករូបភាពអ្វី?"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                         <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
//                     </div>
//                 </div>
//                 {loading ? (
//                     <div className="flex items-center justify-center min-h-screen">
//                         <div role="status">
//                             <svg
//                                 aria-hidden="true"
//                                 className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
//                                 viewBox="0 0 100 101"
//                                 fill="none"
//                                 xmlns="http://www.w3.org/2000/svg"
//                             >
//                                 <path
//                                     d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
//                                     fill="currentColor"
//                                 />
//                                 <path
//                                     d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
//                                     fill="currentFill"
//                                 />
//                             </svg>
//                             <span className="sr-only">Loading...</span>
//                         </div>
//                     </div>

//                 ) : (
//                     <table className="table table-bordered">
//                         <thead>
//                             <tr>
//                                 <th>#</th>
//                                 <th>Name</th>
//                                 <th>Image</th>
//                                 <th>download</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <AnimatePresence>
//                                 {currentItems.length > 0 ? (
//                                     currentItems.map((item, index) => (
//                                         <motion.tr
//                                             key={item.id}
//                                             initial={{ opacity: 0, y: 10 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             exit={{ opacity: 0, y: -10 }}
//                                             transition={{ duration: 0.3 }}
//                                         >
//                                             <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
//                                             <td>{item.name}</td>
//                                             <td>
//                                                 {item.imageUrl ? (
//                                                     <img
//                                                         src={item.imageUrl}
//                                                         alt={`Image for ${item.name}`}
//                                                         className='h-[50px]'
//                                                     />
//                                                 ) : (
//                                                     'No image'
//                                                 )}
//                                             </td>

//                                             <td>
//                                                 <button
//                                                     className="btn btn-danger"
//                                                     disabled={!item.imageUrl}
//                                                     onClick={() => saveImage(item.imageUrl || '', item.name)}
//                                                     aria-label={`Download image for ${item.name}`}
//                                                 >
//                                                     Save Image
//                                                 </button>
//                                             </td>

//                                             <td>
//                                                 <Link className="btn btn-info mr-2" to={`/edit/${item.id}`}>
//                                                     Edit
//                                                 </Link>
//                                                 <button className="btn btn-danger" onClick={() => deletePerson(item.id, item.imageUrl)}>
//                                                     Delete
//                                                 </button>

//                                             </td>
//                                         </motion.tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan={4} className="text-center">
//                                             No results found
//                                         </td>
//                                     </tr>
//                                 )}
//                             </AnimatePresence>
//                         </tbody>
//                     </table>
//                 )}

//                 {/* Pagination Controls */}
//                 <div className="flex justify-end mt-8 space-x-2">
//                     <button
//                         className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-orange-500 text-white'}`}
//                         onClick={() => paginate(currentPage - 1)}
//                         disabled={currentPage === 1}
//                     >
//                         <GrFormPrevious />
//                     </button>

//                     {Array.from({ length: totalPages }, (_, index) => (
//                         <button
//                             key={index + 1}
//                             onClick={() => paginate(index + 1)}
//                             className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
//                         >
//                             {index + 1}
//                         </button>
//                     ))}

//                     <button
//                         className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-orange-500 text-white'}`}
//                         onClick={() => paginate(currentPage + 1)}
//                         disabled={currentPage === totalPages}
//                     >
//                         <MdNavigateNext />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ShowRoom;




import React, { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, deleteObject, getDownloadURL } from 'firebase/storage'; // <-- Add deleteObject import here
import { db } from '../firebase';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { MdNavigateNext } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';

// Define the type for classroom items
interface ClassroomItem {
    id: string;
    name: string;
    imageUrl?: string;
}

const ShowRoom: React.FC = () => {
    const [classRoom, setClassRoom] = useState<ClassroomItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5; // Adjust the number of items per page

    // Reference to the 'classroom' collection in Firestore
    const valuesClassRoom = collection(db, 'classroom');

    useEffect(() => {
        getClassRoom();
    }, []);

    // Fetch classroom data from Firestore
    const getClassRoom = async () => {
        setLoading(true);
        try {
            const snapshot = await getDocs(valuesClassRoom);
            const dataList: ClassroomItem[] = snapshot.docs.map(doc => ({
                id: doc.id,
                ...(doc.data() as Omit<ClassroomItem, 'id'>),
            }));
            setClassRoom(dataList);
        } catch (error) {
            console.error('Error fetching data: ', error);
            toast.error('Error fetching classroom data');
        } finally {
            setLoading(false);
        }
    };

    // Delete a person document from Firestore
    const deletePerson = async (id: string, imageUrl?: string) => {
        // Show confirmation dialog
        const confirmDelete = window.confirm('Are you sure you want to delete this document and its image?');

        if (!confirmDelete) {
            return;
        }

        try {
            if (imageUrl) {
                const storage = getStorage();
                const imageRef = ref(storage, imageUrl);
                await deleteObject(imageRef);
            }
            // Delete the document from Firestore
            const docRef = doc(db, 'classroom', id);
            await deleteDoc(docRef);
            toast.success('Document deleted successfully');
            getClassRoom();
        } catch (err) {
            console.error('Error deleting image or document: ', err);
            toast.error('Error deleting image or document');
        }
    };

    // Filter classroom data based on the search term
    const filteredClassRoom = classRoom.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate total pages
    const totalPages = Math.ceil(filteredClassRoom.length / itemsPerPage);

    // Get the current page's items
    const currentItems = filteredClassRoom.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle pagination
    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Save Image function (for downloading)
    const saveImage = async (imageUrl: string, imageName: string) => {
        try {
            const storage = getStorage();
            const imageRef = ref(storage, imageUrl);
            const downloadURL = await getDownloadURL(imageRef);

            if (!downloadURL) {
                toast.error('Image URL is not available.');
                return;
            }

            const link = document.createElement('a');
            link.href = downloadURL;
            link.download = imageName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading the image: ', error);
            toast.error('Failed to download image');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="body_div px-2 pt-4">
                <h2 className="font-bold text-2xl mb-4">ទាញយកទិន្នន័យបន្ទប់</h2>

                <div className="flex justify-end w-full">
                    <div className="relative mb-6 w-full max-w-sm">
                        <input
                            type="text"
                            className="w-full border px-4 py-2 rounded outline-none bg-gray-50 focus:border-blue-500 text-sm"
                            placeholder="តើអ្នកកំពុងស្វែរករូបភាពអ្វី?"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="flex justify-center items-center py-10">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                        </div>
                    </div>
                ) : (
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Download</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {currentItems.length > 0 ? (
                                    currentItems.map((item, index) => (
                                        <motion.tr
                                            key={item.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>
                                                {item.imageUrl ? (
                                                    <img
                                                        src={item.imageUrl}
                                                        alt={`Image for ${item.name}`}
                                                        className='h-[50px]'
                                                    />
                                                ) : (
                                                    'No image'
                                                )}
                                            </td>

                                            <td>
                                                <button
                                                    className="bg-green-400 py-1 px-4 rounded-lg hover:bg-green-500"
                                                    disabled={!item.imageUrl}
                                                    onClick={() => saveImage(item.imageUrl || '', item.name)}
                                                    aria-label={`Download image for ${item.name}`}
                                                >
                                                    មើសរូបភាព
                                                </button>
                                            </td>

                                            <td>
                                                <Link className="btn btn-info mr-2" to={`/edit/${item.id}`}>
                                                    Edit
                                                </Link>
                                                <button className="btn btn-danger" onClick={() => deletePerson(item.id, item.imageUrl)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="text-center">
                                            No results found
                                        </td>
                                    </tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                )}

                {/* Pagination Controls */}
                <div className="flex justify-end mt-8 space-x-2">
                    <button
                        className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-orange-500 text-white'}`}
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <GrFormPrevious />
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-orange-500 text-white'}`}
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <MdNavigateNext />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShowRoom;
