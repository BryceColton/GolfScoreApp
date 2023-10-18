

function submit() {
    
    let weight = document.getElementById('weight').value
    let height = document.getElementById('height').value    


    let BMI = (weight / (height**2)) * 703


    document.getElementById('BMI').innerHTML = "Your BMI Is: " + BMI.toFixed(1)


    if (BMI < 18.5){
        return document.getElementById('recommend').innerHTML = "You are Underweight";
    } else if(BMI <= 24.9){
        return document.getElementById('recommend').innerHTML = "You are at a Healthy Weight"
    } else if(BMI <= 29.9){
        return document.getElementById('recommend').innerHTML = "You are Overweight"
    } else if(BMI >= 30) {
        return document.getElementById('recommend').innerHTML = "You are Obese"
    }
    



}

function clearFields() {
    console.log('click')
    document.getElementById('weight').value = '';
    document.getElementById('height').value = '';
    document.getElementById('BMI').innerHTML = '';
    document.getElementById('recommend').innerHTML = ''
}