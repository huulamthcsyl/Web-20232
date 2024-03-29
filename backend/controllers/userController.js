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
  where,
  setDoc
} from 'firebase/firestore';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut  
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// POST /register
export const register = async (req, res, next) => {
  const auth = getAuth();
  const email = req.body.email;
  const password = req.body.password;
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      res.status(200).json({
        status: true,
        message: "Đăng ký thành công"
      })
    })
    .catch((error) => {
      if (error.code == 'auth/email-already-in-use') {
        res.status(200).json({
          status: false,
          message: "Email đã được sử dụng"
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

// POST /login
export const login = async (req, res, next) => {
  const auth = getAuth();
  console.log(req.body)
  const email = req.body.email;
  const password = req.body.password;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      res.status(200).json({
        status: true,
        user: userCredential.user,
        message: "Đăng nhập thành công"
      })
    })
    .catch((error) => {
      if (error.code == 'auth/invalid-credential' || error.code == 'auth/missing-email') {
        res.status(200).json({
          status: false,
          userId: null,
          message: "Email hoặc mật khẩu không đúng"
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

// POST /logout
export const logout = async (req, res) => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      res.status(200).json({
        status: true,
        message: "Đăng xuất thành công"
      })
    })
    .catch((error) => {
      res.status(200).json({
        status: false,
        message: error.message
      })
    });
}

// POST /updateProfile/:idUser
export const updateProfile = async (req, res) => {
  const docRef = doc(db, "profiles", req.params.idUser);
  const docSnap = await getDoc(docRef);
  const storage = getStorage();
  const cover = req.file;
  const storageRef = ref(storage, `covers/${req.params.idUser}`);
  const metadata = {
    contentType: req.file.mimetype,
  };
  uploadBytes(storageRef, req.file.buffer, metadata)
    .then(async (snapshot) => {
      let coverUrl = await getDownloadURL(storageRef);
      if (docSnap.exists()) {
        updateDoc(doc(db, "profiles", req.params.idUser), {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          DOB: req.body.DOB,
          address: req.body.address,
          gender: req.body.gender,
          school: req.body.school,
          cover: coverUrl,
          work: req.body.work,
        })
        .then(() => {
          res.status(200).json({
            status: true,
            message: "Cập nhật thành công"
          })
        })
        .catch((error) => {
          res.status(400).json({
            status: false,
            message: error.message
          })
        });
      } 
      else {
        setDoc(doc(db, "profiles", req.params.idUser), {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          DOB: req.body.DOB,
          address: req.body.address,
          gender: req.body.gender,
          school: req.body.school,
          cover: coverUrl,
          work: req.body.work,
        })
        .then(() => {
          res.status(200).json({
            status: true,
            message: "Cập nhật thành công"
          })
        })
        .catch((error) => {
          res.status(400).json({
            status: false,
            message: error.message
          })
        })
      }
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        message: error.message
      })
    })
}