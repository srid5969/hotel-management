import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    // import node-fetch
            const axios = require('axios');
            // set url as constant
            const URL = 'https://stakeholder-mgmt-apim-stg.azure-api.net/stakeholder-mgmt/api/notification/send-escalation-emails';

            axios
            .get(URL)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
            

};

export default httpTrigger;