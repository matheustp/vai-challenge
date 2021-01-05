import request from 'supertest';
import { app } from '../../app';

it('fails when no text is sent', async () => {
    await request(app)
        .post('/complexity')
        .send({})
        .expect(400);
});

it('should fail if the text has more than 1000 characters', async () => {
    await  request(app)
        .post('/complexity')
        .send({
            text: 'aaaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbaabcbabcb'
        })
        .expect(400);
});

it('should fail if the text has more than 100 words', async () => {
    await  request(app)
        .post('/complexity')
        .send({
            text: 'abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc'
        })
        .expect(400);
});
