/**
 * express api
 *
 * Version: 07.11.2020
 * Copyright (c) 2020 Klepach
 * @author: Oliver Klepach
 *
 * @module api
 *
 * https://www.npmjs.com/package/sqlite
 *
 * https://www.scriptol.com/sql/sqlite-async-await.php
 *
 * https://stackoverflow.com/questions/62456867/cannot-await-for-sqlite3-database-get-function-completion-in-node-js
 * https://blog.pagesd.info/2019/10/29/use-sqlite-node-async-await/
 * https://www.codota.com/code/javascript/functions/sqlite3/Database/exec
 */

/**
 * sqlite3 module
 */
import sqlite3 from 'sqlite3';

/**
 * init the database
 */
const db = new sqlite3.Database('./movieregister.db', (err) => {
    sqlite3.verbose();
    if (err) {
        console.error("Error opening database " + err.message);
    } else {
        dbCreateTables();
    }
});

// this is a top-level await
/*
export const db = new sqlite3.Database('./movieregister.db', (err) => {
    sqlite3.verbose();
    if (err) {
        console.error("Error opening database " + err.message);
    } else {
        dbCreateTables();
    }
});
*/

export const dbCreateTables = async (): Promise<void> => {
    db.run('CREATE TABLE movies ( \
        record_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
        title NVARCHAR(200) NOT NULL,\
        description NVARCHAR(2000)\
    )', (err) => {
        if (err) {
            console.log("Table movies already exists.");
            // const insert = 'INSERT INTO movies (title, description) VALUES (?,?)';
            // db.run(insert, ["Star Wars I", "Star Wars No I"]);
        }
    });
}
/**
 * read one record
 */
export const ReadOne = async (query: string, params: any): Promise<any> => {
    return new Promise( (resolve, reject) => {
        if (params === undefined) params=[];

        db.get(query, params, (err: any, row: any) => {
            if(err)
                reject("ReadOne error: " + err.message)
            else {
                resolve(row);
            }
        });
    });
}

/**
 * read all records
 */
export const ReadAll = async (query: string, params: any): Promise<any> => {
    return new Promise( (resolve, reject) => {
        if (params === undefined) params=[];

        db.all(query, params, (err: any, rows: any) => {
            if(err)
                reject("ReadAll error: " + err.message)
            else {
                resolve(rows)
            }
        });
    });
}

/**
 * any query: insert/delete/update
 */
//
export const RunQuery = async (query: string, params: any) => {
    return new Promise( (resolve, reject) => {
        db.run(query, params, (err: any) => {
            if (err)
                reject(err.message);
            else
                resolve(true);
        })
    })
}