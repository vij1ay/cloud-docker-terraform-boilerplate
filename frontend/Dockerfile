# Build stage
FROM node:22 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build --prod

# Production stage
FROM nginx:alpine

# Copy the custom nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy the built assets
COPY --from=build /app/dist/fact-app/browser/ /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
