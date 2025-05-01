import firebase from "firebase";
import "firebase/firestore";


const firebaseConfig = {
  apiKey: 'Your API Key',
  authDomain: 'reactnativetestapp-cc551.firebaseapp.com',
  projectId: 'reactnativetestapp-cc551',
  storageBucket: 'reactnativetestapp-cc551.firebasestorage.app',
  messagingSenderId: '497678341925',
  appId: '1:497678341925:web:bfa9eebb17d9b8f72f2ccc',
};
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
export default firebase;

