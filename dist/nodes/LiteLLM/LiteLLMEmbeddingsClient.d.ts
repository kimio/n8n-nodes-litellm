import { IDataObject, ISupplyDataFunctions } from 'n8n-workflow';
export declare class LiteLLMEmbeddingsClient {
    supplyDataFunctions: ISupplyDataFunctions;
    itemIndex: number;
    apiKey: string;
    baseUrl: string;
    model: string;
    batchSize: number;
    stripNewLines: boolean;
    constructor(supplyDataFunctions: ISupplyDataFunctions, itemIndex: number, apiKey: string, baseUrl: string, model: string, batchSize?: number, stripNewLines?: boolean);
    private cleanText;
    embedDocuments(documents: string[]): Promise<IDataObject[]>;
    embedQuery(query: string): Promise<IDataObject>;
}
