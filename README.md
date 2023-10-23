# Vermouth Code Challenge

We are creating a credit card portal, and need your help.
Your task is to take some transaction data in a SQLite database and display it on a front-end UI.

## Getting started

`npm run dev`

will start a development server.

When you load up the application, transactions should be fetched from the /api/transactions endpoint and displayed unstyled on the page.

### Setting up database

The SQLite code (using Sequelize) should setup the database automatically. It will be stored in such a way that the data is only persisted for the current editor session. You should find that the data is reseeded automatically if there is none present in the transactions table.

### Running tests

If you would like to run tests, you can do it via the `npm run test` script.

## Specific Tasks

### Back-end

- The API should be filterable by amount (minimum and maximum), status (pending or settled), the merchant and the card number.

### Front-end

This UI should be implemented according to the designs in this [Figma](https://www .figma.com/file/RcIqSzn7T8uBboGixuWxb5/Vermouth-Code-Challenge-Transactions?type=design&node-id=0-1&mode=design&t=EAifwK56mZzGUSeW-0).

## Time Limit

Please take no longer than 2-3 hours on this assignment. We will discuss the project together afterwards. Should there be incomplete pieces, we will pair through finishing, and we may extend the project.

## What we are looking for

1. For the pieces that are finished, we are looking for a complete solution.
2. Polished product work: the project should be functionally complete, and complete the aims for the end-user.
3. Good clean code and patterns.

If Next JS/TS is not your stack, that's ok. Apply best patterns from what you are familiar with.

## Submission

I ran out of time to add more tests, with more time this would have been a high priority to finish. The functionality
in the app currently is limited, so I felt comfortable testing the app myself, but with future development/additions
it would become paramount to have a solid testing solution. For my preference I lean more on integration and end-to-end tests than unit tests, but unit tests are still useful (especially for utils and custom hooks)

Additionally, there are several things in the app that could be improved with more time:

### Better state management

Currently using only useState and passing down via props. This is not problematic for the size and complexity of the app, but I could see this quickly getting unmanageable in it's current state as more components are added and the state becomes more complicated. Moving some pieces of state into context and injecting could be useful to prevent prop drilling. There may also be a need to implement useReducer or even bring in a 3rd party management solution like RTK to better manage.

### Better filter component

I opted to have one filter component that could return a select or an input. Some of the structure of this may be too hard-coded (such as the usage of number for the input type) to be flexible enough for future filters. This components could use some addtional logic, or even split into SelectFilter and InputFilter components to separate the logic.

### Reset All Filters

A button to clear all current filters would be useful for users rather than requiring them to manually set each one back to blank.
