import React, { useEffect, useState } from 'react';
import { getDocs, setDoc, collection, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { toast } from 'react-toastify';
import Navbar from './Navbar';

interface ClassroomItem {
    id: string;
    name: string;
}

interface FormData {
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

function CreateProduct() {
    const [names, setNames] = useState<string>('');
    const [gender, setGender] = useState<string>('ប្រុស');
    const [age, setAge] = useState<string>('');
    const [istype, setIstype] = useState<string>('ជាសិស្សខំរៀន');
    const [description, setDescription] = useState<string>('');
    const [classroomID, setClassroomID] = useState<string>('');
    const [province, setProvince] = useState<string>('');
    const [village, setVilliage] = useState<string>('');
    const [status, setStatus] = useState<string>('public');
    const [error, setError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [classRoom, setClassRoom] = useState<ClassroomItem[]>([]);

    useEffect(() => {
        getClassroomData();
    }, []);

    const valuesClassRoom = collection(db, 'classroom');

    const getClassroomData = async () => {
        try {
            const snapshot = await getDocs(valuesClassRoom);
            const roomList = snapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
            }));
            setClassRoom(roomList);
        } catch (error) {
            console.error('Error fetching classrooms:', error);
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const validImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
        if (file) {
            if (validImageTypes.includes(file.type)) {
                setImageFile(file);
                setError('');
            } else {
                toast.error('សូមបញ្ចូលរូបភាព image.(jpeg,jpg,png,gif)', { autoClose: 2000 });
                setError('សូមបញ្ចូលរូបភាព image.(jpeg,jpg,png,gif)');
                setImageFile(null);
            }
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (isSubmitting) return;

        if (!imageFile) {
            toast.error('សូមបញ្ចូលរូបភាព');
            return;
        }

        setIsSubmitting(true);

        // Upload the image to Firebase Storage
        const imageRef = ref(storage, `images/${imageFile.name}`);
        try {
            await uploadBytes(imageRef, imageFile);
            const imageUrl = await getDownloadURL(imageRef); // Get the image URL

            // Prepare form data to be saved in Firestore
            const formData: FormData = {
                names,
                gender,
                age,
                istype,
                classroomID,
                province,
                village,
                description,
                imageUrl, 
                status, 
            };

            // Create a document in the "products" collection using names as the ID
            const productRef = doc(db, 'products', names);
            await setDoc(productRef, formData);  // Save the form data to Firestore

            toast.success('ផលិតផលបានបន្ថែមជោគជ័យ!');
            clearForm();  // Clear the form after successful submission
        } catch (error) {
            toast.error('បញ្ហាក្នុងការបញ្ចូលទិន្នន័យ!');
            console.error('Error adding document: ', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const clearForm = () => {
        setNames('');
        setGender('ប្រុស');
        setAge('');
        setIstype('ជាសិស្សខំរៀន');
        setDescription('');
        setClassroomID('');
        setProvince('');
        setVilliage('');
        setStatus('public');
        setError('');
        setImageFile(null);
    };

    return (
        <div>
            <Navbar />
            <div className="body_div px-2 pt-4">
                <div className="flex items-center gap-2 pb-5">
                    <p className="font-NotoSansKhmer font-bold text-3xl">បន្ថែមមាតិកា​ 🙏 </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="flex gap-2">
                        <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
                            <div className="col-span-1 space-y-2">
                                <label className="font-NotoSansKhmer font-bold">ឈ្មោះរបស់អ្នក : *</label>
                                <input
                                    type="text"
                                    required
                                    value={names}
                                    onChange={(e) => setNames(e.target.value)}
                                    className="input_text"
                                    placeholder="ជូនដំណឹងពីបរិមាណ"
                                />
                            </div>
                            <div className="col-span-1 space-y-2">
                                <label className="font-NotoSansKhmer font-bold">ភេទ</label>
                                <select
                                    required
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="input_text"
                                >
                                    <option value="ប្រុស">ប្រុស</option>
                                    <option value="ស្រី">ស្រី</option>
                                    <option value="ភេទទីបី">ភេទទីបី</option>
                                </select>
                            </div>
                            <div className="col-span-1 space-y-2">
                                <label className="font-NotoSansKhmer font-bold">រក្សាទុក្ខ​រូបភាពជា</label>
                                <div className="flex gap-4">
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="public"
                                            name="identification"
                                            value="public"
                                            checked={status === "public"}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <label htmlFor="public" className="ms-2 text-sm font-medium">Public</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="private"
                                            name="identification"
                                            value="private"
                                            checked={status === "private"}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <label htmlFor="private" className="ms-2 text-sm font-medium">Private</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 space-y-2">
                                <label className="font-NotoSansKhmer font-bold">អាយុ</label>
                                <input
                                    type="text"
                                    required
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    className="input_text"
                                    placeholder="ជូនដំណឹងពីបរិមាណ"
                                />
                            </div>
                            <div className="col-span-1 space-y-2">
                                <label className="font-NotoSansKhmer font-bold">កាលមស័យនៅរៀន​🙏​ : *</label>
                                <select
                                    required
                                    value={istype}
                                    onChange={(e) => setIstype(e.target.value)}
                                    className="input_text"
                                >
                                    <option value="ជាសិស្សខំរៀន">ជាសិស្សខំរៀន</option>
                                    <option value="ជាសិស្សពូកែ">ជាសិស្សពូកែ</option>
                                    <option value="ជាសិស្សកិចសាលា">ជាសិស្សកិចសាលា</option>
                                    <option value="លេងបាលមិនចូលរៀន">លេងបាលមិនចូលរៀន</option>
                                    <option value="ជាសិស្សកំពូលញ៉ែស្រី">ជាសិស្សកំពូលញ៉ែស្រី</option>
                                </select>
                            </div>

                            <div className="col-span-1 space-y-2">
                                <label className="font-NotoSansKhmer font-bold">ថ្នាក់រៀន : *</label>
                                <select
                                    required
                                    value={classroomID}
                                    onChange={(e) => setClassroomID(e.target.value)}
                                    className="input_text"
                                >
                                    <option value="">select value</option>

                                    {classRoom.map((items) => (
                                        <option key={items.id} value={items.id}>
                                            {items.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-span-1 space-y-2">
                                <label className="font-NotoSansKhmer font-bold">មកពីខេត្ដ</label>
                                <input
                                    type="text"
                                    required
                                    value={province}
                                    onChange={(e) => setProvince(e.target.value)}
                                    className="input_text"
                                    placeholder="ជូនដំណឹងពីបរិមាណ"
                                />
                            </div>
                            <div className="col-span-1 space-y-2">
                                <label className="font-NotoSansKhmer font-bold">មកពីភូមិ</label>
                                <input
                                    type="text"
                                    required
                                    value={village}
                                    onChange={(e) => setVilliage(e.target.value)}
                                    className="input_text"
                                    placeholder="ជូនដំណឹងពីបរិមាណ"
                                />
                            </div>
                        </div>

                        {/* Image upload component */}
                        <div className="col-span-1 space-y-2">
                            <label className="font-NotoSansKhmer border-dashed rounded-lg cursor-pointer bg-gray-50 font-bold">
                                រូបភាព
                            </label>
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-72 h-72 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                            >
                                {imageFile ? (
                                    <img src={URL.createObjectURL(imageFile)} alt="Uploaded Preview" className="w-full h-full object-contain rounded-lg" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="text-xs text-gray-500">រូបភាព</p>
                                    </div>
                                )}
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                            </label>
                            {error && <p className="text-red-600">{error}</p>}
                        </div>
                    </div>


                    <div className="col-span-3">
                        <label className="font-NotoSansKhmer font-bold">ការណិពណ័នាអំពីរូបភាព</label>
                        <textarea
                            id="description"
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="input_text"
                            placeholder="ការណិពណ័នា"
                        />
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
