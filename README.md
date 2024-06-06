## Sample React Native + Amplify Gen 2 app

**Note**: not to be used in production environments, this repo is purely for demo purposes ONLY!
**Double note**: I don't think the ios or android paths work. I couldn't install Xcode on my laptop but web does work!

### Pre-requisite steps

1. You should have access to deploy resources to an AWS account.
2. Node installed and required dependencies for React Native development.
3. An AWS Account that has been bootstrapped for the AWS CDK:
```cdk bootstrap```
If you don't have the CDK installed, you can install it by running:
```npm install -g aws-cdk```

### Set up

1. Clone this repository
2. `npm install` package dependencies
3. Deploy the Amplify sandbox: `npx ampx sandbox` --> this is what will deploy your Amazon Cognito resources along with the authenticated role which allows signed-in users to invoke Bedrock.
4. Once the sandbox deployment is completed, you should see a note in the terminal that says **Watching for file changes...** and that the `amplify_outputs.json` file has been created.
5. In a new terminal window, run the expo application: `npm run web`

## Testing the app

I'm not a React Native developer so the app isn't pretty but...

1. Click **Create account** and enter your email, password. You will receive a confirmation code to the email you entered.
2. Enter the confirmation code in. You will be signed in to the app.
3. Click on the **Invoke model** button. There is a pre-baked prompt already in the code which runs.

I am using the current logged in users session credentials to make the AWS SDK call to Bedrock. This approach can be adopted to other AWS service SDK calls as well.