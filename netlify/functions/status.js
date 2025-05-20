// Simple Netlify function that returns status information

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      status: "online",
      message: "Auto Detailing Nation API is working",
      timestamp: new Date().toISOString(),
      environment: "production",
      deployment: "netlify"
    }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  };
};