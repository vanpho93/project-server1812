const assert = require('assert');
const request = require('supertest');
const { compare } = require('bcrypt');

const app = require('../../src/app');
const User = require('../../src/models/user.model');

describe.only('POST /friend/request', () => {
    let idUser1, idUser2, token1, token2;
    beforeEach('Create users for test', async () => {
        await User.signUp('a@gmail.com', '123', 'teo', '321');
        await User.signUp('b@gmail.com', '123', 'ti', '321');
        const user1 = await User.signIn('a@gmail.com', '123');
        const user2 = await User.signIn('b@gmail.com', '123');
        token1 = user1.token;
        token2 = user2.token;
        idUser1 = user1._id; 
        idUser2 = user2._id;
    });

    it ('Can create friend request by POST', async () => {
        const response = await request(app).post('/friend/request')
        .send({ idReceiver: idUser2 })
        .set({ token: token1 });
        assert.equal(response.body.success, true);
        assert.equal(response.body.user.name, 'ti');
        const sender = await User.findById(idUser1).populate('sentRequests');
        assert.equal(sender.sentRequests.length, 1);
        assert.equal(sender.sentRequests[0].name, 'ti');
    });

    it ('Cannot create friend request without token', async () => {
        const response = await request(app).post('/friend/request')
        .send({ idReceiver: idUser2 })
        assert.equal(response.body.success, false);
        assert.equal(response.status, 400);
    });
});
