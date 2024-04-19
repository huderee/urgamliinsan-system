const http = require("http");
const fs = require("fs");
const urlLib = require("url");
const path = require("path");
const { parse } = require("path");
const myServer = http.createServer((req, res) => {
  res.setHeader("content-type", "text/html");
  const { headers, url, method } = req;
  if (url === "/") {
    fs.readFile("./src/index.html", "utf8", (error, data) => {
      if (error) {
        res.statusCode = 500;
        res.write(error.message);
        res.end();
      } else {
        res.statusCode = 200;
        res.write(data);
        res.end();
      }
    });
  } else if (url === "/login") {
    fs.readFile("./src/login.html", "utf8", (error, data) => {
      res.statusCode = 200;
      res.write(data);
      res.end();
    });
  } else if (url === "/logincheck") {
    // DATA ==> CHUNK1 ==>CHUNK2 ==> CHUNK ==
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const password = parsedBody.split("=")[2];
      if (password === "123456") {
        // login successfull
        res.statusCode = 302;
        res.setHeader("Location", "/home");
      } else {
        // login failed
        res.statusCode = 302;
        res.setHeader("Location", "/error");
      }
      res.end();
    });
  } else if (url == "/home") {
    fs.readFile("./src/home.html", "utf8", (error, data) => {
      res.statusCode = 200;
      res.write(data);
      res.end();
    });
  } else if (url == "/error") {
    fs.readFile("./src/error.html", "utf8", (error, data) => {
      res.statusCode = 200;
      res.write(data);
      res.end();
    });
  } else if (url.endsWith(".pdf")) {
    const parsed = urlLib.parse(url);
    const fileName = path.basename(parsed.pathname);
    //console.log(fileName);

    fs.readFile("./src/pdf/" + fileName, (error, data) => {
      res.statusCode = 200;
      res.setHeader("content-type", "application/jpg");
      res.end(data);
    });
  } else if (url.endsWith(".png") || url.endsWith(".jpg")) {
    const parsed = urlLib.parse(url);
    const fileName = path.basename(parsed.pathname);
    //console.log(fileName);

    fs.readFile("./src/img/" + fileName, (error, data) => {
      res.statusCode = 200;
      res.setHeader("content-type", "image/jpg");
      res.end(data);
    });
  } else if (url.endsWith(".pdf")) {
    const parsed = urlLib.parse(url);
    const fileName = path.basename(parsed.pathname);
    //console.log(fileName);

    fs.readFile("./src/pdf/" + fileName, (error, data) => {
      res.statusCode = 200;
      res.setHeader("content-type", "application/jpg");
      res.end(data);
    });
  } else if (url.endsWith(".css")) {
    const parsed = urlLib.parse(url);
    const fileName = path.basename(parsed.pathname);
    //console.log(fileName);

    fs.readFile("./src/css/" + fileName, (error, data) => {
      res.statusCode = 200;
      res.setHeader("content-type", "text/css");
      res.end(data);
    });
  } else if (url.endsWith(".js")) {
    const parsed = urlLib.parse(url);
    const fileName = path.basename(parsed.pathname);
    //console.log(fileName);

    fs.readFile("./src/js/" + fileName, (error, data) => {
      res.statusCode = 200;
      res.setHeader("content-type", "text/javascript");
      res.end(data);
    });
  } else {
    res.statusCode = 404; // Файлыг уншихад алдаа гарсан тохиолдолд л тохируулна
    console.log(url);
    res.write("<h1>404 not found</h1>");
    res.end();
  }
});
myServer.listen(5000, () => {
  console.log("Сервер 5000 порт дээр асна...");
});
