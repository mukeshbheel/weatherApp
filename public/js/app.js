// const { response } = require("express");

console.log('javascript file ')

fetch('/weather?').then((response) => {
    response.json().then((data)=>{
        console.log(data)
    })
})

const formElement = document.querySelector('form');
const search = document.querySelector('input')
const forcast_message = document.querySelector('#forcast_message')
const place_message = document.querySelector('#place_message')
const temprature_message = document.querySelector('#temprature_message')
const feelslike_message = document.querySelector('#feelslike_message')
const error_message = document.querySelector('#error_message')


formElement.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value;
    console.log(location)
    error_message.textContent = 'loading...'
    place_message.textContent =""
    temprature_message.textContent=""
    feelslike_message.textContent=""
    forcast_message.textContent = ''

    fetch('weather?address='+location+'').then((response) => {
        response.json().then((data) => {
            // console.log(place,forcast, feelsLike, temprature)
            if(data.error){
                forcast_message.textContent = ''
               return error_message.textContent = data.error
            }
            place_message.textContent = data.place;
            forcast_message.textContent = data.forcast[0]
            feelslike_message.textContent = "Feels Like: "+data.feelsLike+ " degree C"
            temprature_message.textContent = "Temprature: "+data.temprature+ " degree C"
            error_message.textContent = data.error

        })
    })
})