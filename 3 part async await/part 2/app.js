// $(function() {
//   let baseURL = 'https://deckofcardsapi.com/api/deck';

//   // 1.
//   async function part1() {
//     let data = await $.getJSON(`${baseURL}/new/draw/`);
//     let { suit, value } = data.cards[0];
//     console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
//   }

//   // 2.
//   async function part2() {
//     let firstCardData = await $.getJSON(`${baseURL}/new/draw/`);
//     let deckId = firstCardData.deck_id;
//     let secondCardData = await $.getJSON(`${baseURL}/${deckId}/draw/`);
//     [firstCardData, secondCardData].forEach(card => {
//       let { suit, value } = card.cards[0];
//       console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
//     });
//   }

//   // 3.
//   async function setup() {
//     let $btn = $('button');
//     let $cardArea = $('#card-area');

//     let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
//     $btn.show().on('click', async function() {
//       let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
//       let cardSrc = cardData.cards[0].image;
//       let angle = Math.random() * 90 - 45;
//       let randomX = Math.random() * 40 - 20;
//       let randomY = Math.random() * 40 - 20;
//       $cardArea.append(
//         $('<img>', {
//           src: cardSrc,
//           css: {
//             transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
//           }
//         })
//       );
//       if (cardData.remaining === 0) $btn.remove();
//     });
//   }
//   setup();
// });

//1.1 
async function getCard() {
  try {
    // First, make a request to shuffle a new deck and get the deck_id
    const shuffleResponse = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    const deck_id = shuffleResponse.data.deck_id;

    // Then, use the deck_id to draw a card
    const drawResponse = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
    const card = drawResponse.data.cards[0];

    // Log the value and suit of the card
    console.log(`${card.value} of ${card.suit.toLowerCase()}`);
  } catch (error) {
    console.error(error);
  }
}

getCard();


// 2.1 
async function getTwoCards() {
  try {
    // First, make a request to shuffle a new deck and get the deck_id
    const shuffleResponse = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    const deck_id = shuffleResponse.data.deck_id;

    // Then, use the deck_id to draw a card
    const drawResponse1 = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
    const card1 = drawResponse1.data.cards[0];

    // Log the value and suit of the first card
    console.log(`First card: ${card1.value} of ${card1.suit.toLowerCase()}`);

    // Draw another card from the same deck
    const drawResponse2 = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
    const card2 = drawResponse2.data.cards[0];

    // Log the value and suit of the second card
    console.log(`Second card: ${card2.value} of ${card2.suit.toLowerCase()}`);
  } catch (error) {
    console.error(error);
  }
}

getTwoCards();

// 2.3

$(async function() {
  const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
  const data = await response.json();
  const deckId = data.deck_id;
  $('#draw-card').click(async function() {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
      const data = await response.json();
      const cardImage = data.cards[0].image;
      const angle = Math.random() * 90 - 45; // Random angle between -45 and 45
      $('#card-container').append(`<img src="${cardImage}" class="card" style="transform: rotate(${angle}deg);">`);
      if (data.remaining === 0) {
          $('#draw-card').prop('disabled', true);
      }
  });
});

