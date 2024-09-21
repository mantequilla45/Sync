import { Socket } from 'socket.io';
import { updateUserStatus } from '../actions/StatusUpdate';
import { UserStatus } from '../../../_shared/enums';

// Function to handle user status when they connect
export const trackUserStatus = (uid: string, socket: Socket) => {
  // When user connects, set them to "Online"
  updateUserStatus(uid, UserStatus.Online);

  // Optionally, track user activity for "Away" status
  socket.on('user-active', () => {
    updateUserStatus(uid, UserStatus.Online); // Set back to "Online" if they interact
  });

  socket.on('user-inactive', () => {
    updateUserStatus(uid, UserStatus.Away); // Set to "Away" after inactivity
  });

  socket.on('disconnect', () => {
    updateUserStatus(uid, UserStatus.Offline);
  });
};
