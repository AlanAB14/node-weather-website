const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const imgWeather = document.querySelector('#image-weather')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    imgWeather.setAttribute('src', '')

        fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                imgWeather.setAttribute('src', data.img)
                }
            })
        })
})