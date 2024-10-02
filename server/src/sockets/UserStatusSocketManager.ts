import { Socket } from 'socket.io';
import BaseSocketManager from './BaseSocketManager';
import { updateUserStatus } from '../actions/_index';
import { UserStatus } from '../../../_shared/enums';

class UserStatusSocketManager extends BaseSocketManager {

  public handleEvents(socket: Socket): void {

    socket.on('userStatus', (uid: string) => {
      this.trackUserStatus(uid, socket);
    });
  }

  private trackUserStatus(uid: string, socket: Socket): void {
    // When the user connects, set them to "Online"
    updateUserStatus(uid, UserStatus.Online);

    socket.on('user-active', () => {
      updateUserStatus(uid, UserStatus.Online); // Set back to "Online" if they interact
    });

    socket.on('user-inactive', () => {
      updateUserStatus(uid, UserStatus.Away); // Set to "Away" after inactivity
    });

    // When the user disconnects, set them to "Offline"
    socket.on('disconnect', () => {
      updateUserStatus(uid, UserStatus.Offline);
    });
  }
}

export default UserStatusSocketManager;
