// tarot.service.js

// αυτό το σέβις έχει την τράπουλα, την κλήρωση, την μετατροπή των τραβηγμένων σε λεκτικά και την επιλογή της γλώσσας του prompt
// θα χρειαστώ και τα δυο getTarotReading και gpt_prompt στον controller για να τα στείλω στο getGPTResponse

const majorArcana = [
  "The Fool",
  "The Magician",
  "The High Priestess",
  "The Empress",
  "The Emperor",
  "The Hierophant",
  "The Lovers",
  "The Chariot",
  "Strength",
  "The Hermit",
  "Wheel of Fortune",
  "Justice",
  "The Hanged Man",
  "Death",
  "Temperance",
  "The Devil",
  "The Tower",
  "The Star",
  "The Moon",
  "The Sun",
  "Judgement",
  "The World"
];
const wands = [
  "Ace of Wands",
  "Two of Wands",
  "Three of Wands",
  "Four of Wands",
  "Five of Wands",
  "Six of Wands",
  "Seven of Wands",
  "Eight of Wands",
  "Nine of Wands",
  "Ten of Wands",
  "Page of Wands",
  "Knight of Wands",
  "Queen of Wands",
  "King of Wands"
];
const cups = [
  "Ace of Cups",
  "Two of Cups",
  "Three of Cups",
  "Four of Cups",
  "Five of Cups",
  "Six of Cups",
  "Seven of Cups",
  "Eight of Cups",
  "Nine of Cups",
  "Ten of Cups",
  "Page of Cups",
  "Knight of Cups",
  "Queen of Cups",
  "King of Cups"
];
const swords = [
  "Ace of Swords",
  "Two of Swords",
  "Three of Swords",
  "Four of Swords",
  "Five of Swords",
  "Six of Swords",
  "Seven of Swords",
  "Eight of Swords",
  "Nine of Swords",
  "Ten of Swords",
  "Page of Swords",
  "Knight of Swords",
  "Queen of Swords",
  "King of Swords"
];
const pentacles = [
  "Ace of Pentacles",
  "Two of Pentacles",
  "Three of Pentacles",
  "Four of Pentacles",
  "Five of Pentacles",
  "Six of Pentacles",
  "Seven of Pentacles",
  "Eight of Pentacles",
  "Nine of Pentacles",
  "Ten of Pentacles",
  "Page of Pentacles",
  "Knight of Pentacles",
  "Queen of Pentacles",
  "King of Pentacles"
];

// κατασκευάζω ένα arr με όλες τις κάρτες ταρώ - ως λεκτικά ονοματα πχ "Ace of Swords", "The Hierophant",
const tarotDeck = [
  ...majorArcana,
  ...cups,
  ...pentacles,
  ...swords,
  ...wands,
];

// τραβάω έναν τυχαίο αριθμό απο το 0-77 (78 κάρτες) 
const random = () => {
  return Math.floor(Math.random() * 78); // 78 to include 77 in the range
};

// καλέι την random για να τραβήξει τρείς διαφορετικές κάρτες (αρηθμιτικά)
const draw = () => {
  const first = random();
  let second = random();
  while (second === first) {
    second = random();
  }

  let third = random();
  while (third === first || third === second) {
    third = random();
  }
  return {
    first: first,
    second: second,
    third: third
  };
};


const drawnCards = () => {
  // καλεί την draw για να διαλέξει 3 νούμερα απο το 0-77
  const drawnCards = draw();

  // χρησιμοποιεί τα νούμερα ως index για να βρεί τις κάρτες απο το [] tarotDeck και τις βάζει σε ένα array
  const selectedCards = [
    tarotDeck[drawnCards.first],
    tarotDeck[drawnCards.second],
    tarotDeck[drawnCards.third]
  ];

  return {
    selectedCards
  };
};

const gpt_prompt = (lang) => {
  if (!lang) {
    lang = 'en' //default to english
  }

  //φτιάχτο το λεκτικό που θα στείλω στο gpt
  const tarot_prompt = lang === 'en' 
    ? "You are a Tarot interpreter. Provide a detailed interpretation of the following Tarot cards in direct response to the question asked."
    : "Είσαι ερμηνευτής Ταρώ. Παρέχετε μια λεπτομερή ερμηνεία των παρακάτω καρτών Ταρώ σε άμεση απάντηση στην ερώτηση που τέθηκε.";

  return tarot_prompt
}

module.exports = { 
  drawnCards,
  gpt_prompt
};
