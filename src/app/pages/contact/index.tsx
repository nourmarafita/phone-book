import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CONTACT_LIST, Contact } from "../../gql/queries"; // Import the query and types

function App() {
  const { loading, error, data } = useQuery<{ contact: Contact[] }>(GET_CONTACT_LIST);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.contact) {
    return <p>No data available.</p>;
  }

  const contactList = data.contact;

  return (
    <div>
      {contactList.map((contact) => (
        <div key={contact.id}>
          <p>Name: {contact.first_name} {contact.last_name}</p>
          <p>Created At: {contact.created_at}</p>
          <p>Phone Number: {contact.phones[0] ? contact.phones[0].number : 'N/A'}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
