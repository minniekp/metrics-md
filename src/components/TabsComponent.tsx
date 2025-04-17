import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import TableComponent from './TableComponent';
import TableComponent2 from './TableComponent2';
import IndividualSales from './IndividualSales';
// Adjust the import path as necessary

const TabsComponent: React.FC = () => {
  return (
    <div className="mt-4 ml-4">
   
    <Tabs defaultActiveKey="table" id="uncontrolled-tab-example" className="mb-3 custom-tab">
      <Tab eventKey="table1" title="Table1">
        <TableComponent />
      </Tab>
      <Tab eventKey="FY25 Targets" title="FY25 Targets">
      <TableComponent2 />
      </Tab>
      <Tab eventKey="Individual Sales" title="Individual Sales">
      <IndividualSales />
      </Tab>
    </Tabs>
    
    </div>
  );
};

export default TabsComponent;