# Spotify History

Projeto que exibe o histórico de músicas tocadas recentemente no Spotify.

## Tecnologias Usadas
- Node.js
- Express.js
- Spotify Web API
- spotify-web-api-node

## Instalação
1. Clone o repositório:
    git clone https://github.com/JoaoPTF/spotify-history.git
    cd spotify-history

2. Instale as dependências:
    npm install

3. Crie um aplicativo no Spotify Developer Dashboard e obtenha suas credenciais.

4. No arquivo index.js, substitua SEU_CLIENT_ID e SEU_CLIENT_SECRET com suas credenciais.

5. Execute o servidor:
    node index.js

6. Acesse http://localhost:3000/login no navegador e autorize o acesso ao Spotify.

7. Veja seu histórico de músicas recentes em http://localhost:3000/recently-played.