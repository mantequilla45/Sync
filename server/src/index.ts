import AppServer from './AppServer';
import SocketManager from './SocketManager';

const port = process.env.PORT ?? 4000;

const appServer = new AppServer();

const httpServer = appServer.getHttpServer();

const socketManager = new SocketManager(httpServer);

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
