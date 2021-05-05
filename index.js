require('dotenv').config();
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const nlu = new NaturalLanguageUnderstandingV1({
  version: '2020-08-01',
  authenticator: new IamAuthenticator({
    apikey: process.env.APIKEY,
  }),
  serviceUrl: process.env.URL,
});

exports.handler = async (event) => {
    try {
        const body = {
            'text': event.historial_clinico,
            'features': {
              'entities': {
                'emotion': true,
                'sentiment': true,
                'limit': 2,
              },
              'keywords': {
                'emotion': true,
                
              },
            },
        };

        const NLUTranslate = await nlu.analyze(body);


        return NLUTranslate.result;
    } catch (err) {
        throw new Error("Error", err);
    }
};