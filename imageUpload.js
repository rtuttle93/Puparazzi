const cloudinary = "https://api.cloudinary.com/v1_1/dns8bhr2c/upload"
const cloudinaryPreset = "pxnupib5"

const imgPreview = document.getElementById('img-preview');
const fileUpload = document.getElementById('file-upload');
const image_content = document.getElementById('image_caption');

fileUpload.addEventListener('change', function (event) {

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryPreset)

    axios({
        url: cloudinary,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    }).then(function (res) {
        const image_url = res.data.secure_url

        const response = await fetch(`/api/image`, {
            method: 'POST',
            body: JSON.stringify(
                {image_content, image_url}
            ),
            headers: {
                'Content-Type': 'application/json'
            }


        })


        if (response.ok) {

            createDogPost(event)
            // document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }

    })
}).catch(function (err) {
    alert(err);
})


async function createDogPost(event) {
    event.preventDefault();


    const dogName = document.querySelector('input[name="dog_name"]').value;
    const dogbreed = document.querySelector('#breed').value;;


    const response = await fetch(`/api/dog`, {
        method: 'POST',
        body: JSON.stringify(
            {dogName, dogbreed}
        ),
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
