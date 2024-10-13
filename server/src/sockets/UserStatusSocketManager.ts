import { Namespace, Socket } from 'socket.io';
import BaseSocketManager from './BaseSocketManager';
import { updateUserStatus } from '../actions/_index';
import { UserStatus } from '../../../_shared/enums';

class UserStatusSocketManager extends BaseSocketManager {
  constructor(io: Namespace) {
    super(io);
  }

  public handleEvents(socket: Socket): void {
    const uid = (socket as any).user.uid;

    this.trackUserStatus(uid, socket);

    socket.on('userStatus', () => {
      console.log(`User ${uid} updated status`);
    });
  }

  private trackUserStatus(uid: string, socket: Socket): void {
    updateUserStatus(uid, UserStatus.Online);

    socket.on('user-active', () => {
      console.log(`User ${uid} is active`);
      updateUserStatus(uid, UserStatus.Online);
    });

    socket.on('user-inactive', () => {
      updateUserStatus(uid, UserStatus.Away);
    });

    socket.on('disconnect', () => {
      updateUserStatus(uid, UserStatus.Offline);
    });
  }
}

export default UserStatusSocketManager;
