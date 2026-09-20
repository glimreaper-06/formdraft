import express from "express";
import {
  loadModel,
  completion,
  unloadModel,
  LLAMA_3_2_1B_INST_Q4_0,
} from "@qvac/sdk";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let modelId;

async function startModel() {
  console.log("Loading QVAC model...");

  modelId = await loadModel({
    modelSrc: LLAMA_3_2_1B_INST_Q4_0,
  });

  console.log("QVAC model loaded.");
}

app.post("/generate", async (req, res) => {
  try {
    const { documentType, recipient, purpose, reason, date, details } = req.body;

    const prompt = `
Create a clear and properly formatted ${documentType}.

Recipient: ${recipient}
Purpose: ${purpose}
Reason: ${reason}
Date: ${date}
Additional details: ${details}

Write only the finished document. Make it polite, clear, and appropriate for the situation.
`;

    const result = completion({
      modelId,
      history: [
        {
          role: "user",
          content: prompt,
        },
      ],
      stream: false,
    });

    const finalResult = await result.final;

    res.json({
      draft: finalResult.contentText,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to generate the document.",
    });
  }
});

startModel().catch(console.error);

app.listen(PORT, () => {
  console.log(`FormDraft is running at http://localhost:${PORT}`);
});