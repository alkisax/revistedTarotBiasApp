// tarot.controller.js

// κάνω import τα σεβισις μου και το μοντέλο μου
const { drawnCards } = require('../services/tarot.service');
const { gpt_prompt } = require('../services/tarot.service')
const { getGPTResponse } = require('../services/gpt.service');
const queryDAO = require('../daos/query.dao')
const userDAO = require('../daos/user.dao')
const Query = require('../models/query.models');
// const axios = require('axios');
// const queryController = require('../controllers/query.controller')

exports.getTarotReading = async (req, res, next) => {

  const apiKey = process.env.OPENAI_API_KEY

  // παίρνει απο το front γγλώσσ / bias / ερώτηση
  const lang = req.body.lang || req.query.lang
  const bias = req.body.bias || req.query.bias
  let userQuestion = req.body.userQuestion || req.query.userQuestion // δεν θημάμαι αν το front μου το στέλνει ως ulr params ή ως Body. Αλλ έτσι είναι πιο γενικό

  // αν δεν έχει ερώτηση τότε μια γενική ερώτηση
  if (!userQuestion) {
    userQuestion = "What do I need to know today?"
  }

  try {
    console.log('🔵 [tarotReading] Incoming userQuestion:', userQuestion);
    console.log('🔵 [tarotReading] Full req.body:', req.body);
    console.log('🔵 [tarotReading] req.user:', req.user); // <--- check if this is populated

    const cards = drawnCards().selectedCards // τραβάει 3 χαρτιά ως λεκτικό // το .selectedCards χρειάζετε γιατι το dranCards επιστρέφει ένα αντικείμενο με το κλειδί selectedCards
    const prompt = gpt_prompt(lang) // καλέι το γενικό Prompt στη σωστή γλώσσα
    const gptResponse = await getGPTResponse(prompt, userQuestion, cards, bias, apiKey) // επικοινωνεί με το api

    let gptResponseLastParagraph = gptResponse
      .trim()
      .split(/\n{2,}/) // splits by double line breaks (typical paragraph separators)
      .filter(p => p.trim().length > 0) // remove empty paragraphs
      .pop(); // gets the last paragraph

    gptResponseLastParagraph =  `Cards: ${JSON.stringify(cards)}\n\n${gptResponseLastParagraph}`

    // ***ADDED '?' ***
    const userId = req.user?.id // αυτό πρέπει να το προσέξουμε στο front

    // μου αποθηκεύει την ερώτηση (Μόνο αν δεν είναι η προκατασκευασμένη)
    if (userQuestion !== "What do I need to know today?" && userId) {
      // το πρόβλημα με όλα αυτά ήταν οτι έσωσζε κατευθείαν το query χωρίς να καλέσει κάπως τα εντποιντ του query με αποτέλσεμσ να μην σωζετε στον χρήστη
      const savedQuery = await queryDAO.createQuery({
        question: userQuestion, 
        bias: bias,
        response: gptResponseLastParagraph,
        userId: userId
      });
      console.log("query added to queries");
      await userDAO.addQueryToUser(userId, savedQuery._id)
    } 

    res.status(200).json({
      drawnCards: cards,
      gptResponse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


