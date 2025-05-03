import React, { useState } from 'react';
import itemsData from '../data/data.json';
import { useBudget } from './BudgetContext';
import { CustomItemForm } from './CustomItemForm';

const getImage = (filename) => require(`../images/${filename}`);

export const BudgetCard = () => {
  const [items, setItems] = useState(
    itemsData.map((item) => ({
      ...item,
      image: getImage(item.image),
    }))
  );

  const [customItem, setCustomItem] = useState({
    name: '',
    price: '',
    image: '',
  });

  const { addToCart } = useBudget();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCustomItem = () => {
    if (!customItem.name || !customItem.price) return;

    const storename = customItem.store === 'Custom' ? customItem.customStore : customItem.store

    const newItem = {
      id: items.length + 1,
      name: customItem.name,
      price: parseFloat(customItem.price),
      store: storename,
      image: customItem.image || 'tomatoes.png', // Optional: handle custom image upload
      quantity: 0,
    };

    setItems(prev => [...prev, newItem]);
    // setCustomItem({ name: '', price: '', image: '' });

    addToCart(newItem);
    setCustomItem({ name: '', price: '', store:'', customStore: '' })
  };

  return (
    <div className="page">
      {/* <div className="custom-item-form">
        <h4 className='font-h4'>Ordered something new? Add your item here</h4>
        <input
          type="text"
          name="name"
          placeholder="Item name"
          className='custom-box'
          value={customItem.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          step="0.01"
          name="price"
          placeholder="Price"
          className='custom-box'
          value={customItem.price}
          onChange={handleInputChange}
        />
        <button className="btn-card" onClick={handleAddCustomItem}>
          Add Your Item
        </button>
      </div> */}
      <CustomItemForm
      customItem={customItem}
      handleInputChange={handleInputChange}
      handleAdd={handleAddCustomItem}

      />
      <h4 className='font-h4'>Your usuals</h4>
      <div className="item-card">
        
      {items.map((item) => (
        <div className="card" key={item.id}>
          <div className="header">
            <h3>{item.name}</h3>
          </div>
          {item.image && (
            <img
              src={typeof item.image === 'string' ? item.image : getImage(item.image)}
              alt={item.name}
              className="card-img"
            />
          )}
          <p className="price">${item.price}</p>

          <button className="btn-card" onClick={() => addToCart(item)}>
            Add
          </button>
        </div>
      ))}
      </div>
    </div>
  );
};
