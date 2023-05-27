import { useState, useEffect } from "react";
import axios from "axios";
import CreateContactForm from "./components/CreateContactForm";
import ContactList from "./components/ContactList";

const App = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      console.log("total contact from api", res.data.length);
      setContacts(res.data);
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
