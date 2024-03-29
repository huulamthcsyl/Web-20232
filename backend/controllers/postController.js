import { collection, addDoc } from "firebase/firestore";
import db from '../firebase.js'

export const createPost = async (req, res, next) => {
    const body = req.body.body
    const image = req.body.image
    const video = req.body.video
    const userId = req.body.userId

    try {
        const docRef = await addDoc(collection(db, "posts"), {
            body: body,
            image: image,
            video: video,
            userId: userId
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}