# Base image for our image, provided by Docker Hub.
FROM node:20
# Working directory is is where all files of our service
# will be placed inside the image.
WORKDIR /app
# Copies files from local file system into the Docker image.
COPY package.json package-lock.json ./
# Install all dependencies in de image.
RUN npm install
# Copy the rest of the application from the local file system
# to the Docker image.
COPY . .
# Run the application. This instruction is not executed while 
# building the image. It stores information in the metadata of
# the image. This command will be run when container is initiated
# from the image.
CMD ["npm", "start"]
