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

  return (
    <div>
      <h1>Phonebook</h1>
      <CreateContactForm contacts={contacts} setContacts={setContacts} />
      <ContactList contacts={contacts} />
    </div>
  );
};

export default App;
