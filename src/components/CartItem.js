import React from "react";

const CartItem = ({ item, removeItem, updateItem }) => {
  return (
    <li class="flex py-6 border-b">
      <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item?.coverImageUrl ?? "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"}
          alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
          class="h-full w-full object-cover object-center"
        />
      </div>

      <div class="ml-4 flex flex-1 flex-col">
        <div>
          <div class="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href="#">{item?.name}</a>
            </h3>
            <p class="ml-4">${item?.price}</p>
          </div>
          <p class="mt-1 text-sm text-gray-500">Size: {item?.size}</p>
          <div className="flex flex-row items-center mt-1">
            <span class="text-sm text-gray-500">Color: </span>
            <div style={{ backgroundColor: item?.color, width: "15px", height: "15px" }} className="rounded-full ml-1"></div>
          </div>
        </div>
        <div class="flex flex-1 items-end justify-between text-sm">
          <div class="flex flex-row items-center">
            <p class="text-gray-500">Qty: </p>
            <input
              class="appearance-none border rounded w-12 p-1 ml-1 text-gray-700 leading-tight focus:outline-none"
              id="username"
              type="number"
              value={item?.quantity}
              onChange={(e) => updateItem(item, {quantity: e.target.value})}
            />
          </div>

          <div class="flex">
            <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500" onClick={(e) => removeItem(e, item?.id)}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
