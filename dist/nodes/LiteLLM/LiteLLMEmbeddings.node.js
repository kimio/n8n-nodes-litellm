"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiteLLMEmbeddings = void 0;
/* eslint-disable n8n-nodes-base/node-dirname-against-convention */
const n8n_workflow_1 = require("n8n-workflow");
const LiteLLMEmbeddingsClient_1 = require("./LiteLLMEmbeddingsClient");
const modelParameter = {
    displayName: 'Model',
    name: 'model',
    type: 'options',
    description: 'The model which will generate the embeddings. <a href="https://docs.litellm.com/models">Learn more</a>.',
    typeOptions: {
        loadOptions: {
            routing: {
                request: {
                    method: 'GET',
                    url: '=v1/models',
                },
                output: {
                    postReceive: [
                        { type: 'rootProperty', properties: { property: 'data' } },
                        { type: 'filter', properties: { pass: "={{ $responseItem.id.includes('embed') }}" } },
                        { type: 'setKeyValue', properties: { name: '={{$responseItem.id}}', value: '={{$responseItem.id}}' } },
                        { type: 'sort', properties: { key: 'name' } },
                    ],
                },
            },
        },
    },
    routing: { send: { type: 'body', property: 'model' } },
    default: 'text-embedding-005',
};
class LiteLLMEmbeddings {
    constructor() {
        this.description = {
            displayName: 'LiteLLM Embeddings',
            name: 'liteLLMEmbeddings',
            icon: 'file:liteLLM.svg',
            credentials: [{ name: 'liteLLMApi', required: true }],
            group: ['transform'],
            version: 1,
            description: 'Generate embeddings using LiteLLM',
            defaults: { name: 'LiteLLM Embeddings' },
            codex: {
                categories: ['AI'],
                subcategories: { AI: ['Embeddings'] },
                resources: { primaryDocumentation: [{ url: 'https://docs.litellm.com' }] },
            },
            inputs: [],
            outputs: [n8n_workflow_1.NodeConnectionTypes.AiEmbedding],
            outputNames: ['Embeddings'],
            requestDefaults: {
                ignoreHttpStatusErrors: true,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: '={{ `Bearer ${$credentials.apiKey}` }}',
                },
                baseURL: '={{ $credentials.baseUrl }}',
            },
            properties: [
                { displayName: 'Notice', name: 'notice', type: 'notice', default: '', description: 'Ensure this node is connected to a Vector Store or AI Agent.' },
                { ...modelParameter },
                {
                    displayName: 'Options',
                    name: 'options',
                    placeholder: 'Add Option',
                    description: 'Additional options to add',
                    type: 'collection',
                    default: {},
                    options: [
                        { displayName: 'Dimensions', name: 'dimensions', default: undefined, description: 'Output embedding dimensions.', type: 'options', options: [{ name: '256', value: 256 }, { name: '512', value: 512 }, { name: '1024', value: 1024 }, { name: '1536', value: 1536 }, { name: '3072', value: 3072 }] },
                        { displayName: 'Base URL', name: 'baseURL', default: undefined, description: 'Override the default base URL for the API', type: 'string' },
                        { displayName: 'Batch Size', name: 'batchSize', default: 512, typeOptions: { maxValue: 2048 }, description: 'Maximum number of documents per request', type: 'number' },
                        { displayName: 'Strip New Lines', name: 'stripNewLines', default: true, description: 'Whether to strip new lines from the input text', type: 'boolean' },
                    ],
                },
            ],
        };
    }
    async supplyData(itemIndex) {
        const credentials = await this.getCredentials('liteLLMApi');
        const options = this.getNodeParameter('options', itemIndex, {});
        const apiKey = credentials.apiKey;
        const baseUrl = credentials.baseUrl;
        const model = this.getNodeParameter('model', itemIndex, 'text-embedding-005');
        const embeddingsClient = new LiteLLMEmbeddingsClient_1.LiteLLMEmbeddingsClient(this, itemIndex, apiKey, baseUrl, model, options.batchSize ?? 512, options.stripNewLines ?? true);
        return { response: embeddingsClient };
    }
}
exports.LiteLLMEmbeddings = LiteLLMEmbeddings;
