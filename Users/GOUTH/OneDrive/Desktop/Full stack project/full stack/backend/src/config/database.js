const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('MongoDB already connected');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: false,
    });
    isConnected = true;
    console.log('✅ MongoDB Connected:', conn.connection.host);
    return conn;
  } catch (error) {
    console.warn('⚠️ MongoDB connection warning (will retry):', error.message);
    console.log('🔄 Backend starting without database... (will connect when available)');
    isConnected = false;
    
    // Retry connection every 10 seconds
    setTimeout(connectDB, 10000);
  }
};

module.exports = connectDB;
