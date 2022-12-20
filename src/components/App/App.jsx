import { useState } from "react";
import { Container, Title } from "./App.styled";
import ContactsForm from "../Form";
import ContactsList from "../Contacts";
import Filter from "../Filter";
import { Notify } from "notiflix";
import { useLocalStorage } from "hooks/useLocalStorage";



const initialValues = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', initialValues);
  const [filter, setFilter] = useState('');
  const [isOpenContacts, setIsOpenContacts] = useState(false); 
  const [isOpenFilter, setIsOpenFilter] = useState(false); 

  const searchFilter = e => {
    setFilter(e.target.value)
  }
  
  const submitHandler = data => {
    setContacts(contacts => 
      [...contacts, data]
    );

    Notify.success(`${data.name} was successfully added to your contacts`);
    setIsOpenContacts(true);
    
  }


  const deleteContact = id => {
    setContacts(contacts => contacts.filter(contact => contact.id !== id));
  };

  const toggle = type => {
    switch (type) {
      case 'isOpenContacts':
        setIsOpenContacts(isOpenContacts => !isOpenContacts);
        break;
      
      case 'isOpenFilter':
        setIsOpenFilter(isOpenFilter => !isOpenFilter);
        break; 
      
      default: return; 
   }
  };



  const normalizedFilter = filter.toLowerCase();
  const filtredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))


  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactsForm addContact={submitHandler}
        contacts={contacts}
        toggle={toggle}
        isOpenContacts={isOpenContacts}
        isOpenFilter={isOpenFilter} />
      {isOpenFilter && (<Filter value={filter} onSearch={searchFilter} />)}
      {isOpenContacts && (<ContactsList contacts={filtredContacts} toggle={toggle} onDeleteClick={deleteContact} />)}
    </Container>
  )
};

