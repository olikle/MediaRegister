/**
 * express api
 *
 * Version: 07.11.2020
 * Copyright (c) 2020 Klepach
 * @author: Oliver Klepach
 *
 * @module api
 */


/**
 * Data Model Interfaces
 */

import { Records, Record } from "../interfaces/records.interface";
import { ReadAll, ReadOne, RunQuery } from "./database";

/**
 * In-Memory Store
 */

const records: Records = {
  1: {
    id: 1,
    title: "Alien",
    description: "Alien Part 1"
  },
  2: {
    id: 2,
    title: "Alien II",
    description: "Alien Part 2"
  },
  3: {
    id: 3,
    title: "Matrix",
    description: "Matrix I"
  }
};

/**
 * find all movies
 */
export const FindAllMovies = async (searchText: string): Promise<Records> => {
  const sql = "SELECT * FROM movies" + (searchText !== "" ? " where title like ?" : "");
  console.log("FindAllMovies", sql, searchText);
  try {
    const returnMovies = await ReadAll(sql, searchText) as Records;

    console.log("FindAllMovies", returnMovies);

    return returnMovies;
  }
  catch (error) {
    console.error("FindAllMovies Error", error);
    throw error;
  }
};

/**
 * Read the movie
 */
export const ReadMovie = async (id: number): Promise<Record> => {
  const sql = "SELECT record_id as id, title, description FROM movies where record_id like ?";
  console.log("ReadMovie", sql, id);
  try {
    const returnRecord = await ReadOne(sql, id) as Record;
    if (!returnRecord)
    {
      console.log("ReadMovie Error", "Record not found!");
      return null;
    }
    console.log("ReadMovie return row", returnRecord.id, returnRecord.title, returnRecord);

    return returnRecord;
  }
  catch (error) {
    console.error("ReadMovie Error", error);
    throw error;
  }
};


/**
 * create or update the movie
 */
export const CreateOrUpdate = async (recordItem: Record): Promise<void> => {
  let sql = "";
  try {
    if (!recordItem.id)
    {
      sql = "INSERT INTO movies (title, description) VALUES (?, ?)";
      console.log("CreateOrUpdate", sql, recordItem);
      await RunQuery(sql, [recordItem.title, recordItem.description]);
    }
    else
    {
      sql = "UPDATE movies SET title = ?, description = ? WHERE record_id = ?";
      console.log("CreateOrUpdate", sql, recordItem);
      await RunQuery(sql, [recordItem.title, recordItem.description, recordItem.id]);
    }
  }
  catch (error) {
    console.error("CreateOrUpdateMovie Error", error);
    throw error;
  }
};

export const Delete = async (id: number): Promise<void> => {
  let sql = "";
  try {
    sql = "DELETE FROM movies WHERE record_id = ?";
    console.log("Delete", sql, id);
    await RunQuery(sql, [id]);
  }
  catch (error) {
    console.error("DeleteMovie Error", error);
    throw error;
  }
};
