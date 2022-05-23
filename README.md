# Crpyto App

## Getting Started

- This app is bootstrapped with create-react-app
- run `npm start` to start the application
- Eslint and Prettier are installed with custom configurations

## Styles

- To create the table, I used the table component from Material UI - as I wanted to learn how to implement components from this library
- I also installed Tailwind CSS to speed up the styling process

## State Management

- I decided to use MobX for state management
- This is a module used by the CFA, and I wanted to improve my knowledge of how to operate a data transferring system
- Alternatively, react-hooks may be the other option

## src Directory

- Any custom styles are stored in `App.css`
- utils contains utility functions across the app. Here I plan to use a transitionStates function which will fade the loading, error, and done states.
- features directory will contain the pages of the page. This is a little unnecessary in this application as there is only one window. However, if I were to increase the size of the app, additional pages would go here.
- components is where I store reusable UI components that will be used on pages
- entities folder is where state managent is handled.

## TypeScript

- I challenged myself to use TypeScript for this app. The typing language is one that I am not versed in. However, I have improved my TypeScript knowledge through building this app.

## Still to do

- Search bar: I plan to use the search bar from Material UI to handle the filtering. I plan to update the store that displays the table data and repopulate the table when there are no keys in the search bar.
- Error State: I plan to put the error state component in App.tsx and will display the component. I will create an errorState variable via MobX and show when errorState is true.
- Jest: I haven't used this library, but I plan to test the loading state, error state, and API calls.
