const http = require("http");
const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

// Code completed by Serena Glick (sglick@pdx.edu / sgpdx@github), on January 20, 2026
const server = http.createServer((req, res) => {
  const routes = [
    "welcome",
    "redirect",
    "redirected",
    "cache",
    "cookie",
    "other",
  ];

  // main route was not asked for, but here is one
  if (req.method === "GET" && req.url === "/") {
    console.log(`${req.method} - ${req.url}`);
    res.writeHead(200, { "Content-Type": "text/html" });

    // I asked AI for help to write this part; my idea is to use const routes
    // to create a clickable (link) list to the other pages available
    let routesList = "<ul>";
    routes.forEach((route) => {
      routesList += `<li><a href="/${route}">${route}</a></li>`;
    });
    routesList += "</ul>";

    res.write(`<h1>Main Page</h1><h2>Pages Available</h2>${routesList}`);
    res.end();
  }

  // new route --> /welcome
  else if (req.method === "GET" && req.url === "/welcome") {
    console.log(`${req.method} - ${req.url}`);
    res.writeHead(200, {
      "Content-Type": "text/html",
      "Keep-Alive": "timeout=3",
    });
    res.write("<h1>Welcome traveler!</h1>");
    res.end();
  }

  // new route --> /redirect
  else if (req.method === "GET" && req.url === "/redirect") {
    console.log(`${req.method} - ${req.url}`);
    res.writeHead(302, {
      "Content-Type": "text/html",
      "Keep-Alive": "timeout=3",
      Location: "/redirected",
    });
    res.write("<h1>You should not be seeing this page...</h1>");
    res.end();
  }

  // new route --> /redirected
  else if (req.method === "GET" && req.url === "/redirected") {
    console.log(`${req.method} - ${req.url}`);
    // Q: does the redirected page get a 302 also?  Or a 200?
    res.writeHead(200, {
      "Content-Type": "text/html",
      "Keep-Alive": "timeout=3",
    });
    res.write(
      "<h1>Oh snap! You have been redirected from a previous page</h1>",
    );
    res.end();
  }

  // new route --> /cache
  else if (req.method === "GET" && req.url === "/cache") {
    console.log(`${req.method} - ${req.url}`);
    res.writeHead(200, {
      "Content-Type": "text/html",
      "Keep-Alive": "timeout=3",
      "Cache-Control": "public, max-age=86400",
    });
    res.write("<h1>This resource was cached</h1>");
    res.end();
  }

  // new route --> /cookie
  else if (req.method === "GET" && req.url === "/cookie") {
    console.log(`${req.method} - ${req.url}`);
    res.writeHead(200, {
      "Content-Type": "text/html",
      "Keep-Alive": "timeout=3",
      "Set-Cookie": "hello=world",
    });
    res.write("Cookies... yum!");
    res.end();
  }

  // handling the favicon.ico 404 error issue:
  else if (req.url === "/favicon.ico") {
    res.writeHead(204); // "no content" status code
    res.end();
  }

  // new route --> handle any other pages as "error" or 404
  else {
    console.log(`${req.method} - ${req.url}`);
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h1>404 - page not found</h1>");
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
