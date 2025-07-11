const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const setupAdmin = async () => {
    try {
        console.log('🔄 Setting up admin user...');

        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });

        if (existingAdmin) {
            console.log('⚠️  Admin user already exists');
            console.log(`📧 Email: ${existingAdmin.email}`);
            console.log(`👤 Name: ${existingAdmin.name}`);
            console.log(`🔑 Role: ${existingAdmin.role}`);

            // Update password if specified
            if (process.env.ADMIN_PASSWORD) {
                existingAdmin.password = process.env.ADMIN_PASSWORD;
                await existingAdmin.save();
                console.log('🔄 Admin password updated');
            }
        } else {
            // Create new admin user
            const adminUser = await User.create({
                name: 'Karl Hallis',
                email: process.env.ADMIN_EMAIL || 'karl.hallis@autowais.com',
                password: process.env.ADMIN_PASSWORD || 'TempPassword123!',
                role: 'admin'
            });

            console.log('🎉 Admin user created successfully!');
            console.log(`📧 Email: ${adminUser.email}`);
            console.log(`👤 Name: ${adminUser.name}`);
            console.log(`🔑 Role: ${adminUser.role}`);
            console.log(`🆔 ID: ${adminUser._id}`);
        }

        console.log('\n📝 Login credentials:');
        console.log(`Email: ${process.env.ADMIN_EMAIL}`);
        console.log(`Password: ${process.env.ADMIN_PASSWORD}`);
        console.log('\n🚀 You can now start the server with: npm run dev');

    } catch (error) {
        console.error('❌ Error setting up admin user:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
        process.exit(0);
    }
};

// Run if called directly
if (require.main === module) {
    setupAdmin();
}

module.exports = setupAdmin; 