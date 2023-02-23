
# Recoil Devtools

A devtools for Recoil state management library.

Read more about Recoil here:  https://recoiljs.org/

It aims to debug and analyze state changes across atoms and selectors for any react webpage using recoil.



# Development Setup and usage

1. clone the repo
2. Run `npm i`
3. Run `npm run build`
4. Test directory has a sample webpage using react+recoil for testing the extension.
Run `cd test && npm i`

Run `npm run start`

5. on chrome browser, open `chrome://extensions` in a new tab.
On right hand corner of the toolbar, turn-on `developer mode`

click on `load unpacked`, choose the directory containing this repo

6. On a new tab, open `localhost:3000` to load the test webpage.
7. open chrome inspect, open a panel named `recoil devtools`
