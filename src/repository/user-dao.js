const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
    DynamoDBDocumentClient,
    PutCommand,
    UpdateCommand,
    QueryCommand
} = require('@aws-sdk/lib-dynamodb');

const { logger } = require('../util/logger');

const client = new DynamoDBClient({region: 'us-east-2'});
const documentClient = DynamoDBDocumentClient.from(client);

const TableName = 'RecipeExplorer';

async function createUser(User) {
    const command = new PutCommand({
        TableName,
        Item : User
    });

    try {
        const data = await documentClient.send(command);
        return data;
    } catch(err) {
        logger.error(err);
        throw new Error(err)
    }
}

/**
 * 
 * @param {string} username - a username to search for a User with
 * @returns a User with username, or false if no such User exists
 */
async function queryUserByUsername(username) {
    const command = new QueryCommand({
        TableName,
        IndexName: 'username-creation_date-index',
        KeyConditionExpression: '#username = :u',
        ExpressionAttributeNames: { '#username': 'username' },
        ExpressionAttributeValues: { ':u': username }
    });

    try {
        const data = await documentClient.send(command);

        if(data.Items.length === 0) {
            return false; 
        }

        return data.Items[0];
    } catch(err) {
        logger.error(err);
        throw new Error(err);
    }
}


async function quaryByUuid(uuid) {
    const command = new QueryCommand({
        TableName,
        KeyConditionExpression: '#uuid = :uuid',
        ExpressionAttributeNames: { '#uuid': 'uuid' },
        ExpressionAttributeValues: {':uuid': uuid }
    });

    try {
        const data = await documentClient.send(command);
        return data;

    } catch(err) {
        logger.error(err);
        throw new Error(err);
    }
} 


// update profile
async function patchProfile(item, uuid) {
    const command = new UpdateCommand({
        TableName: "RecipeExplorer",
        Key: {
            'uuid':uuid
          },
          UpdateExpression: 'Set #email = :email, #username = :username, #picture = :picture, #description = :description',
          ExpressionAttributeNames: {
            '#email': 'email',
            '#username': 'username',
            '#picture': 'picture',
            '#description': 'description'
          },
          ExpressionAttributeValues: {
            ':email': item.email,
            ':username': item.username,
            ':picture': item.picture,
            ':description': item.description
          },
          ReturnValues: "ALL_NEW"
    });
    try{
        const data = await documentClient.send(command);    
        return data;
    }catch(err){
        console.error(err);
        throw new Error(err);
    }

}

module.exports = {
    createUser,
    queryUserByUsername,
    patchProfile,
    quaryByUuid
}