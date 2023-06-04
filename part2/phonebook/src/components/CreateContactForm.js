import { useState } from "react";
import contactService from "../services/contacts";

const CreateContactForm = ({ contacts, setContacts }) => {
  const [newContactName, setNewContactName] = useState("");
  const [newContactNumber, setNewContactNumber] = useState("");

  const handleCreateContact = (e) => {
    e.preventDefault();

    const existingContactWithNewName = contacts.find(
      (c) => c.name === newContactName
    );

    if (existingContactWithNewName) {
      if (confirmUpdateExistingContact(existingContactWithNewName)) {
        updateContact(existingContactWithNewName);
        resetContactFormFields();
      }
    } else {
      createContact();
      resetContactFormFields();
    }
  };

  const confirmUpdateExistingContact = (contact) => {
    return window.confirm(
      `${contact.name} is already added to phonebook, replace the old number with a new one?`
    );
  };

  const updateContact = (contact) => {
    const contactToUpdate = {
      ...contact,
      number: newContactNumber,
    };

    contactService
      .update(contactToUpdate)
      .then((updatedContact) =>
        setContacts(
          contacts.map((c) => (c.id !== updatedContact.id ? c : updatedContact))
        )
      );
  };

  const createContact = () => {
    const newContact = {
      id: contacts.length + 1,
      name: newContactName,
      number: newContactNumber,
    };

    contactService.create(newContact).then((createdContact) => {
      setContacts(contacts.concat(createdContact));
    });
  };

  const resetContactFormFields = () => {
    setNewContactName("");
    setNewContactNumber("");
  };

  const handleNewContactNameChange = (e) => {
    setNewContactName(e.target.value);
  };

  const handleNewContactNumberChange = (e) => {
    setNewContactNumber(e.target.value);
  };

  return (
    <form onSubmit={handleCreateContact}>
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
