import axios from 'axios';

export const getData = async () => {
   let response = await axios.get('http://localhost:8080/DemoApp/HRC_App');
   return response.data;
};

export const addNewInvoice = async (invoiceData) => {
   return (await axios.post('http://localhost:8080/DemoApp/HRC_App',null, {
      params: {
         "BusinessCode": invoiceData.BusinessCode,
         "CustomerNumber": invoiceData.CustomerNumber,
         "CustomerName": invoiceData.CustomerName,
         "BusinessYear": invoiceData.BusinessYear,
         "ClearDate": invoiceData.ClearDate,
         "DocumentID":invoiceData.DocumentID,
         "PostingDate":invoiceData.PostingDate,
         "DueInDate": invoiceData.DueInDate,
         "BaselineDate":invoiceData.BaselineDate,
         "CustomerPaymentTerms":invoiceData.CustomerPaymentTerms,
         "ConvertedUSD":invoiceData.ConvertedUSD,
         headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
         }
      }
   }));
}