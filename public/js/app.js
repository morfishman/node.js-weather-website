console.log('client side load')


const weatherform = document.querySelector('form')

const serch = document.querySelector('input')

const massege1 = document.querySelector('#mgma1')

// massege1.textContent = 'from script'
const massege2 = document.querySelector('#magma2')

weatherform.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = serch.value
    massege1.textContent = "loading..."
    massege2.textContent = ""
    fetch('http://localhost:3000/weathershow?address=' +location).then((Response) => {
        Response.json().then((date) => {
            if(date.error){
                massege2.textContent = date.error
                massege1.textContent = ""
            }else{
                massege1.textContent = date.location
                massege2.textContent = date.forecast
            }
        })
    })
})