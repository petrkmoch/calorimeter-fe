import { CButton, CContainer } from '@coreui/react';
import { useEffect, useState } from 'react';
import './App.css';
import { CalorieItem } from './Calorie-item';

function App() {

  const [caloriesItems, setCaloriesItems] = useState([]);

  const [inputDate, setInputDate] = useState(new Date());
  const [inputTitle, setInputTitle] = useState('');
  const [inputUnit, setInputUnit] = useState('');
  const [inputCount, setInputCount] = useState(0);
  const [inputCalories, setInputCalories] = useState(0);

  const fetchData = () => {
    fetch('http://localhost:4000/calorie-data')
    .then((res) => res.json())
    .then((data) => {
      setCaloriesItems(data);
      //console.log('aaaaaaaaaaaa' + JSON.stringify(data));
    })
    
  }

  useEffect(() => {
    fetchData();
  }, [])

  const submitForm = (e) => {
    const item = {
      "day": inputDate,
      "title": inputTitle,
      "count": inputCount,
      "unit": inputUnit,
      "numberOfCaloriesPerUnit": inputCalories
    }
    console.log('New item: ' + JSON.stringify(item));
    fetch('http://localhost:4000/calorie-data', {method: 'POST', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify(item)}).then((d) => {
      fetchData();
    });
  }

  const alertBox = () => {
    alert('hovno2');
  }

  const deleteData = (id) => {
    fetch('http://localhost:4000/calorie-data/' + id, {method: 'DELETE', headers: {
      'Content-Type': 'application/json'
    }}).then((d) => {
      fetchData();
    });
  }

  return (
    <div className="App">
      <CalorieItem myClassName="calorie-header" title="Title" unit="Unit" count="Count" day="Date" numberOfCaloriesPerUnit="Calories"></CalorieItem>
      {caloriesItems.map((item,i) => <CalorieItem  simplifiedFunction={deleteData} _id={item._id} key={i} title={item.title} unit={item.unit}
       count={item.count} numberOfCaloriesPerUnit={item.numberOfCaloriesPerUnit} day={item.day.toLocaleString()}></CalorieItem>)}
      <div style={{margin: '10px auto'}}>
        <input type="date" value={inputDate} onChange={(e) => setInputDate(e.target.value)} /><br/>
        <input type="text" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} /><br/>
        <input type="number" value={inputCount} onChange={(e) => setInputCount(e.target.value)} /><br/>
        <input type="text" value={inputUnit} onChange={(e) => setInputUnit(e.target.value)} /><br/>
        <input type="number" value={inputCalories} onChange={(e) => setInputCalories(e.target.value)} /><br/>
        <button onClick={submitForm}>Submit</button>
      </div>
      <div>
        <label>Number:</label>
        <span>{caloriesItems.length}</span>
      </div>
      <CContainer>
        <CButton onClick={alertBox} style={{marginLeft: '20px'}}>Tlacitko</CButton>
      </CContainer>
    </div>
  );
}

export default App;
