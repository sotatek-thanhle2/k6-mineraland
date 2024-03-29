import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 5000 },
    { duration: '5m', target: 10000 },
    { duration: '10m', target: 20000 },
  ],
  thresholds: {
    'http_req_duration': ['p(99)<1500'],
  },
};

const BASE_URL = 'https://play-api.mineraland.io/api/v1/';

const authHeaders = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzMjEsImlhdCI6MTY1NDk1NDAxNCwiZXhwIjoxNjU1NTU0MDE0fQ.HyNL3ZfOPi9FUtvQb3or2PX08LtK_Y5Jt--xW4zXkD8`,
    'Content-Type': 'application/json',
  },
};

export default () => {

  const getDiggers = http.get(BASE_URL + 'digger/user-diggers', authHeaders);
  const getDiggersMap = http.get(BASE_URL + 'map/user-map', authHeaders);

  const actionBegin = JSON.stringify({
    "action": [
      {
        "diggerId": 26656,
        "blockId": "1321165486673571300"
      }
    ]
  })
  
  
  const actionFinish = JSON.stringify({
    "action": [
      {
        "diggerId": 26656,
        "blockId": "1321165486673571300"
      }
    ]
  })

  check(getDiggers, { 'Get Diggers 2xx': (obj) => obj.status >= 200 && obj.status < 300 });
  check(getDiggers, { 'Get Diggers 3xx': (obj) => obj.status >= 300 && obj.status < 400 });
  check(getDiggers, { 'Get Diggers 4xx': (obj) => obj.status >= 400 && obj.status < 500 });
  check(getDiggers, { 'Get Diggers 5xx': (obj) => obj.status >= 500 && obj.status < 600 });

  check(getDiggersMap, { 'Get MAP 2xx': (obj) => obj.status >= 200 && obj.status < 300 });
  check(getDiggersMap, { 'Get MAP 3xx': (obj) => obj.status >= 300 && obj.status < 400 });
  check(getDiggersMap, { 'Get MAP 4xx': (obj) => obj.status >= 400 && obj.status < 500 });
  check(getDiggersMap, { 'Get MAP 5xx': (obj) => obj.status >= 500 && obj.status < 600 });

  const diggerActionBegin = http.post(BASE_URL + 'digger/digger-action-begin', actionBegin, authHeaders);

  check(diggerActionBegin, { 'Action Begin 2xx': (obj) => obj.status >= 200 && obj.status < 300 });
  check(diggerActionBegin, { 'Action Begin 3xx': (obj) => obj.status >= 300 && obj.status < 400 });
  check(diggerActionBegin, { 'Action Begin 4xx': (obj) => obj.status >= 400 && obj.status < 500 });
  check(diggerActionBegin, { 'Action Begin 5xx': (obj) => obj.status >= 500 && obj.status < 600 });
  
  const diggerActionFinish = http.post(BASE_URL + 'digger/digger-action-finish', actionFinish, authHeaders);

  check(diggerActionFinish, { 'Action Finish 2xx': (obj) => obj.status >= 200 && obj.status < 300 });
  check(diggerActionFinish, { 'Action Finish 3xx': (obj) => obj.status >= 300 && obj.status < 400 });
  check(diggerActionFinish, { 'Action Finish 4xx': (obj) => obj.status >= 400 && obj.status < 500 });
  check(diggerActionFinish, { 'Action Finish 5xx': (obj) => obj.status >= 500 && obj.status < 600 });

  sleep(1);
};