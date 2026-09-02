FROM node:20 AS build
# Se usa la instruccion ARG para definir variables de ambiente
# que solo son relevantes cuando se esta construyendo la imagen.
# Puede ser cambiada al momento de crear la imagen.
ARG VITE_BACKEND_URL=http://localhost:3001/api/v1
# Se configura el directorio de trabajo como /buid para la
# etapa de creacion.
WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
# Se ejecuta el siguiente comando para crear un build estatico 
# de la aplicacion Vite.
RUN npm run build
# Termino la etapa de construccion. Se usa la siguiente instruccion
# para crear la etapa final.
FROM nginx AS final
# Se establece el directorio de trabajo para esta etapa.
WORKDIR /usr/share/nginx/html
# Se copia todo del directorio build/dist (que es donde Vite pone
# los archivos estaticos creados) de la etapa de construccion a la
# etapa final.
COPY --from=build /build/dist .
