import dotenv from 'dotenv';

import connectDB from '../config/db.js';
import Admin from '../models/Admin.js';

dotenv.config();

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

const seedAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await Admin.findOne({
      email: email,
    });

    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit(0);
    }

    await Admin.create({
      email: email,
      password: password,
    });

    console.log('Admin created successfully.');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
