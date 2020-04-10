const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");
//uuid = cria um id unico universal

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

//LIST
app.get("/repositories", (request, response) => {
  //Criar constante que recebe um request body
  //Desestruturando a query 
  const { title, url, techs, likes } = request.query;

  //FILTROS DE LISTAGEM
  const titleInfo = title 
    ? repositories.filter(repository => repository.title.includes(title))
    : repositories;

  //Lista todos os repositorios retornando um JSON para repositories
  return response.json(titleInfo);
});

//CREATE
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  //Após instalado o uuid
  //Criar variavel que receberá o objeto desestruturado
  const repository = { id: uuid(), title, url, techs };

  //Enviará para repositories o respository
  repositories.push(repository);

  return response.json(repository);
});

//UPDATE
app.put("/repositories/:id", (request, response) => {
  //Desestruturando o params
  const { id } = request.params;
  //Desestruturando o body
  const { title, url, techs } = request.body;

  //vai percorrer todos os repositorios e retorna da variavel repository
  //ate encontrar (findIndex) a posição do vetor em repositorie []
  const repositoryIndex = repositories
      .findIndex(repository => repository.id == id);

  //quando nao se acha uma informação no vetor ele retorna NUMERO < ZERO    
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found!" });
  }

  const repository = {
    id,
    title,
    url,
    techs,
  };

  //na posição do vetor informado será atribuido os valores do objeto repository
  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

//DELETE
app.delete("/repositories/:id", (request, response) => {
  //Desestruturando o params
  const { id } = request.params;

  //vai percorrer todos os repositorios e retorna da variavel repository
  //ate encontrar (findIndex) a posição do vetor em repositorie []
  const repositoryIndex = repositories
      .findIndex(repository => repository.id == id);

  //quando nao se acha uma informação no vetor ele retorna NUMERO < ZERO    
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found!" });
  }

  //metodo para retirar uma informação de dentro de um array
  //(o indice que quer remover, quais posições remove)
  repositories.splice(repositoryIndex, 1);

  //send retorna em branco
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  return response.json([
    'Like 1'
  ]);
});

module.exports = app;
