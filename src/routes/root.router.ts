/**
 * express route root
 *
 * Version: 07.11.2020
 * Copyright (c) 2020 Klepach
 * @author: Oliver Klepach
 *
 * @module root
 */
// https://auth0.com/blog/use-typescript-to-create-a-secure-api-with-nodejs-and-express-creating-endpoints/

import express, { Request, Response } from "express";

/**
 * Router Definition
 */
export const rootRouter = express.Router();

// index/
rootRouter.get("/", async (req: Request, res: Response) => {
    res.render( "index" );
});
