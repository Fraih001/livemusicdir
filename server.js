const Sequelize = require ('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/livemusicdir');
const { STRING, DATE, UUID, UUIDV4 } = Sequelize;

const Artist = conn.define('artist', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name: {
        type: STRING(50),
        allowNull: false
    }
});

const Concert = conn.define('concert', {
    artistName: {
        type: STRING(50)
    },
    date: {
        type: DATE
    },
    location: {
        type: STRING(50)
    }
});

Concert.belongsTo(Artist);

const syncAndSeed = async() => {
    await conn.sync({ force: true });

        const [Phish, Prince, Weezer, Rush ] = await Promise.all([
            Artist.create({name: 'Phish'}),
            Artist.create({name: 'Prince'}),
            Artist.create({name: 'Weezer'}),
            Artist.create({name: 'Rush'}),
        ])

        const concerts = await Promise.all([
            Concert.create({ artistName: Phish.name, date: '2003/04/09', location: 'New York', artistId: Phish.id }),
            await Concert.create({artistName: Rush.name, date: '2006/08/01', location: 'California', artistId: Rush.id }),
            await Concert.create({artistName: Rush.name, date: '2006/08/02', location: 'Home', artistId: Rush.id }),
            await Concert.create({artistName: Prince.name, date: '2006/08/06', location: 'New Zealand', artistId: Prince.id })
        ]) 
    };

// const { YOUTUBE_API_KEY } = require('./config');

const path = require('path');
const chalk = require('chalk');
const express = require('express');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use('/dist', express.static('dist'));
app.use('/assets', express.static('assets'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/artists', async(req,res,next)=>{
    try{

        res.status(201).send(await Artist.findAll())

    }catch(er){
        next(er)
    }
});

app.get('/api/concerts', async(req,res,next)=>{
    try{

        res.status(201).send(await Concert.findAll())

    }catch(er){
        next(er)
    }
});

const port = process.env.PORT || 3200
app.listen(port, ()=> {
    console.log(chalk.yellow(`\n*********************** listening on ${port} ********************\n`))
})

function readyForYouTube(){
    console.log(chalk.blue(`\n************ Ready to fetch YouTube Data! ***************\n`))
}

const start = async() => {
    try {
       if(!process.env.API_KEY){
        throw new Error("No API Key!")
       } else {
        readyForYouTube()
       }
       await syncAndSeed();

    } catch(er) {
    console.log(er);

    }
}

start();