const request = require('supertest');
const mongoose = require('mongoose');
const Query = require('../models/query.models');
require('dotenv').config();
const app = require('../app');

// Mock GPT service
jest.mock('../services/gpt.service', () => ({
  getGPTResponse: jest.fn(),
}));

const { getGPTResponse } = require('../services/gpt.service');

// Prevent saving queries to DB
jest.mock('../models/query.models', () => {
  const actualModel = jest.requireActual('../models/query.models');
  actualModel.prototype.save = jest.fn().mockResolvedValue();
  return actualModel;
});

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_TEST_URI);
});

afterAll(async () => {
  await Query.deleteMany({});
  await mongoose.disconnect();
});

describe("Tarot API", () => {
  it("should return 3 tarot cards and a mocked GPT interpretation without saving to DB", async () => {
    getGPTResponse.mockResolvedValue("This is a mocked GPT interpretation.");

    const res = await request(app)
      .post("/api/tarot/tarot-reading")
      .send({
        userQuestion: "What should I focus on in my career?",
        bias: "optimistic",
        lang: "en",
      });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.drawnCards)).toBe(true);
    expect(res.body.drawnCards.length).toBe(3);
    expect(res.body.gptResponse).toBe("This is a mocked GPT interpretation.");
  });
});
