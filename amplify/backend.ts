import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
});

const iamConfigStack = backend.createStack("IAMConfig");

backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(new Policy(iamConfigStack, "BedrockPerms", {
  statements: [
    new PolicyStatement({
      actions: ["bedrock:InvokeModel"],
      resources: ["*"],
    }),
  ],
}));

