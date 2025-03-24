
import { DataType1, DataType2 } from '../components/types';

const API_URL = 'http://localhost:3000/api/v40';

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
    return responseData;
  } catch (error) {
    console.error('Error fetching data:', error);
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
    return responseData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

 

export { fetchData1, fetchData2 };