// tarot.controller.js

// κάνω import τα σεβισις μου και το μοντέλο μου
const { drawnCards } = require('../services/tarot.service');
const { gpt_prompt } = require('../services/tarot.service')
const { getGPTResponse } = require('../services/gpt.service');
const Query = require('../models/query.models');

exports.getTarotReading = async (req, res) => {

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
    const cards = drawnCards().selectedCards // τραβάει 3 χαρτιά ως λεκτικό // το .selectedCards χρειάζετε γιατι το dranCards επιστρέφει ένα αντικείμενο με το κλειδί selectedCards
    const prompt = gpt_prompt(lang) // καλέι το γενικό Prompt στη σωστή γλώσσα
    const gptResponse = await getGPTResponse(prompt, userQuestion, cards, bias, apiKey) // επικοινωνεί με το api

    // μου αποθηκεύει την ερώτηση
    const query = new Query({
      message: userQuestion,
      bias: bias
    });
    await query.save();

    res.status(200).json({
      drawnCards: cards,
      gptResponse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


