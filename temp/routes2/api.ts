/**
 * express route api
 *
 * Version: 07.11.2020
 * Copyright (c) 2020 Klepach
 * @author: Oliver Klepach
 *
 * @module api
 */

    // admin.ts (nested inside of index.ts)
import * as express from "express";

export = (() => {

    const router = express.Router();

    router.get( "/record", ( req: any, res ) => {
        res.send(JSON.stringify({"status": 200, "error": null, "response": "get ok"}));
    } );
    router.post( "/record", ( req: any, res ) => {
        res.send(JSON.stringify({"status": 200, "error": null, "response": "post ok"}));
    } );
    router.delete( "/record", ( req: any, res ) => {
        res.send(JSON.stringify({"status": 200, "error": null, "response": "delete ok"}));
    } );

    return router;
})();
