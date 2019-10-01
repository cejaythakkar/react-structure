# Developer guidelines

This document provides some recommended, hopefully standard development guidelines for this project.

## Recommended IDE

The 3 popular cross-platform IDEs available are Visual Studio Code, SublimeText and Atom. Maulik and Nilay recommends Visual Studio Code due to its active community, and its support by Microsoft.

### Recommended Visual Studio Code extensions

* Debugger For Chrome `4.4.3`: Allows breakpoint debugging via VSCode.
* ESLint: Enforces rules set by `.eslintrc.js` config.
* markdownlint: Provides default markdown rules for consistency across projects.
* GitLens: Lets you see specific commit details on every single line of code.
* Git History: Lets you see commit history visually in VSCode.

### Recommended Visual Studio Code settings

* `"editor.renderWhitespace": "all"` - Helps spot trailing whitespaces, and for indentation inconsistencies (i.e. mixture of tabs and spaced indentations).
* `"files.trimTrailingWhitespace": true,` - Automatically trims trailing whitespaces when saving the file.

## Recommended browser environment

Google Chrome is currently our commonly used browser for development.

### Recommended Google Chrome extensions

* React Developer Tools - Allows you to view React components and their states ala HTML Elements tab in developer console.
* Redux DevTools - Allows you to view, edit and traverse the redux store snapshots.
* Markdown Viewer - Drag-n-drop MD files to Chrome Browser to quickly preview changes.

## File / Folder structure

- components
    All functional / stateless component that would not connect to redux store, placed in `/src/app/components` e.g. `Button, Chip, Table, ListView etc.`

- Containers
    All components that would connect to redux store will placed here `src/app/containers/`.
    e.g. `Login, Dashboard etc.`

- React components name must be in `PascalCase` with `.jsx` extension.
- Reducer, action, selectors, css / scss files must be with component. 

```
e.g.
    |-> Containers
       |-> Dashboard 
          |->   - Dashboard.jsx
          |->   - reducer.js
          |->   - actions.js
          |->   - selectors.js
          |->   - constants.js
          |->   - Dashboard.test.jsx
          |->   - Dashboard.scss / Login.css
```
## Redux setup

- Refer `redux.md` file for redux setup.