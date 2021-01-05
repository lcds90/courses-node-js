# API de Listagem de Games
Esta API é utilizada para realizar a listagem de games, exemplo de utilização em app web na aula 11
<br>

:black_medium_square::black_large_square:<b>ENDPOINTS</b>:black_large_square::black_medium_square:	

### :green_circle: GET /games
:black_small_square: Endpoint responsável pela listagem de dados

#### Parametros
:black_small_square: Nenhum parametro

#### Respostas / Status Code
:black_small_square:	:heavy_check_mark: <b>200</b> -> <i>Sucesso</i>
:small_blue_diamond: Irá realizar o retorno de um array com a lista de games. <i>Exemplo:</i>

```
[
    {
        "id": 1,
        "title": "Jogo 1",
        "year": 2008,
        "price": 60
    },
    {
        "id": 2,
        "title": "Jogo 2",
        "year": 2016,
        "price": 90
    },
    {
        "id": 3,
        "title": "Jogo 3",
        "year": "2010",
        "price": "0"
    }
]
```
***

:black_small_square::triangular_flag_on_post:<b>401</b> <i>Falha de Autenticação</i>
:small_blue_diamond: Erro durante autenticação da solicitação. Podendo ser devido token inválido ou expirado. <i>Exemplo:</i>

```
{
    "err": "Token inválido"
}
```
***

***

### :green_circle: POST /auth
:black_small_square: Endpoint responsável pelo processo de login

#### Parametros
:black_small_square: E-mail e Senha
```
{
    "email": "user@example.com",
    "password": "password"
}
```
***

#### Respostas / Status Code
:black_small_square:	:heavy_check_mark: <b>200</b> -> <i>Sucesso</i>
:small_blue_diamond: Irá realizar o token para acesso aos endpoints protegidos pela API. <i>Exemplo:</i>

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNjA5ODQ1MzA1LCJleHAiOjE2MTAwMTgxMDV9.RhttcJt8OGrVKgtTe_sTKfxkGjJ1MJ5Ehq62JMhi8kw"
}
```
***

:black_small_square::triangular_flag_on_post:<b>401</b> <i>Falha de Autenticação</i>
:small_blue_diamond: Erro durante autenticação da solicitação. Podendo ser devido e-mail ou senha incorretos. <i>Exemplo:</i>

```
{
    "err": "Credenciais invalidas!"
}
```
***

***
