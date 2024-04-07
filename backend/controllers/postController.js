import {collection, addDoc, getDocs} from "firebase/firestore"
import { getStorage, ref, uploadBytes } from "firebase/storage"

import db from '../firebase.js'

const createPost = async (req, res) => {
    const body = req.body.body
    const imageFile = req.files["image"] ? req.files["image"] : null
    const videoFile = req.file["video"] ? req.files["video"] : null
    const userId = req.body.userId

    const storage = getStorage();
    const imageStorageRef = ref(storage, '/postImage')
    const videoStorageRef = ref(storage, '/postVideo')

    for (let i = 0; i < imageFile.length; i++) {
        uploadBytes(imageStorageRef, imageFile[i]).then((snapshot) => {
            console.log('Uploaded a blob or file image!')
        })
    }

    for (let i = 0; i < videoFile.length; i++) {
        uploadBytes(videoStorageRef, videoFile[i]).then((snapshot) => {
            console.log('Uploaded a blob or file image!')
        })
    }

    // form-data
    await addDoc(collection(db, "posts"), {
        body: body,
        image: imageFile.__filename,
        video: videoFile.__filename,
        userId: userId
    }).then(() => {
        res.status(200).json({
            status: true,
            message: "Tạo bài đăng thành công."
        })
    }).catch((error) => {
        res.status(400).json({
            status: false,
            message: error.message
        })
    })
}

const getPost = async (req, res) => {
    const userId = req.body.userId
    let posts = []
    let querySnapshot

    if (userId) {
        querySnapshot = await db.collection("path")
            .where("userId", "==", userId)
            .get()
    } else {
        querySnapshot = await db.collection("path")
            .get()
    }

    if (querySnapshot.empty) {
        res.status(402).json({
            message: "No post found!"
        })
    }

    if (userId) {
        res.status(200).json({
            message: "Found posts from user id " + userId,
            userId: userId,
            data: querySnapshot.docs
        })
    } else {
        res.status(200).json({
            message: "Found all posts",
            data: querySnapshot.docs
        })
    }
}

module.exports = {
    createPost,
    getPost
}