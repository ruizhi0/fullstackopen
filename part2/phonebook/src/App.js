import { useState, useEffect } from "react";
import CreateContactForm from "./components/CreateContactForm";
import ContactList from "./components/ContactList";
import contactService from "./services/contacts";

const App = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    contactService.getAll().then((contacts) => {
      setContacts(contacts);
    });
  }, []);

  const confirmRemoveContact = (contact) => {
    return window.confirm(`Remove ${contact.name}?`);
  };

  const handleRemoveContact = (contact) => {
    if (confirmRemoveContact(contact)) {
      contactService.remove(contact.id).then(() => {
        setContacts(contacts.filter((c) => c.id !== contact.id));
      });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <CreateContactForm contacts={contacts} setContacts={setContacts} />
      <ContactList
        contacts={contacts}
        handleRemoveContact={handleRemoveContact}
      />
    </div>
  );
};

export default App;
