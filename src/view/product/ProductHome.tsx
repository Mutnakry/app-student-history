import { useState, useEffect } from 'react';
import { FaLink, FaFacebookF, FaSearch, FaTwitter, FaInstagram } from 'react-icons/fa';
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase';

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

function ProductHome() {
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const productsCollectionRef = collection(db, 'products');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);  // Set loading to true when starting to fetch data
        try {
            const snapshot = await getDocs(productsCollectionRef);
            const productList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<ProductItem, 'id'>),
            }));
            setProducts(productList);
        } catch (error: any) {
            setError('Failed to load products');
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);  // Set loading to false after the data is fetched
        }
    };

    const [searchTerm, setSearchTerm] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 16;

    const filteredProducts = products.filter((product) =>
        product.names.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);


    const handleFacebookShare = (imageUrl: string) => {
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`;
        window.open(facebookShareUrl, '_blank', 'width=600,height=400');
    };


    
    const handleTwitterShare = (imageUrl: string) => {
        if (!imageUrl) {
            alert('Image URL is not available.');
            return;
        }
        const tweetText = encodeURIComponent('Check out this amazing product!');
        const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(imageUrl)}&text=${tweetText}`;
        window.open(twitterShareUrl, '_blank', 'width=600,height=400');
    };
    


    

    // Function to "share" on Instagram (direct app opening for mobile devices)
    const handleInstagramShare = (imageUrl: string) => {
        if (navigator.share) {
            // Use Web Share API for mobile devices
            navigator.share({
                title: 'Check out this product!',
                text: 'Check out this amazing product on our site!',
                url: imageUrl,
            }).catch((error) => console.error('Error sharing on Instagram:', error));
        } else {
            alert('Instagram sharing is only supported on mobile devices.');
        }
    };


    const copyImageLink = (imageUrl: string) => {
        if (!imageUrl) {
            alert('Image link is not available.');
            return;
        }

        navigator.clipboard.writeText(imageUrl)
            .then(() => {
                alert('Image link copied to clipboard!');
            })
            .catch((error) => {
                console.error('Failed to copy image link: ', error);
                alert('Failed to copy image link.');
            });
    };


    return (
        <div className="mb-5">
            <div className="body_div mx-auto mt-8">
                <div>
                    <p className="text-xl font-NotoSansKhmer font-bold text-gray-800">សូមស្វាគមន៍មកកាន់មិត្ដភក្ដិទាំងអស់គ្នា</p>
                </div>
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

                {/* Display loading spinner while fetching data */}
                {loading ? (
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="flex justify-center items-center py-10">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                        {currentProducts.length > 0 ? (
                            currentProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    className="w-full mx-auto  bg-white border overflow-hidden border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700"
                                    whileHover={{ scale: 1.05 }}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Link to={`/showroom/${product.id}`}>
                                        <motion.img
                                            className="w-full h-[250px] object-cover bg-slate-50 rounded-tl-lg"
                                            src={product.imageUrl}
                                            alt="Product Image"
                                            whileHover={{ scale: 1.1 }}
                                        />
                                    </Link>

                                    <div className="flex flex-col justify-between p-2 space-y-4 w-full">
                                        <div>
                                            <h3 className="font-semibold text-lg">{product.names}</h3>
                                            <p className="text-gray-500 text-sm line-clamp-3">{product.description}</p>
                                        </div>
                                        <div className="flex justify-end space-x-2 items-center">
                                            <motion.button
                                                className="px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center gap-2"
                                                onClick={() => handleFacebookShare(product.imageUrl || '')}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <FaFacebookF />
                                            </motion.button>
                                            <motion.button
                                                className="px-2 py-1 text-xs bg-orange-500 hover:bg-orange-600 text-white rounded flex items-center gap-2"
                                                onClick={() => handleInstagramShare(product.imageUrl || '')}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <FaInstagram />
                                            </motion.button>

                                            <motion.button
                                                className="px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center gap-2"
                                                onClick={() => handleTwitterShare(product.imageUrl || '')}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <FaTwitter />
                                            </motion.button>

                                            <motion.button
                                                className="px-2 py-1 text-xs bg-gray-500 hover:bg-gray-600 text-white rounded flex items-center gap-2"
                                                onClick={() => copyImageLink(product.imageUrl || '')}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <FaLink />
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center col-span-full text-gray-500">
                                មិនមានផលិតផលទេ!
                                {error}
                            </div>
                        )}
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
}

export default ProductHome;