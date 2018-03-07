const express = require('express');
const storyRouter = express.Router();
const parser = require('body-parser').json();

const Story = require('../models/story.model');
const { mustBeUser } = require('./mustBeUser');

storyRouter.get('/', (req, res) => {});

storyRouter.post('/', mustBeUser, parser, (req, res) => {
    Story.createStory(req.idUser, req.body.content)
    .then(story => res.send({ success: true, story }))
    .catch(error => {
        res.send({ success: false, code: error.code, message: error.message });
    });
});

storyRouter.delete('/:id', mustBeUser, (req, res) => {
    Story.removeStory(req.idUser, req.params.id)
    .then(story => res.send({ success: true, story }))
    .catch(error => {
        res.status(error.statusCode)
        .send({ success: false, code: error.code, message: error.message });
    });
});

storyRouter.put('/:id', mustBeUser, parser, (req, res) => {
    Story.updateStory(req.idUser, req.params.id, req.body.content)
    .then(story => res.send({ success: true, story }))
    .catch(error => {
        res.status(error.statusCode)
        .send({ success: false, code: error.code, message: error.message });
    });
});

module.exports = { storyRouter };
