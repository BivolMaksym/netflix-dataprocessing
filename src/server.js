const express = require('express');
const {response} = require("express");

const app = express ();
app.use(express.json());

app.listen(3000, () => {
    console.log("Server listening on PORT:3000");
});

app.get("/status", (request, response) => {
    const status = {
        "Status": "Running"
    };
    response.send(status);
});
