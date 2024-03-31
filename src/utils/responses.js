const { parse } = require("js2xmlparser");

generateXML = (data) => {
    return parse("data", data);
};
  
//200
const statusCode200 = (contentType, message, res, data = {}) =>{

  switch(contentType) {

    case 'application/json':
    case '*/*':
      const responseData = {message: message, data: data};
      return   res.status(200).json(responseData);

    case 'application/xml':
      res.set("Content-Type", "application/xml");
      const XMLResponse =  `
      <response>
      <code>200</code>
      <message>${message}</message>
      <data>
          ${generateXML(data)}
      </data>
      </response>`;

      return res.status(200).send(XMLResponse);

    default:
      throw new Error('Invalid Accept type passed in request');
  }

};

//201
const statusCode201 = (contentType, message, res) =>{

  switch(contentType) {

    case 'application/json':
    case '*/*':
      return   res.status(201).json({message: message});

    case 'application/xml':
      res.set("Content-Type", "application/xml");
      const XMLResponse =  `
      <response>
      <code>201</code>
      <message>${message}</message>
      </response>`;

      return res.status(201).send(XMLResponse);
  
    default:
      throw new Error('Invalid Accept type passed in request');
  }

};

//204
const statusCode204 = (contentType, message, res) =>{

  switch(contentType) {
    case 'application/json':
    case '*/*':
      return   res.status(204).json({message:  message});

    case 'application/xml':
      res.set("Content-Type", "application/xml");
      const XMLResponse =  `
      <response>
      <code>204</code>
      <message>${message}</message>
      </response>`;

      return res.status(204).send(XMLResponse);

    default:
      throw new Error('Invalid Accept type passed in request');
  }

};

//400
const statusCode400 = (contentType, message, res) =>{

  switch(contentType){
    case 'application/json':
    case '*/*':
      return  res.status(400).json({ message: message});

    case 'application/xml':
      res.set("Content-Type", "application/xml");
      const XMLResponse = `
      <response>
      <code>400</code>
      <message>${message}</message>
      </response>`;

      return res.status(400).send(XMLResponse);

    default:
      throw new Error('Invalid Accept type passed in request');
  }
};

//401
const statusCode401 = (contentType, res) =>{

  switch(contentType){

    case 'application/json':
    case '*/*':
      return  res.status(401).json({ message: "Please check authorization request, token is invalid"});

    case 'application/xml':
      res.set("Content-Type", "application/xml");
      const XMLResponse = `
      <response>
      <code>401</code>
      <message>"Please check authorization request, token is invalid"</message>
      </response>`;

      return res.status(401).send(XMLResponse);

    default:
      throw new Error('Invalid Accept type passed in request');
  }

};

//403
const statusCode403 = (contentType, res) =>{

  switch(contentType){

    case 'application/json':
    case '*/*':
      return  res.status(403).json({ message: "Invalid request, there is no token provided!"});

    case 'application/xml':
      res.set("Content-Type", "application/xml");
      const XMLResponse = `
      <response>
      <code>403</code>
      <message>"Invalid request, there is no token provided!"</message>
      </response>`;

      return res.status(403).send(XMLResponse);

    default:
      throw new Error('Invalid Accept type passed in request');
  }

};

//404
const statusCode404 = (contentType, message, res) =>{

  switch(contentType){

    case 'application/json':
    case '*/*':
      return  res.status(404).json({ message: message});

    case 'application/xml':
      res.set("Content-Type", "application/xml");
      const XMLResponse = `
      <response>
      <code>404</code>
      <message>${message}</message>
      </response>`;

      return res.status(404).send(XMLResponse);

    default:
      throw new Error('Invalid Accept type passed in request');
  }

};

//500
const statusCode500 = (contentType, message, res) =>{

  switch(contentType){

    case 'application/json':
    case '*/*':
      return  res.status(500).json({ message: message });

    case 'application/xml':
      res.set("Content-Type", "application/xml");
      const XMLResponse = `
      <response>
      <code>500</code>
      <message>${message}</message>
      </response>`;

      return res.status(500).send(XMLResponse);

    default:
      console.error(`Invalid acceptType: ${contentType}`);
      return res.status(500).json({ message: 'Internal Server Error' });
  }

};

module.exports = { 
    statusCode200,
    statusCode201,
    statusCode204,
    statusCode400,
    statusCode401,
    statusCode403,
    statusCode404,
    statusCode500,
};