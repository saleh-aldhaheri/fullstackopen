# React basics — cheat sheet

Quick reference for getting started with React using Vite.

## Setup

```bash
npm create vite@latest        # choose: project name, React, JavaScript
cd <project-name>
npm install
npm run dev                   # starts on http://localhost:5173
```

Default dev port is `5173` — Vite bumps to the next free port if it's taken.

## Minimal app structure

**main.jsx**

```jsx
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

**App.jsx**

```jsx
const App = () => {
  return (
    <div>
      <p>Hello world</p>
    </div>
  );
};

export default App;
```

> Never forget `export default App` — without it the app breaks.

## Components

- A component is just a JavaScript function (usually an arrow function) that returns JSX.
- Component names **must start with a capital letter** — lowercase names are treated as built-in HTML tags and silently ignored.
- A component's function body can contain any JS: variables, `console.log`, calculations.

```jsx
const Hello = () => {
  console.log("rendering Hello");
  return <p>Hello world</p>;
};
```

Use it like an HTML tag, as many times as you like:

```jsx
<Hello />
<Hello />
```

## JSX quick rules

| Rule                               | Example                                              |
| ---------------------------------- | ---------------------------------------------------- |
| Looks like HTML, compiles to JS    | `<p>Hi</p>` → `React.createElement('p', null, 'Hi')` |
| Every tag must close               | `<br />` not `<br>`                                  |
| Embed JS with curly braces         | `<p>{a + b}</p>`                                     |
| Only **one root element** returned | wrap in `<div>` or `<> </>` (fragment)               |
| Only primitives render             | numbers/strings — **not objects**                    |

**Fragment syntax** (avoids extra wrapper `<div>` in the DOM):

```jsx
const App = () => {
  return (
    <>
      <h1>Greetings</h1>
      <Hello />
    </>
  );
};
```

## Props — passing data to components

```jsx
const Hello = props => {
  return (
    <p>
      Hello {props.name}, you are {props.age} years old
    </p>
  );
};

const App = () => {
  const name = "Peter";
  const age = 10;

  return (
    <div>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  );
};
```

- Props arrive as a single object argument.
- String values: `name="Maya"`. JS expressions/variables: wrap in `{}`.
- `console.log(props)` inside a component is a handy way to inspect what was passed.

## Common errors & fixes

| Symptom                                  | Cause                                             | Fix                                                     |
| ---------------------------------------- | ------------------------------------------------- | ------------------------------------------------------- |
| Component renders as empty tag           | Name starts with lowercase                        | Capitalize: `Footer`, not `footer`                      |
| "Adjacent JSX elements must be wrapped"  | Multiple root elements returned                   | Wrap in `<div>` or `<>...</>`                           |
| "Objects are not valid as a React child" | Rendering an object directly, e.g. `{friends[0]}` | Access primitive fields: `{friends[0].name}`            |
| ESLint warning `react/prop-types`        | Missing prop-types validation (React ≤18)         | Add `'react/prop-types': 0` to `eslint.config.js` rules |

## Golden rule

**Keep the browser console open at all times.** Errors and `console.log` output are your main debugging tools — don't guess, read the console.

---

# Day 2 — State, event handlers & re-rendering

## Destructuring (JS, ES6)

Pulls values out of an object/array straight into variables. Used constantly with `props` and with `useState`.

```jsx
// instead of props.name, props.age everywhere:
const Hello = (props) => {
  const { name, age } = props
  ...
}

// or destructure right in the function signature:
const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age
  return <p>Hello {name}, you are {age} years old</p>
}
```

`useState` also returns an array, destructured the same way:

```jsx
const [counter, setCounter] = useState(0);
```

## Component helper functions

A component's function body can define its own helper functions — they can read `props` directly, no need to pass them as arguments.

```jsx
const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
};
```

## Why re-rendering needs state

Changing a plain variable (`counter += 1`) and calling `root.render()` again manually **works but isn't the React way** — it means managing re-renders yourself. React's state hook does this automatically.

## useState — the state hook

```jsx
import { useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0); // [value, setter]

  return <div>{counter}</div>;
};
```

- `useState(initialValue)` returns `[currentValue, setterFunction]`.
- Calling the setter (e.g. `setCounter(counter + 1)`) tells React to **re-render** the component.
- On re-render, the whole component function body runs again — `useState` now returns the _new_ value.

## Event handlers

Register with attributes like `onClick`. The value **must be a function or function reference — never a function call.**

```jsx
// ✅ correct — function reference
<button onClick={() => setCounter(counter + 1)}>plus</button>

// ✅ also correct — named function
const increaseByOne = () => setCounter(counter + 1)
<button onClick={increaseByOne}>plus</button>

// ❌ wrong — this CALLS setCounter on every render → infinite re-render loop
<button onClick={setCounter(counter + 1)}>plus</button>
```

Convention: name the prop `onSomething` (e.g. `onClick`) and the function `handleSomething` or a descriptive verb (`increaseByOne`).

## Passing state down to child components

Best practice: **lift state up** to the closest common ancestor, then pass it down via props.

```jsx
const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const [counter, setCounter] = useState(0);

  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1);
  const setToZero = () => setCounter(0);

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={increaseByOne} text="plus" />
      <Button onClick={setToZero} text="zero" />
      <Button onClick={decreaseByOne} text="minus" />
    </div>
  );
};
```

When `App` re-renders (state changed), **all its children re-render too**, receiving fresh props.

## Debugging state changes

Sprinkle `console.log` in the component body and inside handlers to see exactly when renders happen and what values are involved — don't guess.

```jsx
console.log("rendering with counter value", counter);
```

## Day 2 quick-reference table

| Concept                         | Key rule                                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------- |
| `useState(initial)`             | Returns `[value, setter]`; calling setter triggers re-render                          |
| Event handler value             | Must be a function reference, e.g. `onClick={fn}` — **not** `onClick={fn()}`          |
| Helper functions in a component | Can access `props`/state directly, no need to pass as args                            |
| Destructuring                   | `const { a, b } = obj` or straight in params: `({ a, b }) => ...`                     |
| Lifting state up                | Keep state in the closest common parent, pass down via props                          |
| Re-render trigger               | Only calling the state setter causes a re-render — mutating a plain variable does not |
