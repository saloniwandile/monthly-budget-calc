import React from "react";

export const CustomItemForm = ({
  customItem,
  handleInputChange,
  handleAdd,
}) => {
  return (
    <div className="custom-item-form">
      <h4 className="font-h4">Ordered something new? Add your item here</h4>
      <input
        type="text"
        name="name"
        placeholder="Item name"
        className="custom-box"
        value={customItem.name}
        onChange={handleInputChange}
      />
      <input
        type="number"
        step="0.01"
        name="price"
        placeholder="Price"
        className="custom-box"
        value={customItem.price}
        onChange={handleInputChange}
      />

      <select
        name="store"
        id="custom-box"
        value={customItem.store}
        onChange={handleInputChange}
        className="custom-box"
      >
        <option value=""> Select your store</option>
        <option value="walmart">Walmart</option>
        <option value="price-chopper">Price Chopper</option>
        <option value="banyan">Banyan</option>
        <option value="dollar-tree">Dollar Tree</option>
        <option value="Custom">Custom</option>
      </select>

      {/* <label>Choose Color</label>
      <input
        type="color"
        name="color"
        value={customItem.color}
        onChange={handleInputChange}
      /> */}
      {/* <input
        type="checkbox"
        name="isUsual"
        checked={customItem.isUsual}
        onChange={handleInputChange}
      />
      <label>Is this a usual item?</label> */}

      <label>
        <input
          type="checkbox"
          name="isUsual"
          checked={customItem.isUsual}
          onChange={handleInputChange}
        />
        Add to Usuals
      </label>

      {customItem.store === "Custom" && (
        <>
          <input
            type="text"
            name="customStore"
            placeholder="Enter custom store"
            className="custom-box"
            value={customItem.customStore || ""}
            onChange={handleInputChange}
          />
          <label>Choose Color</label>
          <input
            type="color"
            name="color"
            value={customItem.color}
            onChange={handleInputChange}
          />
        </>
      )}

      <button className="btn-card" onClick={handleAdd}>
        Add Your Item
      </button>
    </div>
  );
};
