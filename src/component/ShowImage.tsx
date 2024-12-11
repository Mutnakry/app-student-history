
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
