const express = require("express");
const morgan = require("morgan");
const multer = require("multer");

const PORT = 3000;

const app = express();
const morganFormat = (app.get("env") == "production") ? "tiny" : "dev";

//app.use((request, response) => response.end("Hello, World!"));
app.use(morgan(morganFormat));
app.use(express.static(__dirname + "/public"));



app.get("/", (request, response) => response.redirect("/hello.html"));
app.get("/hello", (request, response) => response.end("Hello, World!"));
app.get("/query", (request, response) => {
    console.log(request.query)
    response.send(request.query)
});

function fileUploaded(request, response) {
    const file = request.file;

    console.log("File: ", file);

    if (file && (file.fieldname == "File")){
        response.end("File uploaded", + file.originalname);

    }
}

const storage = multer.diskStorage({destination: "upload",
        filename: (request, file, cb) => cb(null, file.originalname)
});

//the same code:
//v.1
//const uploadCallback = multer({storage: storage}).single("File");
//v.2
const uploadCallback = multer({storage}).single("File");

app.post("/upload-test", uploadCallback, fileUploaded);
app.listen(PORT);
console.log("Listening on port", PORT);
