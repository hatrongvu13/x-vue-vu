# Stage 1: Build
FROM node:23 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Optional: replace default.conf nếu bạn dùng base path
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
