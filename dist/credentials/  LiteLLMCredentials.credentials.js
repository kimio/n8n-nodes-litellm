"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiteLLMCredentials = void 0;
class LiteLLMCredentials {
    constructor() {
        this.name = 'liteLLMApi';
        this.displayName = 'LiteLLM API';
        this.icon = 'file:liteLLM.svg';
        this.documentationUrl = '';
        this.properties = [
            {
                displayName: 'Base URL',
                name: 'baseUrl',
                type: 'string',
                default: '',
                placeholder: 'https://litellm.domain.com',
                description: 'LiteLLM URL base (http://localhost:4000)',
                required: true,
            },
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: { password: true },
                default: '',
                description: 'API Key',
                required: true,
            },
        ];
    }
}
exports.LiteLLMCredentials = LiteLLMCredentials;
