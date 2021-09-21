async function dogFetch(event) {
  event.dogFetch();


  const dogbreed = document.querySelector('#breed').value;

      //Fetch request for the Dog Breed API will go here
        fetch ('https://thedogapi.com/v1/images?api_key=bad54d8d-3c53-4bba-8a4c-acfb15a2237c')

        .then(breedFetched => {
      return breedFetched.json();
    })
    .then(breedFetched => {
     
      var articleTitle = breedFetched.query
      console.log(articleTitle)

      //Then append that data to the page where appropriate
})
};

document.querySelector('#submit').addEventListener('submit', dogFetch);