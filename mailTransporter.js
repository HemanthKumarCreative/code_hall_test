const Sib = require("sib-api-v3-sdk");
require("dotenv").config();
const client = Sib.ApiClient.instance;

const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SIB_API_KEY;

const tranEmailApi = new Sib.TransactionalEmailsApi();

module.exports = { tranEmailApi };
