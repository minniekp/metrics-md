import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import TableComponent from './TableComponent';

const TabsComponent: React.FC = () => {
  return (
    <Tabs defaultActiveKey="table" id="uncontrolled-tab-example" className="mb-3">
      <Tab eventKey="table" title="Table">
        <TableComponent />
      </Tab>
      <Tab eventKey="other" title="Other">
        <div>Content for the other tab</div>
      </Tab>
    </Tabs>
  );
};

export default TabsComponent;