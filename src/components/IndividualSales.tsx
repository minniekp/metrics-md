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


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const IndividualSales: React.FC = () => {
    const [checkedConfirmed, setCheckedConfirmed] = React.useState(true);
    const [checkedConversation, setCheckedConversation] = React.useState(true);
    const [managedCheckedConfirmed, setManagedCheckedConfirmed] = React.useState(true);
    const [managedCheckedConversation, setManagedCheckedConversation] = React.useState(true);
    const [enterpriseId, setEnterpriseId] = React.useState('');

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
    return (
        <>
        
        <div className='enterprise'>
            <p><strong>Sales Metrics and Targets - FY25:</strong></p>          
          </div>
          <Card variant="outlined" className='sales-card'>
          <CardContent>
          <div className="sales-container">
          <Box sx={{ display: 'flex', alignItems: 'top' }}>
                    <TextField label="Conversation Owner" size="medium" id="outlined-basic"  variant="outlined" sx={{ width: '250px' }} />
          </Box>
            </div>
            <div className="enterprise-container">
          <Box sx={{ display: 'flex', alignItems: 'left', marginBottom: '20px' }}>
          <FormControl variant="outlined" sx={{ minWidth: 250 }}>
                <InputLabel id="enterprise-id-label">Enterprise ID Name</InputLabel>
                <Select
                  labelId="enterprise-id-label"
                  id="enterprise-id"
                  value={enterpriseId}
                  onChange={handleEnterpriseIdChange}
                  label="Enterprise ID Name"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Owner1">Owner 1</MenuItem>
                  <MenuItem value="Owner2">Owner 2</MenuItem>
                  <MenuItem value="Owner3">Owner 3</MenuItem>
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
             
                <div className="table-container">

              <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>FFY Individual Sales Target Min</th>
              <th>FFY Individual Sales Target Max</th>
              <th>FFY Individual Sales Target Recommendation</th>
              <th>FFY Individual Sales Target</th>
            </tr>
          </thead>
          <tbody>
           <tr></tr>
          </tbody>
        </Table>
       
        </div>
        <div className="table-container">

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Craft Target Guideline %</th>
              <th>Craft Target Guideline $</th>
              <th>Craft Target</th>
              <th>Craft Target % of Ind. Sales Target</th>
            </tr>
          </thead>
          <tbody>
            {/* Add rows here */}
          </tbody>
        </Table>
        </div>
        <Box sx={{ display: 'flex', alignItems: 'left', marginTop: '20px', marginLeft: '-300px' }}>  
        <FormGroup>
            <FormControlLabel
              label={<Typography sx={{ fontWeight: 'bold' }}>Individual Targets Confirmed</Typography>}
              labelPlacement="start"
              control={<Checkbox {...label} checked={checkedConfirmed} onChange={handleConfirmedChange} />}
            />
            <FormControlLabel
               label={<Typography sx={{ fontWeight: 'bold' }}>Individual Targets Conversation Complete</Typography>}
              labelPlacement="start"
              control={<Checkbox {...label} checked={checkedConversation} onChange={handleConversationChange} />}
            />
            <div className="sales-label">
            <span ><strong>Last Updated:</strong></span>
            </div>
          </FormGroup>
          <Box sx={{ display: 'flex', alignItems: 'top' }}>
                    <span style={{ marginRight: '9px', marginLeft: '78px' }}>Rationale:</span>
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
            <Table className="sales-styled-table" striped bordered hover size="sm">
              <tbody>
                <tr>
                  <th className="shaded-th">FFY Sales Plan 1</th>
                  <td>Value 1</td>
                  <th className="shaded-th">FFY CCI $ Plan 1</th>
                  <td>Comment 1</td>
                </tr>
                <tr>
                  <th className="shaded-th">FFY Sales Plan/Target 1</th>
                  <td>Value 2</td>
                  <th className="shaded-th">FFY CCI $ Plan/Target 1</th>
                  <td>Comment 2</td>
                </tr>
                <tr className="spaced-row"></tr>
                <tr>
                  <th className="shaded-th">FFY Revenue Plan 1</th>
                  <td>Value 3</td>
                  <th className="shaded-th">FFY CCI % Plan 1</th>
                  <td>Comment 3</td>
                </tr>
                <tr>
                  <th className="shaded-th">FFY Revenue Plan/Target 1</th>
                  <td>Value 4</td>
                  <th className="shaded-th">FFY CCI % Plan/Target 1</th>
                  <td>Comment 4</td>
                </tr>
                <tr className="spaced-row"></tr>
                <tr>
                  <th className="shaded-th">FFY Sales Plan 1</th>
                  <td>Value 3</td>
                  <th className="shaded-th">FFY CCI $ Plan 1</th>
                  <td>Comment 3</td>
                </tr>
                <tr>
                  <th className="shaded-th">FFY Sales Plan 1/Target 1</th>
                  <td>Value 4</td>
                  <th className="shaded-th">FFY CCI $ Plan/Target 1</th>
                  <td>Comment 4</td>
                </tr>
                <tr className="spaced-row"></tr>
                <tr>
                  <th className="shaded-th">FFY Revenue Plan 1</th>
                  <td>Value 3</td>
                  <th className="shaded-th">FFY CCI % Plan 1</th>
                  <td>Comment 3</td>
                </tr>
                <tr>
                  <th className="shaded-th">FFY Revenue Plan/Target 1</th>
                  <td>Value 4</td>
                  <th className="shaded-th">FFY CCI % Plan/Target 1</th>
                  <td>Comment 4</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <Box sx={{  marginLeft: '-300px', display: 'flex', alignItems: 'right', marginTop: '20px' }}>  
        <FormGroup>
            <FormControlLabel
               label={<Typography sx={{ fontWeight: 'bold' }}>Managed Role Targets Confirmed</Typography>}
              labelPlacement="start"
              control={<Checkbox {...label} checked={managedCheckedConfirmed} onChange={handleManagedConfirmedChange} />}
            />
            <FormControlLabel
                label={<Typography sx={{ fontWeight: 'bold' }}>Managed Role Conversation Complete</Typography>}
              labelPlacement="start"
              control={<Checkbox {...label} checked={managedCheckedConversation} onChange={handleManagedConversationChange} />}
            />
             <div className="sales-label">
            <span ><strong>Last Updated:</strong></span>
            </div>
          </FormGroup>
         
          <Box sx={{ display: 'flex', alignItems: 'top' }}>
                    <span style={{ marginRight: '9px', marginLeft: '108px' }}>Rationale:</span>
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