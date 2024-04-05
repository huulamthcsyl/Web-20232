import { collection, addDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytes } from "firebase/storage"

import db from '../firebase.js'

export const createPost = async (req, res, next) => {
    const body = req.body.body
    const imageFile = req.files["image"] ? req.files["image"][0] : null
    const videoFile = req.file["video"] ? req.files["video"][0] : null
    const userId = req.body.userId

    const storage = getStorage();
    const imageStorageRef = ref(storage, '/postImage')
    const videoStorageRef = ref(storage, '/postVideo')

    uploadBytes(imageStorageRef, imageFile).then((snapshot) => {
        console.log('Uploaded a blob or file image!')
    })

    uploadBytes(videoStorageRef, videoFile).then((snapshot) => {
        console.log('Uploaded a blob or file video!')
    })

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