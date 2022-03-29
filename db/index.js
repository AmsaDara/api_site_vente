const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/site_db';



const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

async function connect() {
  if (process.env.NODE_ENV === 'test') {
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri, mongooseOptions);

  } else {
    await mongoose.connect(DB_URI, mongooseOptions)
      .catch(error => console.log(error));
  }
}

async function close() {
  if (process.env.NODE_ENV === 'test') {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
  }
}

async function clearDatabase() {
  if (process.env.NODE_ENV === 'test') {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
    }

  }
}

module.exports = { connect, close, clearDatabase };