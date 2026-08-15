# LOCAL SETUP

To set up the local environment, follow the steps below:

1. Generate a service account key using the `gcloud` command:

refer to our [DevOps Mobilo Operational Manual](https://github.com/Mobilo-Card/mobilo-platform-operational-manual) if you don't have done this already.

2. Set the environment variable for the Google Application Credentials:

once you have the key.json for the DEV environemnt and exort it

```console
export GOOGLE_APPLICATION_CREDENTIALS="./key.json"
```

3. To use private npm packages, you need to set up a GitHub Personal Access Token and configure it in your project's .npmrc file.

Add the following lines, replacing PUT_AUTH_TOKEN_HERE with your generated GitHub Personal Access Token:

```console
//npm.pkg.github.com/:_authToken=PUT_AUTH_TOKEN_HERE
always-auth=true
```

4. Install the necessary dependencies by running:

   ```console
   yarn
   ```

5. Test the application (not yet implemented):

   ```console
   yarn test
   ```

6. Start the application:

   ```console
   yarn start
   ```
