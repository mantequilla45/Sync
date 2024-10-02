import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { createServer, Server as HTTPServer } from 'http';
import { corsConfig } from './config/corsConfig';
import { DocumentRoute } from './routes/DocumentRoute';

class AppServer {
  private app: Application;
  private httpServer: HTTPServer;

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
    this.httpServer = createServer(this.app); // Create HTTP server
  }

  private configureMiddleware(): void {
    // Middleware setup
    this.app.use(corsConfig);
    this.app.use(bodyParser.json());
  }

  private configureRoutes(): void {
    // API routes
    this.app.use('/api', DocumentRoute);
  }

  public getHttpServer(): HTTPServer {
    return this.httpServer;
  }
}

export default AppServer;
