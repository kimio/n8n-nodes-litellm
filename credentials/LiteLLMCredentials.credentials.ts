import {
	ICredentialType,
	INodeProperties,
	NodePropertyTypes,
	Icon,
} from 'n8n-workflow';

export class LiteLLMCredentials implements ICredentialType {
	name = 'liteLLMApi';
	displayName = 'LiteLLM API';
    icon = 'file:liteLLM.svg' as Icon;
	documentationUrl = '';
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string' as NodePropertyTypes,
			default: '',
			placeholder: 'https://litellm.domain.com',
			description: 'LiteLLM URL base (http://localhost:4000)',
			required: true,
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string' as NodePropertyTypes,
			typeOptions: { password: true },
			default: '',
			description: 'API Key',
			required: true,
		},
	];
}
