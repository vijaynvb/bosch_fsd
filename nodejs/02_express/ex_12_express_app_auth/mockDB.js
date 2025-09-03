// mockDB.js - Mock database for users
import bcrypt from "bcryptjs";

// Mock user database
let users = [];

// Add a default admin user
const addDefaultAdmin = async () => {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  users.push({
    id: 1,
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: hashedPassword, // Hashed password
    location: 'Headquarters',
    role: 'admin',
  });
};

// Initialize the mock database
addDefaultAdmin();

export default users;
