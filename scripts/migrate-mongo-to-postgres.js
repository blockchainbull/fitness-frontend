// scripts/migrate-mongo-to-postgres.js
require('dotenv').config();
const { MongoClient } = require('mongodb');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Connect to MongoDB
  const mongoClient = new MongoClient(process.env.MONGODB_URI);
  await mongoClient.connect();
  
  // Get databases
  const testDb = mongoClient.db('test');
  const aiCoachDb = mongoClient.db('ai_coach');
  
  // Migrate users
  const users = await testDb.collection('users').find({}).toArray();
  console.log(`Found ${users.length} users to migrate`);
  
  for (const user of users) {
    const userData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      fitnessGoal: user.fitnessGoal,
      dietaryPreferences: Array.isArray(user.dietaryPreferences) 
        ? user.dietaryPreferences 
        : [],
      createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
      updatedAt: user.updatedAt ? new Date(user.updatedAt) : new Date(),
      version: user._v || 0,
      physicalStats: user.physicalStats || {},
      preferences: user.preferences || {}
    };
    
    try {
      await prisma.user.upsert({
        where: { id: userData.id },
        update: userData,
        create: userData
      });
      console.log(`Migrated user: ${userData.email}`);
    } catch (error) {
      console.error(`Failed to migrate user ${userData.email}:`, error);
    }
  }
  
  // Migrate conversations
  const conversations = await aiCoachDb.collection('conversation').find({}).toArray();
  console.log(`Found ${conversations.length} conversations to migrate`);
  
  for (const convo of conversations) {
    // Find corresponding user by email in session_id if it looks like an email
    let userId = null;
    if (convo.session_id && convo.session_id.includes('@')) {
      const user = await prisma.user.findUnique({
        where: { email: convo.session_id }
      });
      if (user) {
        userId = user.id;
      }
    }
    
    const convoData = {
      id: convo._id.toString(),
      sessionId: convo.session_id,
      messages: Array.isArray(convo.conversation) ? convo.conversation : [],
      userId: userId
    };
    
    try {
      await prisma.conversation.upsert({
        where: { id: convoData.id },
        update: convoData,
        create: convoData
      });
      console.log(`Migrated conversation: ${convoData.sessionId}`);
    } catch (error) {
      console.error(`Failed to migrate conversation ${convoData.sessionId}:`, error);
    }
  }
  
  await mongoClient.close();
  console.log('Migration completed!');
}

main()
  .catch(error => {
    console.error('Migration failed:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });