import express from "express";
import expressEjsLayouts from "express-ejs-layouts";

const app = express();
const port = 3000;

// gunakan ejs
app.set("view engine", "ejs");
app.use(expressEjsLayouts);

app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "Alfa Indica",
      email: "alfaindica@gmail.com",
    },
    {
      nama: "erik",
      email: "erik@gmail.com",
    },
    {
      nama: "owi",
      email: "owi@gmail.com",
    },
  ];

  res.render("index", {
    nama: "Alfa Indica",
    title: "Halaman Home",
    mahasiswa,
    layout: "layouts/main-layout",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Halaman About",
    layout: "layouts/main-layout",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layout",
  });
});

app.use("/", (req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
