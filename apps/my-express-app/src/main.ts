/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import { type User, type Post } from "@prisma/client";
import { Server } from 'socket.io';
import ss from 'socket.io-stream';
import { faker } from "@faker-js/faker";

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  const user: User = {
    id: 1,
    email: "foo@bar.com",
    name: "Foo Bar"
  };

  res.send({ message: 'Welcome to my-express-app', user });
});

app.get('/api/hw', (req, res) => {
  const post: Post = {
    id: 1,
    title: "Hello World",
    content: "This is a post about Hello World",
    published: true,
    authorId: 1
  };

  res.send({ message: 'Hello World', post });
});

const port = process.env.PORT || 3333;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

const io = new Server(server, {
  path: '/api/socket.io'
});

io.on('connection', (socket) => {
  console.log('a user connected');

  ss(socket).on('greetings', (stream) => {
    const randomString = faker.lorem.sentences(5);
    const randomStringAsByteArray = Buffer.from(randomString);
    const lengthAsByteArray = Buffer.alloc(4);
    lengthAsByteArray.writeUInt32BE(randomStringAsByteArray.length, 0);

    stream.write(lengthAsByteArray);

    for (let i = 0; i < randomStringAsByteArray.length; i++) {
      stream.write(Buffer.from([randomStringAsByteArray[i]]));
    }

    stream.end();
  });
});

server.on('error', console.error);
