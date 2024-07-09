# Desafio #2 - Projeto Compacine 🎥

Resolução do desafio proposto para a trilha de aprendizado Back-end Journey (Node.js) da Compass UOL

## Ir para

- [Descrição do desafio](#descrição-do-desafio)
  - [Funcionalidades](#funcionalidades)
  - [Regras de negócio](#regras-de-negócio)
- [Nosso projeto](#nosso-projeto)
  - [Stack de desenvolvimento utilizada](#stack-de-desenvolvimento-utilizada)
  - [Rotas](#rotas)
  - [Payloads](#payloads)
- [Como executar o projeto](#como-executar-o-projeto)
- [Membros da equipe](#membros-da-equipe)

## Descrição do desafio

O projeto consiste no desenvolvimento de uma API REST para a bilheteria de um cinema, utilizando as tecnologias e conhecimentos aprendidos no curso.

### Funcionalidades

- Cadastrar/listar/modificar/deletar filme, com imagem(url), nome, descrição, atores, gênero e id.
- Cadastrar/modificar/deletar sessão, com id do filme, sala, capacidade, dia e horário.
- Cadastrar/modificar/deletar ingresso, com id da sessão, cadeira e valor.
- Cada sessão terá um filme com uma capacidade de lugares (limitados) e horário (não pode repetir a cadeira da sessão).
- Cada sessão poderá ter um ou mais ingressos.
- Cada ingresso terá uma cadeira e um valor.
- Todos os campos são required/obrigatórios.

### Regras de negócio

- Recurso: Filmes
    - Não pode cadastrar o mesmo filme mais de uma vez
    - A data de lançamento deve ser armazenada no banco de dados no Formato ISO 8601 (DATETIME)
    - A data de lançamento deve ser formatada para o padrão pt-br na resposta para o cliente
    - A descrição do filme não pode exceder 100 caracteres
    - Cada filme pode ter várias sessões
    - Um filme só pode ser excluído se todas as sessões relacionadas a ele forem excluídas também
- Recurso: Sessões
    - Cada sessão pode ter um ou vários ingressos.
    - Cada sessão só pode se relacionar a um filme
    - Não podem existir duas sessões no mesmo horário e na mesma sala
    - Uma sessão só pode ser excluída se todos ingressos relacionados a ela forem excluídos também
- Recurso: Ingressos
    - Cada ingresso só pode ser relacionado a uma sessão
    - Não podem existir cadeiras repetidas na mesma sessão
- Respostas de exceção
    - A resposta de exceção deve conter as seguintes informações:
        - code : Código de status HTTP
        - status : Status da resposta
        - message : Mensagem de erro
        - details: Detalhes sobre o erro
    - O campo details é **opcional** e pode ser usado para fornecer informações adicionais sobre o erro.

## Nosso projeto

### Stack de desenvolvimento utilizada

- Node.js com Typescript
- Documentação com Swagger
- Banco de dados: SQLite
- ORM: TypeORM
- Eslint e Prettier para formatação do código
- Versionamento: GitHub
- Zod para validação de payload
- Testes unitários com Vitest
- Organização da equipe:
    - GitHub Projects para gerenciamento de tarefas
    - Microsoft Teams para comunicação e colaboração

### Rotas

<aside>
> base_url → localhost:3333/api/v1

</aside>

<aside>
> {movie_id} → id do filme

</aside>

<aside>
> {session_id} → id da sessão

</aside>

<aside>
> :id → id do recurso atual

</aside>

- Movies (filmes)
    
    
    | ROTA | MÉTODO |
    | --- | --- |
    | base_url/movies | GET |
    | base_url/movies/:id | GET |
    | base_url/movies | POST |
    | base_url/movies/:id | PUT |
    | base_url/movies/:id | DELETE |
- Sessions (sessões)
    
    
    | ROTA | MÉTODO |
    | --- | --- |
    | base_url/movies/{movie_id}/sessions | POST |
    | base_url/movies/{movie_id}/sessions/:id | PUT |
    | base_url/movies/{movie_id}/sessions/:id | DELETE |
- Tickets (ingressos)
    
    
    | ROTA | MÉTODO |
    | --- | --- |
    | base_url/movies/{movie_id}/sessions/{session_id}/tickets | POST |
    | base_url/movies/{movie_id}/sessions/{session_id}/tickets/:id | PUT |
    | base_url/movies/{movie_id}/sessions/{session_id}/tickets/:id | DELETE |

### Payloads

- Movies (filmes)
    - request POST e PUT:
    
    ```json
    {
     "image": "img_url",
     "name": "movie_title",
     "description": "film_description",
     "actors": ["actor", "actress", "actor"],
     "genre": "film_genre",
     "release_date": "10/03/2024"
    }
    ```
    
    - response POST e PUT:
    
    ```json
    {
     "id": 1,
     "image": "img_url",
     "name": "movie_title",
     "description": "film_description",
     "actors": ["actor", "actress", "actor"],
     "genre": "film_genre",
     "release_date": "10/03/2024"
    }
    ```
    
    - response GET:
    
    ```json
    [
     {
      "id": 1,
      "image": "img_url",
      "name": "film_title",
      "description": "film_description",
      "actors": ["actor", "actor", "actress"],
      "genre": "film_genre",
      "release_date": "03/06/2024",
      "sessions": []
     }
    ]
    [
     {
      "id": 1,
      "image": "img_url",
      "name": "film_title",
      "description": "film_description",
      "actors": ["actress", "actor", "actress"],
      "genre": "film_genre",
      "release_date": "03/06/2024",
      "sessions": [
       {
        "id": 1,
        "movie_id": 1,
        "room": "room_name",
        "capacity": 100,
        "day": "03/06/2024",
        "time": "14:23:00"
        "tickets": [
         {
          "id": 1,
          "session_id": 1,
          "chair": "b1",
          "value": 10
         }
        ]
       },
       {
        "id": 2,
        "movie_id": 1,
        "room": "room_name",
        "capacity": 100,
        "day": "03/06/2024",
        "time": "14:23:00"
        "tickets": [
         {
          "id": 2,
          "session_id": 2,
          "chair": "b1",
          "value": 20
         }
        ]
       }
      ]
     }
    ]
    ```
    
    - response DELETE:
    
    `204 No Content`
    
- Sessions (sessões)
    - request POST e PUT:
    
    ```json
    {
     "room": "room_name",
     "capacity": 100,
     "day": "03/06/2024",
     "time": "14:23:00"
    }
    ```
    
    - response POST e PUT:
    
    ```json
    {
     "id": 1,
     "movie_id": 1,
     "room": "room_name",
     "capacity": 100,
     "day": "03/06/2024",
     "time": "14:23:00"
    }
    ```
    
    - response DELETE:
    
    `204 No Content`
    
- Tickets (ingressos)
    - request POST e PUT:
    
    ```json
    {
     "chair": "b1",
     "value": 10
    }
    ```
    
    - response POST e PUT:
    
    ```json
    {
     "id": 1,
     "session_id": 1,
     "chair": "b1",
     "value": 10
    }
    ```
    
    - response DELETE:
    
    `204 No Content`
    

### Como executar o projeto

- Fazer `git clone` do repositório
- Abrir a pasta com VS Code
- .env:

```json
PORT="3333"
NODE_ENV="dev"
```

- Abrir novo terminal e executar o comando `npm install` para instalar as dependências do projeto
- Executar o comando `npm run typeorm` para criar o banco de dados
- Executar o comando `npm run dev` para inicializar a aplicação
- Utilizando o Insomnia, criar as HTTP requests com as rotas especificadas no tópico Rotas e preencher o body (JSON) de acordo com os campos solicitados no tópico Payloads
- Os testes são executados pelo comando `npm run test`

## Membros da equipe

- Joao Vitor Graf
- Ana Clara Barros
- Glauber Barbacovi Ribeiro
- Gabriel Severino Da Silva Costa
- Gustavo Kissel
