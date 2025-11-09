"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiteLLMEmbeddingsClient = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class LiteLLMEmbeddingsClient {
    constructor(supplyDataFunctions, itemIndex, apiKey, baseUrl, model, batchSize = 512, stripNewLines = true) {
        this.supplyDataFunctions = supplyDataFunctions;
        this.itemIndex = itemIndex;
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
        this.model = model;
        this.batchSize = batchSize;
        this.stripNewLines = stripNewLines;
    }
    cleanText(text) {
        return this.stripNewLines ? text.replace(/\n/g, ' ') : text;
    }
    async embedDocuments(documents) {
        const embeddings = [];
        for (let i = 0; i < documents.length; i += this.batchSize) {
            const batch = documents.slice(i, i + this.batchSize).map((d) => this.cleanText(d));
            const response = await fetch(`${this.baseUrl}/embeddings`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ model: this.model, input: batch }),
            });
            const data = await response.json();
            embeddings.push(...data.data.map((d) => d.embedding));
        }
        const connectionType = n8n_workflow_1.NodeConnectionTypes.AiEmbedding;
        const { index } = this.supplyDataFunctions.addInputData(connectionType, [
            [{ json: { query: documents.join(" ") } }],
        ]);
        this.supplyDataFunctions.addOutputData(connectionType, index, [[{ json: { response: embeddings[0] } }]]);
        return embeddings;
    }
    async embedQuery(query) {
        const [embedding] = await this.embedDocuments([query]);
        return embedding;
    }
}
exports.LiteLLMEmbeddingsClient = LiteLLMEmbeddingsClient;
//# sourceMappingURL=LiteLLMEmbeddingsClient.js.map