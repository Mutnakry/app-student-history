import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';




// product name  project/reatjs-to-firebase-toturaiul

const firebaseConfig = {
  apiKey: "AIzaSyCFb02Zsz_-sC9ZSSf00LkC8eMh6tOK5I4",
  authDomain: "reatjs-to-firebase-toturaiul.firebaseapp.com",
  databaseURL: "https://reatjs-to-firebase-toturaiul-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "reatjs-to-firebase-toturaiul",
  storageBucket: "reatjs-to-firebase-toturaiul.appspot.com",
  messagingSenderId: "962565941824",
  appId: "1:962565941824:web:00f7810f15de96ae870da5"
};


// product name  app-student-history

// const firebaseConfig = {
//     apiKey: "AIzaSyBXZBj1U_SQcmcYRYux22qPFMiRQ4dravQ",
//     authDomain: "connect-flutter-to-fireb-807bc.firebaseapp.com",
//     projectId: "connect-flutter-to-fireb-807bc",
//     storageBucket: "connect-flutter-to-fireb-807bc.firebasestorage.app",
//     messagingSenderId: "205289775344",
//     appId: "1:205289775344:web:c7fc7155d14a71a42d2235"
//   };



// // email nakrymut2002@gmail.com
// const firebaseConfig = {
//   apiKey: "AIzaSyDM4V6cZ8GaI9m63ZWTJGyGe6cPjjNzhOs",
//   authDomain: "web-student-history.firebaseapp.com",
//   projectId: "web-student-history",
//   storageBucket: "web-student-history.firebasestorage.app",
//   messagingSenderId: "147051212097",
//   appId: "1:147051212097:web:8fe02a2234320b5d0545c0",
//   measurementId: "G-M07SXGTE2W"

// };







// firebase name  app-library

// const firebaseConfig = {
//   apiKey: "AIzaSyDfF4MM7cNw4P_2NGplDgASxqNfKXGo4yA",
//   authDomain: "app-library-7fd8f.firebaseapp.com",
//   databaseURL: "https://app-library-7fd8f-default-rtdb.firebaseio.com",
//   projectId: "app-library-7fd8f",
//   storageBucket: "app-library-7fd8f.appspot.com",
//   messagingSenderId: "205935195683",
//   appId: "1:205935195683:web:0a74397605e63925466396"
// };

// app in fluter
// const firebaseConfig = {
//   apiKey: "AIzaSyDfF4MM7cNw4P_2NGplDgASxqNfKXGo4yA",
//   authDomain: "app-library-7fd8f.firebaseapp.com",
//   databaseURL: "https://app-library-7fd8f-default-rtdb.firebaseio.com",
//   projectId: "app-library-7fd8f",
//   storageBucket: "app-library-7fd8f.appspot.com",
//   messagingSenderId: "205935195683",
//   appId: "1:205935195683:web:48adc232237ac161466396"
// };




const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);


export { auth, db, storage };
export default db;


