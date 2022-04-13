import './App.css';
import Header from './components/Header';
import Buttons from './components/Buttons';
import Footer from './components/Footer';
import DataTable from './components/DataTable';
import { useState } from 'react';

function App() {
  const [editData,setEditData] = useState({
    invoiceCurrency: '',
    customerPaymentTerms:''
  });

  const editDataHandler = (invc,cuspt) => {
    setEditData({...editData, invoiceCurrency: invc, customerPaymentTerms:cuspt});
    console.log('editData from app.js', editData);
  }

  return (
    <div className="App">
      <Header className="App-header"/>
      <Buttons editDialogData={editData}/>
      <DataTable onCheckboxClicked={editDataHandler}/>
      <Footer/>
    </div>
  );
}

export default App;
