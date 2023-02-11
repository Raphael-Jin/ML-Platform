import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
 
const Record = (props) => (
 <tr>
   <td>{props.record._id}</td>
   <td>{props.record.API_Key}</td>
   <td>{props.record.Request_Time}</td>
   <td>{props.record.Request_Type}</td>
   <td>{props.record.Request_Status}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Detail</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       Cancel Request
     </button>
   </td>
 </tr>
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://127.0.0.1:5000/requestRecord/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:5000/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Record List</h3>
     <table className="table table-striped" width={"100%"} style={{ marginTop: 20}}>
       <thead>
         <tr>
           <th>id</th>
           <th>API_Key</th>
           <th>Request_Time</th>
           <th>Request_Type</th>
           <th>Request_Status</th>
         </tr>
       </thead>
       <tbody align = "center" >{recordList()}</tbody>
     </table>
   </div>
 );
}