const http = require("http");
const projects = require("./data-store");
let server;

const host = "localhost";
const port = "8000";

const getHandler = (req, res) => {
  const pathname = req.url.split("/")[2] ? req.url.split("/")[2] : "";
  if (req.url.split("/")[1] !== "projects") {
    res.statusCode = 404;
    return res.end();
  }
  if (pathname.trim() === "" || Number.isNaN(Number(pathname))) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ message: "BAD REQUEST" }));
  } else {
    console.log(pathname);
    const project = projects.filter(
      (project) => project.id === Number(pathname)
    );

    if (project.length > 0) {
      res.statusCode = 200;
      return res.end(JSON.stringify({ project }));
    } else {
      res.statusCode = 404;
      return res.end();
    }
  }
};

server = http.createServer((req, res) => {
  if (req.method === "GET") {
    getHandler(req, res);
  }
});

server.listen(port, () => {
  console.log(`Server running on http://${host}:${port}`);
});

module.exports = server;
