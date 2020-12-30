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

// GET movies/
apiRouter.get("/movies", async (req: Request, res: Response) => {
    const searchText = req.query.searchtext;
    try {
      const records: Records = await RecordService.FindAllMovies("Star%");
      res.status(200).send(records);
      // res.send(JSON.stringify({"status": 200, "error": null, "response": "get item ok"}));
    } catch (e) {
      res.status(404).send(e.message);
    }
});

// GET movies/:id
apiRouter.get("/movies/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const record: Record = await RecordService.ReadMovie(id);
    if (!record)
    {
      res.status(404).send("Record not found!");
    }
    else
    {
      res.status(200).send(record);
    }
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// POST movies - create
apiRouter.post("/movies", async (req: Request, res: Response) => {
  try {
    console.log("post item body", req.body);
    const record: Record = req.body;

    await RecordService.CreateOrUpdate(record);

    res.sendStatus(200).send({ status: "created/updated"});
  } catch (e) {
    console.error(e.message);
    res.status(404).send(e.message);
  }
});

// POST movies/:id - update
apiRouter.post("/movies/:id", async (req: Request, res: Response) => {
  try {
    console.log("post item body", req.body);
    const record: Record = req.body;
    record.id = Number(req.params.id);
    await RecordService.CreateOrUpdate(record);

    res.sendStatus(201);// .send({ status: "ceeated"});
  } catch (e) {
    console.error(e.message);
    res.status(404).send(e.message);
  }
});

// DELETE movies/:id
apiRouter.delete("/movies/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await RecordService.Delete(id);

    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});