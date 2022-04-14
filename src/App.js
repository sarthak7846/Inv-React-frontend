import './App.css';
import Header from './components/Header';
import Buttons from './components/Buttons';
import Footer from './components/Footer';
import DataTable from './components/DataTable';
import { useState } from 'react';

function App() {
  const [editData,setEditData] = useState({
    invoiceCurrency: '',
    customerPaymentTerms:'',
    docID: ''
  });

  // const [deleteIDs,setDeleteIDs] = useState([]);

  const editDataHandler = (invc,cuspt,docid, isItemSelected) => {
    // console.log('isItemSelected',isItemSelected);
    setEditData({...editData, invoiceCurrency: invc, customerPaymentTerms:cuspt,docID:docid});
    // let IDPresent=false;
    // deleteIDs.map((id) => {
    //   if(id === docid) {
    //     IDPresent=true;
    //   }
    // });
    // if(!IDPresent && !isItemSelected) {
    //   setDeleteIDs(currentArray => [...currentArray, docid]);
    // }
    // console.log('deleteIDs',deleteIDs);
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
