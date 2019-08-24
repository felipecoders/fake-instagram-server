# Fake Instagram Backend

Simple Instagram backend with Realtime connection.

## Usage

- 1 - Download this repository
- 2 - `npm i` or `yarn install`
- 3 - `npm run dev` or `yarn dev`

> Thanks to [Rocketseat](https://rocketseat.com.br/) and your OmniStack Week

## Routes

| Route           | Verb(s) | Handler                 | Middleware            |
| --------------- | ------- | ----------------------- | --------------------- |
| /signin         | POST    | SessionController.store |                       |
| /signup         | POST    | UserController.store    |                       |
| /posts          | GET     | PostController.index    |                       |
| /posts          | POST    | PostController.store    | multer.single('image) |
| /posts/:id/like | POST    | LikeController.store    |                       |
