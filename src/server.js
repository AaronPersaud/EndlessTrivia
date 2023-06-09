const { Server, Origins} = require('boardgame.io/server');
const { Trivia } = require('./Trivia')
const { Configuration, OpenAIApi} = require("openai");
const key = require('../.env')


const server = Server({
    games: [Trivia],
    origins: [Origins.LOCALHOST],
});

async function askGPTQuestion(question,systemConfig) {
    const configuration = new Configuration({
        apiKey: key.OPENAI_API_KEY
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role:"system", content: systemConfig },{role: "user", content: question}],
    });
    console.log(completion.data.choices[0].message);
    return completion.data.choices[0].message;
}

server.router.get('/askGPT', async (ctx) => {
    const question = ctx.request.query.question;
    const config = ctx.request.query.systemConfig;
    const answer = await askGPTQuestion(question, config);
    ctx.body = {text: answer.content};
})

server.run(8000);