# Gestão de Agências de Turismo - Desafio PAYLINK

Bem-vindo(a) ao repositório do desafio proposto para o processo seletivo da PAYLINK. Este projeto consiste no desenvolvimento de uma aplicação de Gestão de Agências de Turismo, composta por uma API e um Frontend. 

## 📝 Descrição do Projeto

O objetivo deste projeto é criar uma plataforma para gerenciar agências de turismo, permitindo operações administrativas e públicas, incluindo autenticação, gerenciamento de dados de agências, e funcionalidades adicionais como busca e filtragem.

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** com **Express.js**
- **TypeScript**
- Banco de dados: **MySQL|PostgreSQL**
- Contêineres: **Docker** e **Docker Compose**
- Autenticação: **JWT (JSON Web Token)**

### Frontend
- **React.js**
- Estilização: **Tailwind CSS** e **Shadcn/ui** (opcional)


## ⚙️ Funcionalidades Implementadas

### API
- **Rotas Administrativas**:
  - `GET /agency/`: Retorna uma lista de todas as agências.
  - `POST /agency/`: Adiciona uma nova agência.
  - `GET /agency/:id`: Exibe os detalhes de uma agência específica.
  - `PUT /agency/:id`: Atualiza as informações de uma agência.
  - `DELETE /agency/:id`: Remove uma agência (somente para administradores).

- **Rotas Públicas**:
  - `POST /register/`: Cria um novo analista ou administrador.
  - `POST /login/`: Faz o login de um analista ou administrador.

- **Funcionalidades Adicionais (Diferenciais)**:
  - Filtragem de agências por status.
  - Busca de agências por nome ou habilidades.
  - Documentação da API com Swagger ou Redoc.

### Frontend
- Design intuitivo e amigável, com feedback visual para ações do usuário.
- Componentes reutilizáveis e organizados.
- Implementação de design patterns como diferencial.

## 🛠️ Instruções para Configuração

### Requisitos
- Docker e Docker Compose instalados
- Node.js (versão 16 ou superior)
- MySQL

### Passos para Rodar o Projeto
1. Clone este repositório:
   ```bash
   https://github.com/NatanTG/desafio-tecnico.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd desafio-tecnico
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto.
   - Configure as variáveis para a API e o banco de dados (exemplo no arquivo `.env`).
     - JWT SECRET
     - DATABASE_URL
     - PORT
     
4. Inicie os contêineres com Docker Compose:
   ```bash
   docker-compose up --build
   ```

5. Acesse a aplicação no navegador:
   - **Frontend**: `http://localhost:5173`
   - **Backend**: `http://localhost:3000`



Qualquer dúvida ou sugestão, sinta-se à vontade para entrar em contato!
