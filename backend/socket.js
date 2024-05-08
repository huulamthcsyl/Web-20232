import { Server } from "socket.io";
import { saveMessage } from "./controllers/chatController.js";
import { likePost, createPostBelongToPost } from "./controllers/postController.js";

export default function configureSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: "*",
        },
    });
    
    io.use((socket, next) => {
        const userId = socket.handshake.query.userId;
        if (!userId) {
            return next(new Error("Invalid userId"));
        }
        else {
            socket.userId = socket.handshake.query.userId;
            next();
        }
    });

    io.on('connection', (socket) => {
        socket.join(socket.userId);

        // chuyển id khi online đến người dùng khác
        socket.broadcast.emit("userConnected", {
            userID: socket.id
        });
        
        // chuyển tin nhắn
        socket.on('sendMessage', (message) => {
            socket.to(message.sentUserId).to(message.receivedUserId).emit('receiveMessage', message);
            saveMessage(message);
        });

        // gửi lời mời kết bạn
        socket.on('sendFriendRequest', (request) => {
            socket.to(request.friendId).emit('receiveFriendRequest', request);
        });

        // notify on post liked
        socket.on('createComment', (request) => {
            socket.to(request.postId.userId).emit('createComment', request);
            createPostBelongToPost(request).then()
        });

        // notify on post liked
        socket.on('likePost', (request) => {
            socket.to(request.postId.userId).emit('likePost', request);
            likePost(request).then()
        });

        // xóa id khi offline
        socket.on('disconnect', () => {
            socket.broadcast.emit("userDisconnected", {
                userID: socket.id
            });
        });
    });
}