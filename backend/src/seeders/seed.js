import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { Story } from "../models/story.model.js";
import { Post } from "../models/post.model.js";
import { Comment } from "../models/comment.model.js";
import connectToMongo from "../db/index.js";

const seedDatabase = async () => {
  try {
    console.log("🚀 Starting comprehensive seed process...\n");
    await connectToMongo();

    // Clear existing data
    console.log("🧹 Clearing existing data...");
    await User.deleteMany({});
    await Story.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    console.log("✅ Cleared all existing data\n");

    // Password matching the validation: min 6 chars
    const passwordHash = await bcrypt.hash("pass1234", 10);

    // ============================================
    // 1. CREATE USERS
    // ============================================
    console.log("👥 Creating users...");

    const usersData = [
      {
        username: "NghiaTranVan",
        fullName: "Trần Văn Nghĩa",
        email: "nghiatranvan@gmail.com",
        password: passwordHash,
        loggedInVia: "email",
        bio: "Hello! I am Trần Văn Nghĩa. I love coding and coffee.",
        location: "Hanoi, Vietnam",
        dob: new Date("1995-01-01"),
        profilePicture:
          "https://phongthe.edu.vn/upload/2025/08/avatar-chibi-nam-001.webp",
        coverImage:
          "https://t3.ftcdn.net/jpg/05/38/74/02/360_F_538740200_HNOc2ABQarAJshNsLB4c3DXAuiCLl2QI.jpg",
        isDpVerify: true,
      },
      {
        username: "ThanhNguyenVan",
        fullName: "Nguyễn Văn Thành",
        email: "nguyenvanthanh@gmail.com",
        password: passwordHash,
        loggedInVia: "email",
        bio: "Hi there! I am Nguyễn Văn Thành. Exploring the world of tech.",
        location: "Ho Chi Minh City, Vietnam",
        dob: new Date("1998-05-15"),
        profilePicture:
          "https://phongthe.edu.vn/upload/2025/08/avatar-chibi-nam-003.webp",
        coverImage:
          "https://t4.ftcdn.net/jpg/05/34/78/37/360_F_534783787_w337He2LnkNIgJ0J26y6CYZpmios8aUk.jpg",
        isDpVerify: true,
      },
      {
        username: "HungNguyenDoan",
        fullName: "Nguyễn Dõan Hưng",
        email: "nguyendoanhung@gmail.com",
        password: passwordHash,
        loggedInVia: "email",
        bio: "Cybersecurity enthusiast 🔐",
        location: "Da Nang, Vietnam",
        dob: new Date("1990-12-31"),
        profilePicture:
          "https://anhavatardep.com/wp-content/uploads/2025/05/avatar-cute-12.jpg",
        coverImage:
          "https://img.freepik.com/free-photo/light-background-with-sunset-projector-lamp_53876-128374.jpg",
        isDpVerify: true,
      },
      {
        username: "ThaiTruongQuoc",
        fullName: "Trương Quốc Thái",
        email: "truongquocthai@gmail.com",
        password: passwordHash,
        loggedInVia: "email",
        bio: "System Administrator 💻",
        location: "Can Tho, Vietnam",
        dob: new Date("1997-07-20"),
        profilePicture:
          "https://anhavatardep.com/wp-content/uploads/2025/05/avatar-cute-13.jpg",
        coverImage:
          "https://img.freepik.com/free-photo/light-background-with-sunset-projector-lamp_53876-128374.jpg",
        isDpVerify: true,
      },
      {
        username: "ThaoNgoXuan",
        fullName: "Ngô Xuân Thảo",
        email: "ngoxuanthao@gmail.com",
        password: passwordHash,
        loggedInVia: "email",
        bio: "DevOps Engineer 🚀",
        location: "Hai Phong, Vietnam",
        dob: new Date("1996-03-10"),
        profilePicture:
          "https://anhavatardep.com/wp-content/uploads/2025/05/avatar-cute-11.jpg",
        coverImage:
          "https://img.freepik.com/free-photo/light-background-with-sunset-projector-lamp_53876-128374.jpg",
        isDpVerify: true,
      },
    ];

    // Create users first (without friends)
    const createdUsers = await User.insertMany(usersData);
    console.log(`✅ Created ${createdUsers.length} users`);

    // ============================================
    // 2. ADD FRIENDSHIPS (Everyone is friends with everyone)
    // ============================================
    console.log(
      "\n🤝 Setting up friendships (everyone is friends with everyone)...",
    );

    for (const user of createdUsers) {
      // Get all other users' IDs
      const friendIds = createdUsers
        .filter((u) => !u._id.equals(user._id))
        .map((u) => u._id);

      // Update user with all friends
      await User.findByIdAndUpdate(user._id, { friends: friendIds });
    }
    console.log("✅ All users are now friends with each other");

    // ============================================
    // 3. CREATE STORIES FOR ALL USERS
    // ============================================
    console.log("\n📖 Creating stories for all users...");

    const storyContents = [
      {
        content: "Đang học Security! 🔐",
        image:
          "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400",
      },
      {
        content: "Coffee time ☕",
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
      },
      {
        content: "Coding all night 💻",
        image:
          "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
      },
      {
        content: "Team meeting! 🤝",
        image:
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400",
      },
      {
        content: "Weekend vibes 🎉",
        image:
          "https://images.unsplash.com/photo-1496024840928-4c417adf211d?w=400",
      },
    ];

    const storiesToCreate = createdUsers.map((user, index) => ({
      user: user._id,
      content: storyContents[index].content,
      image: storyContents[index].image,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 10000), // Expires in 24 hours
    }));

    await Story.insertMany(storiesToCreate);
    console.log(`✅ Created ${storiesToCreate.length} active stories`);

    // ============================================
    // 4. CREATE A POST WITH ALL USERS TAGGED
    // ============================================
    console.log("\n📝 Creating post with all users tagged...");

    const postAuthor = createdUsers[0]; // NghiaTranVan is the author
    const taggedUsernames = createdUsers
      .filter((u) => !u._id.equals(postAuthor._id))
      .map((u) => `@${u.username}`)
      .join(" ");

    const mainPost = await Post.create({
      user: postAuthor._id,
      content: `🎉 Team SSRF Lab! ${taggedUsernames}`,
      feeling: "excited",
      // backgroundColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
      likes: createdUsers.map((u) => u._id), // Everyone likes this post
    });
    console.log(
      `✅ Created post by ${postAuthor.username} tagging all friends`,
    );
    console.log(`   📌 All ${createdUsers.length} users liked the post`);

    // ============================================
    // 5. ALL USERS COMMENT ON THE POST
    // ============================================
    console.log("\n💬 Creating comments from all users...");

    const commentContents = [
      "Awesome team! 🎉",
      "Great to be part of this! 🚀",
      "Security first! 🔐",
      "Let's go team! 💪",
      "Amazing work everyone! ⭐",
    ];

    const commentsToCreate = createdUsers.map((user, index) => ({
      post: mainPost._id,
      user: user._id,
      content: commentContents[index],
      likes: createdUsers
        .filter((u) => !u._id.equals(user._id))
        .map((u) => u._id), // Everyone except commenter likes the comment
    }));

    await Comment.insertMany(commentsToCreate);
    console.log(
      `✅ Created ${commentsToCreate.length} comments (each liked by other users)`,
    );

    // ============================================
    // SUMMARY
    // ============================================
    console.log("\n" + "=".repeat(50));
    console.log("🎊 SEEDING COMPLETED SUCCESSFULLY! 🎊");
    console.log("=".repeat(50));
    console.log(`\n📊 Summary:`);
    console.log(`   👥 Users: ${createdUsers.length}`);
    console.log(`   🤝 Friendships: Everyone is friends (fully connected)`);
    console.log(
      `   📖 Stories: ${storiesToCreate.length} (all active for 24h)`,
    );
    console.log(`   📝 Posts: 1 (with all users tagged)`);
    console.log(`   ❤️ Likes on post: ${createdUsers.length}`);
    console.log(`   💬 Comments: ${commentsToCreate.length}`);
    console.log(`\n🔑 Login credentials for all users:`);
    console.log(`   Password: pass1234`);
    console.log(`   Emails:`);
    createdUsers.forEach((u) => {
      console.log(`     - ${u.email}`);
    });
    console.log("");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();
