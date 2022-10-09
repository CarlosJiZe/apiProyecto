const options ={
    swaggerDefinition:{
        info:{
            version: "1.0.0",
            title: "Anime API",
            description: "This is an API created for anime fans, if you contribute to this awesome API with your favorite animes and characters, your waifu will become real."
        }
    },
    apis:['./routes/animes.js','./routes/characters.js','./routes/users.js']
}

module.exports = options