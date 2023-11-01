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
const spreadSheet = document.getElementById('spreadSheet')
const holeSelectContain2 = document.getElementById('holeSelectContain2')
const scoreTableIn = document.getElementById('scoreTableIn')
const scoreTableOut = document.getElementById('scoreTableOut')
const tableIn = document.createElement('table'); // Separate tables for IN and OUT
const tbodyIn = document.createElement('tbody');
const tableOut = document.createElement('table');
const tbodyOut = document.createElement('tbody');

let totalYardageIn = 0;
let totalYardageOut = 0;
let totalYardage = 0;

let totalParIn = 0;
let totalParOut = 0;
let totalPar = 0;

let totalhandiCapIn = 0;
let totalhandiCapOut = 0;
let totalhandiCap = 0

let totalIn = 0;
let totalOut = 0;

scoreTableIn.appendChild(tableIn);
scoreTableOut.appendChild(tableOut);
const playerNames = [];
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
          option.value = `${teeBox.teeType}`;
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

      const selectedCourse = courseData[selectedCourseId];
       


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

     teeBoxSelect.addEventListener('change', () => {
      const selectedCourseId = courseOptions.value;
      const selectedTeeBox = teeBoxSelect.value;
      let yardageRow = document.createElement('tr');
      let yardageRowOut = document.createElement('tr')
      let yardageText = document.createElement('td');
      let yardageTextOut = document.createElement('td');
      let yardageCell;
      let hcpIn = document.createElement('tr')
      let hcpOut = document.createElement('tr')
      let hcpInText = document.createElement('td')
      let hcpOutText = document.createElement('td')

      let parIn = document.createElement('tr')
      let parOut = document.createElement('tr')
      let parInText = document.createElement('td')
      let parOutText = document.createElement('td')

      let holeNumberOut = document.createElement('tr');
        let holeNumber = document.createElement('tr');       
        let realFirstHole = document.createElement('td');
        let secondFirstHole = document.createElement('td'); 
        
        
    secondFirstHole.textContent = 'Hole #';
    realFirstHole.textContent = 'Hole #';     

    
    holeNumberOut.appendChild(secondFirstHole);
    holeNumber.appendChild(realFirstHole);

      parInText.textContent = 'Par'
        parOutText.textContent = 'Par'

      hcpInText.textContent = 'Handicap'
      hcpOutText.textContent = 'Handicap'

      yardageText.textContent = 'Yardage';
      yardageTextOut.textContent = 'Yardage'



      yardageRow.appendChild(yardageText);
      yardageRowOut.appendChild(yardageTextOut)

      

      parIn.appendChild(parInText)
      parOut.appendChild(parOutText)

      hcpIn.appendChild(hcpInText)
      hcpOut.appendChild(hcpOutText)

      tbodyIn.appendChild(yardageRow)
      tbodyOut.appendChild(yardageRowOut)

      

      tbodyIn.appendChild(parIn)
      tbodyOut.appendChild(parOut)

      tbodyIn.appendChild(hcpIn)
      tbodyOut.appendChild(hcpOut)

      

      if (selectedCourseId) {
        let totalYardageIn = 0;
        let totalYardageOut = 0;
        let totalParIn = 0;
        let totalParOut = 0;
        let totalhandiCapIn = 0;
        let totalhandiCapOut = 0;
    
        const selectedCourse = courseData[selectedCourseId];

        for (let i = 1; i <= 18; i++) {
          const holeTd = document.createElement('td');
          const parCell = document.createElement('td')
          const handiCapCell = document.createElement('td')
          const yardageCell = document.createElement('td');
          holeTd.className = 'hole-cell';
          yardageCell.className = 'yardage-cell';
          handiCapCell.className = 'handicap-cell'
          parCell.className = 'par-cell'
        
          if (i <= 9) {
            yardageRow.appendChild(yardageCell);
            hcpIn.appendChild(handiCapCell)
            parIn.appendChild(parCell)
            holeNumber.appendChild(holeTd)
          } else {
            yardageRowOut.appendChild(yardageCell);
            hcpOut.appendChild(handiCapCell)
            parOut.appendChild(parCell)
            holeNumberOut.appendChild(holeTd)
          }
        }
        

        tbodyIn.appendChild(holeNumber)
        tbodyOut.appendChild(holeNumberOut)
        tbodyIn.appendChild(yardageRow)
        tbodyOut.appendChild(yardageRowOut)
        
        tbodyIn.appendChild(parIn)
        tbodyIn.appendChild(parOut)

        tbodyIn.appendChild(hcpIn)
        tbodyOut.appendChild(hcpOut)

        

        scoreTableIn.appendChild(tbodyIn)
        scoreTableOut.appendChild(tbodyOut)

        console.log('Selected Course:', selectedCourse);
  
    

        

        const yardageCells = document.querySelectorAll('.yardage-cell');
        const handiCapCells = document.querySelectorAll('.handicap-cell')
        const parCells = document.querySelectorAll('.par-cell')
        const holeCells = document.querySelectorAll('.hole-cell')

        console.log('Number of yardage cells:', yardageCells.length);
        console.log('Number of handicapcells:', handiCapCells.length);
        console.log('number of parCells', parCells.length)
        
        for (let index = 0; index < selectedCourse.holes.length; index++) {
          const hole = selectedCourse.holes[index];
          
          console.log('Hole:', hole);
    
          if (hole) {

            const realHole = hole.hole
            const holeCell = holeCells[index]
            holeCell.textContent = realHole
            const teeBox = hole.teeBoxes.find(tee => tee.teeType === selectedTeeBox);
    
            console.log('Tee Box:', teeBox);
            console.log('Yards', teeBox.yards)
            console.log('Handicap', teeBox.hcp)
            console.log('par', teeBox.par)
    
            if (teeBox) {
              
              const par = teeBox.par
              const parCell = parCells[index]
              parCell.textContent = par
              const handiCap = teeBox.hcp
              const handiCapCell = handiCapCells[index]
              handiCapCell.textContent = handiCap
              const yardage = teeBox.yards;
              const yardageCell = yardageCells[index]; 
              console.log(yardage)
              yardageCell.textContent = yardage;

              
          
              if (index < 9) {
                  totalYardageIn += yardage;
                  totalParIn += par 
                  totalhandiCapIn += handiCap
                
                  
              } else {
                  totalYardageOut += yardage;
                  totalParOut += par
                  totalhandiCapOut += handiCap
              }
          } else {
              console.log(`Tee box not found for hole ${hole.hole}`);
          }
          }
        }
        let In = document.createElement('td');
        In.textContent = 'IN';
        holeNumber.appendChild(In);
        
        tbodyIn.appendChild(holeNumber);

        const ParInCellTotal = document.createElement('td');
        ParInCellTotal.textContent = `${totalParIn}`;
        parIn.appendChild(ParInCellTotal);

        const ParOutCellTotal = document.createElement('td');
        ParOutCellTotal.textContent = `${totalParOut}`;
        parOut.appendChild(ParOutCellTotal);

        const totalPar = totalParIn + totalParOut;

        const totalParCell = document.createElement('td');
        totalParCell.textContent = `${totalPar}`;
        parOut.appendChild(totalParCell);

        const HandicapTotalIn = document.createElement('td');
        HandicapTotalIn.textContent = `${totalhandiCapIn}`;
        hcpIn.appendChild(HandicapTotalIn);

        const HandicapTotalOut = document.createElement('td');
        HandicapTotalOut.textContent = `${totalhandiCapOut}`;
        hcpOut.appendChild(HandicapTotalOut);

        const totalhandiCap = totalhandiCapIn + totalhandiCapOut;

        const totalHandicapCell = document.createElement('td');
        totalHandicapCell.textContent = `${totalhandiCap}`;
        hcpOut.appendChild(totalHandicapCell);

        
        let Out = document.createElement('td');
        Out.textContent = 'OUT';
        holeNumberOut.appendChild(Out);

        let total = document.createElement('td');
        total.textContent = 'Total';
        holeNumberOut.appendChild(total);

       
      

       

         const totalInYardage = document.createElement('td');
        totalInYardage.textContent = `${totalYardageIn}`;
        yardageRow.appendChild(totalInYardage);

        const totalOutYardage = document.createElement('td');
        totalOutYardage.textContent = `${totalYardageOut}`;
        yardageRowOut.appendChild(totalOutYardage);

        const totalYardage = totalYardageIn + totalYardageOut;

        const totalYardageCell = document.createElement('td');
        totalYardageCell.textContent = `${totalYardage}`;
        yardageRowOut.appendChild(totalYardageCell);

        tbodyIn.appendChild(holeNumber)
        tbodyOut.appendChild(holeNumberOut)

        

        tbodyIn.appendChild(yardageRow)
        tbodyOut.appendChild(yardageRowOut)

        tbodyIn.appendChild(parIn)
        tbodyOut.appendChild(parOut)

        tbodyIn.appendChild(hcpIn)
        tbodyOut.appendChild(hcpOut)

        scoreTableIn.appendChild(tbodyIn)
        scoreTableOut.appendChild(tbodyOut)
    
        console.log(`Total Yardage In: ${totalYardageIn}`);
        console.log(`Total Yardage Out: ${totalYardageOut}`);
      }
    });
    
    
    

  playersSelector.addEventListener('change', () =>{
    
      playersContainer.classList.add('hidden')
  
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

    for (let i = 1; i <= players; i++) {
      const playerInput = document.createElement('input');
      playerInput.placeholder = 'Enter Player Name:';
      playerInput.className = "flex flex-col";
      playerInput.id = `inputName${i}`;
      playersCard.appendChild(playerInput);
      playerInput.focus();

      playerInput.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
              let playerName = document.getElementById(`inputName${i}`).value;
              let playerRow = document.createElement('tr')
              let playerRow2 = document.createElement('tr')

              playerRow.textContent = playerName
              playerRow2.textContent = playerName
              let playerNameContainer = document.createElement('h1');
              playerNameContainer.textContent = playerName;
              playerNameContainer.className = 'flex text-3xl';
              playersCard.appendChild(playerNameContainer);
              playersCard.removeChild(playerInput)

              createPlayerScoreRows(playerName);
          }
          
        });

      }

      const selectedCourseId = courseOptions.value;
      console.log('Selected Course ID:', selectedCourseId);
      if (selectedCourseId){
  
         const selectedCourse = courseData[selectedCourseId];
        console.log('Selected Course Object:', selectedCourse);
  
        const holeNumberContainer = document.createElement('div')
        
        
        console.log(selectedCourse.holes)
  

                  // Assuming you have a table element with an ID "scoreTableIn"
        let playerNameRowIn = document.createElement('tr');

        
        


       




       

        // Add rows to the IN and OUT tables
        tableIn.appendChild(tbodyIn);
        tableOut.appendChild(tbodyOut);

        // Add the tables to the respective divs
        scoreTableIn.appendChild(tableIn);
        scoreTableOut.appendChild(tableOut);


        selectedCourse.holes.forEach((_hole) => {

          const option = document.createElement('option');
          option.value = _hole.hole
          option.textContent = _hole.hole
          holeSelector.appendChild(option);
        });
        
        tableIn.appendChild(tbodyIn)
        scoreTableIn.appendChild(tableIn)

        spreadSheet.addEventListener('click', (event) => {
          scoreTableIn.classList.toggle('hidden')
          scoreTableOut.classList.toggle('hidden')
          holeSelectContain2.classList.toggle('hidden')
          playersCard.classList.toggle('hidden')
        })
    }
  })
}
document.addEventListener('DOMContentLoaded', () => {
  getAvailableCourses();
});


function createPlayerScoreRows(playerName) {
  const playerRowIn = document.createElement('tr');
  const playerRowOut = document.createElement('tr');

  const playerNameCellIn = document.createElement('td');
  playerNameCellIn.textContent = playerName;
  playerRowIn.appendChild(playerNameCellIn);

  const playerNameCellOut = document.createElement('td');
  playerNameCellOut.textContent = playerName;
  playerRowOut.appendChild(playerNameCellOut);

  let totalIn = 0; 
  let totalOut = 0; 

  for (let i = 0; i < 18; i++) {
    const holeScoreCellIn = document.createElement('td');
    const holeScoreCellOut = document.createElement('td');

    holeScoreCellIn.textContent = '';
    holeScoreCellOut.textContent = '';

    if (i < 9) {
      holeScoreCellIn.addEventListener('click', () => {
        const inputElement = document.createElement('input');
        inputElement.placeholder = 'Enter score';
        inputElement.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            const score = parseInt(inputElement.value);
            if (!isNaN(score)) {
              totalIn += score;
              inTotalCellIn.textContent = `${totalIn}`;
              holeScoreCellIn.textContent = score;
              totalCell.textContent = `${totalIn + totalOut}`;
            }
          }
        });

        holeScoreCellIn.innerHTML = '';
        holeScoreCellIn.appendChild(inputElement);
        inputElement.focus();
      });

      playerRowIn.appendChild(holeScoreCellIn);
    } else {
      holeScoreCellOut.addEventListener('click', () => {
        const inputElement = document.createElement('input');
        inputElement.placeholder = 'Enter score';
        inputElement.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            const score = parseInt(inputElement.value);
            if (!isNaN(score)) {
              totalOut += score;
              outTotalCellOut.textContent = `${totalOut}`;
              holeScoreCellOut.textContent = score;
              totalCell.textContent = `${totalIn + totalOut}`;
            }
          }
        });

        holeScoreCellOut.innerHTML = '';
        holeScoreCellOut.appendChild(inputElement);
        inputElement.focus();
      });

      playerRowOut.appendChild(holeScoreCellOut);
    }
  }

  const inTotalCellIn = document.createElement('td');
  inTotalCellIn.textContent = `${totalIn}`;
  playerRowIn.appendChild(inTotalCellIn);

  const outTotalCellOut = document.createElement('td');
  outTotalCellOut.textContent = `${totalOut}`;
  playerRowOut.appendChild(outTotalCellOut);

  const totalCell = document.createElement('td');
  totalCell.textContent = `${totalIn + totalOut}`;
  playerRowOut.appendChild(totalCell);

  tbodyIn.appendChild(playerRowIn);
  tbodyOut.appendChild(playerRowOut);
}


function updateTotalRows(playerRow, totalIn, totalOut) {
  const inTotalCell = document.createElement('td');
  inTotalCell.textContent = `${totalIn}`;
  playerRow.appendChild(inTotalCell);

  const outTotalCell = document.createElement('td');
  outTotalCell.textContent = `${totalOut}`;
  playerRow.appendChild(outTotalCell);
}

