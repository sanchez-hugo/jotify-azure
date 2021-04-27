const vowels = ["a", "e", "i", "o", "u", "y"];

const isCharSyllable = (letter) => {
  // make sure already lowercase
  if (letter) {
    if (vowels.includes(letter)) return true;
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
  word = word.toLowerCase();
  word = word.replace(/[^a-z]/g, "");
  const limit = word.length;

  for (let i = 0; i < limit; i++) {
    /* Fear not, for this will all be refactored. */
    if (isCharSyllable(word[i])) {
      const next = i + 1;
      const secondNext = i + 2;
      const thirdNext = i + 3;
      const fourthNext = i + 4;
      const fifthNext = i + 5;
      // const sixthNext = i + 6;

      // if (sixthNext < limit) {
      // }

      if (fifthNext < limit) {
        if (
          isCharSyllable(word[i]) &&
          word[next] === "n" &&
          word[secondNext] === "c" &&
          word[thirdNext] === "h" &&
          word[fourthNext] === "e" &&
          word[fifthNext] === "d"
        )
          continue;
      }

      if (fourthNext < limit) {
        if (
          isCharSyllable(word[i]) &&
          word[next] === "n" &&
          word[secondNext] === "c" &&
          word[thirdNext] === "e" &&
          word[fourthNext] === "d"
        )
          continue;
        else if (
          isCharSyllable(word[i]) &&
          word[thirdNext] === "e" &&
          word[fourthNext] === "d"
        )
          continue;
      }

      if (thirdNext < limit) {
        if (word[i] === "a") {
          if (word[secondNext] === "e") {
            if (word[next] === "k") {
              if (word[thirdNext] === "r") {
                syllables++;
              }
            } else if (word[next] === "f") {
              if (word[thirdNext] === "r") {
                syllables++;
              }
            }
          } else if (word[thirdNext] === "e") {
            if (fourthNext < limit && word[fourthNext] === "r");
            else if (word[next] === "b" && word[secondNext] === "l");
            else if (word[next] === "n" && word[secondNext] === "g") {
              if (word.substring(limit - 2) === "es");
              else continue;
            } else continue;
          }
        } else if (word[i] === "e") {
        } else if (word[i] === "i" && word[secondNext] === "e") {
          if (word[next] === "d" && word[thirdNext] === "d") {
            syllables++;
          }
        } else if (word[i] === "o" && word[thirdNext] === "e") {
          if (word[next] === "s" && word[secondNext] === "s") {
            if (fourthNext < limit && word[fourthNext] === "s");
            else continue;
          } else if (word[next] === "b" && word[secondNext] === "b") continue;
        } else if (word[i] === "u" && word[secondNext] === "e") {
          if (word[next] === "d" && word[thirdNext] === "d") {
            syllables++;
          }
        }
      }

      if (secondNext < limit) {
        if (
          isCharSyllable(word[i]) &&
          isCharSyllable(word[next]) &&
          isCharSyllable(word[secondNext])
        )
          continue;
        else if (word[i] === "a") {
          if (word[secondNext] === "e") {
            if (thirdNext < limit && word[thirdNext] === "d");
            if (word[next] === "k") continue;
            if (word[next] === "f") continue;
          }
        } else if (word[i] === "e") {
          if (word[secondNext] === "e") {
            if (secondNext === limit - 1) {
              if (word[next] === "r") continue;
              else if (word[next] === "v") continue;
              else if (word[next] === "m") continue;
            }
          }
        } else if (word[i] === "i") {
          if (word[secondNext] === "e") {
            if (secondNext === limit - 1) continue;
            else if (word[next] === "v" && word[limit - 1] !== "e");
            else if (word[next] === "n");
            else continue;
          }
        } else if (word[i] === "o") {
          if (word[secondNext] === "e") {
            if (word[next] === "d" && word[thirdNext] === "d");
            else if (
              word[next] !== "k" &&
              word[next] !== "l" &&
              word[next] !== "c"
            )
              continue;
          }
        } else if (word[i] === "u") {
          if (word[secondNext] === "e") {
            continue;
          }
        }
      }

      // Are there any words that have two syllables in a row?
      //#region Old Formula
      // if (next < limit) {
      //   if (word[i] === word[next]) {
      //     continue;
      //   } else if (word[i] === "e" && word[next] === "a") {
      //     continue;
      //   } else if (word[i] === "a" && word[next] === "i") {
      //     continue;
      //   } else if (word[i] === "i" && word[next] === "e") {
      //     continue;
      //   } else if (word[i] === "e" && word[next] === "i") {
      //     continue;
      //   } else if (word[i] === "o" && word[next] === "u") {
      //     continue;
      //   } else if (word[i] === "o" && word[next] === "y") {
      //     continue;
      //   } else if (word[i] === "e" && word[next] === "y") {
      //     continue;
      //   } else if (word[i] === "u" && word[next] === "e") {
      //     continue;
      //   }
      // }
      //#endregion
      if (next < limit) {
        if (isCharSyllable(word[i]) && isCharSyllable(word[next])) continue;
        if (word[i] === "e" && word[next] === "d");
      }

      syllables += 1;
    }
  }

  return syllables;
};

const countSyllablesInWordV2 = (word) => {
  if (!word) return 0;
  word = word.toLowerCase(); //word.downcase!
  let original = word;
  if (word.length <= 2) {
    return 1;
  } //return 1 if word.length <= 3
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, ""); //word.sub!(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
  word = word.replace(/^y/, ""); //word.sub!(/^y/, '')
  let match = word.match(/[aeiouy]{1,2}/g); //word.scan(/[aeiouy]{1,2}/).size

  let count = match ? match.length : 0;

  if (original.includes("ges")) count++;
  return count;
};

export {
  isCharSyllable,
  doesWordContainSyllable,
  countSyllablesInWord,
  countSyllablesInWordV2,
};
