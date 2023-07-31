
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3030/graphql",
  documents: "src/**/*.gql",
  generates: {
    "./src/generated/graphql-hooks/index.ts": {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo']
    }
  },
  config: {
    withHooks: true
  }
};

export default config;
