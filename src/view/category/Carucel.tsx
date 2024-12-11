
// import { useState, useEffect } from "react";

// const images = [
//   "https://www.khmer24.ws/www/delivery/ai.php?filename=web_5.png%20(2)&contenttype=png",
//   "https://www.khmer24.ws/www/delivery/ai.php?filename=en_khmer24-(1).gif&contenttype=gif",
//   "https://www.khmer24.ws/www/delivery/ai.php?filename=khmer24-970x250.gif%20(10)&contenttype=gif",
//   "https://www.khmer24.ws/www/delivery/ai.php?filename=web_5.png%20(2)&contenttype=png",
//   "https://www.khmer24.ws/www/delivery/ai.php?filename=en_khmer24-(1).gif&contenttype=gif",
//   "https://www.khmer24.ws/www/delivery/ai.php?filename=khmer24-970x250.gif%20(10)&contenttype=gif",
// ];

// export default function Carucel() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   };

//   // Auto-scroll using useEffect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 30000);

//     return () => clearInterval(interval);
//   }, [currentIndex]); 

//   return (
//     <div className="max-w-screen-lg mx-auto body mt-2 lg:w-full w-[768px] md:px-0  px-4">
//       <div className="relative  overflow-hidden lg:w-full">
//         <div
//           className="flex transition-transform duration-500"
//           style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//         >
//           {images.map((src, index) => (
//             <img
//               key={index}
//               src={src}
//               alt={`Slide ${index}`}
//               className="w-full object-cover  h-72"
//             />
//           ))}
//         </div>
//         {/* Navigation */}
//         <button
//           className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 opacity-40 text-white p-2 rounded-full"
//           onClick={prevSlide}
//         >
//           &larr;
//         </button>
//         <button
//           className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white opacity-40 p-2 rounded-full"
//           onClick={nextSlide}
//         >
//           &rarr;
//         </button>

//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { getDocs, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../../firebase';

interface ClassroomItem {
  id: string;
  name: string;
  imageUrl?: string; 
}

export default function Carousel() {
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
      const dataList: ClassroomItem[] = snapshot.docs.map((doc) => ({
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

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === classRoom.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? classRoom.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 30000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto body mt-2 w-full sm:w-[768px] lg:w-full md:px-0 px-4">
      <div className="relative overflow-hidden lg:w-full">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {classRoom.map((item, index) => (
            <img
              key={index}
              src={item.imageUrl}
              alt={`Slide ${index}`}
              className=" w-[768px] object-cover h-72 border-x-2 border-orange-500"
            />
          ))}
        </div>
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 opacity-40 text-white p-2 rounded-full"
          onClick={prevSlide}
        >
          &larr;
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 opacity-40 text-white p-2 rounded-full"
          onClick={nextSlide}
        >
          &rarr;
        </button>
      </div>
    </div>

  );
}
