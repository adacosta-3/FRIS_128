#FROM ubuntu:latest
#LABEL authors="PC Arianne"
#
#ENTRYPOINT ["top", "-b"]

## Step 1: Build the React app using Vite
#FROM node:18-alpine
#
#WORKDIR /app
#
#COPY package.json .
#
#RUN npm install
#
#COPY . .
#
#EXPOSE 8080
#
#CMD [ "npm", "run", "dev" ]


FROM node:18-alpine

WORKDIR /app

# Copy everything (including package.json, lock file, vite.config.js, etc.)
COPY . .

# Install dependencies inside the container
RUN npm install

# Expose Vite dev port
EXPOSE 5173

# Run the dev server on all interfaces (needed inside Docker)
CMD [ "npm", "run", "dev", "--", "--host" ]



