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
        info.content = JSON.stringify({ name: "Jared", age: 30});
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