import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { FaFacebookF, FaSearch, FaTwitter } from 'react-icons/fa';
import { GrFormPrevious } from 'react-icons/gr';
import { MdNavigateNext } from 'react-icons/md';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../component/Navbar';
import Carousel from '../category/Carucel';

export interface ProductItem {
    id: string;
    names: string;
    gender: string;
    age: string;
    istype: string;
    description: string;
    classroomID: string;
    province: string;
    village: string;
    status: string;
    imageUrl?: string;
}

const ProductByNameRoom: React.FC = () => {
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 12;

    const { category_id } = useParams<{ category_id: string }>();

    const valuesClassRoom = collection(db, 'products');

    useEffect(() => {
        if (category_id) {
            getClassRoom();
        }
    }, [category_id]);

    const getClassRoom = async () => {
        setLoading(true);
        try {
            const snapshot = await getDocs(valuesClassRoom);
            const dataList: ProductItem[] = snapshot.docs
                .map(doc => ({
                    id: doc.id,
                    ...(doc.data() as Omit<ProductItem, 'id'>),
                }))
                .filter(item => item.classroomID === category_id);

            setProducts(dataList);
        } catch (error) {
            console.error('Error fetching data: ', error);
            toast.error('Error fetching classroom data');
        } finally {
            setLoading(false);
        }
    };

    const filteredClassRoom = products.filter(item =>
        item.names.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredClassRoom.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredClassRoom.length / itemsPerPage);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div>
            <Navbar />
            <Carousel />
            <div className="body_div px-2 pt-4">
                <hr className='text-4xl border-2' />
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
                <hr className='text-4xl border' />
                {loading ? (
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 pt-4">
                        <AnimatePresence>
                            {currentProducts.length > 0 ? (
                                currentProducts.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        className="w-full mx-auto bg-white border overflow-hidden border-gray-200 rounded-t-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 relative"
                                        whileHover={{ scale: 1.05 }}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Link to={`/showroom/${product.id}`} className="relative block">
                                            <motion.img
                                                className="w-full h-[250px] object-cover bg-slate-50 rounded-tl-lg"
                                                src={product.imageUrl || 'https://via.placeholder.com/250'}
                                                alt="Product Image"
                                                whileHover={{ scale: 1.1 }}
                                            />
                                            {/* Overlay for Product Name */}
                                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white px-4 py-1">
                                                <h3 className="font-semibold text-lg">{product.names}</h3>
                                                <p className="text-white text-sm line-clamp-2">{product.description}</p>
                                            </div>
                                        </Link>

                                        <div className="flex flex-col p-2 space-y-4 w-full">

                                            <div className="flex justify-end space-x-2 items-center">
                                                <motion.button
                                                    className="px-2 py-1 text-xs bg-orange-500 hover:bg-orange-600 text-white rounded flex items-center gap-2"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <FaFacebookF />
                                                    <span>Facebook</span>
                                                </motion.button>
                                                <motion.button
                                                    className="px-2 py-1 text-xs bg-orange-500 hover:bg-orange-600 text-white rounded flex items-center gap-2"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <FaTwitter />
                                                    <span>Twitter</span>
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>

                                ))
                            ) : (
                                <div className="col-span-full text-center text-gray-500">
                                    មិនមានផលិតផលទេ!
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
                  <div className="flex justify-center mt-8 space-x-2">
                    <button
                        className={`px-4 text-xs py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-orange-500 text-white'}`}
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <GrFormPrevious />
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={`px-3 text-xs py-1 rounded ${currentPage === index + 1 ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className={`px-4 text-xs py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-orange-500 text-white'}`}
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

export default ProductByNameRoom;
