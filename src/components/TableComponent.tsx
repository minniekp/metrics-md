import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import fetchData from '../utils/api';
import { DataType } from './types';

const TableComponent: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result: DataType[] = await fetchData();
        console.log('result',result)
        // Ensure the result is an array
        if (Array.isArray(result)) {
            setData(result);
          } else {
            throw new Error('Data is not an array');
          }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: Error | any) {
        console.error('Error fetching data:', error);
        setError(error);
      }
    };

    getData();
 
  }, []);

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }
 
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>People Key</th>
          <th>Enterprise ID Name</th>
          <th>EID Code</th>
          <th>Conversation And Target Status</th>
          <th>Target Type</th>
          <th>CCI $ Actuals</th>
          <th>CCI % Actuals</th>
          <th>CI % Actuals</th>
          <th>CI % Target</th>
          <th>CI Target vs Actual Variance</th>
          <th>Confirmed CCI $ Actuals</th>
          <th>Confirmed Revenue Actuals</th>
          <th>Confirmed Sales Actuals</th>
          <th>Del CCI $ Plan</th>
          <th>Del CCI $ Plan/Target</th>
          <th>Del CCI % Plan</th>
          <th>Del CCI % Plan/Target</th>
          <th>Geographic Scope</th>
          <th>GILC Actuals</th>
          <th>Managed Won CCI % Target vs Actual Variance</th>
          <th>Managed Actuals As Of</th>
          <th>Managed Role</th>
          <th>Managed Won CCI % Actual</th>
          <th>Managed Won CCI % Target</th>
          <th>Master Client</th>
          <th>Practice</th>
          <th>Revenue Actuals</th>
          <th>Revenue Plan</th>
          <th>Revenue Plan/Target</th>
          <th>Role End Date</th>
          <th>Role Start Date</th>
          <th>Sales Actuals</th>
          <th>Sales Plan</th>
          <th>Sales Plan/Target</th>
          <th>Service/Group</th>
          <th>Targets Match To Financial Plan?</th>
          <th>FY Flag</th>
          <th>Managed Metric Model Type</th>
          <th>V and A Rating</th>
          <th>Confirmed Revenue Actuals(CC)</th>
          <th>Confirmed Sales Actuals(CC)</th>
          <th>Managed Chargeable FTE% Target</th>
          <th>Managed Chargeable FTE% Actuals</th>
          <th>Managed Chargeability Target</th>
          <th>Managed Chargeability Actuals</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item['People Key']}</td>
            <td>{item['Enterprise ID Name']}</td>
            <td>{item['EID Code']}</td>
            <td>{item['Conversation And Target Status']}</td>
            <td>{item['Target Type']}</td>
            <td>{item['CCI $ Actuals']}</td>
            <td>{item['CCI % Actuals']}</td>
            <td>{item['CI % Actuals']}</td>
            <td>{item['CI % Target']}</td>
            <td>{item['CI Target vs Actual Variance']}</td>
            <td>{item['Confirmed CCI $ Actuals']}</td>
            <td>{item['Confirmed Revenue Actuals']}</td>
            <td>{item['Confirmed Sales Actuals']}</td>
            <td>{item['Del CCI $ Plan']}</td>
            <td>{item['Del CCI $ Plan/Target']}</td>
            <td>{item['Del CCI % Plan']}</td>
            <td>{item['Del CCI % Plan/Target']}</td>
            <td>{item['Geographic Scope']}</td>
            <td>{item['GILC Actuals']}</td>
            <td>{item['Managed Won CCI % Target vs Actual Variance']}</td>
            <td>{item['Managed Actuals As Of']}</td>
            <td>{item['Managed Role']}</td>
            <td>{item['Managed Won CCI % Actual']}</td>
            <td>{item['Managed Won CCI % Target']}</td>
            <td>{item['Master Client']}</td>
            <td>{item['Practice']}</td>
            <td>{item['Revenue Actuals']}</td>
            <td>{item['Revenue Plan']}</td>
            <td>{item['Revenue Plan/Target']}</td>
            <td>{item['Role End Date']}</td>
            <td>{item['Role Start Date']}</td>
            <td>{item['Sales Actuals']}</td>
            <td>{item['Sales Plan']}</td>
            <td>{item['Sales Plan/Target']}</td>
            <td>{item['Service/Group']}</td>
            <td>{item['Targets Match To Financial Plan?']}</td>
            <td>{item['FY Flag']}</td>
            <td>{item['Managed Metric Model Type']}</td>
            <td>{item['V and A Rating']}</td>
            <td>{item['Confirmed Revenue Actuals(CC)']}</td>
            <td>{item['Confirmed Sales Actuals(CC)']}</td>
            <td>{item['Managed Chargeable FTE% Target']}</td>
            <td>{item['Managed Chargeable FTE% Actuals']}</td>
            <td>{item['Managed Chargeability Target']}</td>
            <td>{item['Managed Chargeability Actuals']}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableComponent;