const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 5; i++) {
        const random1000 = Math.floor(Math.random() * 5);
        const price = Math.floor(Math.random() * 1500) + 500;
        const camp = new Campground({
            author: '6069d5e729b5da3b6c06c792',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'tigers, forests, hill station',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/donrfsotk/image/upload/v1617893719/YelpCamp/xibhydcvcltzjukkwvzf.jpg',
                    filename: 'YelpCamp/xibhydcvcltzjukkwvzf'
                },
                {
                    url: 'https://res.cloudinary.com/donrfsotk/image/upload/v1617893719/YelpCamp/xibhydcvcltzjukkwvzf.jpg',
                    filename: 'YelpCamp/xibhydcvcltzjukkwvzf'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})