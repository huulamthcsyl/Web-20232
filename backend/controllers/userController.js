import firebase from '../firebase.js';
import Product from '../models/userModel.js';
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


export const register = async (req, res, next) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password
    };
    const userCollection = collection(db, 'users');
    const q = query(userCollection, where('email', '==', req.body.email));
    const data = await getDocs(q);
    if (data.empty) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await addDoc(collection(db, 'users'), user);
      res.status(200).json({
        status: true,
        message: "signup successfully"
      });
    }
    else {
      res.status(200).json({
        status: false,
        message: "email existed"
      });
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const userCollection = collection(db, 'users');
    const q = query(userCollection, where('email', '==', req.body.email));
    const data = await getDocs(q);
    if (data.empty) {
      res.status(200).json({
        status: false,
        message: "email does not exist"
      });
    }
    else {
      let user;
      data.forEach((doc) => {
        user = doc.data();
      });
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (validPassword) {
        res.status(200).json({
          status: true,
          message: "login successfully"
        });
      }
      else {
        res.status(200).json({
          status: false,
          message: "wrong password"
        });
      }
    }
  }
  catch (error) {
    res.status(400).json({
      status: false,
      message: error.message
    });
  }
};