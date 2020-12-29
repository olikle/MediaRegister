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
import { db } from "./database";

/**
 * In-Memory Store
 */

const records: Records = {
  1: {
    id: 1,
    name: "Alien",
    description: "Alien Part 1"
  },
  2: {
    id: 2,
    name: "Alien II",
    description: "Alien Part 2"
  },
  3: {
    id: 3,
    name: "Matrix",
    description: "Matrix I"
  }
};

/**
 * find all records
 */
export const findAll = async (searchText: string): Promise<Records> => {

 const sql = "SELECT * FROM movies" + (searchText !== "" ? " where title like ?" : "");
 console.log("sql", sql);
 const dbResult = db.get(sql, searchText, (err, rows) => {
    if (err) {
        console.error(err.message);
        return null;
    }
    console.log("return Rows", rows);
    return rows;
  });

  console.log("dbResult", dbResult);

  return null;
};

export const find = async (id: number): Promise<Record> => {
  const record: Record = records[id];

  if (record) {
    return record;
  }

  throw new Error("No record found");
};

export const create = async (newItem: Record): Promise<void> => {
  const id = new Date().valueOf();
  records[id] = {
    ...newItem,
    id
  };
};

export const update = async (updatedItem: Record): Promise<void> => {
  if (records[updatedItem.id]) {
    records[updatedItem.id] = updatedItem;
    return;
  }

  throw new Error("No record found to update");
};

export const remove = async (id: number): Promise<void> => {
  const record: Record = records[id];

  if (record) {
    delete records[id];
    return;
  }

  throw new Error("No record found to delete");
};
