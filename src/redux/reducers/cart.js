const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};
const gerTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PIZZA_CART': {
      const currentPizzasItem = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];
      const newItem = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzasItem,
          totalPrice: gerTotalPrice(currentPizzasItem),
        },
      };
      const items = Object.values(newItem).map((obj) => obj.items);
      const allPizas = [].concat.apply([], items);
      const allPrice = gerTotalPrice(allPizas);
      return {
        ...state,
        items: newItem,
        totalCount: allPizas.length,
        totalPrice: allPrice,
      };
    }
    case 'CLEAR_CART': {
      return {
        items: {},
        totalPrice: 0,
        totalCount: 0,
      };
    }
    default:
      return state;
  }
};

export default cart;
