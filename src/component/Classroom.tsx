import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import Navbar from './Navbar';

function CreateProduct() {
    const [roomnames, setRoomNames] = useState<string>(''); // Room name (text)
    const [image, setImage] = useState<string | null>(null); // Image preview URL
    const [imageFile, setImageFile] = useState<File | null>(null); // The image file to upload
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle image file selection
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

        if (file) {
            if (validImageTypes.includes(file.type)) {
                const imageURL = URL.createObjectURL(file);
                setImage(imageURL); // Display the preview image
                setImageFile(file);  // Save the file for uploading
            } else {
                toast.error('សូមបញ្ចូលរូបភាព image.(jpeg,jpg,png,gif)', { autoClose: 2000 });
                setImage(null); // Clear the image if invalid
                setImageFile(null);
            }
        }
    };

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (isSubmitting) return;

        if (!roomnames) {
            toast.error('សូមបញ្ចូលឈ្មោះ');
            return;
        }

        if (!imageFile) {
            toast.error('សូមបញ្ចូលរូបភាព');
            return;
        }

        setIsSubmitting(true);

        // Upload image to Firebase Storage
        const imageRef = ref(storage, `images/${imageFile.name}`);

        try {
            await uploadBytes(imageRef, imageFile);
            const imageUrl = await getDownloadURL(imageRef);

            const productRef = doc(db, 'classroom', roomnames);
            await setDoc(productRef, { name: roomnames, imageUrl });

            toast.success('ផលិតផលបានបន្ថែមជោគជ័យ!');

            // Reset form after successful submission
            setRoomNames('');
            setImage(null);
            setImageFile(null);
        } catch (error) {
            console.error('Error during upload or Firestore operation:', error);
            toast.error('បញ្ហាក្នុងការបញ្ចូលទិន្នន័យ!');
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
                                className="input_text "
                                placeholder="ជូនដំណឹងពីបរិមាណ"
                            />
                        </div>

                        <div className="col-span-1 space-y-2 ">
                            <label className="font-NotoSansKhmer border-dashed rounded-lg cursor-pointer bg-gray-50 font-bold">
                                រូបភាព
                            </label>

                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-72 h-72 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                            >
                                {image ? (
                                    <img src={image} alt="Uploaded Preview" className="w-full h-full object-contain rounded-lg" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">រូបភាព</p>
                                    </div>
                                )}
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                            </label>
                        </div>
                    </div>

                    <div className='flex justify-end mb-10'>
                        <button
                            disabled={isSubmitting}
                            type="submit"
                            className={`button_only_submit ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'កំពុងរក្សាទុក...' : 'រក្សាទុក្ខ'}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateProduct;
