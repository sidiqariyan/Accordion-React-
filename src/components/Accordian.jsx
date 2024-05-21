import { useState } from "react";
import data from "./data";
import "./Accordian.css";

const Accordian = () => {
  const [selected, setSelected] = useState(null);
  const [multiple, setMultiple] = useState(false);
  const [isMultipleSelected, setIsMultipleSelected] = useState([]);

  const titleHandler = (currentData) => {
    if (multiple) {
      handleMultipleSelection(currentData);
    } else {
      setSelected(currentData === selected ? null : currentData);
    }
  };

  const handleMultipleSelection = (currentData) => {
    if (isMultipleSelected.includes(currentData)) {
      setIsMultipleSelected(
        isMultipleSelected.filter((item) => item !== currentData)
      );
    } else {
      setIsMultipleSelected([...isMultipleSelected, currentData]);
    }
  };

  const toggleMultipleSelection = () => {
    setMultiple(!multiple);
    setSelected(null);
    setIsMultipleSelected([]);
  };

  return (
    <div className="wrapper">
      <button onClick={toggleMultipleSelection}>
        {multiple ? "Disable" : "Enable"} Multi Selection
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item" key={dataItem.id}>
              <div className="title" onClick={() => titleHandler(dataItem.id)}>
                <h3>{dataItem.question}</h3>
                <span
                  className={
                    multiple
                      ? isMultipleSelected.includes(dataItem.id)
                        ? "rotate"
                        : ""
                      : selected === dataItem.id
                      ? "rotate"
                      : ""
                  }
                >
                  +
                </span>
              </div>
              {multiple
                ? isMultipleSelected.includes(dataItem.id) && (
                    <div>{dataItem.description}</div>
                  )
                : selected === dataItem.id && <div>{dataItem.description}</div>}
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
};

export default Accordian;
