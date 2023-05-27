import { useState } from "react";

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

    const contact = {
      id: contacts.length + 1,
      name: newContactName,
      number: newContactNumber,
    };

    setContacts(contacts.concat(contact));
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
