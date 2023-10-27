const url = 'https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json';

const mainContainer = document.getElementById('mainContainer')
const courseOptions = document.getElementById('course-select');
const courseSelectContainer = document.getElementById('courseSelectContainer');
const teeBoxContainer = document.getElementById('teeBoxContainer');
const teeBoxSelect = document.getElementById('teeBoxSelect');
const playersContainer = document.getElementById('playersContainer')
const playersSelector = document.getElementById('playersSelector')
const holeNumberContainer = document.getElementById('holeSelectContainer')
const holeSelector = document.getElementById('holeSelector')
let players = 0;
let teeGame= '';


let courseData = {};

async function fetchCourseData(courseUrl) {
  const response = await fetch(courseUrl);
  return response.json();
}

async function getAvailableCourses() {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  const firstOption = document.createElement('option');
  firstOption.value = null;
  firstOption.textContent = '';
  courseOptions.appendChild(firstOption)

  data.forEach(async (course) => {
    const courseDataResponse = await fetchCourseData(course.url);
    console.log(courseDataResponse);
    courseData[course.id] = courseDataResponse;

    const option = document.createElement('option');
    option.value = course.id;
    option.textContent = course.name;
    option.className = "text-xl"
    courseOptions.appendChild(option);
  });


  courseOptions.addEventListener('change', () => {
    const selectedCourseId = courseOptions.value;
    console.log('Selected Course ID:', selectedCourseId);

    if (selectedCourseId) {
      courseSelectContainer.classList.add('hidden');
      teeBoxContainer.classList.remove('hidden');
    
      const selectedCourse = courseData[selectedCourseId];
      console.log('Selected Course Object:', selectedCourse);

      const firstOption = document.createElement('option');
      firstOption.value = null;
      firstOption.textContent = '';
      teeBoxSelect.appendChild(firstOption)
    
      if (selectedCourse && selectedCourse.holes) {
        const firstHole = selectedCourse.holes[0];
        firstHole.teeBoxes.forEach((teeBox) => {
          console.log(teeBox.teeColorType)
          const option = document.createElement('option');
          option.value = `${teeBox.teeType} (${teeBox.teeColorType})`;
          option.textContent = `${teeBox.teeType} (${teeBox.teeColorType})`;
          teeBoxSelect.appendChild(option);
        });
      }
    }
  });

  teeBoxSelect.addEventListener('change', () =>{
    const selectedCourseId = courseOptions.value;
    console.log('Selected Course ID:', selectedCourseId);
    if (selectedCourseId){
      teeBoxContainer.classList.add('hidden');

      playersContainer.classList.remove('hidden');
      const firstOption = document.createElement('option');
      firstOption.value = null;
      firstOption.textContent = '';
      playersSelector.appendChild(firstOption)

      for (let i = 1; i <= 4; i++){
        console.log(i)
        const option = document.createElement('option');
        option.value = i
        option.textContent = i
        playersSelector.appendChild(option);

      }
      
      
      
     } })

  playersSelector.addEventListener('change', () =>{
    

  
      playersContainer.classList.remove('hidden');
      holeNumberContainer.classList.remove('hidden')

      let playersCard = document.createElement('div')
      playersCard.className = "flex h-full w-full flex-col items-between justify-around"
      mainContainer.appendChild(playersCard)

    players = playersSelector.value
    const playersNumber = document.createElement('div')
    playersNumber.textContent = `Number of Players:${players}`
    playersCard.appendChild(playersNumber)

    teeGame = teeBoxSelect.value;
    const teeGameContainer = document.createElement('div')
    teeGameContainer.textContent = `Game Tee: ${teeGame}`
    teeGameContainer.className = 'flex text-3xl'
    playersCard.appendChild(teeGameContainer)

      for (let i = 1; i <= players; i++){
        const playerInput = document.createElement('input')
        const playerLabel = document.createElement('h2')
        playerLabel.textContent = 'Enter Player Name:'
        playerInput.className = "flex flex-col"
        playersCard.appendChild(playerLabel)
        playersCard.appendChild(playerInput)

    

      }

      const selectedCourseId = courseOptions.value;
      console.log('Selected Course ID:', selectedCourseId);
      if (selectedCourseId){
  
         const selectedCourse = courseData[selectedCourseId];
        console.log('Selected Course Object:', selectedCourse);
  
        const holeNumberContainer = document.createElement('div')
        
        
        console.log(selectedCourse.holes)
  
      
  
        selectedCourse.holes.forEach((_hole) => {
          console.log(_hole.hole)
          const option = document.createElement('option');
          option.value = _hole.hole
          option.textContent = _hole.hole
          holeSelector.appendChild(option);
        });
          
        
      
    }


 
  })

       
}
  





document.addEventListener('DOMContentLoaded', () => {
  getAvailableCourses();
});

