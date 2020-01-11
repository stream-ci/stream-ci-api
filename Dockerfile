FROM node:13.6.0-buster-slim

# Add non-root user
RUN useradd -m stream_ci

# Set current working directory
WORKDIR /home/stream_ci

# Run as non-root user
USER stream_ci

# Install application dependencies
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

# Copy source files
COPY . .

EXPOSE 3000

# Start server
CMD ["node", "server.js"]
