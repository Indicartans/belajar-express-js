import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("halo");
});

// query string
app.get("/product", (req, res) => {
  const { id, idCategory } = req.query;

  res.send(`id: ${id} <br> idCategory: ${idCategory}`);
});

// params url
app.get("/checkout/:idCart", (req, res) => {
  const { idCart } = req.params;
  res.send(`idCart: ${idCart}`);    
});

app.use("/", (req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
