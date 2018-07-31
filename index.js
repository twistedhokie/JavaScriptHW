// Define all variables for search function
var $tbody = document.querySelector("tbody"); 
var $dateTimeInput = document.querySelector("#Date"); 
var $cityInput = document.querySelector("#City"); 
var $stateInput = document.querySelector("#State"); 
var $countryInput = document.querySelector("#Country"); 
var $shapeInput = document.querySelector("#Shape"); 
var $searchButton = document.querySelector("#search"); 

// Create event listeners for when the user clicks search or presses "enter"
$searchButton.addEventListener("click", handleSearchButtonClick);

document.addEventListener('keypress', function (e) {
  var key = e.which || e.keyCode;
  if (key === 13) { 
    handleSearchButtonClick(); 
  }
});


// Create variable for searched data
var search_data = dataSet;

// Create table to show searched data
function renderTable(search_data) { 
  $tbody.innerHTML = "";
  for (var i = 0; i < search_data.length; i++) {
    
    var sighting = search_data[i];
    var fields = Object.keys(sighting);
    
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = sighting[field];
    }
  }
}

// Create search function based on what the user enters in the search fields
function handleSearchButtonClick() 
{
  var filterDateTime = $dateTimeInput.value.trim().toLowerCase();  
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();
  
  if (filterDateTime || filterCity || filterState || filterCountry || filterShape)
  {
    if (filterDateTime){ 
     
      search_data = dataSet.filter (function(sighting) { 
        var SightingDateTime = sighting.datetime.toLowerCase();
        return SightingDateTime === filterDateTime;
      });
    } else {search_data = dataSet}; 
    
    if (filterCity){
      
      search_data = search_data.filter (function(sighting) {
        var SightingCity = sighting.city.toLowerCase();
        return SightingCity === filterCity;
      });
    } else {search_data = search_data}; 

    if (filterState){
      search_data = search_data.filter (function(sighting) {
        var SightingState = sighting.state.toLowerCase();
        return SightingState === filterState;
      });
    } else {search_data = search_data}; 

    if (filterCountry){
      search_data = search_data.filter (function(sighting) {
        var SightingCountry = sighting.country.toLowerCase();
        return SightingCountry === filterCountry;
      });
    } else {search_data = search_data}; 

    if (filterShape){
      search_data = search_data.filter (function(sighting) {
        var SightingShape = sighting.shape.toLowerCase();
        return SightingShape === filterShape;
      });
    } else {search_data = search_data}; 


 } else {
  // Show full dataset when the user does not enter any serch criteria
  search_data = dataSet; 
  }
  $('#table').DataTable().destroy(); 
  renderTable(search_data); 
  pagination_UFO(); 
}

// Create pagination function
function pagination_UFO() 
{
  $(document).ready(function() {
    if ( $.fn.dataTable.isDataTable( '#table' ) ) { 
      $('#table').DataTable();
    }
    else {
      $('#table').DataTable({
        "pagingType": "full_numbers",
        destroy: true, 
        paging: true, 
        searching: false 
        });
        } 
      });
}

// Show full dataset table upon page load
renderTable(search_data);
pagination_UFO(); 
