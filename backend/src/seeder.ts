const mongoose = require('mongoose');

import { UserModel } from './model/userModel';

async function seedData() {
  try {
    console.log('Seeding Data');
    await mongoose
      .connect(
        `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo:27017/${process.env.MONGO_INITDB_DATABASE}?directConnection=true&authSource=admin`
      )
      .then(() => {
        console.log('Connected to MongoDB');
      });
    const adminExists = await UserModel.findOne({ role: 'admin' });

    if (!adminExists) {
      await UserModel.create({
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'admin123',
        role: 'admin',
      });

      console.log('Admin seeded successfully');
    } else {
      console.log('Admin already exists');
    }
    console.log('Data seeded successfully');
    mongoose.connection.close();
  } catch (error) {
    console.log('error seeding data', error);
  }
}

seedData();
