# codecrack_x45Mak

> A GitHub App built with [Probot](https://github.com/probot/probot) that A Probot app 
## Getting Started
 
### Installation

```bash
# Example installation steps
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/your-project.git
   ```
2. Change directory to the project folder:
   ```
   cd your-project
   ```
3. Install the required dependencies: using
   npm install
   ```
   npm install
   ```
4. Start the application:
   npm start
   ```

# GitHub Code Executor App

## Working Link: https://www.loom.com/share/a9e587a06d0b49be996fb5b9bac29b2d?sid=186aef05-f1c9-485d-b92d-7e662efd3409

## Overview

The GitHub Code Executor App is a GitHub application that allows code execution within pull requests. It's designed to enhance the development workflow by providing developers with the ability to test code directly within their GitHub repositories.

### Implemented Features

1. **Code Execution**: The app listens for pull request creation events and can trigger code execution when the `/execute` command is included in a comment or commit message. It captures the output of the executed code and posts it as a comment.

## Constraints on Code Execution

In order to use the GitHub Code Executor App effectively, there are some constraints on the code that is executed:

1. **Output Inclusion**: The code submitted for execution must contain the value of the output. It should not rely on `cin` or user input. This is because the code is executed within a controlled environment, and interactive input is not supported.

2. **Input Handling**: As interactive input (`cin`, etc.) is not supported, the code should be self-contained and not expect user input during execution.

3. **Output Verification**: The app captures and posts the output of the code execution. Therefore, it's important for the code to generate the expected output directly in its execution. If the code expects user input, it will not work as intended with this app.

Please ensure that the code you submit for execution adheres to these constraints to receive accurate and meaningful results when using the GitHub Code Executor App.


## Resources Used

The development of the GitHub Code Executor App involved leveraging various resources:

1. **GitHub Developer Docs**: Essential for understanding GitHub App integration and webhooks.

2. **GPT (Language Model)**: Potential usage for generating code explanations.

3. **Smee.io**: Used to track webhooks and facilitate communication with the GitHub repository.

4. **Sphere Engine API**: Utilized for executing C++ code and capturing the output.

## Tech Stack

The backend of the GitHub Code Executor App is built using the following technologies:

- Node.js
- Probot (GitHub App framework)

## Environment Variables
To configure and run the app, the following environment variables are required:

- `WEBHOOK_PROXY_URL`: URL for webhook proxy.
- `APP_ID`: GitHub App ID.
- `PRIVATE_KEY`: GitHub App private key.
- `WEBHOOK_SECRET`: Webhook secret key.
- `GITHUB_CLIENT_ID`: GitHub OAuth client ID.
- `GITHUB_CLIENT_SECRET`: GitHub OAuth client secret.
- `SPHERE_API_KEY`: Sphere Engine API key.
- `SPHERE_ENDPOINT`: Sphere Engine API endpoint.

**Author:** Mayank Kashyap
