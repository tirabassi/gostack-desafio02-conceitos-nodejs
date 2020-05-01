const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const index = repositories.findIndex((respository) => respository.id === id);
  //const repository = repositories.find((repository) => repository.id === id);

  if (index >= 0) {
    repositories[index].title = title;
    repositories[index].url = url;
    repositories[index].techs = techs;
  } else {
    return response.status(400).json({ msg: "not found" });
  }

  return response.json(repositories[index]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((respository) => respository.id === id);

  if (index >= 0) {
    repositories.splice(index, 1);
  } else {
    return response.status(400).json({ error: "not found" });
  }

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((respository) => respository.id === id);

  if (index >= 0) {
    repositories[index].likes++;
  } else {
    return response.status(400).json({ error: "not found" });
  }

  return response.json(repositories[index]);
});

module.exports = app;
