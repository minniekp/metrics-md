import axios from 'axios';
import Papa from 'papaparse';
import { DataType1, DataType2 } from '../components/types';

const API_URL = '/api/v40';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const saveData = async (enterpriseId: string, chgValue: string) => {
  const xmlPayload = `<?xml version='1.0' encoding='UTF-8'?>
<call method="importConfigurableModelData" callerName="me">
  <credentials login="anusha.bramhalingiah@accenture_impl.com" password="Adaptive@123" instanceCode="ACCENTURE_WFP5"/>
  <importDataOptions planOrActuals="Plan" replaceExisting="3" importKey="Enterprise ID" allowParallel="true" moveBPtr="false" useMappings="false"/>
  <version name="POC For Custom UI" isDefault="false" />
  <sheet name="New MD Roster" isUserAssigned="false" />
  <rowData>
      <header>Enterprise ID|CHG</header>
      <rows>
          <row>${enterpriseId}|${chgValue}</row>
      </rows>
  </rowData>
</call>`;
try {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/xml',
    },
    body: xmlPayload,
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const responseData = await response.text();
  console.log('Data saved successfully:', responseData);
  // Call fetchData2 after saveData is complete
  const updatedData = await fetchData2();
  console.log('Updated data:', updatedData);
  return updatedData;
} catch (error) {
  console.error('Error saving data:', error);
}
};


const fetchData1 = async (): Promise<DataType1[]> => {
  const xmlPayload = `<?xml version='1.0' encoding='UTF-8'?>
  <call method="exportConfigurableModelData" callerName="me">
    <credentials login="integrationid@accenturewfp5.com" password="temp@integration123" instanceCode="ACCENTURE_WFP5"/>
    <version name="FY25 MD Targets Setting"/>
    <modeled-sheet name="New MD Managed Actuals_API2" isGetAllRows="true" isGlobal="false" includeAllColumns="false" useNumericIDs="false" displayNameEnabled="true" includeNames="true" includeCodes="false" includeDisplayName="true" useAccountPrecision="true"/>
    <filters>
      <levels>
        <level name="Accenture" includeDescendants="true" code="Accenture"/>
      </levels>
      <columns>
        <model>
          <column>People Key</column>
          <column>Enterprise ID</column>
          <column>EID Code</column>
          <column>Conversation And Target Status</column>
          <column>Target Type</column>
          <column>CCI $ Actuals (Financial Plan Target)</column>
          <column>CCI % Actuals</column>
          <column>CI % Actuals</column>
          <column>CI % Target</column>
          <column>CI Target vs Actual Variance</column>
          <column>Confirmed CCI $ Actuals</column>
          <column>Confirmed Revenue Actuals</column>
          <column>Confirmed Sales Actuals</column>
          <column>Del CCI $ Plan</column>
          <column>Del CCI $ Plan/Target</column>
          <column>Del CCI % Plan</column>
          <column>Del CCI % Plan/Target</column>
          <column>Geographic Scope</column>
          <column>GILC Actuals</column>
          <column>Managed  Won CCI % Target vs Actual Variance</column>
          <column>Managed Actuals As Of</column>
          <column>Managed Role</column>
          <column>Managed Won CCI  % Actual</column>
          <column>Managed Won CCI  % Target</column>
          <column>Master Client</column>
          <column>Practice</column>
          <column>Revenue Actuals (Financial Plan Target)</column>
          <column>Revenue Plan</column>
          <column>Revenue Plan/Target</column>
          <column>Role End Date</column>
          <column>Role Start Date</column>
          <column>Sales Actuals (Financial Plan Target)</column>
          <column>Sales Plan</column>
          <column>Sales Plan/Target</column>
          <column>Service/Group</column>
          <column>Targets Match To Financial Plan?</column>
          <column>FY Flag</column>
          <column>Managed Metric Model Type</column>
          <column>V and A Rating</column>
          <column>Confirmed Revenue Actuals(CC)</column>
          <column>Confirmed Sales Actuals(CC)</column>
          <column>Managed Chargeable FTE% Target</column>
          <column>Managed Chargeable FTE%  Actuals</column>
          <column>Managed Chargeability Target</column>
          <column>Managed Chargeability Actuals</column>
        </model>
      </columns>
    </filters>
  </call>`;

  try {
    const response = await axios.post(API_URL, xmlPayload, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
    console.log('response', response);
    // Assuming the response is in XML format, parse it to JSON
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, 'application/xml');
    const jsonResult = xmlToJson(xmlDoc); // Convert XML to JSON (you need to implement this function)
    console.log('jsonResult', jsonResult);
    const cdataText = extractCdataText1(jsonResult);
    console.log('cdataText', cdataText);

    const parsedData = Papa.parse<DataType1>(cdataText.join('\n'), {
      header: true,
      skipEmptyLines: true,
    }).data;

    // Ensure the result is an array
    return Array.isArray(parsedData) ? parsedData : [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: Error | any) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.log('Error response:', error.response.data);
      console.log('Error status:', error.response.status);
      console.log('Error headers:', error.response.headers);
    } else if (error.request) {
      // Request was made but no response received
      console.log('Error request:', error.request);
    } else {
      // Something else happened while setting up the request
      console.log('Error message:', error.message);
    }
    console.log('Error config:', error.config);
    throw error;
  }
};



const fetchData2 = async (): Promise<DataType2[]> => {
  const xmlPayload = `<?xml version='1.0' encoding='UTF-8'?>
<call method="exportConfigurableModelData"
      callerName="me">
    <credentials login="anusha.bramhalingiah@accenture_impl.com"
                 password="Adaptive@123"
                 instanceCode="ACCENTURE_WFP5"/>
    <version name="POC For Custom UI"/>
    <modeled-sheet name="New MD Roster"
                   isGetAllRows="true"
                   isGlobal="false"
                   includeAllColumns="false"
                   useNumericIDs="false"
                   displayNameEnabled="true"
                   includeNames="true"
                   includeCodes="true"
                   includeDisplayName="true"
                   useAccountPrecision="true"/>
    <filters>
        <levels>
            <level name="Accenture"
                   includeDescendants="true"
                   code="Accenture"/>
        </levels>
        <columns>
            <model>
                <column>Enterprise ID</column>
                <column>CHG Guideline by Job</column>
                <column>CHG Entity Target</column>
                <column>CHG</column>
                <column>MD&amp;I</column>
                <column>BD</column>
                <column>M&amp;O</column>
                <column>PD&amp;R</column>
                <column>CHG Actual</column>
                <column>CHG Target</column>
            </model>
        </columns>
    </filters>
</call>
`;

  try {
    const response = await axios.post(API_URL, xmlPayload, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
    console.log('response', response);
    // Assuming the response is in XML format, parse it to JSON
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, 'application/xml');
    const jsonResult = xmlToJson(xmlDoc); // Convert XML to JSON (you need to implement this function)
    console.log('jsonResult', jsonResult);

    // Extract the #cdata-section text
    const cdataText = extractCdataText2(jsonResult);
    console.log('cdataText', cdataText);

    // Parse the CSV data
    const parsedData = Papa.parse<DataType2>(cdataText.join('\n'), {
      header: true,
      skipEmptyLines: true,
    }).data;

    // Ensure the result is an array
    return Array.isArray(parsedData) ? parsedData : [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: Error | any) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.log('Error response:', error.response.data);
      console.log('Error status:', error.response.status);
      console.log('Error headers:', error.response.headers);
    } else if (error.request) {
      // Request was made but no response received
      console.log('Error request:', error.request);
    } else {
      // Something else happened while setting up the request
      console.log('Error message:', error.message);
    }
    console.log('Error config:', error.config);
    throw error;
  }
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function xmlToJson(xml: Document): any {
    // Create the return object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj: any = {};
  
    // Handle nodes with children
    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        const item = xml.childNodes.item(i);
        const nodeName = item.nodeName;
  
        // Skip #text nodes and XML declaration
        if (nodeName === "#text" || nodeName === "#declaration") {
          continue;
        }
  
        // Handle attributes
        const attributes = (item as Element).attributes;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const childObj: any = {};
        
        if (attributes && attributes.length > 0) {
          for (let j = 0; j < attributes.length; j++) {
            const attr = attributes.item(j);
            if (attr) {
              childObj[attr.nodeName] = attr.nodeValue;
            }
          }
        }
  
        // Handle child nodes recursively
        if (item.hasChildNodes()) {
          const children = xmlToJson(item as unknown as Document);
          if (Object.keys(children).length) {
            childObj.children = children;
          }
        }
  
        // Handle text content
        if (item.textContent && item.textContent.trim()) {
          childObj.text = item.textContent.trim();
        }
  
        // Handle multiple elements with same name by converting to array
        if (obj[nodeName]) {
          if (!Array.isArray(obj[nodeName])) {
            obj[nodeName] = [obj[nodeName]];
          }
          obj[nodeName].push(childObj);
        } else {
          obj[nodeName] = childObj;
        }
      }
    }
  
    return obj;
  }

  // Function to extract #cdata-section text
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractCdataText1(jsonResult: any): DataType1[] {
  const cdataText: DataType1[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const traverse = (obj: any) => {
    for (const key in obj) {
      if (key === '#cdata-section') {
        cdataText.push(obj[key].text);
      } else if (typeof obj[key] === 'object') {
        traverse(obj[key]);
      }
    }
  };
  traverse(jsonResult);
  return cdataText;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractCdataText2(jsonResult: any): DataType2[] {
  const cdataText: DataType2[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const traverse = (obj: any) => {
    for (const key in obj) {
      if (key === '#cdata-section') {
        cdataText.push(obj[key].text);
      } else if (typeof obj[key] === 'object') {
        traverse(obj[key]);
      }
    }
  };
  traverse(jsonResult);
  return cdataText;
}  

export { fetchData1, fetchData2 };