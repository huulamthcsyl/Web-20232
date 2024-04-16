import { Server } from "socket.io";

export default function configureSocket(server) {
    const io = new Server(server, {});
    
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
        socket.on('sendMessage', (message) => {
            socket.to(message.sentUserId).to(recievedUserId).emit('recieveMessage', message);
        });
    });
}