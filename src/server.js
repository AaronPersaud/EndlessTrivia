const { Server, Origins} = require('boardgame.io/server');
const { Trivia } = require('./Trivia')
const { Configuration, OpenAIApi} = require("openai");
const key = require('../.env')


const server = Server({
    games: [Trivia],
    origins: [Origins.LOCALHOST],
});

async function askGPTQuestion(question) {
    const configuration = new Configuration({
        apiKey: key.OPENAI_API_KEY
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: question}],
    });
    console.log(completion.data.choices[0].message);
    return completion.data.choices[0].message;
}

server.router.get('/askGPT', ctx => {
    const question = ctx.request.query.question;
    ctx.body = {text: question};
})

server.run(8000);