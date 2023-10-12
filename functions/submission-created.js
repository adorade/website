exports.handler = async (event, context) => {
  try {
    console.log('Submission created!');

    // Only allow POST
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    // When the method is POST
    let params = {
      data: JSON.parse(event.body).payload.data,
      site_url: JSON.parse(event.body).payload.site_url,
      form_name: JSON.parse(event.body).payload.form_name
    };

    console.log(`Recieved a submission: ${JSON.stringify(params)}`);

    return {
      statusCode: 200,
      body: JSON.stringify(params)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.toString()
    };
  }
};
