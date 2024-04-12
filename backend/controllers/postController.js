import {addDoc, collection, getDocs, Timestamp} from "firebase/firestore"
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"
import Randomstring from "randomstring"

import db from '../firebase.js'

export const createPost = async (req, res) => {
    const body = req.body.body
    const userId = req.body.userId
    const imageFile = req.files["image"] ? req.files["image"] : null
    const videoFile = req.files["video"] ? req.files["video"] : null

    const storage = getStorage();
    let imageStorageURL = []
    let videoStorageURL = ""
    const promises = []
    // Tạo ra mảng promises để lưu trữ các promise của việc upload ảnh và video lên storage
    if (imageFile) {
        for (let i = 0; i < imageFile.length; i++) {
            const imageStorageRef = ref(storage, `/postImage/${userId}/${Randomstring.generate()}+${imageFile[i].originalname}`)
            promises.push(uploadBytes(imageStorageRef, imageFile[i].buffer, {contentType: imageFile[i].mimetype}).then(async (snapshot) => {
                imageStorageURL.push(await getDownloadURL(imageStorageRef))
            }))
        }
    }

    if (videoFile) {
        const videoStorageRef = ref(storage, `/postVideo/${userId}/${Randomstring.generate()}+${videoFile[0].originalname}`)
        promises.push(uploadBytes(videoStorageRef, videoFile[0].buffer, {contentType: videoFile[0].mimetype}).then(async (snapshot) => {
            videoStorageURL = await getDownloadURL(videoStorageRef)
        }))
    }
    // Sau khi tất cả các promise đã được resolve thì thực hiện thêm dữ liệu vào firestore
    Promise.all(promises).then(() => {
        // form-data
        addDoc(collection(db, "posts"), {
            body: body,
            image: imageStorageURL,
            video: videoStorageURL,
            userId: userId,
            dateCreated: Timestamp.fromDate(new Date())
        }).then(() => {
            res.status(200).json({
                status: true,
                message: "Tạo bài đăng thành công.",
                post: {
                    body: body,
                    image: imageStorageURL,
                    video: videoStorageURL,
                    userId: userId,
                    dateCreated: Timestamp.fromDate(new Date())
                }
            })
        }).catch((error) => {
            res.status(400).json({
                status: false,
                message: error.message
            })
        })
    })
}

export const getPostByUserId = async (req, res) => {
    const userId = req.params.userId
    let posts = []

    const querySnapshot =
        await getDocs(collection(db, "posts"))

    querySnapshot.forEach((doc) => {
        if (doc.data().userId === userId) {
            posts.push(doc.data())
        }
    })

    if (posts.length === 0) {
        res.status(201).json({
            message: `No posts by user ${userId} found`,
        })
    }

    res.status(200).json({
        message: `Found posts by user ${userId}.`,
        data: posts
    })
}

export const getAllPost = async (req, res) => {
    let posts = []
    const querySnapshot = await getDocs(collection(db, "posts"))
    querySnapshot.forEach((doc) => {
        console.log(doc.data())
        posts.push(doc.data())
    })

    if (querySnapshot.empty) {
        res.status(402).json({
            message: "No post found!"
        })
    }

    res.status(200).json({
        message: "Found all posts",
        data: posts
    })
}

export const getPostByPostId = async (req, res) => {
    const postId = req.params.postId
    let posts = []

    const querySnapshot =
        await getDocs(collection(db, "posts"))

    querySnapshot.forEach((doc) => {
        if (doc.data().userId === userId) {
            posts.push(doc.data())
        }
    })

    if (posts.length === 0) {
        res.status(201).json({
            message: `No posts by user ${userId} found`,
        })
    }

    res.status(200).json({
        message: `Found posts by user ${userId}.`,
        data: posts
    })
}