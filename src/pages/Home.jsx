import React from 'react';
import { Catigories, PizzaBlock, SortPopup, PizzaBlockLoading } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';
import { addPizzaToCart } from '../redux/actions/cart';
//import LoadingBlock from '../components/PizzaBlock/LoadingBlock';

const categoreNames = ['Мясные', 'Вегатаринские', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
  { name: 'Популярность', type: 'popular', order: 'desc' },
  { name: 'Цена', type: 'price', order: 'desc' },
  { name: 'Алфавит', type: 'name', order: 'asc' },
];
function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ pizza }) => pizza.items);
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoaded = useSelector(({ pizza }) => pizza.isLoaded);
  const { category, sortBy } = useSelector(({ filter }) => filter);

  const handleAddPizzaToCart = (obj) => {
    dispatch({
      type: 'ADD_PIZZA_CART',
      payload: obj,
    });
  };
  React.useEffect(() => {
    dispatch(fetchPizzas(category, sortBy));
  }, [category, sortBy]);

  // 7урок, 1:39, это нужно что бы не менять ссылку на функцию, иначе происходит лишний ререндер
  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);

  const onSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Catigories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoreNames}
        />
        <SortPopup
          activeSortType={sortBy.type}
          onClickSortType={onSelectSortType}
          items={sortItems}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? items.map((obj) => (
              <PizzaBlock
                onClickAddPizza={handleAddPizzaToCart}
                key={obj.id}
                addedCount={cartItems[obj.id] && cartItems[obj.id].length}
                //isLoading={true}
                {...obj}
              />
            ))
          : Array(12)
              .fill(0)
              .map((_, index) => <PizzaBlockLoading key={index} />)}
      </div>
    </div>
  );
}

export default Home;
