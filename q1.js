function removeExtraSpaces(str) {
    const words = str.split(' ');
    const filteredWords = words.filter(function(word) {
      return word !== '';
    });
    return filteredWords.join(' ');
  }
  
  const paragraph = "       Write a program         to remove all the     extra spaces         from a        paragraph/string     "
  const result = removeExtraSpaces(paragraph);
  console.log(result);
  