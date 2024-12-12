import { useState, useEffect } from "react";
import { getDocs, collection } from 'firebase/firestore';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { db } from '../../firebase';

// Define the type for classroom items
interface ClassroomItem {
    id: string;
    name: string;
    imageUrl?: string;
}

export default function MenuCategory() {
    const [classRoom, setClassRoom] = useState<ClassroomItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getClassRoom();
    }, []);

    const valuesClassRoom = collection(db, 'classroom');

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

    return (
        <div className="body">
            <div className="body_div space-y-4">
                <h2 className="text-xl font-bold text-gray-800">
                    សូមស្វាគមន៍មកកាន់​​ មិត្ដភក្ដិបឋម​🙏 នៅក្នុងប្រទេសកម្ពុជា។
                </h2>
                {loading ? (
                    <div className="flex justify-center items-center py-10">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-6 gap-4 p-4 bg-white rounded shadow">
                        {classRoom.map((item) => (
                            <div key={item.id} className="flex flex-col items-center space-y-3 p-4 rounded hover:bg-gray-100 transition">
                                <div className="bg-blue-300  border-2 border-orange-500 rounded-full h-16 w-16 flex items-center justify-center overflow-hidden">
                                    <Link to={`/classroom/product/${item.id}`}>
                                        <img
                                            className="h-full w-full object-cover"
                                            src={item.imageUrl} // Changed to 'imageUrl'
                                            alt={item.name}
                                        />
                                    </Link>
                                </div>
                                <p className="text-gray-800 text-center text-sm font-medium line-clamp-2">
                                    {item.name}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
