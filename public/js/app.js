const weatherForm = document.querySelector('form')              
const search = document.querySelector('input')                   
const messageOne = document.querySelector('#message-1')       
const messageTwo = document.querySelector('#message-2')                 

weatherForm.addEventListener('submit', (e) => {   // Event listener for on click 
    e.preventDefault()                           //  Avoid the function to re-load the page by default
    messageOne.textContent = "LOADING..."       
    messageTwo.textContent = ""                 //   Clean the <p> from last search resault
    const location = search.value              //    Geting the location value from the user's imput
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {   // Fetch the resault from the query 
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error      // Printing error if needed
        } else {
            messageOne.textContent = data.location  //  Printing resaulr
            messageTwo.textContent = data.forecast
        } 
    })
})
})