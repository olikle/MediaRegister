npm install -g json-server

start:
json-server --watch media.json

http://localhost:3000/media/1



https://www.npmjs.com/package/json-server
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
selfhtml.org