const weatherForm = document.querySelector('form')              
const search = document.querySelector('input')                   
const messages = document.getElementsByTagName('p')                        

weatherForm.addEventListener('submit', (e) => {   
    e.preventDefault()                           //  Avoid func re-load the page by default
    messages[0].textContent = "LOADING..."       
    messages[1].textContent = ""                 //   Clean the <p> from last search resault
    const location = search.value              //    Geting the location value from the user's imput
    fetch(`/weather?address=${location}`).then((response) => {   // Fetch the resault from the query 
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error      
        } else {
            const forecastStr = data.forecast.split("!")
            messages[0].textContent = data.location
            
            for (let i=0; i <= messages.length; i++){
                messages[i+1].textContent = forecastStr[i] 
            }
        } 
    })
})
})