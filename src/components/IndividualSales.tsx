/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { debounce2, saveCraftData } from '../utils/api';
import Typography  from '@mui/material/Typography';
import { useState, useEffect, useCallback } from 'react';
import { DataType2, DataType1 } from './types';
import { fetchData1, fetchData2, fetchData3 } from '../utils/api';
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const IndividualSales: React.FC = () => {
    const [checkedConfirmed, setCheckedConfirmed] = React.useState(true);
    const [checkedConversation, setCheckedConversation] = React.useState(true);
    const [managedCheckedConfirmed, setManagedCheckedConfirmed] = React.useState(true);
    const [managedCheckedConversation, setManagedCheckedConversation] = React.useState(true);
    const [enterpriseId, setEnterpriseId] = React.useState('');
    const [data, setData] = useState<DataType2[]>([]);
    const [fullData, setFullData] = useState<DataType1[]>([]);
    const [fullManagedData, setFullManagedData] = useState<DataType1[]>([]);
    const [isCraftEditable, setIsCraftEditable] = useState(false); // State to toggle edit mode
    const [isTargetEditable, setIsTargetEditable] = useState(false);
    const [targetInputValue, setTargetInputValue] = useState(''); // State to store input value
    const [enterpriseIdList, setEnterpriseIdList] = useState<DataType2[]>([]);
    const [, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<string | null>(null); // State to store the last updated timestamp
    const [previousCraftValue, setPreviousCraftValue] = useState<string | null>(null); // State to store the previous value
    const [editedCraftValue, setEditedCraftValue] = useState<string | null>(null); // State to store the edited value
 
    const handleCraftEditClick = (item: DataType1) => {
      setIsCraftEditable(true); // Enable editing
      setPreviousCraftValue(item['Craft Sales Target $'] ?? 'Not available'); // Store the current value as the previous value
    };

    const handleTargetEditClick = () => {
      setIsTargetEditable(true); // Enable editing
    };

    const handleTargetBlur = async () => {
      setIsTargetEditable(true);
    }



    const handleTargetInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTargetInputValue(event.target.value); // Update input value
    };

    const debouncedSaveCraftData = useCallback(
      debounce2(
        async (
          enterpriseId: string,
          originalCraftTarget: string,
          newCraftTarget: string
        ) => {
          setLoading(true);
          try {
            // Call saveCraftData with the required parameters
            const updatedData = await saveCraftData(
              enterpriseId,
              originalCraftTarget,
              newCraftTarget
            );
    
            if (updatedData) {
              setFullData(updatedData); // Update the state with the new data
                 
            } else {
              throw new Error('Updated data is undefined');
            }
    
            // Show success toast notification
            toast.success('Craft data saved successfully!', {
              style: {
                backgroundColor: '#98e4d9',
                color: '#000000',
              },
            });
          } catch (error: Error | any) {
            // Show error toast notification
            toast.error('Error saving craft data.', {
              style: {
                backgroundColor: '#98e4d9',
                color: '#000000',
              },
            });
            console.error('Error saving craft data:', error);
          } finally {
            setLoading(false); // Stop the loading spinner
          }
        },
        1000 // Debounce delay in milliseconds
      ),
      [data] // Dependencies for useCallback
    );

const handleCraftInputChange = (index: number, field: keyof DataType1, value: string) => {
  const newData = [...fullData];

  console.log('Previous Craft Value:', previousCraftValue);
console.log('Edited Craft Value:', editedCraftValue);

  newData[index][field] = value; // Update the specific field in the array
  setFullData(newData); // Update the `fullData` state with the modified array
  setEditedCraftValue(value); // Update the edited value state
  console.log('Updated state:', newData); // Log the updated state
  const currentTimestamp = new Date().toLocaleString();
  setLastUpdated(currentTimestamp);

  debouncedSaveCraftData(
    newData[index]['Enterprise ID Name'],
    previousCraftValue ?? '',
    value
     // New craft target
  );
};

    const getData = async () => {
      try {
        setLoading(true);  
         
          // Fetch data from the API
          const result: DataType2[] = await fetchData2(false);
          console.log('Fetched data from API:', result);
  
          // Ensure the result is an array
          if (Array.isArray(result)) {
            setData(result);

      } else {
        throw new Error('Data is not an array');
      }
      } catch (error: Error | any) {
      console.error('Error fetching data:', error);
      setError(error);
      } finally {
      setLoading(false);
      }
      };

const getCommentsData = async () => {
  try {
    setLoading(true);  
     
    if (fullData.length === 0) {
      const fetchData = async () => {
        const result = await fetchData3();
        setFullData(result);
      };
  
      fetchData();

    } else {
    throw new Error('Data is not an array');
    }
    } catch (error: Error | any) {
    console.error('Error fetching data:', error);
    setError(error);
    } finally {
    setLoading(false);
    }
    };


    useEffect(() => {
      getData(); // Call getData with the initial comments
    }, []);

    useEffect(() => {
      getCommentsData(); // Call getData with the initial comments
    }, []);   

    useEffect(() => {
      const checkCache = () => {
        const cachedData = sessionStorage.getItem('fetchData2Cache');
        if (cachedData) {
          const parsedData: DataType2[] = JSON.parse(cachedData);
          setData(parsedData);
          console.log('Using cached data in IndividualSales:', parsedData);
        } else {
          console.warn('No cached data found in IndividualSales. Retrying...');
          setTimeout(checkCache, 500); // Retry after 500ms
        }
      };
    
      checkCache();
    }, []);

    useEffect(() => {
      if (data) {
        const filteredList = data.filter((item) => item['Conversation_Owner Name'] === 'peter.halper');
        setEnterpriseIdList(filteredList);
      }
    }, [data]);


     

  useEffect(() => {
    const getData = async () => {
      try {
        // Check if data exists in sessionStorage
        const cachedData = sessionStorage.getItem('fetchData1Cache');
        if (cachedData) {
          // Parse and use the cached data
          const parsedData: DataType1[] = JSON.parse(cachedData);
          setFullManagedData(parsedData);
          console.log('Using cached data:', parsedData);
        } else {
          // Fetch data from the API if cache is empty
          const result: DataType1[] = await fetchData1();
          console.log('Fetched data from API:', result);
  
          // Ensure the result is an array
          if (Array.isArray(result)) {
            setFullManagedData(result);
        // Cache the data in sessionStorage
        sessionStorage.setItem('fetchData1Cache', JSON.stringify(result));
        sessionStorage.setItem('fetchData1CacheTimestamp', Date.now().toString());
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

    const handleConfirmedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedConfirmed(event.target.checked);
      };
    
      const handleConversationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedConversation(event.target.checked);
      };

      const handleManagedConfirmedChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (event) => {
        setManagedCheckedConfirmed(event.target.checked);
      };
    
      const handleManagedConversationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setManagedCheckedConversation(event.target.checked);
      };

      const handleEnterpriseIdChange = (event: SelectChangeEvent<string>) => {
        setEnterpriseId(event.target.value as string);
      }

    
      const enterpriseData = fullManagedData.length > 0 ? fullManagedData.filter((item) => item['Enterprise ID Name'] === enterpriseId) : [];
      console.log('enterprisedata', enterpriseData);
    return (
        <>
        <ToastContainer />
        {loading && <div className="spinner"></div>}
        <div className='enterprise'>
            <p><strong>Sales Metrics and Targets - FY25:</strong></p>          
          </div>
          <div className="enterprise-container">
          <Box sx={{ display: 'flex', alignItems: 'left', marginBottom: '10px' }}>
          <FormControl variant="outlined" sx={{ minWidth: 200, minHeight: 50 }}>
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
            <div className="top-right-buttons">
  <button className="btn btn-primary" style={{ marginRight: '10px' }}>Submit</button>
  <button className="btn btn-primary" style={{ marginRight: '10px'}}>Save Progress</button>
  <button className="btn btn-primary" style={{ marginRight: '10px'}}>Reset</button>
</div>
          <Card variant="outlined" className='sales-card' style={{ position: 'relative' }}>
          
          <CardContent>
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
              <th className="shaded-size-th">Individual Sales Target Min</th>
              <th className="shaded-size-th">Individual Sales Target Max</th>
              <th className="shaded-size-th">Individual Sales Target Recommendation</th>
              <th className="shaded-size-th">Individual Sales Target</th>
            </tr>
          </thead>
          <tbody>
           <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td
      className="shaded-size-th"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <input
        type="text"
        value={targetInputValue}
        onChange={handleTargetInputChange}
        placeholder="Enter Craft Target %"
        className="craft-target-input"
        style={{
          width: '80%',
          border: isTargetEditable ? '1px solid #ccc' : 'none',
          outline: 'none',
          textAlign: 'center',
          backgroundColor: isTargetEditable ? 'white' : '#D3D3D3',
        }}
        disabled={!isTargetEditable} // Disable input when not in edit mode
        onBlur={handleTargetBlur} // Disable editing when input loses focus
      />
  <EditIcon
        style={{
          marginTop: '10px',
          marginLeft: '8px',
          cursor: 'pointer',
          color: '#007bff',
        }}
        onClick={handleTargetEditClick} // Enable editing on click
      /></td>
           </tr>
          </tbody>
        </Table>   
        {fullData.slice(0, 1).map((item, index) => (
          <div key={index}>
            <>
        <Table className="sales-styled-table" striped bordered hover size="sm">
          <thead>
            <tr>
              <th className="shaded-size-th">Craft Sales Target Guideline %</th>
              <th className="shaded-size-th">Craft Sales Target % of Ind. Sales Target</th>
              <th className="shaded-size-th">Craft Sales Target Guideline $</th>
              <th className="shaded-size-th">Craft Sales Target $</th>
            </tr>
          </thead>
          <tbody>        
      <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td
      className="shaded-size-th"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      
      <input
        type="text"
        value={editedCraftValue ? editedCraftValue ?? '' : item['Craft Sales Target $'] ?? ''} // Always use craftInputValue as the source of truth
        placeholder="Enter Craft Target %"
        onChange={(e) => handleCraftInputChange(index, 'Craft Sales Target $', e.target.value)}
        className="craft-target-input"
        style={{
          width: '80%',
          border: isCraftEditable ? '1px solid #ccc' : 'none',
          outline: 'none',
          textAlign: 'center',
          backgroundColor: isCraftEditable ? 'white' : '#D3D3D3',
        }}
        disabled={!isCraftEditable} // Disable input when not in edit mode

      />
      <EditIcon
        style={{
          marginTop: '10px',
          marginLeft: '8px',
          cursor: 'pointer',
          color: '#007bff',
        }}
        onClick={() => handleCraftEditClick(item)}
      />
    </td>
        </tr>           
          </tbody>
        </Table>
                <Table className="sales-styled-table" striped bordered hover size="sm">
          <thead>
            <tr>
              <th className="shaded-size-th">Original Craft Sales Target $</th>
              <th className="shaded-size-th">New Craft Sales Target $</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td>{previousCraftValue ?? 'Not available'}</td>
            <td>{editedCraftValue ?? 'Not edited yet'}</td> 
              
              
            </tr>
          </tbody>
        </Table>
</>
</div>
 ))}
      
            <div className="last-updated-section" style={{ marginTop: '20px', fontWeight: 'bold' }}>
        <span>Last Updated: {lastUpdated ? lastUpdated : 'Not updated yet'}</span>
      </div>
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
                  <th className="shaded-th" style={{ paddingLeft: '20px' }}>Del CCI $ Plan</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Del CCI $ Plan'] : 0}</td>
                </tr>
                <tr>
                  <th className="shaded-th">Sales Plan/Target</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Sales Plan/Target'] : 0}</td>
                  <th className="shaded-th"  style={{ paddingLeft: '20px' }}>Del CCI $ Plan/Target</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Del CCI $ Plan/Target'] : 0}</td>
                </tr>
                <tr className="spaced-row"></tr>
                <tr>
                  <th className="shaded-th">Revenue Plan</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Revenue Plan'] : 0}</td>
                  <th className="shaded-th" style={{ paddingLeft: '20px' }}>Del CCI % Plan</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Del CCI % Plan'] : 0}</td>
                </tr>
                <tr>
                  <th className="shaded-th">Revenue Plan/Target</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Revenue Plan/Target'] : 0}</td>
                  <th className="shaded-th" style={{ paddingLeft: '20px' }}>Del CCI % Plan/Target</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Del CCI % Plan/Target'] : 0}</td>
                </tr>
                <tr className="spaced-row"></tr>
                <tr>
                  <th className="shaded-th">Sales Plan</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Sales Plan'] : 0}</td>
                  <th className="shaded-th" style={{ paddingLeft: '20px' }}>Del CCI $ Plan</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Del CCI $ Plan'] : 0}</td>
                </tr>
                <tr>
                  <th className="shaded-th">Sales Plan/Target</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Sales Plan/Target'] : 0}</td>
                  <th className="shaded-th" style={{ paddingLeft: '20px' }}>Del CCI $ Plan/Target</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Del CCI $ Plan/Target'] : 0}</td>
                </tr>
                <tr className="spaced-row"></tr>
                <tr>
                  <th className="shaded-th">Revenue Plan</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Revenue Plan'] : 0}</td>
                  <th className="shaded-th" style={{ paddingLeft: '20px' }}>Del CCI % Plan</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Del CCI % Plan'] : 0}</td>
                </tr>
                <tr>
                  <th className="shaded-th">Revenue Plan/Target</th>
                  <td className="spaced-td">{enterpriseData[0] ? enterpriseData[0]['Revenue Plan/Target'] : 0}</td>
                  <th className="shaded-th" style={{ paddingLeft: '20px' }}>Del CCI % Plan/Target</th>
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