async function createDogPost(event) {
  event.preventDefault();


  const dogName = document.querySelector('input[name="dog_name"]').value;
  const dogbreed = document.querySelector('#breed').value;;
 

  const response = await fetch(`/api/dog`, {
    method: 'POST',
    body: JSON.stringify({
      dogName,
      dogbreed,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  
  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.submit-btn').addEventListener('submit', createDogPost);
