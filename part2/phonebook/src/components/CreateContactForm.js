import { useState } from "react";
import contactService from "../services/contacts";

const CreateContactForm = ({ contacts, setContacts }) => {
  const [newContactName, setNewContactName] = useState("");
  const [newContactNumber, setNewContactNumber] = useState("");

  const handleNewContactNameChange = (e) => {
    setNewContactName(e.target.value);
  };

  const handleNewContactNumberChange = (e) => {
    setNewContactNumber(e.target.value);
  };

  const addNewContact = (e) => {
    e.preventDefault();

    const newContact = {
      id: contacts.length + 1,
      name: newContactName,
      number: newContactNumber,
    };

    contactService.create(newContact).then((createdContact) => {
      setContacts(contacts.concat(createdContact));
    });
    resetContactFormFields();
  };

  const resetContactFormFields = () => {
    setNewContactName("");
    setNewContactNumber("");
  };

  return (
    <form onSubmit={addNewContact}>
      <div>
        Name:{" "}
        <input value={newContactName} onChange={handleNewContactNameChange} />
      </div>
      <div>
        Number:{" "}
        <input
          value={newContactNumber}
          onChange={handleNewContactNumberChange}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default CreateContactForm;
