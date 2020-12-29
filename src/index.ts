import dotenv from "dotenv";
import express from "express";
import cors from 'cors';
import path from "path";

import { rootRouter } from "./routes/root.router";
import { apiRouter } from "./routes/api.router";

// https://expressjs.com/de/starter/static-files.html

// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT;

const app = express();

app.use("/", rootRouter);
app.use("/api", apiRouter);

// static files
app.use("/Proto", express.static('Proto'));

// Configure Express to use EJS
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

// Configure routes
// routes.register( app );

// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );