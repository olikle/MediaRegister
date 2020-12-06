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
import * as RecordService from "../api/records";
import { Records, Record } from "../interfaces/records.interface";

/**
 * Router Definition
 */
export const apiRouter = express.Router();

/**
 * Controller Definitions
 */

// GET item/
apiRouter.get("/items", async (req: Request, res: Response) => {
    const searchText = req.query.searchtext;
    try {
      const records: Records = await RecordService.findAll("Star%");
      res.status(200).send(records);
      // res.send(JSON.stringify({"status": 200, "error": null, "response": "get item ok"}));
    } catch (e) {
      res.status(404).send(e.message);
    }
});

// GET items/:id
apiRouter.get("/items/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
   try {
     const record: Record = await RecordService.find(id);

     res.status(200).send(record);
   } catch (e) {
     res.status(404).send(e.message);
   }
});

// POST items/
apiRouter.post("/", async (req: Request, res: Response) => {
  try {
    const record: Record = req.body.item;

    await RecordService.create(record);

    res.sendStatus(201);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// PUT items/

apiRouter.put("/", async (req: Request, res: Response) => {
  try {
    const record: Record = req.body.item;

    await RecordService.update(record);

    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// DELETE items/:id

apiRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await RecordService.remove(id);

    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});