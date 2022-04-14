import React from 'react';

// оборачиваем в React.memo чтобы не было лишнего ререндера
const SortPopup = React.memo(function SortPopup({ items, onClickSortType, activeSortType }) {
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  //const [activeItem, setActiveItem] = React.useState(0);
  const activeLabel = items.find((obj) => obj.type === activeSortType).name;

  // получаем ссылку на DOM елемент (Sort)
  const sortRef = React.useRef();

  const toggleVisiblePopup = () => {
    setVisiblePopup(!visiblePopup);
  };

  const handleOutsideClick = (event) => {
    // проверка на клик = путь
    const path = event.path || (event.composedPath && event.composedPath());
    if (!path.includes(sortRef.current)) {
      setVisiblePopup(false);
    }
  };

  const onSelectItem = (index) => {
    if (onClickSortType) {
      onClickSortType(index);
    }
    setVisiblePopup(false);
  };

  //обработчик клика нужно удалять при  переходе на другую страницу
  React.useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick); // ловит клики на странице
  }, []);

  return (
    <div
      ref={sortRef} // хранит ссылку на DOM элемент. подробно (https://youtu.be/IMBAK-DftVM?list=PL0FGkDGJQjJFMRmP7wZ771m1Nx-m2_qXq&t=4013)
      className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={toggleVisiblePopup}>{activeLabel}</span>
      </div>
      {visiblePopup && (
        <div className="sort__popup">
          <ul>
            {items && // что бы не сравнивать map с indefiend
              items.map((obj, index) => (
                <li
                  className={activeSortType === obj.type ? 'active' : ''}
                  onClick={() => onSelectItem(obj)}
                  key={`${obj.type}_${index}`}>
                  {obj.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default SortPopup;
