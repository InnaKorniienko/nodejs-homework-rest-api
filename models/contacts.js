const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, "contacts.json");


async function listContacts() {
    try {
       const result = await fs.readFile(contactsPath);
       const data= JSON.parse(result);
       return data;
    } catch (err) {
       return console.error(err);
    }
 }

async function getContactById(contactId) {
    const allContacts = await listContacts();
    const contact = allContacts.find(contact => contact.id === contactId);
    if (!contact) {
       throw new Error('No contacts');
    }
    return contact;
 }

async function addContact(name, email, phone) {
     try {
       const allContacts = await listContacts();
       const newContact = { id: uuidv4(), name, email, phone };
       const newContactsList = JSON.stringify([...allContacts, newContact]);
       fs.writeFile(contactsPath, newContactsList);
       return newContact;
    } catch (err) {
       return console.error(err);
    }
 }

  
async function removeContact(contactId) {
    try {
       const allContacts = await listContacts();
       const contactsRemove = allContacts.find(
          contact => contact.id === contactId.toString()
       );
       const newContactsList = JSON.stringify(
        allContacts.filter(contact => contact.id !== contactId.toString())
       );
       fs.writeFile(contactsPath, newContactsList);
       return contactsRemove;
    } catch (err) {
       return console.error(err);
    }
 }

async function updateContact(contactId, body){
   try {
      const contacts = await listContacts();
      const index = contacts.findIndex(({ id }) => id === contactId);
      if (index === -1) {
        throw new Error("Not found");
      }
      const updateContact = { ...contacts[index], ...body };
      contacts[index] = updateContact;
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return updateContact;
   } catch (err) {
      return console.error(err);
   }
}
 
module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
 };