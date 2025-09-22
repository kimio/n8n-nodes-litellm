# n8n-nodes-litellm

A powerful custom node for [n8n](https://n8n.io/) that enables seamless integration with the [LiteLLM](https://github.com/BerriAI/litellm) Embeddings API. Effortlessly generate AI embeddings for your workflows, connect to vector stores, and supercharge your automations with state-of-the-art language models.

---

## 🚀 Features

- **Easy Integration**: Plug-and-play with your LiteLLM API endpoint.
- **Flexible Model Selection**: Choose from available embedding models dynamically.
- **Batch Processing**: Efficiently embed large batches of documents.
- **Customizable Options**: Set batch size, embedding dimensions, and more.
- **Secure Credentials**: Store your API key and base URL safely using n8n's credential system.
- **Ready for Vector Stores**: Designed to connect directly to vector stores or AI agents in your n8n workflows.

---

## 📦 Installation

### Using Docker

1. Build and copy the node to your n8n instance:
    ```sh
    ./install-custom-node-local.sh
    ```
2. Or, on Windows:
    ```bat
    install-custom-node-local.bat
    ```

### Manual

1. Install dependencies and build:
    ```sh
    npm install
    npm run build
    ```
2. Copy the contents of the `dist` folder to your n8n custom nodes directory.

---

## 🛠️ Usage

1. **Add the Node**: In n8n, search for "LiteLLM Embeddings" and add it to your workflow.
2. **Configure Credentials**:  
   - Set your LiteLLM API Base URL (e.g., `http://localhost:4000`).
   - Enter your API Key.
3. **Select Model**: Choose the embedding model from the dropdown.
4. **Customize Options** (optional):  
   - Batch size  
   - Embedding dimensions  
   - Strip new lines  
   - Override base URL
5. **Connect Outputs**: Link the node to a vector store, AI agent, or any downstream process.

---

## 🧩 Example Workflow

1. Input your text data.
2. Pass it to the **LiteLLM Embeddings** node.
3. Store or search embeddings in your favorite vector database.

---

## 🔐 Credentials

- **Base URL**: Your LiteLLM API endpoint.
- **API Key**: Your LiteLLM API key.

Credentials are securely managed via n8n's credential system.

---

## 📚 Documentation

- [LiteLLM Documentation](https://docs.litellm.com)
- [n8n Custom Nodes Guide](https://docs.n8n.io/integrations/creating-nodes/)

---

## 📝 License

Apache 2.0. See [LICENSE](LICENSE).

---

## 🤝 Contributing

Pull requests and issues are welcome! Please open an issue to discuss your ideas or report bugs.

---

## 👤 Author

Felipe Kimio Nishikaku

---