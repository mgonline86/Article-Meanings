# Welcome to Article Meaning App

This Web App helps for performing a detailed multilingual sentiment analysis of text articles from different sources.
It identifies the positive, negative, neutral polarity in any text.
This accomplished by interacting with [The Sentiment Analysis API](https://www.meaningcloud.com/developer/sentiment-analysis) from **Meaning Cloud Site**

### The App was designed to give me practice with:

- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Service workers
- Using APIs and creating requests to external urls

## Starting The App

Follow these steps to run the app successfully:

1. fork this repo.

2. after cloning, install everything:

   `cd` into your new folder and run:

```
npm install
```

3. Setup an account with MeaningCloud from [here](https://www.meaningcloud.com/developer/login), and you will be given a license key to start using the API.

4. Environmental variables setup:

   - Create a new `.env` file in the root of your project
   - Fill the .env file with your API key that you acquired in step No.3 like this:

```
API_KEY=**************************
```

5. Start-up the server by running:

```
npm run start
```

6. Run the app:

- for **development** mode run:

```
npm run build-dev
```

- for **production** mode run the following code then goto http://localhost:8000/ :

```
npm run build-prod
```

7. To test the app using **jest** run:

```
npm run test
```

# The Website App is deployed on HEROKU on this [**LINK**](https://article-meanings.herokuapp.com/)
