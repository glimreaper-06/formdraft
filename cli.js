import {
  loadModel,
  completion,
  unloadModel,
  LLAMA_3_2_1B_INST_Q4_0
} from "@qvac/sdk";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

console.log("======================================");
console.log("          FORMDRAFT - QVAC CLI");
console.log("======================================");
console.log("");

const documentType = await ask("Document Type: ");
const recipient = await ask("Recipient: ");
const purpose = await ask("Purpose: ");
const reason = await ask("Reason: ");
const date = await ask("Date: ");
const details = await ask("Additional Details: ");

rl.close();

console.log("");
console.log("Loading QVAC model...");

try {
  const modelId = await loadModel({
    modelSrc: LLAMA_3_2_1B_INST_Q4_0,
    onProgress: (p) => {
      process.stdout.write(`\rLoading model: ${p.percentage.toFixed(0)}%`);
    }
  });

  console.log("\n");
  console.log("QVAC model loaded.");
  console.log("Generating draft...");
  console.log("");

  const prompt = `
Create a professional ${documentType}.

Recipient: ${recipient}
Purpose: ${purpose}
Reason: ${reason}
Date: ${date}
Additional Details: ${details}

Write only the finished document.
`;

  const result = completion({
    modelId,
    history: [
      {
        role: "user",
        content: prompt
      }
    ],
    stream: true
  });

  console.log("--------------------------------------");
  console.log("GENERATED DRAFT");
  console.log("--------------------------------------");
  console.log("");

  for await (const token of result.tokenStream) {
    process.stdout.write(token);
  }

  console.log("\n");
  console.log("--------------------------------------");
  console.log("Draft generation complete.");
  console.log("--------------------------------------");

  await unloadModel({ modelId });
} catch (error) {
  console.error("\nError:", error);
  process.exit(1);
}