# Use an official Node.js image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for npm install
COPY package*.json ./

# Copy TypeScript configuration files
COPY tsconfig*.json ./

# Copy the rest of your application files
COPY . .

# Install dependencies
RUN npm install --legacy-peer-deps 

# Build the client frontend
RUN npm run build

# Install a simple static file server
RUN npm install -g serve

# Expose port 8082 for client frontend
EXPOSE 8082

# Command to serve the app
CMD ["serve", "-s", "build", "-l", "8082"]
