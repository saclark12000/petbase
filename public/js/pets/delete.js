var deletePet = {};

deletePet.delConfirm = function (petName, formId){
    if (confirm('Are you sure you want to delete ' + petName + "'s pet record?")){
        document.getElementById(formId).submit();
    } else {
        alert(petName + " will not be removed!");
    }
}

module.exports = deletePet;