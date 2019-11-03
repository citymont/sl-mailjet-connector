<!--
title: 'Mailjet connector in Node JS for Integromat, automate.io ...'
description: 'This example demonstrates how to add contact to a list with the Mailjet SDK and AWS lambda.'
layout: Doc
framework: v1
platform: AWS
language: nodeJS
authorLink: 'https://github.com/citymont'
authorName: 'Thibaut Villemont'
-->
# Mailjet endpoint for Integromat, Webhook, Zapier and more ...

This example demonstrates how to add contact (with data) to a Mailjet list with the Mailjet SDK and AWS lambda.

## Setup

1. You need to install [Serverless framework](https://github.com/serverless/serverless)

2. Sign up for a [Mailjet account](http://www.mailjet.com) and create a list.

3. Get the ID of our list (into the url).

4. Grab your PUBLIC and PRIVATE API KEY and plug those into the `serverless.yml` file in the next step.

5. Set your `env` variables in `serverless.yml` with your Twilio account values.

  ```yml
  environment:
    # replace these env variables with your mailjet account values
    MJ_APIKEY_PUBLIC: YOUR_MJ_APIKEY_PUBLIC
    MJ_APIKEY_PRIVATE: YOUR_MJ_APIKEY_PRIVATE
    MJ_CONTACTLIST: YOUR_MJ_CONTACTLIST
  ```

6. Install dependencies

```bash
  npm install
  ```

6. Invoke the function and add contact to the list 

  Update the `email`, `firstname`, `lastname` values into the `event.json`

  Then invoke the function with the serverless CLI. Set the `--path event.json` so the function knows which people to add to your list.

  ```bash
  serverless invoke -f addContact --path event.json
  ```

6. Deploy the serverless function and get an HTTP endpoint to integrate into your automation scenarios (Integromate, Zapier, ...)

  ```bash
  serverless deploy
  ```