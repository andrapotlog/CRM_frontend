
FROM node:20.11.1 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the application code and build it
COPY . .
RUN npm run build --prod

# Use an nginx image to serve the application
FROM nginx:alpine
COPY --from=build /app/dist/crm /usr/share/nginx/html

# Expose port 80
EXPOSE 80
