# Usar a imagem oficial do Node.js 18 Alpine
FROM node:18-alpine as build

# Instalar dependências do PostgreSQL para conectar com o banco de dados
RUN apk add --no-cache postgresql-client

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos package.json e package-lock.json para o container
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copie todos os arquivos do diretório src para o container
COPY src/ ./src

COPY prisma/ ./prisma
# Exponha a porta que o seu app vai rodar
EXPOSE 3000

# Rodar o Prisma para gerar o cliente e outras tarefas necessárias
RUN npx prisma generate

# Comando que será executado quando o container iniciar
CMD ["npm", "start"]
