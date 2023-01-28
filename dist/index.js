import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT;
app.get("/", (req, res) => {
    res.send("Express + Typescript Server");
});
app.listen(port, () => {
    console.info(`Server is running on port: ${port}`);
});
//# sourceMappingURL=index.js.map