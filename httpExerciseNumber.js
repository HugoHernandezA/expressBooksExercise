//HTTP EXERCISE - Hugo Abraham Hernandez Almaraz

const http = require('http');

const number = [];
let id = 1;

const server = http.createServer((req, res) => {
  const { url, method } = req;
  //---------------- Endpoints Declaration-----------------------
  // Main path: /myNumber
  // Create number: POST /myNumber
  // Read number: GET /myNumber
  // Update number: PUT /myNumber
  // Get number multiplied: GET /myNumber/:multiplier
  // Delete an number: DELETE /reset


  const [urlNoQueryParams] = url.split('?');
  const [,domain, uriParamNumber] = urlNoQueryParams.split('/')


  res.setHeader('Content-Type', 'application/json');

  if (domain === 'myNumber') {

//---------------- Endpoint GET /myNumber-----------------------

    if (urlNoQueryParams === '/myNumber' && method === 'GET') {
      return res.end(JSON.stringify(number));
    }

//---------------- Endpoint POST /myNumber-----------------------

    if (urlNoQueryParams === '/myNumber' && method === 'POST') {

        const rawBody = [];
  
        req.on('data', (chunk) => {
          rawBody.push(chunk);
        });
  
        req.on('end', () => {
          const buffer = Buffer.concat(rawBody).toString();
          const body = JSON.parse(buffer);
  
          if(typeof body["myNumber"] === "number"){
            const newNumber = {
                id,
                ...body,
                };
                id = 1;
                number.push(newNumber);
                res.statusCode = 201;
                res.end(JSON.stringify(newNumber));
          } else {
            res.statusCode = 400;
            res.end(JSON.stringify({
                message: 'Sorry, but the value of myNumber is not a number.'
                }));
          }

        });
  
        return;
      }

//---------------- Endpoint PUT /myNumber/-------------------------

    if (number.length !== 0) {
        if (method === 'PUT') {
            const rawBody = [];
    
            req.on('data', (chunk) => {
                rawBody.push(chunk);
            });

            req.on('end', () => {
                const buffer = Buffer.concat(rawBody).toString();
                const body = JSON.parse(buffer);
                if(typeof body["myNumber"] === "number"){
                    Object.assign(number[0], body);
                    res.end(JSON.stringify({
                    message: 'Number successfully updated!!!',
                    data: number,
                    }));
                } else {
                    res.statusCode = 400;
                    res.end(JSON.stringify({
                        message: 'Sorry, but the value of myNumber is not a number.'
                        }));
                }

            });
            return;
        }
    } else {

    // Number not found
        res.statusCode = 404;
        return res.end(JSON.stringify({
        message: 'Sorry, but there is no Number to update.'
        }));
        
    }

//---------------- Endpoint GET /myNumber/:multiplier--------------
    const numberRegexp = /^\/myNumber\/\d+$/;
    if (numberRegexp.test(urlNoQueryParams)) {
        const numberMultiply = parseInt(uriParamNumber, 10);
        if (number.length !== 0) {
            if (method === 'GET') {
                const newNumber = {
                    id: 1,
                    number: numberMultiply * number[0]["number"]
                };
                return res.end(JSON.stringify(newNumber));
            }
        } else {
    
        // Number not found
            res.statusCode = 400;
            return res.end(JSON.stringify({
            message: 'Sorry, but there is no currrent value for number.'
            }));
            
        }
    }

  }

//---------------- Endpoint DELETE /reset-----------------------
  if(domain === 'reset'){
    if (number.length !== 0) {
        if (urlNoQueryParams === '/reset' && method === 'DELETE') {
            number.splice(0, 1);
            return res.end(JSON.stringify({
                message: 'Number Succesfully Deleted',
            }));
        }

    } else {
        // Number not found

        res.statusCode = 404;
        return res.end(JSON.stringify({
        message: 'Sorry, but there was no Number found'
        }));
            
    }
  }

  // Resource not found
  res.statusCode = 404;
  res.end(JSON.stringify({
    message: 'Ups!!! Resource not found.',
  }));
});

// Start server
server.listen(9000, '127.0.0.1', null, () => {
  console.log(`I'm listening`);
});