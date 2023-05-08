import {  useState} from 'react';
import { toast } from 'react-hot-toast';
import PropTypes from "prop-types"
import { Form, FormButton, Label, Input, Header} from './SearchBar.styled'
import { BsSearch} from "react-icons/bs"


export function SearchBar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      toast.error('please type something');
      return;
    }

    onSubmit(searchQuery);
    setSearchQuery('');
  };

  const handleChange = event => {
    setSearchQuery(event.currentTarget.value);
  };

  const clearForm = () => {
    document.getElementById("myForm").reset(); 
    setSearchQuery('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit} id="myForm" clearForm={clearForm}>
        <FormButton type="submit">
          <Label>Search</Label>
          <BsSearch size={20} />
        </FormButton>
        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleChange}
        />
      </Form>
    </Header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};


