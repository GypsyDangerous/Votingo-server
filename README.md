# Votingo Server
Votingo is a open-sourced real-time polling app created with the MERN stack. Votingo lets you create edit, update, delete public polls and vote on them publicly. You can make polls without signing or sign in to make polls private, you can also vote without being signed in or sign in for the option of putting your name on your vote.

# API
Votingo has both a REST api and a graphql api

### AUTHORIZATION
all requests require an api key which is provided in the request header

```ts
interface headers = {
    "X-API-Key": String 
}
```

## REST

### GET - GET POLLS
```js
// GET ALL POLLS

"https://api.votingo.xyz/v1/polls" -> 
[
    {
        name: String,
        description: String | null
        creator: String, // creator's id or "anonymous" if there is no creator
        _id: String,
        options: [Object],  
    }
]

// GET A SINGLE POLL

"https://api.votingo.xyz/v1/polls/:id" ->
{
    name: String,
    description: String | null
    creator: String, // creator's id or "anonymous" if there is no creator
    _id: String,
    options: [Object],  
}

```

### POST - CREATE POLL
```ts
// request body
interface PollBody = {
    name: String,
    description?: String
    options: Array<String> // array of option names 
}

"https://api.votingo.xyz/v1/polls" ->
{
    name: String,
    description: String | null
    creator: String, // creator's id or "anonymous" if there is no creator
    _id: String,
    options: [Object],  
}
```

### PATCH - VOTE ON POLL
```ts
// request body
interface PollVote = {
    option: String // name of vote option
}

"https://api.votingo.xyz/v1/polls/vote/:id" ->
{
    name: String,
    description: String | null
    creator: String, // creator's id or "anonymous" if there is no creator
    _id: String,
    options: [Object],  
    message: "Thanks for Voting!"
}
```

### DELETE - DELETE POLL
```js
"https://api.votingo.xyz/v1/polls" ->
{
    name: String,
    description: String | null
    creator: String, // creator's id or "anonymous" if there is no creator
    _id: String,
    options: [Object],  
    message: "Successfully deleted the poll"
}

```

## Graphql

### Endpoint
`https://api.votingo.xyz/graphql`

### Playground
Make a GET request to the graphql endpoint to get the playground with built in docs

### About query and mutation operations
The two types of allowed operations in Votingo's GraphQL API are queries and mutations. Comparing GraphQL to REST, queries operate like GET requests, while mutations operate like POST/PATCH/DELETE. The mutation name determines which modification is executed.

### About queries
GraphQL queries return only the data you specify. To form a query, you must specify fields within fields (also known as nested subfields) until you return only scalars.

Queries are structured like this:
```
query {
  JSON objects to return
}
```

### About mutations
To form a mutation, you must specify three things:

1. Mutation name. The type of modification you want to perform.
2. Input object. The data you want to send to the server, composed of input fields. Pass it as an argument to the mutation name.
3. Payload object. The data you want to return from the server, composed of return fields. Pass it as the body of the mutation name.

Mutations are structured like this:
```
mutation {
  mutationName(input: {MutationNameInput!}) {
    MutationNamePayload
}
```

The input object in this example is MutationNameInput, and the payload object is MutationNamePayload.

In the mutations reference, the listed input fields are what you pass as the input object. The listed return fields are what you pass as the payload object.