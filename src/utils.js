  import axios from "axios";
  
  //Fisher-Yates shuffling algorithm (returns new array)
  export function shuffle(arr) {
    let array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  export function getQuestions(numQuestions) {
    return axios.get("https://the-trivia-api.com/api/questions?limit=" + numQuestions.toString())
      .then((response) => {return response.data})
      .catch((err) => {
        console.log(err.message);
      });
  };