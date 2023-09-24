const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const width1 = document.querySelector(".width--0");
const width2 = document.querySelector(".width--1");
const div1 = document.querySelector(".div--0");
const div2 = document.querySelector(".div--1");
const main = document.querySelector(".main");

const namePlayOne = document.querySelector("#p1")
const namePlayTwo = document.querySelector("#p2")
const value = document.querySelector("#value")
const btnStart = document.querySelector("#btn-start")
const oldNameOne = document.getElementById('name--0')
const oldNameTwo = document.getElementById('name--1')
const popupOverlay = document.querySelector(".popup-overlay")
const popup = document.querySelector(".popup")
const oldValue = document.querySelector(".btn--value")

const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

const rotationValues = [
    { minDegree: 0, maxDegree: 30, value: 2 },
    { minDegree: 31, maxDegree: 90, value: 1 },
    { minDegree: 91, maxDegree: 150, value: 6 },
    { minDegree: 151, maxDegree: 210, value: 5 },
    { minDegree: 211, maxDegree: 270, value: 4 },
    { minDegree: 271, maxDegree: 330, value: 3 },
    { minDegree: 331, maxDegree: 360, value: 2 },
  ];

const data = [1, 1, 1, 1, 1, 1];

let pieColors = [
    "#e7c8a0",
    "#faedcd",
    "#e7c8a0",
    "#faedcd",
    "#e7c8a0",
    "#faedcd",
  ];

  let myChart = new Chart(wheel, {
    plugins: [ChartDataLabels],
    type: "pie",
    data: {
      labels: [1, 2, 3, 4, 5, 6],
      datasets: [
        {
          backgroundColor: pieColors,
          data: data,
        },
      ],
    },
    options: {
      responsive: true,
      animation: { duration: 0 },
      plugins: {
        tooltip: false,
        legend: {
          display: false,
        },
        datalabels: {
          color: "#606c38",
          formatter: (_, context) => context.chart.data.labels[context.dataIndex],
          font: { size: 24 },
        },
      },
    },
  });


score0El.textContent = 0;
score1El.textContent = 0;
let currentscore = 0;
const scores = [0, 0];
let activePlayer = 0;
let playing = true;

// start popup
let newValue = 0
btnStart.onclick = ()=>{
   
    if(namePlayOne.value != "" && namePlayTwo.value != ""){
        if(value.value.length > 1){
            console.log(value.value.length);
            oldNameOne.textContent = namePlayOne.value
            oldNameTwo.textContent = namePlayTwo.value
            oldValue.textContent = value.value
            newValue = value.value
            document.body.classList.remove("show")
            main.classList.remove("filter")
        }else{
            alert("Enter a number between 10 and 99")
        }
    }else{
        alert("Enter the names of the players")
    }
   
}

value.textContent = ""

btnNew.onclick = ()=>{
    document.body.classList.add("show")
    main.classList.add("filter")
    namePlayOne.value = ''
    namePlayTwo.value = ''
    value.value = ""

}
// end popup




const switchPlayer = function () {
  currentscore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentscore;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  div1.classList.toggle("active");
  div2.classList.toggle("active");
};


let active = 0;
btnHold.addEventListener("click", function () {
    // myChart.options.rotation = 0
  if (playing) {
    scores[activePlayer] += currentscore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
      document.querySelector(`.width--${activePlayer}`).style.width = `${scores[activePlayer] * 100 / newValue}%`
      myChart.update()

    if (scores[activePlayer] >= newValue) {
      playing = false;
      document.getElementById(`score--${activePlayer}`).textContent = "😎";
      div1.classList.add("active");
      div2.classList.add("active");
      switchPlayer();
      document.getElementById(`score--${activePlayer}`).textContent = "🥴";
      
      document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
      active = activePlayer == 1 ? 0 : 1;
      document
      .querySelector(`.player--${active}`)
      .classList.add("player--active");
    } else {
      switchPlayer();
      myChart.update()
      
    }
  }
});


btnNew.addEventListener("click", function () {
  playing = true;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  activePlayer = 0;
  document.querySelector(".player--0").classList.add("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
  div1.classList.add("active");
  div2.classList.remove("active");
  scores[0] = 0;
  scores[1] = 0;
  document.getElementById("score--0").textContent = 0;
  document.getElementById("score--1").textContent = 0;
  width1.style.width = 0
  width2.style.width = 0
});


const valueGenerator = (angleValue) => {
  if(playing){
      for (let i of rotationValues) {
        if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
          let dice = i.value;
          if (dice !== 1) {
            currentscore += dice;
            document.getElementById(`current--${activePlayer}`).textContent =
              currentscore;
          } else {
            switchPlayer();
          } 

          finalValue.innerHTML = `<h4>Value : ${i.value} </h4>`;
          spinBtn.disabled = false;
          break;
        }
      }
  }

};

let count = 0;
let resultValue = 101;
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = false;
  finalValue.innerHTML = `<h4>Good Luck!</h4>`;
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
    myChart.options.rotation = myChart.options.rotation + resultValue;
    myChart.update();
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
}, 10);
});
