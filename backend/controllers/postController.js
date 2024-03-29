import { getDatabase, ref, set } from "firebase/database";

const db = require("firebase.js")

export const createPost = async (req, res, next) => {
    const body = req.body.body
    const image = req.body.image
    const video = req.body.video
    const userId = req.body.userId

    await set(ref(db, "users/" + userId), {
        body: body,
        image: image,
        video: video,
        userId: userId
    })
}