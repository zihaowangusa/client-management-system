import axios from 'axios';
/* Define Action Types */
export const NEW_EMPLOYEE_ENTRY = 'NEW_EMPLOYEE_ENTRY';
export const EMPLOYEE_LIST = 'EMPLOYEE_LIST';
export const UPDATE_EMPLOYEE_ENTRY = 'UPDATE_EMPLOYEE_ENTRY';
export const DELETE_EMPLOYEE_ENTRY = 'DELETE_EMPLOYEE_ENTRY';
export const EMPLOYEE_LIST_BY_ID = 'EMPLOYEE_LIST_BY_ID';

/* Create an employee entry */
export function newEmployeeEntry( fields ){
   const request = axios.post('/employee', fields );
   createAdd(fields,request);
   return {
      type: NEW_EMPLOYEE_ENTRY,
      payload: request
   }
}

/* Retrieve all employees */
export function employeeList(){
   const request = axios.get('/employee').catch(() => { alert('Something went wrong with Server...') });
   return {
      type: EMPLOYEE_LIST,
      payload: request
   }
}

/* Retrieve a single record by  id */
export function employeeListById( id ){
   const request = axios.get('/employee/:id', { params: { id: id } });
   return {
      type: EMPLOYEE_LIST_BY_ID,
      payload: request
   }
}

/* Update employee information */
export function updateEmployeeEntry( fields ){
   const request = axios.put('/employee/:id', fields );
   editAdd( fields );
   return {
      type: UPDATE_EMPLOYEE_ENTRY,
      payload: request
   }
}

/* Delete an employee entry by id */
export function deleteEmployeeEntry( entryId ){

   deleteRemove(entryId);

   const request = axios.delete('/employee/:id', { params : { id: entryId } } );


   return {
      type: DELETE_EMPLOYEE_ENTRY,
      payload: request
   }
}


async function deleteRemove(entryId){

   const entry=await axios.get('/employee/:id', { params: { id: entryId } });

   const managerId=entry.data.manager._id;
   const manager=await axios.get('/employee/:id', { params: { id: managerId } });

   let fields=manager.data;
   fields.id=fields._id;
   delete fields._id;

   let arr=fields.dr;
   arr=arr.filter((item => item !== entryId));
   fields.dr=arr;

   // eslint-disable-next-line
   const update = await axios.put('/employee/:id', fields );

}


async function editAdd(fields){
   let managerId=fields.manager;
   const manager=await axios.get('/employee/:id', { params: { id: managerId } });

   let newFields=manager.data;
   newFields.id=newFields._id;
   delete newFields._id;

   let arr=newFields.dr;
   arr.push(fields.id);
   newFields.dr=arr;

   // eslint-disable-next-line
   const update = await axios.put('/employee/:id', newFields );

}

async function createAdd(fields,request){
   const response=await request;
   const id=response.data._id;

   let managerId=fields.manager;

   const manager=await axios.get('/employee/:id', { params: { id: managerId } });

   let newFields= manager.data;

   newFields.id=newFields._id;
   delete newFields._id;

   let arr=newFields.dr;
   arr.push(id);
   newFields.dr=arr;

   // eslint-disable-next-line
   const update = await axios.put('/employee/:id', newFields );

}

