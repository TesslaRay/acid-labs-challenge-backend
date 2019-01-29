# Install latest node dependency
FROM mhart/alpine-node:latest

# Create app directory
WORKDIR /usr/src/app

# Copy package file with dependencies
COPY package*.json ./

# Install dependencies
RUN yarn install --production

# Copy app to docker
COPY . .

# Expose port to listen server
EXPOSE 3000

# Run server
CMD ["npm", "start"]
