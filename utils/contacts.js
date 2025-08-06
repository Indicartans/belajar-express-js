import fs from "fs";

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// get all contact
export const loadContact = () => {
  const fileBuffer = fs.readFileSync("./data/contacts.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);

  return contacts;
};

// get detail contact
export const findContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  return contact;
};

// replace data contacts
const saveContacts = (contacts) => {
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
};

// add new contact
export const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContacts(contacts);
};

// check duplicate
export const checkDuplicate = (nama) => {
  const contacts = loadContact();

  return contacts.find((contact) => contact.nama == nama);
};

export const deleteContact = (nama) => {
  const contacts = loadContact();
  const filteredContacts = contacts.filter((contact) => contact.nama !== nama);

  saveContacts(filteredContacts);
};

export const updateContacts = (newContacts) => {
  const contacts = loadContact();
  // hilangkan contact lama yg ingin diedit
  const filteredContacts = contacts.filter(
    (contact) => contact.nama !== newContacts.oldName
  );

  // hapus oldname
  delete newContacts.oldName;
  // masukkan contact baru ke data
  filteredContacts.push(newContacts);
  saveContacts(filteredContacts);
};
