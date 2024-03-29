import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';
import { getDatabase } from "firebase/database";
import config from './config.js';

const firebase = initializeApp(config.firebaseConfig);
const db = getDatabase(firebase);

export default db;
