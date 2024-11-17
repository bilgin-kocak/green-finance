# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Rebuild bcrypt for the correct environment
RUN npm rebuild bcrypt --build-from-source

# Expose the port your app runs on
EXPOSE 3001

# Define the command to run your app
CMD ["npm", "start"]
