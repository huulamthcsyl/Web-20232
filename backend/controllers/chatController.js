import Randomstring from "randomstring";
import {
    collection,
    addDoc,
    Timestamp,
    query,
    where,
    getDocs,
    getDoc,
    updateDoc,
    doc,
    setDoc
  } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import db from '../firebase.js';
import Message from '../models/messageModel.js'

// POST /sendMessage
export const sendMessage = async (req, res) => {
    const body = req.body.body;
    const sentUserId = req.body.sentUserId;
    const recievedUserId = req.body.recievedUserId;
    const imageFile = req.files["image"] ? req.files["image"] : null;
    const videoFile = req.files["video"] ? req.files["video"] : null;
  
    const storage = getStorage();
    let imageStorageURL = [];
    let videoStorageURL = [];
    const promises = [];
    // Tạo ra mảng promises để lưu trữ các promise của việc upload ảnh và video lên storage
    if (imageFile) {
      for (let i = 0; i < imageFile.length; i++) {
          const imageStorageRef = ref(storage, `/messageImages/${sentUserId}/${Randomstring.generate()}+${imageFile[i].originalname}`);
          promises.push(uploadBytes(imageStorageRef, imageFile[i].buffer, {contentType: imageFile[i].mimetype}).then(async (snapshot) => {
              imageStorageURL.push(await getDownloadURL(imageStorageRef))
          }));
      }
    }
  
    if (videoFile) {
      for (let i = 0; i < videoFile.length; i++) {
        const videoStorageRef = ref(storage, `/messageVideos/${sentUserId}/${Randomstring.generate()}+${videoFile[i].originalname}`);
        promises.push(uploadBytes(videoStorageRef, videoFile[i].buffer, {contentType: videoFile[i].mimetype}).then(async (snapshot) => {
            videoStorageURL.push(await getDownloadURL(videoStorageRef));
        }));
      }
    }
  
    // Sau khi tất cả các promise đã được resolve thì thực hiện thêm dữ liệu vào firestore
    Promise.all(promises).then(() => {
      // form-data
      addDoc(collection(db, "messages"), {
        body: body,
        image: imageStorageURL,
        video: videoStorageURL,
        sentUserId: sentUserId,
        recievedUserId: recievedUserId,
        read: false,
        createdAt: Timestamp.fromDate(new Date())
      })
        .then(() => {
          res.status(200).json({
              status: true,
              message: "Gửi tin nhắn thành công.",
              msg: {
                body: body,
                image: imageStorageURL,
                video: videoStorageURL,
                sentUserId: sentUserId,
                recievedUserId: recievedUserId,
                read: false,
                createdAt: Timestamp.fromDate(new Date())
              }
          })
      })
        .catch((error) => {
          res.status(400).json({
              status: false,
              message: error.message
          })
      })
    })
}

// GET /getUnreadMessages/:userId
export const getUnreadMessages = async (req, res) => {
  const messagesCollection = collection(db, "messages");
  const q = query(messagesCollection, 
    where('recievedUserId', '==', req.params.userId),
    where('read', '==', false)
  );
  var messagesList = [];
  getDocs(q)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let message = new Message(doc);
        messagesList.push(message);
      });
      res.status(200).json({
        status: true,
        messages: messagesList
      })
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        message: error.message
      });
    });
}

// Save message
export const saveMessage = async (message) => {
  let id = (message.sentUserId < message.receivedUserId) ? 
  (message.sentUserId + '-' + message.receivedUserId) : 
  (message.receivedUserId + '-' + message.sentUserId);
  const conservationDoc = doc(db, "conversations", id);
  const data = await getDoc(conservationDoc);
  if (data.exists()) {
    const messageCollection = collection(data.ref, "messages");
    await addDoc(messageCollection, {
      sentUserId: message.sentUserId,
      receivedUserId: message.receivedUserId,
      content: message.content,
      createdAt: Timestamp.fromDate(new Date()),
      isRead: false
    }); 
  }
  else {
    await setDoc(doc(db, "conversations", id), {});
    const messageCollection = collection(doc(db, "conversations", id), "messages");
    await addDoc(messageCollection, {
      sentUserId: message.sentUserId,
      receivedUserId: message.receivedUserId,
      content: message.content,
      createdAt: Timestamp.fromDate(new Date()),
      isRead: false
    }); 
  }

}