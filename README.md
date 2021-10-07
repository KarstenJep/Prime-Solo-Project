# Project Name
What's Hop'nin?

## Description
Duration: 2 Week sprint

An application is needed to save brewers time while also helping to stay organized. What's Hop'nin? is a scheduling/task management app that allows brewers to enter batches of beer with the type, amount, and date of necessary hop additions that need to be added for each batch.


# EDA Project
This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`)

## Prerequisites
Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table
Create a new database called `solo_project` (a full list of tables can be found in `database.sql`)

## Development Setup Instructions
- Run `npm install`
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- The `npm run client` command will open up a browser tab for you at `localhost:3000`

## Lay of the Land
Directory Structure:
- `src/` contains the React application
- `public/` contains static assets for the client-side
- `build/` contains the transpiled code from `src/` and `public/` that will be viewed on the production site
- `server/` contains the Express App

## Usage
 1. User adds a batches of beer with necessary hop additions
 2. User can then view batches or hop additions by date, type, etc
 3. The home page will alert the user to the hop additions needed for the current date
 4. Hop additions can be marked as complete and will be removed from the schedule
 5. Edit and delete features are available to for adjusting, hops, batch
 6. Next step: add push notification alerts

 ## Built With
 - Node
 - React
 - Redux
 - Saga
 - Express
 - PostgreSQL
 - Material-UI
 - Moment.js
 - Passport

 ## Acknowledgement
Thanks to Prime Digital Academy who equipped me with the necessary tools to make this application a reality.

## Support
If you have suggestions or issues, please email kjepsen86@gmail.com
