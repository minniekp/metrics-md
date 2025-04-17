
import { DataType1, DataType2 } from '../components/types';

const API_URL = 'http://localhost:3000/api/v40';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce1 = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce2 = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const saveData = async (enterpriseId: string, chgValue: string, salesPlan: DataType1[]) => {
  const xmlPayload = `<?xml version='1.0' encoding='UTF-8'?>
<call method="importConfigurableModelData" callerName="me">
  <credentials login="anusha.bramhalingiah@accenture_impl.com" password="Adaptive@123" instanceCode="ACCENTURE_WFP5"/>
  <importDataOptions planOrActuals="Plan" replaceExisting="3" importKey="Enterprise ID" allowParallel="true" moveBPtr="false" useMappings="false"/>
  <version name="POC For Custom UI" isDefault="false" />
  <sheet name="New MD Roster" isUserAssigned="false" />
  <rowData>
      <header>Enterprise ID|CHG</header>
      <rows>
          <row>${enterpriseId}|${chgValue}|${salesPlan}</row>
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

  console.log('Full response:', response);

  const responseData = await response.text();
  if (responseData) {
    console.log('Data saved successfully from API:', responseData);
  } else {
    console.log('Data saved successfully, but response body is empty');
  }

  
  const updatedData = await fetchData2(false);
  console.log('Updated data:', updatedData);
  return updatedData;
} catch (error) {
  console.error('Error saving data:', error);
}
};

export const saveCraftData = async (
  enterpriseId: string,
  originalCraftTarget: string,
  newCraftTarget: string
) => {
  const lastUpdated = new Date().toLocaleString(); // Get the current timestamp
  const Comments = `Last Updated: ${lastUpdated} | Changes made by: ${enterpriseId} | Craft Target Original: ${originalCraftTarget} | Craft Target New: ${newCraftTarget}`;

  const xmlPayload = `<?xml version='1.0' encoding='UTF-8'?>
<call method="importConfigurableModelData" callerName="me">
  <credentials login="anusha.bramhalingiah@accenture_impl.com" password="Adaptive@123" instanceCode="ACCENTURE_WFP5"/>
  <importDataOptions planOrActuals="Plan" replaceExisting="3" importKey="Enterprise ID" allowParallel="true" moveBPtr="false" useMappings="false"/>
  <version name="POC For Custom UI" isDefault="false" />
  <sheet name="New MD Roster" isUserAssigned="false" />
  <rowData>
      <header>Comments</header>
      <rows>
          <row>${Comments}</row>
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

    console.log('Full response:', response);

    const responseData = await response.text();
    if (responseData) {
      console.log('Data saved successfully from API:', responseData);
    } else {
      console.log('Data saved successfully, but response body is empty');
    }

    const updatedData = await fetchData3();
    console.log('Updated data:', updatedData);
    return updatedData;
  } catch (error) {
    console.error('Error saving data:', error);
  }
};


const fetchData1 = async (useCache = true): Promise<DataType1[]> => {
  const cacheKey = 'fetchData1Cache'; // Key to store/retrieve data in sessionStorage
  const cacheTimestampKey = 'fetchData1CacheTimestamp';
  const cacheExpirationTime = 60 * 60 * 1000; 
  if (useCache) {
    // Check if data exists in sessionStorage
    const cachedData = sessionStorage.getItem(cacheKey);
    const cachedTimestamp = sessionStorage.getItem(cacheTimestampKey);
    if (cachedData && cachedTimestamp) {
      const now = Date.now();
      const cacheAge = now - parseInt(cachedTimestamp, 10);

      if (cacheAge < cacheExpirationTime) {
        console.log('Using cached data');
        return JSON.parse(cachedData); // Return cached data
      } else {
        console.log('Cache expired, fetching new data');
        sessionStorage.removeItem(cacheKey); // Clear expired cache
        sessionStorage.removeItem(cacheTimestampKey);
      }
    }
  }

  const xmlPayload = `<?xml version='1.0' encoding='UTF-8'?>
  <call method="exportConfigurableModelData" callerName="me">
    <credentials login="integrationid@accenturewfp5.com" password="temp@integration123" instanceCode="ACCENTURE_WFP5"/>
    <version name="POC for Custom UI"/>
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

    const responseData = await response.json();
    console.log('fetchData1 response:', responseData);
    // Store only the first 10 records in the cache
        // Filter the data to include only the record where Enterprise ID Name is "jack.azagury"
        const filteredData = responseData.filter((record: DataType1) => record['Enterprise ID Name'] === 'jack.azagury');

        // Store the filtered data in the cache
        sessionStorage.setItem(cacheKey, JSON.stringify(filteredData));
        sessionStorage.setItem(cacheTimestampKey, Date.now().toString());
    return filteredData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};



const fetchData2 = async (useCache = true): Promise<DataType2[]> => {
  const cacheKey = 'fetchData2Cache'; // Key to store/retrieve data in sessionStorage
  const cacheTimestampKey = 'fetchData2CacheTimestamp';
  const cacheExpirationTime = 60 * 60 * 1000; 

  try {
    if (useCache) {
      // Check if data exists in sessionStorage
      const cachedData = sessionStorage.getItem(cacheKey);
      const cachedTimestamp = sessionStorage.getItem(cacheTimestampKey);
      if (cachedData && cachedTimestamp) {
        const now = Date.now();
        const cacheAge = now - parseInt(cachedTimestamp, 10);

        if (cacheAge < cacheExpirationTime) {
          console.log('Using cached data');
          return JSON.parse(cachedData); // Return cached data
        } else {
          console.log('Cache expired, fetching new data');
          sessionStorage.removeItem(cacheKey); // Clear expired cache
          sessionStorage.removeItem(cacheTimestampKey);
        }
      }
    }

     // If no cached data, make the API call
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
                <column>Conversation_Owner</column>
            </model>
        </columns>
    </filters>
</call>`;
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

const responseData = await response.json();

// Cache the response data in sessionStorage
sessionStorage.setItem(cacheKey, JSON.stringify(responseData));
sessionStorage.setItem(cacheTimestampKey, Date.now().toString());
console.log('Fetched data from API and cached it');
return responseData;
} catch (error) {
  console.error('Error fetching data:', error);
  throw error;
}
};

const fetchData3 = async (): Promise<DataType1[]> => {
 
  const xmlPayload = `<?xml version='1.0' encoding='UTF-8'?>
  <call method="exportConfigurableModelData" callerName="me">
    <credentials login="integrationid@accenturewfp5.com" password="temp@integration123" instanceCode="ACCENTURE_WFP5"/>
    <version name="POC for Custom UI"/>
    <modeled-sheet name="New MD Roster" isGetAllRows="true" isGlobal="false" includeAllColumns="false" useNumericIDs="false" displayNameEnabled="true" includeNames="true" includeCodes="false" includeDisplayName="true" useAccountPrecision="true"/>
    <filters>
      <levels>
        <level name="Accenture" includeDescendants="true" code="Accenture"/>
      </levels>
      <columns>
        <model>
          <column>People Key</column>
          <column>Enterprise ID</column>
          <column>EID Code</column>
          <column>Individual Sales</column>
<column>Individual Sales Target Min</column>
<column>Individual Sales Target Max</column>
<column>Individual Sales Target Recommendation</column>
<column>Craft Sales Guideline $</column>
<column>Craft Sales Target $</column>
<column>Craft Sales Target % of Ind. Sales Target</column>
<column>Conversation and Target Status</column>
         
        </model>
      </columns>
    </filters>
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

    const responseData = await response.json();
    console.log('fetchData1 response:', responseData);
    // Store only the first 10 records in the cache
        // Filter the data to include only the record where Enterprise ID Name is "jack.azagury"
        const filteredData = responseData.filter((record: DataType1) => record['Enterprise ID Name'] === 'jack.azagury');

    return filteredData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};



 

export { fetchData1, fetchData2, fetchData3 };