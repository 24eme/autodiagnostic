const canvas = document.getElementById('resultats-radar-chart');

const radarChart = new Chart(
  canvas,
  {
      'type': canvas.getAttribute('data-type'),
      'data': {
          labels: canvas.getAttribute('data-labels').split(","),
          datasets: [{
              label: 'Mon score',
              data: canvas.getAttribute('data-series').split(","),
              fill: true,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgb(255, 99, 132)',
          },
          {
              label: 'Moyenne vignoble',
              data: [8,3,1],
              fill: true,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgb(54, 162, 235)',
          }
        ]
      }
    }
);

