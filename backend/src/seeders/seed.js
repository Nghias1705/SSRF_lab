import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';
import connectToMongo from '../db/index.js';

const seedUsers = async () => {
    try {
        console.log('Starting seed process...');
        await connectToMongo();

        // Password matching the validation: min 6 chars
        const passwordHash = await bcrypt.hash('pass1234', 10);

        const usersToCreate = [
            {
                username: 'NghiaTranVan',
                fullName: 'Trần Văn Nghĩa',
                email: 'nghiatranvan@gmail.com',
                password: passwordHash,
                loggedInVia: 'email',
                bio: 'Hello! I am Test User 1. I love coding and coffee.',
                location: 'Hanoi, Vietnam',
                dob: new Date('1995-01-01'),
                profilePicture: 'https://res.cloudinary.com/datvbo0ey/image/upload/v1726651745/3d%20avatar/1_ijpza2.png',
                coverImage: 'https://t3.ftcdn.net/jpg/05/38/74/02/360_F_538740200_HNOc2ABQarAJshNsLB4c3DXAuiCLl2QI.jpg'
            },
            {
                username: 'ThanhNguyenVan',
                fullName: 'Nguyễn Văn Thành',
                email: 'nguyenvanthanh@gmail.com',
                password: passwordHash,
                loggedInVia: 'email',
                bio: 'Hi there! I am Test User 2. Exploring the world of tech.',
                location: 'Ho Chi Minh City, Vietnam',
                dob: new Date('1998-05-15'),
                profilePicture: 'https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg',
                coverImage: 'https://t4.ftcdn.net/jpg/05/34/78/37/360_F_534783787_w337He2LnkNIgJ0J26y6CYZpmios8aUk.jpg'
            },
            {
                username: 'HungNguyenDoan',
                fullName: 'Nguyễn Dõan Hưng',
                email: 'nguyendoanhung@gmail.com',
                password: passwordHash,
                loggedInVia: 'email',
                bio: 'System Administrator.',
                location: 'Vietnam',
                dob: new Date('1990-12-31'),
                profilePicture: 'https://res.cloudinary.com/datvbo0ey/image/upload/v1726651746/3d%20avatar/8_ff3tta.png',
                coverImage: 'https://img.freepik.com/free-photo/light-background-with-sunset-projector-lamp_53876-128374.jpg'
            },
                        {
                username: 'ThaiTruongQuoc',
                fullName: 'Trương Quốc Thái',
                email: 'truongquocthai@gmail.com',
                password: passwordHash,
                loggedInVia: 'email',
                bio: 'System Administrator.',
                location: 'Vietnam',
                dob: new Date('1990-12-31'),
                profilePicture: 'https://res.cloudinary.com/datvbo0ey/image/upload/v1726651746/3d%20avatar/8_ff3tta.png',
                coverImage: 'https://img.freepik.com/free-photo/light-background-with-sunset-projector-lamp_53876-128374.jpg'
            },
                        {
                username: 'ThaoNgoXuan',
                fullName: 'Ngô Xuân Thảo',
                email: 'ngoxuanthao@gmail.com',
                password: passwordHash,
                loggedInVia: 'email',
                bio: 'System Administrator.',
                location: 'Vietnam',
                dob: new Date('1990-12-31'),
                profilePicture: 'https://res.cloudinary.com/datvbo0ey/image/upload/v1726651746/3d%20avatar/8_ff3tta.png',
                coverImage: 'https://img.freepik.com/free-photo/light-background-with-sunset-projector-lamp_53876-128374.jpg'
            }
        ];

        for (const userData of usersToCreate) {
             const existingUser = await User.findOne({ email: userData.email });
             if (!existingUser) {
                 await User.create(userData);
                 console.log(`✅ Created user: ${userData.username} (${userData.email})`);
             } else {
                 console.log(`⚠️ User already exists: ${userData.username}`);
             }
        }

        console.log('Seeding completed successfully! 🚀');
        process.exit(0);

    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedUsers();
