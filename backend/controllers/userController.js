import firebase from '../firebase.js';
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import db from '../firebase.js'
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where
} from 'firebase/firestore';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword  
} from "firebase/auth";

// POST /register
export const register = async (req, res, next) => {
  const auth = getAuth();
  const email = req.body.email;
  const password = req.body.password;
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      res.status(200).json({
        status: true,
        message: "signup successfully"
      })
    })
    .catch((error) => {
      if (error.code == 'auth/email-already-in-use') {
        res.status(200).json({
          status: false,
          message: "email already in use"
        })
      }
      else {
        res.status(400).json({
          status: false,
          message: error.message
        })
      }
    });
}

// GET /login
export const login = async (req, res, next) => {
  const auth = getAuth();
  console.log(req.body)
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password)
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      res.status(200).json({
        status: true,
        userId: userCredential.user.uid,
        message: "login successfully"
      })
    })
    .catch((error) => {
      if (error.code == 'auth/invalid-credential') {
        res.status(200).json({
          status: false,
          userId: null,
          message: "wrong password"
        })
      }
      else {
        res.status(400).json({
          status: false,
          userId: null,
          message: error.message
        })
      }
    });
}