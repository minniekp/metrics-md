import React, { useState, useEffect, useCallback } from 'react';
import { Table } from 'react-bootstrap';
import { fetchData2 } from '../utils/api'; // Update this import to match your actual fetch function
import { DataType2 } from './types';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { debounce, saveData } from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../app/styles.css'; // Import the CSS file

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#B2BAC2',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#B2BAC2',
    },
  },
});


const TableComponent2: React.FC = () => {
  const [data, setData] = useState<DataType2[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [showFY24, setShowFY24] = useState(false);
  const [loading, setLoading] = useState(false);
  const label = { inputProps: { 'aria-label': 'Show FY24 Actuals and Targets' } };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const result: DataType2[] = await fetchData2();
        console.log('result', result);
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
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleInputChange = (index: number, field: keyof DataType2, value: string) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
    debouncedSaveData(newData[index]['Enterprise ID Code'], value);
  };

  // const debouncedSaveData = useCallback(debounce(async(id, value) => await saveData(id, value), 1000), []);

  const debouncedSaveData = useCallback(debounce(async (enterpriseId: string, chgValue: string) => {
    setLoading(true);
    try {
      const updatedData = await saveData(enterpriseId, chgValue);
      if (updatedData) {
        setData(updatedData);
      } else {
        throw new Error('Updated data is undefined');
      }
      toast.success('Data saved successfully!', {
        style: {
          backgroundColor: '#98e4d9',
          color: '#000000',
        },
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    } catch (error: Error | any)  {
      toast.error('Error saving data.', {
        style: {
          backgroundColor: '#98e4d9',
          color: '#000000',
        },
      });
    } finally {
      setLoading(false);
    }
  }, 1000), []);

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  const enterpriseIdCode = data.length > 0 ? data[0]['Enterprise ID Code'] : '';
  const enterpriseIdName = data.length > 0 ? data[0]['Enterprise ID Name'] : '';

  return (
    <>
    <ToastContainer />
    {loading && <div className="spinner"></div>}
     <div className='enterprise'>
            <p><strong>Enterprise ID Code:</strong> {enterpriseIdCode}</p>
            <p><strong>Enterprise ID Name:</strong> {enterpriseIdName}</p>
          </div>
     <Accordion className="mt-1 pt-1">    
          <AccordionSummary expandIcon={<ExpandMoreIcon />} className='accordion-summary-center'>
            <span className='accordion-summary'> Productivity Targets</span>
          </AccordionSummary>
          <AccordionDetails>
            <span className="mt-0 pt-0">FY 25 Targets</span>
          <Table className="styled-table" striped bordered hover size="sm">
                <thead className="table-header-small">
                  <tr>
                  <th className="table-column-small">CHG Guideline by Job</th>
                  <th className="table-column-small">CHG Entity Target</th>
                  <th className="table-column-chg">CHG</th>
                  <th className="table-column-small">MD and I</th>
                  <th  className="table-column-small">BD</th>          
                  <th  className="table-column-small">PD and R</th>           
                  <th className="table-column-small">M and O</th>
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, 1).map((item, index) => (
                    <tr key={index}>
                       <td className="table-column-input">{item['CHG Guideline by Job']}</td>
                       <td>{item['CHG Entity Target']}</td>
                       <td>
                      <CssTextField
                        id="outlined-size-small"
                        size="small"
                        value={item['CHG']}
                        variant="outlined" 
                        onChange={(e) => handleInputChange(index, 'CHG', e.target.value)}
                        style={{ width: '100%', height: "20px", textAlign: 'center' }} // Align text to center
                        sx={{ width: '50px', height: "25px", '& .MuiInputBase-input': { textAlign: 'center', height: "10px", paddingTop: '8px'} }}
                      />
                      </td>
                      <td>{item['MD&I']}</td>
                      <td>{item['BD']}</td>
                    
                      <td>{item['M&O']}</td>
                      <td>{item['PD&R']}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
          <div className="mt-2 pt-4">

<FormGroup>
  <FormControlLabel control={<Checkbox {...label} onChange={(e) => setShowFY24(e.target.checked)}  sx={{
    color:"#98e4d9",
    '&.Mui-checked': {
      color: "#98e4d9",
    },
  }}/>} label="Show FY24 Actuals and Targets" />
</FormGroup>
      {showFY24 && (
              <div style={{ overflowX: 'auto' }}>
                <Table className="styled-table" striped bordered hover size="sm">
                  <thead className="table-header-small">
                    <tr>
                      <th className="table-column-small">Type</th>
                      <th className="table-column-small">BD</th>
                      <th className="table-column-small">CHG</th>
                      <th className="table-column-small">CHG Entity Target</th>
                      <th className="table-column-small">CHG Guideline by Job</th>
                      <th className="table-column-small">M and O</th>
                      <th className="table-column-small">MD and I</th>
                      <th className="table-column-small">PD and R</th>
                    </tr>
                  </thead> 
                  <tbody>
                    <tr>
                      <td>FY24 Actuals</td>
                      <td>{data[0]?.['BD']}</td>
                      <td>{data[0]?.['CHG Actual']}</td>
                      <td>{data[0]?.['CHG Entity Target']}</td>
                      <td>{data[0]?.['CHG Guideline by Job']}</td>
                      <td>{data[0]?.['M&O']}</td>
                      <td>{data[0]?.['MD&I']}</td>
                      <td>{data[0]?.['PD&R']}</td>
                    </tr>
                    <tr>
                      <td>FY24 Targets</td>
                      <td>{data[1]?.['BD']}</td>
                      <td>{data[1]?.['CHG Target']}</td>
                      <td>{data[1]?.['CHG Entity Target']}</td>
                      <td>{data[1]?.['CHG Guideline by Job']}</td>
                      <td>{data[1]?.['M&O']}</td>
                      <td>{data[1]?.['MD&I']}</td>
                      <td>{data[1]?.['PD&R']}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            )}   
    </div>
          </AccordionDetails>
    </Accordion>
    <Accordion className="mt-1 pt-1">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span className='accordion-summary'> Individual Targets</span>
          </AccordionSummary>
    </Accordion>
   
    </>
  );
};

export default TableComponent2;