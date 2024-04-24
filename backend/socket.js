import { Server } from "socket.io";

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
        console.log(socket.userId + " joined");
        socket.join(socket.userId);
        socket.on('sendMessage', (message) => {
            console.log(message)
            socket.to(message.sentUserId).to(message.receivedUserId).emit('receiveMessage', message);
        });
    });
}