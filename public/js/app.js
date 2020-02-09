const weatherForm = document.querySelector('form')              
const search = document.querySelector('input')                   
const messageOne = document.querySelector('#message-1')       
const messageTwo = document.querySelector('#message-2')                 

weatherForm.addEventListener('submit', (e) => {   
    e.preventDefault()                           //  Avoid func re-load the page by default
    messageOne.textContent = "LOADING..."       
    messageTwo.textContent = ""                 //   Clean the <p> from last search resault
    const location = search.value              //    Geting the location value from the user's imput
    fetch(`/weather?address=${location}`).then((response) => {   // Fetch the resault from the query 
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error      
        } else {
            messageOne.textContent = data.location  
            messageTwo.textContent = data.forecast
        } 
    })
})
})