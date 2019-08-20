const express = require("express");
const server = express();
server.use(express.json());

const projects = [];
var countRequests = 0;

server.use((req, res, next) => {
  countRequests++;
  console.log(`Requisição ${countRequests}`);

  return next();
});

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(project => project.id == id);

  if (!project) {
    return res.json({ errorMessage: "Projeto não encontrado!" });
  }

  req.projectSelected = project;

  return next();
}

server.get("/projects", (req, res) => {
  return res.json({ projects: projects });
});

server.get("/project/:id", checkProjectExists, (req, res) => {
  return res.json({ project: req.projectSelected });
});

server.put("/project/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id == id);
  project.title = title;

  return res.json({ message: "Projeto alterado com sucesso" });
});

server.post("/project/:id/task", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  const project = projects.find(project => project.id == id);
  project.tasks.push(task);

  return res.json({ message: "Tarefa criada com sucesso" });
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  projects.push({
    id: id,
    title: title,
    tasks: []
  });

  return res.json({ message: `Projeto ${title} criado com sucesso.` });
});

server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex, 1);

  return res.json({ message: "Projeto deletado com sucesso" });
});

server.listen(3000);
