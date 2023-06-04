import { useState } from "react";

const ContactList = ({ contacts, handleRemoveContact }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div id="contact-list">
      <h2>Contacts</h2>
      <div>
        Search: <input value={searchTerm} onChange={handleSearchTermChange} />
      </div>
      <ul>
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} {contact.number}{" "}
            <button onClick={() => handleRemoveContact(contact)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
