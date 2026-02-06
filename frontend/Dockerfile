# Build stage
FROM node:22 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

ARG API_URL
ENV API_URL=$API_URL

RUN sed -i "s|__API_URL__|$API_URL|g" src/environments/environment.ts

RUN npm run build --prod

# Production stage
# FROM nginx:alpine

# COPY --from=build /app/dist/fact-app/browser/ /usr/share/nginx/html

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
