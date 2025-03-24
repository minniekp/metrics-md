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
import TextField from '@mui/material/TextField';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const IndividualSales: React.FC = () => {
    const [checkedConfirmed, setCheckedConfirmed] = React.useState(true);
    const [checkedConversation, setCheckedConversation] = React.useState(true);

    const handleConfirmedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedConfirmed(event.target.checked);
      };
    
      const handleConversationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedConversation(event.target.checked);
      };
    return (
        <>
        
       
      <Accordion className="mt-1 pt-1">    
              <AccordionSummary expandIcon={<ExpandMoreIcon />} className='accordion-summary-center'>
                <span className='accordion-summary'>Individual Sales</span>
              </AccordionSummary>
              <AccordionDetails>
              <Box sx={{ minWidth: 10, width: '75%', marginLeft: 'auto' }}>
              <Card variant="outlined">
              <CardContent>
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
            {/* Add rows here */}
          </tbody>
        </Table>
       
        </div>
        <div className="table-container">

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>FFY Strategy/S&C Target Guideline %</th>
              <th>FFY Strategy/S&C Target Guideline $</th>
              <th>FFY Strategy/S&C Target</th>
              <th>FFY Strategy/S&C Target % of Ind. Sales Target</th>
            </tr>
          </thead>
          <tbody>
            {/* Add rows here */}
          </tbody>
        </Table>
        </div>
        <Box sx={{ display: 'flex', alignItems: 'left', marginTop: '20px' }}>  
        <FormGroup>
            <FormControlLabel
              label="Individual Targets Confirmed"
              labelPlacement="start"
              control={<Checkbox {...label} checked={checkedConfirmed} onChange={handleConfirmedChange} />}
            />
            <FormControlLabel
              label="Individual Targets Conversation Complete"
              labelPlacement="start"
              control={<Checkbox {...label} checked={checkedConversation} onChange={handleConversationChange} />}
            />
          </FormGroup>
          <Box sx={{ display: 'flex', alignItems: 'top', marginLeft: '10px' }}>
                    <span style={{ marginRight: '9px', marginLeft: '210px' }}>Rationale:</span>
                    <TextField size="medium" id="outlined-basic"  variant="outlined" />
                  </Box>
       </Box>
          </CardContent>
                    </Card>
                    </Box>
              </AccordionDetails>
              </Accordion>
                <Accordion className="mt-1 pt-1">    
                <AccordionSummary expandIcon={<ExpandMoreIcon />} className='accordion-summary-center'>
                  <span className='accordion-summary'>Managed Sales</span>
                </AccordionSummary>
                <AccordionDetails>
                    </AccordionDetails>
                    </Accordion>
                    
                    </>
              )
}

export default IndividualSales;