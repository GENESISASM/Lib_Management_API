FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Create necessary directories
RUN mkdir -p src/config src/controllers src/models src/services src/routes sql

EXPOSE 3000

CMD ["npm", "start"]