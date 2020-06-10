# teste-infosistemas

<strong>Teste técnico para a Infosistemas</strong>
<br><br>
Pegue o arquivo .env que enviei no email e coloque na raiz do projeto, ele contém o endereço e a chave necessários para a aplicação acessar o banco de dados na nuvem.
<br><br>
Para rodar, faça<br>
<strong>npm run start</strong>
<br><br>
Então acesse através do endereço<br>
<strong>http://localhost:3000/carros</strong>
<br><br>
API REST:<br>
<strong>GET /carros</strong> - lista todos os carros<br>
<strong>GET /carros/:id</strong> - lista um carro<br>
<strong>POST /carros</strong> - adiciona um carro<br>
<strong>DELETE /carros/:id</strong> - remove um carro<br>
<strong>PUT /carros/:id</strong> - atualiza as informações de um carro (precisa receber o objeto inteiro)<br>
<br>
Testes: <strong>npm test</strong>
