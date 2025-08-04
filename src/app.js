import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import { loadContact, findContact } from "../utils/contacts.js";

const app = express();
const port = 3000;

// gunakan ejs
app.set("view engine", "ejs");

// third party middleware
app.use(expressEjsLayouts);

// built in middleware
app.use(express.static("public"));

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
  const contacts = loadContact();

  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layout",
    contacts: contacts,
  });
});

app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  res.render("detail-contact", {
    title: "Halaman Detail Contact",
    layout: "layouts/main-layout",
    contact: contact,
  });
});

app.use("/", (req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
