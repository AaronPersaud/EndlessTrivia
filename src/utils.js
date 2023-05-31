  //Fisher-Yates shuffling algorithm (returns new array)
  export function shuffle(arr) {
    let array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  export function getQuestions() {
    return fetch("https://the-trivia-api.com/api/questions?limit=10")
      .then((response) => {return response.json()})
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };