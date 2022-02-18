import React from 'react';
import './style.css';
import RiTa from 'rita';
import { useCallback, useState } from 'react';

const generateWord = () => {
  return RiTa.randomWord({
    // minLength: 5,
    // maxLength: 5
  });
};

const generateNounPhrase = () => {
  return (
    RiTa.randomWord({
      pos: 'a',
    }) +
    ' ' +
    RiTa.randomWord({
      pos: 'n',
    })
  );
};

const generateVerbPhrase = () => {
  const verb = RiTa.randomWord({
    pos: 'v',
  });

  const adverb = RiTa.randomWord({
    pos: 'r',
  });

  if (Math.random() < 0.5) {
    return verb + ' ' + adverb;
  } else {
    return adverb + ' ' + verb;
  }
};

const generatePhrase = () => {
  if (Math.random() < 0.5) {
    return generateNounPhrase();
  } else {
    return generateVerbPhrase();
  }
};

const generatePhraseList = (count = 15) => {
  return [...Array(count)].map(generatePhrase);
};

const generateWordList = (count = 20) => {
  return [...Array(count)].map(generateWord);
};

export default function App() {
  const [wordState, setWordState] = useState(generatePhraseList());
  const [savedItems, setSavedItems] = useState([]);

  const saveItem = useCallback((item) => {
    setSavedItems(savedItems.concat([item]));
  });

  return (
    <div className="App">
      {wordState.map((element) => (
        <p
          onClick={() => {
            saveItem(element);
          }}
        >
          {element}
        </p>
      ))}
      <button onClick={() => setWordState(generatePhraseList())}>
        New list
      </button>
      {savedItems.map((item) => (
        <p>{item}</p>
      ))}
    </div>
  );
}
