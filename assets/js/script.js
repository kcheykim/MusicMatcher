var apiUrl = ''
var apiKey = ''
var submitBtnEl = $('.searchBtn');
var input = $('input')
var searchResults = input.value;



function getSong() {
    fetch(apiUrl + searchResults)
    .then(function(response) {
        if (response.status !=200) {
            console.log('Something went Wrong' + response.status)
            return;
        }
        else {
            response.json()
            .then(function(data) {
                console.log(data);
            })
        }
    })
}




submitBtnEl.on('click', getSong);