import React, { useState } from 'react'
import itemsData from '../data/data.json';
import { useBudget } from './BudgetContext';



const getImage = (filename) => require(`../images/${filename}`);

export const BudgetCard = () => {
    const [items] = useState(
        itemsData.map(item=> ({
            ...item,
            image: getImage(item.image)
        }))
    )

    
    const { addToCart } = useBudget();

    // <button onClick={() => addToCart({ name: "Banana", price: 0.65 })}>Add</button>

  return (
    <div className='page'>
        {items.map(item => (
            <div className="card" key={item.id}>
                <div className="header">
                    <h3>{item.name}</h3>
                </div>
                <img src={item.image} alt={item.name} className='card-img' />
                <p className="price">{item.price}</p>
                <button className="btn-card" onClick={() => addToCart(item)}>
            Add
          </button>
            </div>
        ))}
    </div>
    
  )
}


// import React, { useState } from 'react';
// import itemsData from '../data/data.json';

// const getImage = (filename) => require(`../images/${filename}`);

// export const BudgetCard = () => {
//   const [items] = useState(
//     itemsData.map(item => ({
//       ...item,
//       image: getImage(item.image)
//     }))
//   );

//   return (
//     <div className="page">
//       {items.map(item => (
//         <div className="card" key={item.id}>
//           <div className="header"><h3>{item.name}</h3></div>
//           <img src={item.image} alt={item.name} className="card-img" />
//           <p className="price">${item.price.toFixed(2)}</p>
//           <button className="btn" onClick={() => console.log(`${item.name} added!`)}>
//             Add
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };
