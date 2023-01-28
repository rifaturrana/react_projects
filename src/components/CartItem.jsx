/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import { useDispatch } from "react-redux";

import { icons } from "../assets";
import { modifyQuantityOfAnItem, removeFromCart } from "../store/reducers/Cart";

function CartItem({ item }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const dispatch = useDispatch();
  return (
    <tr>
      <td>
        <div className="product">
          <img src={item.image} className="product-img" alt="" />
        </div>
      </td>
      <td>
        <p>{item.title}</p>
      </td>
      <td>$ {item.price}</td>
      <td>
        <div className="qty_input">
          <button
            className="qty-count qty-count--minus"
            data-action="minus"
            type="button"
          >
            <figure
              onClick={() => {
                if (quantity > 1) {
                  setQuantity((prev) => prev - 1);
                  dispatch(modifyQuantityOfAnItem(item.id, quantity - 1));
                }
              }}
            >
              <img src={icons.minusIcon} />
            </figure>
          </button>
          <input
            className="product-qty"
            type="number"
            name="product-qty"
            value={quantity}
            min="1"
            onChange={(e) => {
              if (parseInt(e.target.value) >= 1) {
                setQuantity(parseInt(e.target.value));

                dispatch(
                  modifyQuantityOfAnItem(item.id, parseInt(e.target.value))
                );
              }
            }}
            // onChange = {}
          />
          <button
            className="qty-count qty-count--add"
            data-action="add"
            type="button"
          >
            <figure
              onClick={() => {
                if (quantity >= 1) {
                  setQuantity((prev) => prev + 1);

                  dispatch(modifyQuantityOfAnItem(item.id, quantity + 1));
                }
              }}
            >
              <img src={icons.plusIcon} />
            </figure>
          </button>
        </div>
      </td>
      <td>$ {item.quantity ? item.price * item.quantity : 0}</td>
      <td>
        <img
          onClick={() => dispatch(removeFromCart(item.id))}
          className="cross-icon"
          src={icons.crossIcon}
        />
      </td>
    </tr>
  );
}

// 10 * 2 = 20

// dispatch({
//         type: 'REMOVE_ITEM',
//         payload : {id: item.id}
//     })

export default CartItem;
