import React from "react";
import Table from "./components/Table";
import { useQuery } from "@apollo/client";
import { GET_CONTACT_LIST, Contact } from "../../gql/queries"; 

function Contacts() {
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

    const headers = ['first_name', 'created_at'];
    const contactList = data.contact;
  return (
    <div >
      <header className="App-header" >
        <Table headers={headers} data={contactList} />
      </header>
    </div>
  );
}

export default Contacts;
