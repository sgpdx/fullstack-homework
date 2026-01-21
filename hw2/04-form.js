const http = require("http");
const nodeStatic = require("node-static");
const querystring = require("node:querystring");
const port = process.env.PORT || 5001;

// Code completed by Serena Glick (sglick@pdx.edu / sgpdx@github), on January 20, 2026
// Referenced the code in this class example https://github.com/caterinasworld/fullstack-examples/blob/main/node/09-form.js

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered

const file = new nodeStatic.Server("./public");

const server = http.createServer((req, res) => {
  // handling the main route
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write('<a href="/form">Go to Form</a>');
    res.end();
  }

  // form route --> /form
  else if (req.method === "GET" && req.url === "/form") {
    file.serveFile("/form.html", 200, {}, req, res);
  }

  // submit route --> /submit
  else if (req.method === "POST" && req.url === "/submit") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const userdata = querystring.parse(body);
      const { username, email } = userdata;

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`<p>Username: ${username}</p>`);
      res.write(`<p>Email: ${email}</p>`);
      res.end();
    });
  }

  // I used GitHub Copilot to help me write this part
  // Initially the .css file wasn't being served
  // It also recommended I have a 404 handler for other pages

  // 404 handler and static file server
  else if (req.method === "GET") {
    // Check if the request is for a static file (has a file extension)
    if (req.url.includes(".")) {
      file.serve(req, res);
    } else {
      // Custom 404 for routes without file extensions
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write("<h1>404 - page not found</h1>");
      res.end();
    }
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
