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
              backgroundColor: 'rgba(194, 145, 64, 0.2)',
              borderColor: 'rgb(194, 145, 64)',
          },
          {
              label: 'Moyenne vignoble',
              data: [8,3,1],
              fill: true,
              backgroundColor: 'rgba(75, 87, 103, 0.2)',
              borderColor: 'rgb(75, 87, 103)',
          }
        ]
      }
    }
);

