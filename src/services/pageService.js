const isCharSyllable = (letter) => {
  if (letter) {
    const char = letter.toLowerCase();
    if (char === "a") return true;
    else if (char === "e") return true;
    else if (char === "i") return true;
    else if (char === "o") return true;
    else if (char === "u") return true;
    else if (char === "y") return true;
  }
  return false;
};

const doesWordContainSyllable = (word) => {
  word.toLowerCase();

  for (const letter in word) {
    if (isCharSyllable(letter)) return true;
  }

  return false;
};

const countSyllablesInWord = (word) => {
  // returns number of syllables
  let syllables = 0;
  const limit = word.length;

  for (let i = 0; i < limit; i++) {
    if (isCharSyllable(word[i])) {
      const next = i + 1;
      const secondNext = i + 2;
      const thirdNext = i + 3;
      const fourthNext = i + 4;

      if (thirdNext < limit) {
        if (word[i] === "a" && word[thirdNext] === "e") {
          if (fourthNext < limit && word[fourthNext] === "r");
          else continue;
        } else if (word[i] === "o" && word[thirdNext] === "e") {
          if (word[next] === "s" && word[secondNext] === "s") {
            if (fourthNext < limit && word[fourthNext] === "s");
            else continue;
          }
        }
      }

      if (secondNext < limit) {
        if (word[i] === "a" && word[secondNext] === "e") {
          if (word[next] !== "k") continue;
        } else if (word[i] === "e" && word[secondNext] === "e") {
          if (word[next] === "r" || word[next] === "v") continue;
        } else if (word[i] === "o" && word[secondNext] === "e") {
          if (word[next] !== "k" && word[next] !== "l" && word[next] !== "c")
            continue;
        } else if (word[i] === "i" && word[secondNext] === "e") {
          continue;
        } else if (word[i] === "u" && word[secondNext] === "e") {
          continue;
        } else if (
          word[i] === "y" &&
          word[next] === "o" &&
          word[secondNext] === "u"
        ) {
          continue;
        }
      }

      if (next < limit) {
        if (word[i] === word[next]) {
          continue;
        } else if (word[i] === "e" && word[next] === "a") {
          continue;
        } else if (word[i] === "a" && word[next] === "i") {
          continue;
        } else if (word[i] === "i" && word[next] === "e") {
          continue;
        } else if (word[i] === "e" && word[next] === "i") {
          continue;
        } else if (word[i] === "o" && word[next] === "u") {
          continue;
        } else if (word[i] === "o" && word[next] === "y") {
          continue;
        } else if (word[i] === "e" && word[next] === "y") {
          continue;
        } else if (word[i] === "u" && word[next] === "e") {
          continue;
        }
      }

      syllables += 1;
    }
  }

  return syllables;
};

export { isCharSyllable, doesWordContainSyllable, countSyllablesInWord };
