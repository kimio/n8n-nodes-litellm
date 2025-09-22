import { IDataObject, NodeConnectionTypes, ISupplyDataFunctions } from 'n8n-workflow';

export class LiteLLMEmbeddingsClient {
	supplyDataFunctions: ISupplyDataFunctions;
	itemIndex: number;
	apiKey: string;
	baseUrl: string;
	model: string;
	batchSize: number;
	stripNewLines: boolean;

	constructor(supplyDataFunctions: ISupplyDataFunctions, itemIndex: number, apiKey: string, baseUrl: string, model: string, batchSize = 512, stripNewLines = true) {
		this.supplyDataFunctions = supplyDataFunctions;
		this.itemIndex = itemIndex;
		this.apiKey = apiKey;
		this.baseUrl = baseUrl;
		this.model = model;
		this.batchSize = batchSize;
		this.stripNewLines = stripNewLines;
	}

	private cleanText(text: string): string {
		return this.stripNewLines ? text.replace(/\n/g, ' ') : text;
	}

	async embedDocuments(documents: string[]): Promise<IDataObject[]> {
		const embeddings: IDataObject[] = [];
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
			embeddings.push(...data.data.map((d: any) => d.embedding));
		}

		const connectionType = NodeConnectionTypes.AiEmbedding;

		const { index } = this.supplyDataFunctions.addInputData(connectionType, [
			[{ json: { query: documents.join(" ") } }],
		]);

		this.supplyDataFunctions.addOutputData(
			connectionType,
			index,
			[[{ json: { response: embeddings[0] } }]]
		);

		return embeddings;
	}

	async embedQuery(query: string): Promise<IDataObject> {
		const [embedding] = await this.embedDocuments([query]);
		return embedding;
	}
}
