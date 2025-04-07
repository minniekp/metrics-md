import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Table } from 'react-bootstrap';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography  from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { DataType2, DataType1 } from './types';
import { fetchData1, fetchData2 } from '../utils/api';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const IndividualSales: React.FC = () => {
    const [checkedConfirmed, setCheckedConfirmed] = React.useState(true);
    const [checkedConversation, setCheckedConversation] = React.useState(true);
    const [managedCheckedConfirmed, setManagedCheckedConfirmed] = React.useState(true);
    const [managedCheckedConversation, setManagedCheckedConversation] = React.useState(true);
    const [enterpriseId, setEnterpriseId] = React.useState('');
    const [data, setData] = useState<DataType2[]>([]);
    const [fullData, setFullData] = useState<DataType1[]>([]);
    
  useEffect(() => {
    const getData = async () => {
      try {
        // Check if data exists in sessionStorage
        const cachedData = sessionStorage.getItem('fetchData2');
        if (cachedData) {
          // Parse and use the cached data
          const parsedData: DataType2[] = JSON.parse(cachedData);
          setData(parsedData);
          console.log('Using cached data:', parsedData);
        } else {
          // Fetch data from the API if cache is empty
          const result: DataType2[] = await fetchData2(true);
          console.log('Fetched data from API:', result);
  
          // Ensure the result is an array
          if (Array.isArray(result)) {
            setData(result);
  
            // Cache the data in sessionStorage
            sessionStorage.setItem('fetchData2', JSON.stringify(result));
          } else {
            throw new Error('Data is not an array');
          }
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: Error | any) {
        console.error('Error fetching data:', error);
      }
    };
  
    getData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      try {
        const result: DataType1[] = await fetchData1();
        // Ensure the result is an array
        if (Array.isArray(result)) {
          setFullData(result);
        } else {
          throw new Error('Data is not an array');
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: Error | any) {
        console.error('Error fetching data:', error);
      } finally {
      }
    };

    getData();
  }, []);
    const handleConfirmedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedConfirmed(event.target.checked);
      };
    
      const handleConversationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedConversation(event.target.checked);
      };

      const handleManagedConfirmedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setManagedCheckedConfirmed(event.target.checked);
      };
    
      const handleManagedConversationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setManagedCheckedConversation(event.target.checked);
      };

      const handleEnterpriseIdChange = (event: SelectChangeEvent<string>) => {
        setEnterpriseId(event.target.value as string);
      }

      const enterpriseIdList = data.length > 0 ? data.filter((item) => item['Conversation_Owner Name'] === "peter.halper") : [];
      const enterpriseData = fullData.length > 0 ? fullData.filter((item) => item['Enterprise ID Name'] === enterpriseId) : [];
      console.log('enterprisedata', enterpriseData);
    return (
        <>
        
        <div className='enterprise'>
            <p><strong>Sales Metrics and Targets - FY25:</strong></p>          
          </div>
          <Card variant="outlined" className='sales-card' style={{ position: 'relative' }}>
          <div className="top-right-buttons">
  <button className="btn btn-primary" style={{ marginRight: '10px' }}>Submit</button>
  <button className="btn btn-primary" style={{ marginRight: '10px'}}>Save Progress</button>
  <button className="btn btn-primary" style={{ marginRight: '10px'}}>Reset</button>
</div>
          <CardContent>
            <div className="enterprise-container">
          <Box sx={{ display: 'flex', alignItems: 'left', marginBottom: '20px' }}>
          <FormControl variant="outlined" sx={{ minWidth: 150}}>
                <InputLabel  id="enterprise-id-label">Enterprise ID Name</InputLabel>
                <Select
                  labelId="enterprise-id-label"
                  id="enterprise-id"
                  value={enterpriseId}
                  onChange={handleEnterpriseIdChange}
                  label="Enterprise ID Name"
                  sx={{
                    height: 50, // Set the height of the dropdown
                  }}
                >
                 {enterpriseIdList.map((option) => (
                    <MenuItem key={option['Enterprise ID Code']} value={option['Enterprise ID Name']}>
                      {option['Enterprise ID Name']}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            </div>
        <div className="sales-metrics">
      <Accordion className="mt-1 pt-1">    
              <AccordionSummary expandIcon={<ExpandMoreIcon />} className='accordion-summary-center'>
                <span className='accordion-summary'>Individual Sales</span>
              </AccordionSummary>
              <AccordionDetails>
              <Box sx={{ minWidth: 10, width: '70%', marginLeft: 'auto' }}>
             
                
                <div className="card-table-container">
                <Card variant="outlined" className="new-card">
  <CardContent>
    <Typography variant="h6" gutterBottom sx={{ fontSize: '12.5px' }}>
    Business Architecture Executive
    </Typography>
    </CardContent>
    </Card>
    <div className="table-container">
              <Table className="sales-styled-table" striped bordered hover size="sm">
          <thead>
            <tr>
              <th className="shaded-size-th">FFY Individual Sales Target Min</th>
              <th className="shaded-size-th">FFY Individual Sales Target Max</th>
              <th className="shaded-size-th">FFY Individual Sales Target Recommendation</th>
              <th className="shaded-size-th">FFY Individual Sales Target</th>
            </tr>
          </thead>
          <tbody>
           <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
           </tr>
          </tbody>
        </Table>
     
        

        <Table className="sales-styled-table" striped bordered hover size="sm">
          <thead>
            <tr>
              <th className="shaded-size-th">Craft Target Guideline %</th>
              <th className="shaded-size-th">Craft Target Guideline $</th>
              <th className="shaded-size-th">Craft Target</th>
              <th className="shaded-size-th">Craft Target % of Ind. Sales Target</th>
            </tr>
          </thead>
          <tbody>
           <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
           </tr>
          </tbody>
        </Table>
       
        </div>
        </div>
        <Box sx={{ display: 'flex', alignItems: 'left', marginTop: '20px', marginLeft: '-215px' }}>  
        <FormGroup>
            <FormControlLabel
              label={<Typography sx={{ fontWeight: 'bold', fontSize: '12.5px' }}>Individual Targets Confirmed</Typography>}
              labelPlacement="start"
              control={<Checkbox {...label} checked={checkedConfirmed} onChange={handleConfirmedChange} />}
            />
            <FormControlLabel
               label={<Typography sx={{ fontWeight: 'bold', fontSize: '12.5px' }}>Individual Targets Conversation Complete</Typography>}
              labelPlacement="start"
              control={<Checkbox {...label} checked={checkedConversation} onChange={handleConversationChange} />}
            />
            <div className="sales-label">
            <span ><strong>Last Updated:</strong></span>
            </div>
          </FormGroup>
          <Box sx={{ display: 'flex', alignItems: 'top' }}>
                    <span style={{ marginRight: '9px', marginLeft: '78px', fontSize: '12.5px' }}>Rationale:</span>
                    <TextField size="medium" id="outlined-basic"  variant="outlined" sx={{ width: '400px', height: '200%' }} />
          </Box>
          </Box>
           </Box>
          </AccordionDetails>
          </Accordion>
          <Accordion className="mt-1 pt-1">
        <AccordionSummary expandIcon={<ExpandMoreIcon />} className='accordion-summary-center'>
          <span className='accordion-summary'>Managed Sales</span>
        </AccordionSummary>
        <AccordionDetails>
        <Box sx={{ minWidth: 10, width: '70%', marginLeft: 'auto' }}>
             
          <div className="managed-sales-table-container">
            <div className="managed-sales-card">
          <Card variant="outlined" className="new-ms-card">
  <CardContent>
    <Typography variant="h6" gutterBottom sx={{ fontSize: '12.5px' }}>
     Client Account Service Lead
    </Typography>
    </CardContent>
    </Card>
    <Card variant="outlined" className="new-ms-card">
  <CardContent>
    <Typography variant="h6" gutterBottom sx={{ fontSize: '12.5px' }}>
    Client Account Service Lead
    </Typography>
    </CardContent>
    </Card>
    </div>
            <Table className="sales-styled-table" striped bordered hover size="sm">
            <tbody>
                <tr>
                  <th className="shaded-th">Sales Plan</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Sales Plan'] : 0}</td>
                  <th className="shaded-th">Del CCI $ Plan</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Del CCI $ Plan'] : 0}</td>
                </tr>
                <tr>
                  <th className="shaded-th">Sales Plan/Target</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Sales Plan/Target'] : 0}</td>
                  <th className="shaded-th">Del CCI $ Plan/Target</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Del CCI $ Plan/Target'] : 0}</td>
                </tr>
                <tr className="spaced-row"></tr>
                <tr>
                  <th className="shaded-th">Revenue Plan</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Revenue Plan'] : 0}</td>
                  <th className="shaded-th">Del CCI % Plan</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Del CCI % Plan'] : 0}</td>
                </tr>
                <tr>
                  <th className="shaded-th">Revenue Plan/Target</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Revenue Plan/Target'] : 0}</td>
                  <th className="shaded-th">Del CCI % Plan/Target</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Del CCI % Plan/Target'] : 0}</td>
                </tr>
                <tr className="spaced-row"></tr>
                <tr>
                  <th className="shaded-th">Sales Plan</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Sales Plan'] : 0}</td>
                  <th className="shaded-th">Del CCI $ Plan</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Del CCI $ Plan'] : 0}</td>
                </tr>
                <tr>
                  <th className="shaded-th">Sales Plan/Target</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Sales Plan/Target'] : 0}</td>
                  <th className="shaded-th">Del CCI $ Plan/Target</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Del CCI $ Plan/Target'] : 0}</td>
                </tr>
                <tr className="spaced-row"></tr>
                <tr>
                  <th className="shaded-th">Revenue Plan</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Revenue Plan'] : 0}</td>
                  <th className="shaded-th">Del CCI % Plan</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Del CCI % Plan'] : 0}</td>
                </tr>
                <tr>
                  <th className="shaded-th">Revenue Plan/Target</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Revenue Plan/Target'] : 0}</td>
                  <th className="shaded-th">Del CCI % Plan/Target</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Del CCI % Plan/Target'] : 0}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <Box sx={{  marginLeft: '-220px', display: 'flex', alignItems: 'right', marginTop: '20px' }}>  
        <FormGroup>
            <FormControlLabel
               label={<Typography sx={{ fontWeight: 'bold', fontSize: '12.5px' }}>Managed Role Targets Confirmed</Typography>}
              labelPlacement="start"
              control={<Checkbox {...label} checked={managedCheckedConfirmed} onChange={handleManagedConfirmedChange} />}
            />
            <FormControlLabel
                label={<Typography sx={{ fontWeight: 'bold', fontSize: '12.5px' }}>Managed Role Conversation Complete</Typography>}
              labelPlacement="start"
              control={<Checkbox {...label} checked={managedCheckedConversation} onChange={handleManagedConversationChange} />}
            />
             <div className="sales-label">
            <span ><strong>Last Updated:</strong></span>
            </div>
          </FormGroup>
         
          <Box sx={{ display: 'flex', alignItems: 'top' }}>
                    <span style={{ marginRight: '9px', marginLeft: '108px', fontSize: '12.5px' }}>Rationale:</span>
                    <TextField size="medium" id="outlined-basic"  variant="outlined" sx={{ width: '400px', height: '200%' }} />
                  </Box>
       </Box>
       
                    </Box>
        </AccordionDetails>
      </Accordion>
      
      </div>
      

    
      </CardContent>
      </Card>
      
                    </>
              )
}

export default IndividualSales;