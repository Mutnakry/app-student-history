// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import { db } from '../firebase'; 
// import { setDoc, doc } from 'firebase/firestore';
// import Navbar from './Navbar';

// function CreateProduct() {
//     const [roomnames, setRoomNames] = useState<string>('');

//     // Handle form submission
//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();

//         if (!roomnames) {
//             toast.error('សូមបញ្ចូលឈ្មោះ');
//             return;
//         }

//         try {
//             const productRef = doc(db, 'classroom', roomnames);

//             // Add the document to Firestore
//             await setDoc(productRef, {
//                 name: roomnames, 
//             });

//             toast.success('ផលិតផលបានបន្ថែមជោគជ័យ!');
//             setRoomNames('');
//         } catch (error) {
//             // Show error toast message
//             toast.error('បញ្ហាក្នុងការបញ្ចូលទិន្នន័យ!');
//             console.error('Error adding document: ', error);
//         }
//     };

//     return (
//         <div>
//             <Navbar />
//             <div className='body_div px-2 pt-4'>
//                 <div className='flex items-center gap-2 pb-5'>
//                     <p className='font-NotoSansKhmer font-bold text-3xl'>បន្ថែមមាតិកា​ 🙏 </p>
//                 </div>

//                 <form onSubmit={handleSubmit}>
//                     <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
//                         <div className="col-span-1 space-y-2">
//                             <label className="font-NotoSansKhmer font-bold">ឈ្មោះរបស់អ្នក : *</label>
//                             <input
//                                 type="text"
//                                 id="price"
//                                 required
//                                 value={roomnames}
//                                 onChange={(e) => setRoomNames(e.target.value)}
//                                 className="input_text"
//                                 placeholder="ជូនដំណឹងពីបរិមាណ"
//                             />
//                         </div>
//                     </div>

//                     <div className='flex justify-end mb-10'>
//                         <button type="submit" className="button_only_submit">
//                             រក្សាទុក្ខ
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default CreateProduct;


import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../firebase'; 
import { setDoc, doc } from 'firebase/firestore';
import Navbar from './Navbar';

function CreateProduct() {
    const [roomnames, setRoomNames] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);  // Flag to prevent multiple submissions

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (isSubmitting) return;

        if (!roomnames) {
            toast.error('សូមបញ្ចូលឈ្មោះ');
            return;
        }

        setIsSubmitting(true); 

        try {
            const productRef = doc(db, 'classroom', roomnames);

            // Add the document to Firestore
            await setDoc(productRef, {
                name: roomnames, 
            });

            toast.success('ផលិតផលបានបន្ថែមជោគជ័យ!');
            setRoomNames('');
        } catch (error) {
            // Show error toast message
            toast.error('បញ្ហាក្នុងការបញ្ចូលទិន្នន័យ!');
            console.error('Error adding document: ', error);
        } finally {
            setIsSubmitting(false); 
        }
    };

    return (
        <div>
            <Navbar />
            <div className='body_div px-2 pt-4'>
                <div className='flex items-center gap-2 pb-5'>
                    <p className='font-NotoSansKhmer font-bold text-3xl'>បន្ថែមមាតិកា​ 🙏 </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
                        <div className="col-span-1 space-y-2">
                            <label className="font-NotoSansKhmer font-bold">ឈ្មោះរបស់អ្នក : *</label>
                            <input
                                type="text"
                                id="price"
                                required
                                value={roomnames}
                                onChange={(e) => setRoomNames(e.target.value)}
                                className="input_text"
                                placeholder="ជូនដំណឹងពីបរិមាណ"
                            />
                        </div>
                    </div>

                    <div className='flex justify-end mb-10'>
                        <button
                            type="submit"
                            className="button_only_submit"
                            disabled={isSubmitting} 
                        >
                            រក្សាទុក្ខ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateProduct;
