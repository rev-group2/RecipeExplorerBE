const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

const secret_name = "prod/RecipeExplorerBE/JWT";

const client = new SecretsManagerClient({ region: "us-west-1" });

/**
 * 
 * @returns an object with secret:value pairs
 */
async function getSecrets() {
    try {
        const response = await client.send(
            new GetSecretValueCommand({
                SecretId: secret_name,
                VersionStage: "AWSCURRENT"
            })
        );

        const secret = response.SecretString;
        return JSON.parse(secret);
    }catch(error) {
        throw error;
    }
}

module.exports = { getSecrets }