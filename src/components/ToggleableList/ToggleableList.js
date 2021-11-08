import React, { useState } from "react";
import 'styled-components/macro';

const Item = React.memo(({ item, onClickHandler, isActive }) => (
    <div css={`
    cursor: poitner;
    `}>
      <item.Trigger onClick={onClickHandler} />
      {isActive && item.children}
    </div>
  ))

const ToggleableList = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(false);

  return (
    <>
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          onClickHandler={setSelectedItem}
          isActive={selectedItem === item.id}
        />
      ))}
    </>
  );
};

export default ToggleableList;
