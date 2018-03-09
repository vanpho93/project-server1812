const express = require('express');
const storyRouter = express.Router();
const parser = require('body-parser').json();

const Comment = require('../models/comment.model');
const { mustBeUser } = require('./mustBeUser');

storyRouter.use(parser);
storyRouter.use(mustBeUser);

storyRouter.post('/', (req, res) => {
    const { idStory, content } = req.body;
    Comment.createComment(req.idUser, idStory, content)
    .then(comment => res.send({ success: true, comment }))
    .catch(error => {
        res
        .status(error.statusCode)
        .send({ success: false, code: error.code, message: error.message });
    });
});

storyRouter.delete('/:id', (req, res) => {
    Comment.removeComment(req.idUser, req.params.id)
    .then(comment => res.send({ success: true, comment }))
    .catch(error => {
        res
        .status(error.statusCode)
        .send({ success: false, code: error.code, message: error.message });
    });
});

storyRouter.put('/:id', (req, res) => {
    Comment.updateComment(req.idUser, req.params.id, req.body.content)
    .then(comment => res.send({ success: true, comment }))
    .catch(error => {
        res
        .status(error.statusCode)
        .send({ success: false, code: error.code, message: error.message });
    });
});

storyRouter.post('/like/:idStory', (req, res) => {
});


storyRouter.post('/dislike/:idStory', (req, res) => {
});

module.exports = { storyRouter };
