# Usa la última versión de Node.js 20
FROM node:20

# Habilitar Corepack y preparar Yarn 4.5.3
RUN corepack enable && corepack prepare yarn@4.5.3 --activate

# Crear el directorio de trabajo y asignar permisos
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

# Establecer el directorio de trabajo
WORKDIR /home/node/app

# Cambiar al usuario node
USER node

# Copiar dependencias
COPY --chown=node:node package.json yarn.lock ./

# Instalar dependencias en modo producción
RUN yarn workspaces focus --all --production

# Copiar el resto del código
COPY --chown=node:node . .

# Exponer puerto y comando para ejecutar
EXPOSE 3000
CMD ["yarn", "start"]