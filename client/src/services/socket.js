import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect(userId) {
    if (!this.socket) {
      this.socket = io(SOCKET_URL);
      this.socket.emit('join', userId);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emitTaskChange(userId) {
    if (this.socket) {
      this.socket.emit('taskChanged', userId);
    }
  }

  onUpdateTasks(callback) {
    if (this.socket) {
      this.socket.on('updateTasks', callback);
    }
  }
}

const socketService = new SocketService();
export default socketService;
