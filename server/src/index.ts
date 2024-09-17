import { httpServer } from './app'; // Import the HTTP server

const port = process.env.PORT || 4000;

httpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
