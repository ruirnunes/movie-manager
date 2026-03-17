FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist/movie-manager/browser /usr/share/nginx/html

EXPOSE 80

# docker build -t moviemanager:v1 .

# docker run -it --name moviemanager-container -p 3000:80 moviemanager:v1

# docker login

# docker tag moviemanager:v1 ruinunes96/moviemanager:v2

# docker push ruinunes96/moviemanager:v2