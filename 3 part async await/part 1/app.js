let favNumber = 12;
let baseURL = "http://numbersapi.com";

// 1.
// async function part1() {
//   let data = await $.getJSON(`${baseURL}/${favNumber}?json`);
//   console.log(data);
// }
// part1();
async function getNumberFactAxios(number) {
  try {
    const response = await axios.get(`http://numbersapi.com/${number}?json`);
    const data = response.data;

    if (data.found) {
      console.log(`Fact about the number ${data.number}: ${data.text}`);
    } else {
      console.log(`No fact found for the number \${number}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching data with Axios:', error);
  }
}

getNumberFactAxios(favNumber);


// // 2.
// const favNumbers = [7, 11, 22];
// async function part2() {
//   let data = await $.getJSON(`${baseURL}/${favNumbers}?json`);
//   console.log(data);
// }
// part2();

async function logMultipleNumberFacts(numbers) {
  try {

    const response = await axios.get(`http://numbersapi.com/${numbers}?json`);
    console.log(response)
  } catch (error) {
    console.error('Error fetching data with Axios:', error);
  }
}

// Example usage with numbers 1, 2, and 3.
logMultipleNumberFacts([1, 2, 3]);

// 3.
// async function part3() {
//   let facts = await Promise.all(
//     Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNumber}?json`))
//   );
//   facts.forEach(data => {
//     $('body').append(`<p>${data.text}</p>`);
//   });
// }
// part3();


async function getMultipleNumberFacts(numbers) {
  try {
    // Join the numbers into a string separated by commas.
    const numbersString = numbers.join(',');
    const response = await axios.get(`http://numbersapi.com/${numbersString}?json`);

    // Iterate over the returned object and display the facts.
    for (const number in response.data) {
      const fact = response.data[number];
      // Create a new paragraph element for each fact and append it to the body.
      const p = document.createElement('p');
      p.textContent = `Fact for number ${number}: ${fact}`;
      document.body.appendChild(p);
    }
  } catch (error) {
    console.error('Error fetching data with Axios:', error);
  }
}

// Example usage with numbers 1, 2, and 3.
getMultipleNumberFacts([1, 2, 3]);
