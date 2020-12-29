/**
 * express api
 *
 * Version: 07.11.2020
 * Copyright (c) 2020 Klepach
 * @author: Oliver Klepach
 *
 * @module api
 *
 * https://blog.pagesd.info/2019/10/29/use-sqlite-node-async-await/
 */

/**
 * sqlite3 module
 */
import sqlite3 from "sqlite3";

/**
 * init the database
 */
export const db = new sqlite3.Database('./movieregister.db', (err) => {
    if (err) {
        console.error("Error opening database " + err.message);
    } else {
        dbCreateTables();
    }
});

export const dbCreateTables = async (): Promise<void> => {
    db.run('CREATE TABLE movies ( \
        record_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
        title NVARCHAR(200) NOT NULL,\
        description NVARCHAR(2000)\
    )', (errA) => {
        if (errA) {
            console.log("Table movies already exists.");
            // const insert = 'INSERT INTO movies (title, description) VALUES (?,?)';
            // db.run(insert, ["Star Wars I", "Star Wars No I"]);
        }
    });
}