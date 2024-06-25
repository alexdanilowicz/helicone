"use client";

import { DiffHighlight } from "@/components/shared/diffHighlight";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
import { PiArrowUpRightLight } from "react-icons/pi";


interface IntegrationsProps {}

const Integrations = (props: IntegrationsProps) => {
  const {} = props;

  const PROVIDERS: {
    name: string;
    // logo is a react element
    logo: JSX.Element;
    integrations: Record<
      string,
      {
        language: string;
        code: string;
      }
    >;
    href?: string;
  }[] = [
    {
      name: "OpenAI",
      logo: (
        <svg
          className="w-[2.5rem] m:w-[2.5rem] h-auto"
          width="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26.153 11.46a6.888 6.888 0 0 0-.608-5.73 7.117 7.117 0 0 0-3.29-2.93 7.238 7.238 0 0 0-4.41-.454 7.065 7.065 0 0 0-2.41-1.742A7.15 7.15 0 0 0 12.514 0a7.216 7.216 0 0 0-4.217 1.346 7.061 7.061 0 0 0-2.603 3.539 7.12 7.12 0 0 0-2.734 1.188A7.012 7.012 0 0 0 .966 8.268a6.979 6.979 0 0 0 .88 8.273 6.89 6.89 0 0 0 .607 5.729 7.117 7.117 0 0 0 3.29 2.93 7.238 7.238 0 0 0 4.41.454 7.061 7.061 0 0 0 2.409 1.742c.92.404 1.916.61 2.923.604a7.215 7.215 0 0 0 4.22-1.345 7.06 7.06 0 0 0 2.605-3.543 7.116 7.116 0 0 0 2.734-1.187 7.01 7.01 0 0 0 1.993-2.196 6.978 6.978 0 0 0-.884-8.27Zm-10.61 14.71c-1.412 0-2.505-.428-3.46-1.215.043-.023.119-.064.168-.094l5.65-3.22a.911.911 0 0 0 .464-.793v-7.86l2.389 1.36a.087.087 0 0 1 .046.065v6.508c0 2.952-2.491 5.248-5.257 5.248ZM4.062 21.354a5.17 5.17 0 0 1-.635-3.516c.042.025.115.07.168.1l5.65 3.22a.928.928 0 0 0 .928 0l6.898-3.93v2.72a.083.083 0 0 1-.034.072l-5.711 3.255a5.386 5.386 0 0 1-4.035.522 5.315 5.315 0 0 1-3.23-2.443ZM2.573 9.184a5.283 5.283 0 0 1 2.768-2.301V13.515a.895.895 0 0 0 .464.793l6.897 3.93-2.388 1.36a.087.087 0 0 1-.08.008L4.52 16.349a5.262 5.262 0 0 1-2.475-3.185 5.192 5.192 0 0 1 .527-3.98Zm19.623 4.506-6.898-3.93 2.388-1.36a.087.087 0 0 1 .08-.008l5.713 3.255a5.28 5.28 0 0 1 2.054 2.118 5.19 5.19 0 0 1-.488 5.608 5.314 5.314 0 0 1-2.39 1.742v-6.633a.896.896 0 0 0-.459-.792Zm2.377-3.533a7.973 7.973 0 0 0-.168-.099l-5.65-3.22a.93.93 0 0 0-.928 0l-6.898 3.93V8.046a.083.083 0 0 1 .034-.072l5.712-3.251a5.375 5.375 0 0 1 5.698.241 5.262 5.262 0 0 1 1.865 2.28c.39.92.506 1.93.335 2.913ZM9.631 15.009l-2.39-1.36a.083.083 0 0 1-.046-.065V7.075c.001-.997.29-1.973.832-2.814a5.297 5.297 0 0 1 2.231-1.935 5.382 5.382 0 0 1 5.659.72 4.89 4.89 0 0 0-.168.093l-5.65 3.22a.913.913 0 0 0-.465.793l-.003 7.857Zm1.297-2.76L14 10.5l3.072 1.75v3.5L14 17.499l-3.072-1.75v-3.5Z"
            fill="currentColor"
          ></path>
        </svg>
      ),
      integrations: {
        "node.js": {
          language: "tsx",
          code: `import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: request.env.OPENAI_API_KEY,
  baseURL: "https://oai.helicone.ai/HELICONE_API_KEY/v1",
  defaultHeaders: {
    "Helicone-Property-Environment": "production",
    "Helicone-User-Id": "test@example.com",
  },
});`,
        },
        python: {
          language: "python",
          code: `import OpenAI    

client = OpenAI(
  api_key="your-api-key-here", 
  base_url="https://oai.helicone.ai/HELICONE_API_KEY/v1",  
  default_headers= {  
    "Helicone-Property-Environment": "production",
    "Helicone-User-Id": "test@example.com",
  }
)`,
        },
        langchain: {
          language: "python",
          code: `llm = ChatOpenAI(
  openai_api_base="https://oai.helicone.ai/HELICONE_API_KEY/v1"
  openai_api_key='<>',
  model_kwargs={
    "extra_headers":{
      "Helicone-Property-Environment": "production",
      "Helicone-User-Id": "test@example.com",
    }
  },
)`,
        },
        langchainJS: {
          language: "tsx",
          code: `const llm = new OpenAI({
  modelName: "gpt-3.5-turbo",
  configuration: {
    basePath: "https://oai.helicone.ai/HELICONE_API_KEY/v1",
    defaultHeaders: {
      "Helicone-Property-Environment": "production",
      "Helicone-User-Id": "test@example.com",
    },
  },
});`,
        },
      },
    },
    {
      name: "Azure",
      logo: (
        <div className="p-4">
          <Image
            src={"/static/azure.webp"}
            alt={"Azure"}
            width={2048}
            height={2048}
          />
        </div>
      ),
      integrations: {
        "node.js": {
          language: "tsx",
          code: `import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://oai.helicone.ai/openai/deployments/[DEPLOYMENT_NAME]",
  defaultHeaders: {
    "Helicone-Auth": Bearer <HELICONE_API_KEY>,
    "Helicone-OpenAI-API-Base": "https://[AZURE_DOMAIN].openai.azure.com",
    "api-key": "[AZURE_API_KEY]",
  },
  defaultQuery: { 
    "api-version": "[API_VERSION]" 
  },
});`,
        },
        python: {
          language: "python",
          code: `import OpenAI 

client = OpenAI(
  api_key="[AZURE_OPENAI_API_KEY]",
  base_url="https://oai.helicone.ai/openai/deployments/[DEPLOYMENT]",
  default_headers={
    "Helicone-OpenAI-Api-Base": "https://[AZURE_DOMAIN].openai.azure.com",
    "Helicone-Auth": Bearer <HELICONE_API_KEY>,
    "api-key": "[AZURE_OPENAI_API_KEY]",
  },
  default_query={
    "api-version": "[API_VERSION]"
  }
)`,
        },
        langchain: {
          language: "python",
          code: `from langchain.chat_models import AzureChatOpenAI

helicone_headers = {
  "Helicone-Auth": Bearer <HELICONE_API_KEY>,
  "Helicone-OpenAI-Api-Base": "https://<model_name>.openai.azure.com/"
}

self.model = AzureChatOpenAI(
  openai_api_base="https://oai.helicone.ai"
  deployment_name="gpt-35-turbo",
  openai_api_key=<AZURE_OPENAI_API_KEY>,
  openai_api_version="2023-05-15",
  openai_api_type="azure",
  max_retries=max_retries,
  headers=helicone_headers,
  **kwargs,
)`,
        },
        langchainJS: {
          language: "tsx",
          code: `const model = new ChatOpenAI({
  azureOpenAIApiKey: "[AZURE_OPENAI_API_KEY]",
  azureOpenAIApiDeploymentName: "openai/deployments/gpt-35-turbo",
  azureOpenAIApiVersion: "2023-03-15-preview",
  azureOpenAIBasePath: "https://oai.helicone.ai",
  configuration: {
    organization: "[organization]",
    baseOptions: {
      headers: {
        "Helicone-Auth": Bearer <HELICONE_API_KEY>,
        "Helicone-OpenAI-Api-Base":
          "https://[YOUR_AZURE_DOMAIN].openai.azure.com",
      },
    },
  },
});`,
        },
      },
    },
    {
      name: "Anthropic",
      logo: (
        <div className="p-4">
          <Image
            src={"/static/anthropic.webp"}
            alt={"Anthropic"}
            width={2048}
            height={2048}
          />
        </div>
      ),
      integrations: {
        "node.js": {
          language: "tsx",
          code: `import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  baseURL: "https://anthropic.helicone.ai/",
  apiKey: process.env.ANTHROPIC_API_KEY,
  defaultHeaders: {
    "Helicone-Auth": <HELICONE_API_KEY>,
  },
});

await anthropic.messages.create({
  model: "claude-3-opus-20240229",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello, world" }],
});
`,
        },
        python: {
          language: "python",
          code: `import anthropic

client = anthropic.Anthropic(
  api_key=os.environ.get("ANTHROPIC_API_KEY"),
  base_url="https://anthropic.helicone.ai/v1"
  defaultHeaders={
    "Helicone-Auth": <HELICONE_API_KEY>,
  },
)

client.messages.create(
  model="claude-3-opus-20240229",
  max_tokens=1024,
  messages=[
    {"role": "user", "content": "Hello, world"}
  ]
)
`,
        },
        langchain: {
          language: "python",
          code: `const llm = new ChatAnthropic({
  modelName: "claude-2",
  anthropicApiKey: "ANTHROPIC_API_KEY",
  clientOptions: {
    baseURL: "https://anthropic.helicone.ai/",
    defaultHeaders: {
      "Helicone-Auth": Bearer <HELICONE_API_KEY>,
    },
  },
});
`,
        },
      },
    },
    {
      name: "Gemini",
      logo: (
        <div className="p-2">
          <Image
            src={"/static/gemini.webp"}
            alt={"Gemini"}
            width={2048}
            height={2048}
          />
        </div>
      ),
      integrations: {},
      href: "https://docs.helicone.ai/integrations/gemini/api/curl",
    },
    {
      name: "Anyscale",
      logo: (
        <div className="p-3">
          <Image
            src={"/static/anyscale.webp"}
            alt={"Anyscale"}
            width={2048}
            height={2048}
          />
        </div>
      ),
      integrations: {},
      href: "https://docs.helicone.ai/getting-started/integration-method/anyscale",
    },
    {
      name: "TogetherAI",
      logo: (
        <div className="p-3">
          <Image
            src={"/static/together.webp"}
            alt={"TogetherAI"}
            width={2048}
            height={2048}
          />
        </div>
      ),
      integrations: {},
      href: "https://docs.helicone.ai/getting-started/integration-method/together",
    },
    {
      name: "OpenRouter",
      logo: (
        <div className="p-3">
          <Image
            src={"/static/openrouter.webp"}
            alt={"Open Router"}
            width={2048}
            height={2048}
          />
        </div>
      ),
      integrations: {},
      href: "https://docs.helicone.ai/getting-started/integration-method/openrouter",
    },
    {
      name: "LiteLLM",
      logo: <div className="bg-sky-300 rounded-full w-[3rem] h-[3rem] text-3xl">🚅</div>,
      integrations: {},
      href: "https://docs.helicone.ai/getting-started/integration-method/litellm",
    },
    {
      name: "Other Models",
      logo: <div className="p-3">
        <Image 
        src={"/static/logo.webp"}
        alt={"Open Router"}
        width={2048}
        height={2048}
        />
      </div>,
      integrations: {},
      href: ""
    },
  ];

  const [currentProvider, setCurrentProvider] = useState("OpenAI");

  const [currentIntegration, setCurrentIntregration] = useState("node.js");

  const selectedProvider = PROVIDERS.find(
    (provider) => provider.name === currentProvider
  );

  const currentCodeBlock = selectedProvider?.integrations[currentIntegration];

  return (
    <div className="flex flex-col mx-auto max-w-5xl w-full">
      <ul className="grid grid-cols-3 md:grid-cols-9 gap-4 md:gap-0 md:px-10 md:pt-12 pt-3 pb-4 ">
        {PROVIDERS.map((provider, index) => (
          <li key={index} className="hover:bg-slate-100 hover:rounded-lg pl-3 pt-2 pr-1">
            <button
              onClick={() => {
                if (provider.href) {
                  // open up a new tab
                  window.open(provider.href, "_blank");
                  return;
                }
                setCurrentProvider(provider.name);
              }}
              className="flex flex-col md:items-center"
            >
              <div className="col-span-1 rounded-lg border border-gray-300 bg-white h-20 w-20 flex items-center justify-center">
                {provider.logo}
              </div>
              <span
                className={`text-sm font-semibold text-left pt-2 md:text-nowrap ${
                  currentProvider === provider.name
                  ? "font-bold text-black"
                  : "text-gray-400"
                } md:text-center`}
              >
                {provider.name}
              </span>
              <p className="text-sm text-gray-600 pt-1 md:hidden">
                View Doc <PiArrowUpRightLight className="inline w-5 h-5" />
              </p>
            </button>
          </li>
        ))}
      </ul>
      <div className="border rounded-2xl hidden md:flex flex-col mx-8 mt-4 divide-y bg-gray-900 divide-gray-900">
        <div className="flex items-center justify-between pt-4 pr-8 pl-4 bg-gray-900 rounded-t-2xl">
          <ul className="flex items-center space-x-0 gap-3">
            {Object.keys(selectedProvider?.integrations || {}).map(
              (integration) => (
                <li
                  key={integration}
                  className={`cursor-pointer text-base font-medium px-6 py-2 border border-gray-500 rounded-xl ${
                    currentIntegration === integration
                      ? "text-black bg-gray-300"
                      : "text-gray-300"
                  }`}
                  onClick={() => setCurrentIntregration(integration)}
                >
                  {integration}
                </li>
              )
            )}
          </ul>
          <button className="text-gray-500">
            <ClipboardIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="">
          <DiffHighlight
            code={currentCodeBlock?.code || ""}
            language={currentCodeBlock?.language || "tsx"}
          />
        </div>
      </div>
    </div>
  );
};

export default Integrations;
