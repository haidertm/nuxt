import { getClient } from '../../utils/axiosClient';

export default defineEventHandler(async (event) => {
  const targetUrl = 'https://m2dev.trepanel.ae/graphql';
  const requestBody = await readRawBody(event);

  const data = {
    method: event.method,
    headers: getHeaders(event),
    body: await readRawBody(event)
  }

  const client = getClient();
  if (client) {
    return client.query(requestBody, {});
  }
  //
  console.log('graphqlClient', getClient);


  // const response = $fetch('https://m2dev.trepanel.ae/graphql', {
  //   'headers': {
  //     'accept': 'application/json',
  //     'accept-language': 'en-US,en;q=0.9',
  //     'content-type': 'application/json',
  //     'priority': 'u=1, i',
  //     'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
  //     'sec-ch-ua-mobile': '?0',
  //     'sec-ch-ua-platform': '"Windows"',
  //     'sec-fetch-dest': 'empty',
  //     'sec-fetch-mode': 'cors',
  //     'sec-fetch-site': 'none',
  //     'cookie': '_ga=GA1.1.102389235.1718951445; FPID=FPID2.2.o2VpsmYM%2FwiOOqa7n3ZZruUZETlDL3K5C8a87V8KmQo%3D.1718951445; __kla_id=eyJjaWQiOiJObVV6T1RWbU1EVXRNVE14TXkwME1EY3dMV0ZqWmpFdE0yTTVNVFk1TkdJNU56YzMiLCIkcmVmZXJyZXIiOnsidHMiOjE3MTg5NjQxNjUsInZhbHVlIjoiIiwiZmlyc3RfcGFnZSI6Imh0dHBzOi8vbTJkZXYudHJlcGFuZWwuYWUvIn0sIiRsYXN0X3JlZmVycmVyIjp7InRzIjoxNzE4OTY0MTY1LCJ2YWx1ZSI6IiIsImZpcnN0X3BhZ2UiOiJodHRwczovL20yZGV2LnRyZXBhbmVsLmFlLyJ9fQ==; STVID=7f21697c-cfeb-de0f-4620-442f3b23af66; _fw_crm_v=0e66b612-94b8-453d-ea06-0d669efb34c4; _gcl_au=1.1.555007268.1720027830; FPAU=1.1.555007268.1720027830; OptanonConsent=isGpcEnabled=0&datestamp=Mon+Jul+15+2024+11%3A17%3A52+GMT%2B0500+(Pakistan+Standard+Time)&version=202406.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&landingPath=NotLandingPage&groups=C0001%3A1&geolocation=PK%3BPB&AwaitingReconsent=false; OptanonAlertBoxClosed=2024-07-15T06:17:52.389Z; _ga_PC5ZE12243=GS1.1.1721712353.15.0.1721712353.0.0.1006687440; _clck=1dvukgu%7C2%7Cfoe%7C0%7C1644; _clsk=am2a2d%7C1723921464034%7C1%7C1%7Cs.clarity.ms%2Fcollect; _ga_17NF0Y3PMF=GS1.1.1723956396.6.0.1723956396.0.0.1398670890; PHPSESSID=n547ek7vke6bt069rol0kdihm8; private_content_version=6708cbd1e8ca8c25ae88f38b17a38e80'
  //   },
  //   'referrerPolicy': 'strict-origin-when-cross-origin',
  //   'body': '{"query":"{\\n      getPromotionalBanners {\\n        id\\n        status\\n        url\\n        start_date\\n        end_date\\n        pm_order\\n        banner_veiw_status\\n        image\\n        webp_image\\n        store_id\\n    }\\n}","variables":{},"operationName":null}',
  //   'method': event.method
  // });

  return {
    ...data
    // response
  }

  // try {
  //   // Forward the request to the Magento GraphQL API
  //   const response = await fetch(targetUrl, {
  //     method: event.method,
  //     // headers: getHeaders(event),
  //     body: await readBody(event)
  //   });
  //
  //   // // Set the response status and headers
  //   // event.response.status = response.status;
  //   // for (const [key, value] of response.headers.entries()) {
  //   //   event.response.setHeader(key, value);
  //   // }
  //
  //   // Return the response body
  //   return await response.text();
  // } catch (error) {
  //   console.error('Error forwarding request:', error);
  //   // event.response.status = 500;
  //   return 'Internal Server Error';
  // }
})
