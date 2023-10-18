

function submit() {
    let age = document.getElementById('age').value
    let gender = document.getElementById('gender').value
    let active = document.getElementById('active').value
    let height = document.getElementById('height').value
    let weight = document.getElementById('weight').value
    let display = document.getElementById('display')

    if(gender === 'M'){
        display.innerHTML = (weight * 10) + (6.25 * height) - (5 * age)
    }else if (gender === 'F') {
        display.innerHTML = (weight * 10) + (6.25 * height) - (5 * age) - 161
    }else {
        alert("Please enter a valid info")
    }


}

function clearFields() {
    let age = document.getElementById('age').value = '';
    let gender = document.getElementById('gender').value = '';
    let active = document.getElementById('active').value ='';
    let height = document.getElementById('height').value = '';
    let weight = document.getElementById('weight').value = '';
    let display = document.getElementById('display').innerHTML = ''

}