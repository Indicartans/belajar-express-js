import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import {
  loadContact,
  findContact,
  addContact,
  checkDuplicate,
  deleteContact,
  updateContacts,
} from "../utils/contacts.js";
import { body, check, validationResult } from "express-validator";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";

const app = express();
const port = 3000;

// gunakan ejs
app.set("view engine", "ejs");

// third party middleware
app.use(expressEjsLayouts);

// built in middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// config flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

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
    msg: req.flash("msg"),
  });
});

// add contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Tambah Contact",
    layout: "layouts/main-layout",
  });
});

app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      const duplicate = checkDuplicate(value);

      if (duplicate) {
        throw new Error("Nama sudah terdaftar");
      }

      return true;
    }),
    check("email", "Email tidak valid").isEmail(),
    check("noTelp", "Nomor telepon tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("add-contact", {
        title: "Tambah Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      req.flash("msg", "Data berhasil ditambahkan!");

      res.redirect("/contact");
    }
  }
);

// prosess delete contact
app.get("/contact/delete/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  if (!contact) {
    res.status(404).send("Not Found");
  } else {
    deleteContact(req.params.nama);

    req.flash("msg", "Contact berhasil dihapus");
    res.redirect("/contact");
  }
});

app.get("/contact/edit/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  if (!contact) {
    req.flash("msg", "Contact tidak ditemukan");
    res.redirect("/contact");
  } else {
    res.render("edit-contact", {
      title: "Form edit contact",
      layout: "layouts/main-layout",
      contact,
    });
  }
});

// process update data
app.post(
  "/contact/update",
  [
    body("nama").custom((value, { req }) => {
      const duplicate = checkDuplicate(value);

      if (value !== req.body.oldName && duplicate) {
        throw new Error("Nama sudah terdaftar");
      }

      return true;
    }),
    check("email", "Email tidak valid").isEmail(),
    check("noTelp", "Nomor telepon tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("edit-contact", {
        title: "Form Edit Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      updateContacts(req.body);
      req.flash("msg", "Data berhasil diupdate!");
      res.redirect("/contact");
    }
  }
);

// get detail contact
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
