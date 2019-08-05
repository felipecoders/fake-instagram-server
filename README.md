# Fake Instagram Backend

this server dosen't have users validation, only operation structure with `socket.io` to real-time updating.

> Thanks to [Rocketseat](https://rocketseat.com.br/) and your OmniStack Week

## Routes

| Route           | Verb(s) | Handler              | Middleware            |
| --------------- | ------- | -------------------- | --------------------- |
| /posts          | GET     | PostController.index |                       |
| /posts          | POST    | PostController.store | multer.single('image) |
| /posts/:id/like | POST    | LikeController.store |                       |
