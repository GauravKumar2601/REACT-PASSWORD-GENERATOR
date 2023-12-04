import { useCallback, useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState();
  const btn = document.getElementById("copyBtn");

  //useRef hook to show copy pwd
  const passwordRef = useRef(null);

  //Using useCallback for optimization(memoization) acc to dependencies
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "~!@#$%^&*()_={}[]<>?/|:;'";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select(); // Highlights the selected text,
    //'?' - denotes optional select, avoids null
    passwordRef.current?.setSelectionRange(0, 100); //Sets a range to select the text
    window.navigator.clipboard.writeText(password); //Adding selected text to the clipboard

    //Changing the btn color
    btn.classList.toggle("bg-blue-900");
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div
        className="w-full flex flex-wrap justify-center max-w-md mx-auto shadow-md 
    rounded-lg py-7 px-4 my-8 text-orange-500 bg-gray-700"
      >
        <h1 className="text-2xl text-white text-center my-1">
          Password Generator
        </h1>
        <div
          className="flex shadow
        rounded-lg overflow-hidden w-full"
        >
          <input
            type="text"
            value={password}
            className="outline-none w-full my-1 py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={() => {
              copyPasswordToClipboard();
            }}
            id="copyBtn"
            className="outline-none bg-blue-700 text-white
          px-3 my-1 rounded-r-lg shrink-0"
          >
            copy
          </button>
        </div>
        <div className="flex text-small gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              name="range"
              id="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="range">Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              name="numberInput"
              id="numberInput"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              name="charInput"
              id="charInput"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
