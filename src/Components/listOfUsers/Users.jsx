import React, { useState, useEffect } from 'react';
import './Users.css'; 
import Items_Details from '../items/Items';

const AutoCompleteChips = () => {
  const [inputValue, setInputValue] = useState('');
  const [matchedItems, setMatchedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;

    const filteredItems = Items_Details.filter(
      (item) =>
        (item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase())) &&
        !selectedItems.includes(item)
    );

    setMatchedItems(filteredItems);
    setInputValue(value);
  };

  const handleItemClick = (item) => {
    setSelectedItems([...selectedItems, item]);

    setInputValue('');

    setMatchedItems([]);
  };

  const handleItemRemove = (removedItem) => {
    const updatedItems = selectedItems.filter((item) => item !== removedItem);
    setSelectedItems(updatedItems);
  };

  return (
    <div>
     <h1 className='Bluecolor_heading'>Pick Users</h1>
    <div className="autocomplete-container">
      <div className="selected-items-container">
        {selectedItems.map((item) => (
          <div key={item.id} className="selected-item">
            <img src={item.imageUrl} alt={item.name} className="avatar_url" />
            <div>
              <p className='name_of_person'><b>{item.name}</b></p>
            </div>
            <span className='close_user' onClick={() => handleItemRemove(item)}><b className='close_user' >X </b></span>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className='font_input'
          placeholder="Add new user ..."
        />
      </div>
      
      {matchedItems.length > 0 && (
        <ul className="dropdown">
          {matchedItems.map((item) => (
            <li className='main_dropdwon_flex' key={item.id} onClick={() => handleItemClick(item)}>
              <img src={item.imageUrl} alt={item.name} className="avatar" />
              <div>
                <span className='drop_name'><b>{item.name}</b></span>
                <span className='drop_name light_color'>{item.email}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
      
    </div>
    </div>
  );
};

export default AutoCompleteChips;

