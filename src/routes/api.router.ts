/**
 * express route api
 *
 * Version: 07.11.2020
 * Copyright (c) 2020 Klepach
 * @author: Oliver Klepach
 *
 * @module api
 */
// https://auth0.com/blog/use-typescript-to-create-a-secure-api-with-nodejs-and-express-creating-endpoints/

import express, { Request, Response } from "express";
// import * as ItemService from "./items.service";
// import { Item } from "./item.interface";
// import { Items } from "./items.interface";

/**
 * Router Definition
 */
export const apiRouter = express.Router();

/**
 * Controller Definitions
 */

// GET item/
apiRouter.get("/items", async (req: Request, res: Response) => {
    try {
    //   const items: Items = await ItemService.findAll();

    //   res.status(200).send(items);
      res.send(JSON.stringify({"status": 200, "error": null, "response": "get item ok"}));
    } catch (e) {
      res.status(404).send(e.message);
    }
});

// GET items/:id
apiRouter.get("/items/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    //   const items: Items = await ItemService.findAll();

    //   res.status(200).send(items);
      res.send(JSON.stringify({"status": 200, "error": null, "response": "get item " + id + ""}));
    } catch (e) {
      res.status(404).send(e.message);
    }

//   try {
//     const item: Item = await ItemService.find(id);

//     res.status(200).send(item);
//   } catch (e) {
//     res.status(404).send(e.message);
//   }
});

// POST items/

// PUT items/

// DELETE items/:id