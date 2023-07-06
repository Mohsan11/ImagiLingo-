const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const fetch = require("cross-fetch");

// Rest of your code...

const { API_KEY } = process.env;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// async function generateResponse(message) {
//   const response = await openai.Completion.create({
//     engine: "text-davinci-002",
//     prompt: message,
//     temperature: 0.5,
//   });
//   return response.choices[0].text;
// }

const openai = new OpenAIApi(configuration);
const textGeneration = async (req, res) => {
  try {
    const { text, cmd } = req.body;
    const openai = new OpenAIApi(configuration);
    const response = await openai.createEdit({
      model: "text-davinci-edit-001",
      input: text,
      instruction: cmd,
    });
    const data = response.data;
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send("Error: ", error);
  }
};

const generateImage = async (req, res) => {
  const { prompt, size } = req.body;
  const imageSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
    });

    const imageUrl = response.data.data[0].url;

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    res.status(400).json({
      success: false,
      error: "This image can not be generated",
    });
  }
};

const allInOne = async (req, res) => {
  const { inputData, summaryLength } = req.body;
  try {
    //Summary
    const response = await fetch("https://api.ai21.com/studio/v1/summarize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: inputData,
        sourceType: "TEXT",
        max_tokens: summaryLength,
      }),
    });

    if (!response.ok) {
      throw new Error("Error occurred while calling AI21 Studio API");
    }

    const data = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 2000));

    //paraphrase

    const paraphrasedData = await fetch(
      "https://api.ai21.com/studio/v1/paraphrase",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: data.summary,
        }),
      }
    );

    if (!paraphrasedData.ok) {
      throw new Error(
        "Error occurred while calling AI21 Studio Paraphrase API"
      );
    }

    const data2 = await paraphrasedData.json();
    // Generate image
    const imageResponse = await openai.createImage({
      prompt: data.summary,
      n: 1,
      size: "512x512",
    });
    const imageUrl = imageResponse.data.data[0].url;

    // const data3 = { summary: data };
    // const data4 = { summary: data2 };
    // const imageUrl2 = { summary: imageUrl };

    const response1 = { imageUrl, data, data2 };

    res.status(200).send(response1);
  } catch (error) {
    console.error("An error occurred:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  textGeneration,
  generateImage,
  allInOne,
};
