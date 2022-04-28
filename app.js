console.log("Hello World!\n==========\n");

// Exercise 1 Section
console.log("EXERCISE 1:\n==========\n");

const { info } = require("console");
const http = require("http");
const { getRouteInfo } = require("./utees");
const { url } = require("inspector");
const { type } = require("os");
const port = 3000;

const requestHandler = (req, res) => {
    const chunks = [];

    // listen and collect request body chunks
    req.on("data", (chunk) => chunks.push(chunk));

    // Handle the response after all the req chunks have arrived
    req.on("end", () => {
        const { method, url } = req;
        let reqBody;
        try {
            const reqBody = JSON.parse(Buffer.concat(chunks).toString());
        } catch (err) {
            console.error("Request body cannot be parsed to JSON");
            reqBody = null;
        }


        // Get route info
        const { statusCode, contentType, content } = getRouteInfo(method, url, reqBody);


        res.writeHead(statusCode, { "content-type": contentType });
        res.write(content);
        res.end();
    });
};

//determine route info
const getRouteInfo = (method, url, reqBody) => {
    const info = {
        statusCode: 200,
        contentType: "text/html",
        content: "",
    };

    switch (true) {
        case url == "/" && method == "GET":
            info.content = "<h1>Brain Static</h1>";
            break;
        case url == "/about" && method == "GET":
            info.contentType = "application/json";
            info.content = JSON.stringify({ name: "Jared", age: 30 });
            break;
        case url == "/echo" && method == "POST":
            info.contentType = "application/json";
            info.content = JSON.stringify({ url, method, reqBody })
            break;
        default:
            // 404 Not Found
            info.statusCode = 404;
            info.content = "<h1>404 Not Found, Sorry</h1>";
    }

    return info;
}

module.exports = { getRouteInfo };
/* export default {
    getRouteInfo
} */


const server = http.createServer(requestHandler)

server.listen(port, () => {
    console.log(`Server is listening on ${port}...`);
});

// Finish setting up the server