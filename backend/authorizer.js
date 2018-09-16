exports.handler =  function(event, context, callback) {
  console.log(event)
  const token = event.authorizationToken.replace('Bearer ', '')

  if(token === process.env.TOKEN) {
    callback(null, generatePolicy('user', 'Allow', event.methodArn));
  } else {
    callback("Unauthorized");   // Return a 401 Unauthorized response
  }
};

// Help function to generate an IAM policy
const generatePolicy = function(principalId, effect, resource) {
  let authResponse = {};

  authResponse.principalId = principalId;
  if (effect && resource) {
    let policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];

    let statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }

  // Optional output with custom properties of the String, Number or Boolean type.
  authResponse.context = {
    "stringKey": "stringval",
    "numberKey": 123,
    "booleanKey": true
  };

  return authResponse;
}
