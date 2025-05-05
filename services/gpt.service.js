// gpt.service.js
const axios = require('axios');

// αυτο το service παίρνει την ερώτηση του χρήστη, τισ κάρρτες που έχουν τραβηχτεί και το bias και μου επιστρέφει την απάντηση του gpt
// έχει ότι έχει να κάνει με το gpt api

const getGPTResponse = async (gpt_prompt, userQuestion, drawnCards, bias, apiKey) => {

  // φτιάχνω το πλήρες gpt prompt με την ερωτησή μου, τις κάρτες, και το bias
  const fullPrompt = `${gpt_prompt} 
  Question: ${userQuestion} 
  Drawn Cards: ${drawnCards.join(', ')} 
  Bias: ${bias || 'None'}`;

  // αυτό είναι το url του gpt api
  const url = 'https://api.openai.com/v1/chat/completions';

  // κάνω την κλήση μου με μοντέλο 3.5 (θέλει το api key)
  // η όλλη function μου επιστρέφει μεσο του response.data.choices[0].message.content την απάντηση του gpt
  
  try {
    const response = await axios.post(url, {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: fullPrompt }],
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    throw new Error(`Error fetching GPT response: ${error.message}`);
  }
 
  // return axios.post(url, {
  //   model: 'gpt-3.5-turbo',
  //   messages: [{ role: 'user', content: fullPrompt }],
  // }, {
  //   headers: {
  //     'Authorization': `Bearer ${apiKey}`,
  //     'Content-Type': 'application/json',
  //   },
  // })
  //   .then(response => response.data.choices[0].message.content)
  //   .catch(error => {
  //     throw new Error(`Error fetching GPT response: ${error.message}`);
  //   });
};

module.exports = { getGPTResponse };
