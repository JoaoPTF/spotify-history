const express = require('express');
const axios = require('axios');
const SpotifyWebApi = require('spotify-web-api-node');
const app = express();
const port = 3000;

// Configuração da API do Spotify
const spotifyApi = new SpotifyWebApi({
  clientId: 'SEU_CLIENT_ID', // Substitua com seu Client ID
  clientSecret: 'SEU_CLIENT_SECRET', // Substitua com seu Client Secret
  redirectUri: 'http://localhost:3000/callback',
});

// Rota para autenticar e obter o token de acesso
app.get('/login', (req, res) => {
  const authorizeURL = spotifyApi.createAuthorizeURL(['user-read-recently-played']);
  res.redirect(authorizeURL); // Redireciona para o Spotify
});

// Rota de callback depois de autenticar no Spotify
app.get('/callback', async (req, res) => {
  const code = req.query.code; // O código de autorização enviado pelo Spotify
  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    spotifyApi.setAccessToken(data.body['access_token']); 
    res.redirect('/recently-played'); // Redireciona para a rota onde mostra o histórico de músicas
  } catch (error) {
    console.error('Erro ao obter o token:', error);
    res.send('Erro na autenticação');
  }
});

// Rota para mostrar o histórico de músicas tocadas
app.get('/recently-played', async (req, res) => {
  try {
    const data = await spotifyApi.getMyRecentlyPlayedTracks(); // Obtém o histórico de músicas
    const tracks = data.body.items.map(item => ({
      name: item.track.name,
      artist: item.track.artists[0].name,
      album: item.track.album.name,
      url: item.track.external_urls.spotify, // Link para a música no Spotify
    }));

    // Geração do HTML para mostrar o histórico de músicas
    let html = '<h1>Histórico de Músicas Recentes</h1><ul>';
    tracks.forEach(track => {
      html += `<li><a href="${track.url}" target="_blank">${track.name} - ${track.artist} (${track.album})</a></li>`;
    });
    html += '</ul>';
    
    res.send(html); // Exibe o histórico no navegador
  } catch (error) {
    console.error('Erro ao obter músicas recentes:', error);
    res.send('Erro ao carregar o histórico de músicas');
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
