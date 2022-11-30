const CalorieItem = ({myClassName, _id, day, title, unit, count, numberOfCaloriesPerUnit, simplifiedFunction}) => {

  const removeItem = (e) => {
    console.log("_id:" + _id);
    simplifiedFunction(_id);
  }

  return (
    <div className={`${myClassName ? myClassName : ''}`}>
      <span>{day}</span>
      <span>{title}</span>
      <span>{unit}</span>
      <span>{count}</span>
      <span>{numberOfCaloriesPerUnit}</span>
      <span onClick={removeItem}>&times;</span>
    </div>
  );
};

export { CalorieItem }
