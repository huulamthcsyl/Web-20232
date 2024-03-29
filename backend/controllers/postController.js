import {collection, addDoc} from "firebase/firestore";

import db from '../firebase.js'

export const createPost = async (req, res, next) => {
    const body = req.body.body
    const image = req.body.image
    const video = req.body.video
    const userId = req.body.userId

    await addDoc(collection(db, "posts"), {
        body: body,
        image: image,
        video: video,
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