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

  const handleRemoveContact = (contact) => {
    if (window.confirm(`Remove ${contact.name}?`)) {
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
