import React, { useState } from "react";
import { Button, View, StyleSheet, SafeAreaView, Text } from "react-native";

import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import { BedrockRuntimeClient, InvokeModelCommand, AccessDeniedException } from "@aws-sdk/client-bedrock-runtime";

import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);

const SignOutButton = () => {
  const { signOut } = useAuthenticator();

  return (
    <View style={styles.signOutButton}>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

const App = () => {
    const [modelResponse, setModeResponse] = useState("No response yet");

    const InvokeModelButton = async () => {
        const session = await fetchAuthSession();
        const client = new BedrockRuntimeClient({
            region: "us-west-2",
            credentials: session.credentials,
        });

        const questionPrompt = "Tell me about AWS Amplify Gen 2 in 3 sentences or less."
        const enclosedPrompt = `Human: ${questionPrompt} Assistant:`;
        const payload = {
            prompt: enclosedPrompt,
            max_tokens_to_sample: 2e3
        };

        const input = {
            body: JSON.stringify(payload),
            contentType: "application/json",
            accept: "application/json",
            modelId: "anthropic.claude-v2:1"
        };

        try {
            const command = new InvokeModelCommand(input);
            const response = await client.send(command);
            const responseString = JSON.parse(new TextDecoder().decode(response.body));
            setModeResponse(responseString.completion);
        } catch (error) {
            if (error instanceof AccessDeniedException) {
                console.error("Access denied");
            } else {
                console.error("Error invoking model", error);
            }
        }
    };

    return (
        <Authenticator.Provider>
            <Authenticator>
                <SafeAreaView>
                    <SignOutButton />
                    <View style={styles.invokedButton}>
                        <Button title="Click me to invoke Bedrock model!" onPress={InvokeModelButton}/>
                        <Text>{modelResponse}</Text>
                    </View>
                </SafeAreaView>
            </Authenticator>
        </Authenticator.Provider>
    );
};

const styles = StyleSheet.create({
  signOutButton: {
    alignSelf: "flex-end",
  },
  invokedButton: {
    alignSelf: "center",
  }
});

export default App;