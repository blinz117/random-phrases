import React from 'react';
import './style.css';
import { generateMapWithIdsForListItems } from './ids.js';
import RiTa from 'rita';
import { useCallback, useState, useEffect } from 'react';

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

const generatePhraseListWithIds = (count = 15) => {
  const phraseList = generatePhraseList();
  return generateMapWithIdsForListItems(phraseList);
};

export default function App() {
  const [wordState, setWordState] = useState(generatePhraseListWithIds());
  const [savedItems, setSavedItems] = useState(new Map());

  const saveItem = useCallback((item) => {
    const newMap = new Map(savedItems);
    newMap.set(item[0], item[1]);
    setSavedItems(newMap);
  });

  const deleteSavedItem = useCallback((itemId) => {
    const newMap = new Map(savedItems);
    newMap.delete(itemId);
    setSavedItems(newMap);
  });

  return (
    <div className="App">
      {Array.from(wordState, (mapElement) => {
        return mapElement;
      }).map((element) => (
        <p
          onClick={() => {
            saveItem(element);
          }}
          key={element[0]}
        >
          {element[1]}
        </p>
      ))}
      <button onClick={() => setWordState(generatePhraseListWithIds())}>
        New list
      </button>
      {Array.from(savedItems, (mapElement) => {
        return mapElement;
      }).map((item) => (
        <p
          onClick={() => {
            deleteSavedItem(item[0]);
          }}
          key={item[0]}
        >
          {item[1]}
        </p>
      ))}
    </div>
  );
}
