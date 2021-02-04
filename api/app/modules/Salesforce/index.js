const SalesForce = require('jsforce');
const {
    CLIENT_ID, REDIRECT_URI, TOKEN, LOGIN_URL, CLIENT_SECRET, EMAIL, PASSWORD
} = process.env;

const conn = new SalesForce.Connection({
    oauth2 : {
        loginUrl : LOGIN_URL,
        clientId : CLIENT_ID,
        clientSecret : CLIENT_SECRET,
        redirectUri : REDIRECT_URI
    },
});

class SalesforceModule {
    async login() {
        const userInfo = await conn.login(EMAIL, `${PASSWORD}${TOKEN}`);
        return userInfo || null;
    }
    async createLeads(body) {
        const inserted = await conn.sobject('Lead')
            .insert({
                "email":  body.email,
                "firstName":  body.firstName,
                "lastName":  body.lastName,
                "phone":  body.phone,
                "company":  body.company,
                "industry":  body.industry,
                "debtAmount__c" : body.debtAmount
            })
        return inserted || null;
    }
    async getLeads(body) {
        const data =  await conn.sobject('Lead')
            .select('*')
            .limit(50);
        return data || null
    }
    async deleteLeads(id) {
        const deleted = await conn.sobject('Lead')
            .select('*')
            .where({id})
            .delete();
        return deleted || null
    }
    async updateLeads(id, body) {
        const updated = await conn.sobject('Lead')
            .select('*')
            .where({id})
            .update(body);

        return updated || null
    }
}

module.exports = SalesforceModule
