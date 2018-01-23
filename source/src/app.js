var serviceApi = require('./app.service');
var petsByGender=[];

module.exports = {
    load: load,
    processReturnedPeople:processReturnedPeople
};

function load(containerName,config, failCallback) {
    serviceApi.getPeople(config.api_url, function (err, result) {
        processReturnedPeople(err, result, containerName, config, failCallback);
    });
}

function processReturnedPeople(err, result, containerName, config, failCallback) {
    if (result === null || result === undefined) {
        return;
    }
    var malePets=[];
    var femalePets=[];
    filterItems('male',result.body,malePets);
    filterItems('female',result.body,femalePets);
    femalePets = sortByName(femalePets);
    malePets = sortByName(malePets);
    writeMarkup(containerName,'Male');
    writeMarkup(containerName,'Female');
    appendMarkup('Male',malePets);
    appendMarkup('Female',femalePets);

}
function writeMarkup(containerName,listHeader) {
    var element = document.createElement ("ul");
    element.id = listHeader;
    element.innerHTML = listHeader;
    var container = document.getElementById(containerName);
    container.appendChild(element);
}

function appendMarkup(containerName,array) {
    var container = document.getElementById(containerName);
    container.innerHTML += writePets(array);
}
function writePets(pets){
    var petsHtml = pets.length > 0 ? writePetItem(pets) :'<li>No Pets Available</li>';
    return petsHtml;
}
function writePetItem(pets) {
    if (pets === null ||pets === undefined) return '';
    var htmList='';
   pets.forEach(function(element) {
    htmList += '<li><span>'+element.charAt(0).toUpperCase() + element.substr(1).toLowerCase()+'</span></li>';
    });
    return htmList;
  }

function sortByName(arr) {
    if (arr=== null ||arr === undefined) return;
    return arr.sort();
}

function filterItems(query,inputData,arr) {
    return inputData.filter(function(item) {
        return item.gender.toLowerCase().indexOf(query.toLowerCase())>-1;
        
    }).map(function (element) {
        (element.pets === null || element.pets === undefined) ? element.pets = [] : element.pets;
        element.pets.filter(function(item) {
            return (item.pets === []) ? false : item.type.toLowerCase().indexOf('cat')>-1;
        }).map(function (pet) {
            var key = element.gender.toLowerCase();
            return arr.push(pet.name);
        })
    });
  }