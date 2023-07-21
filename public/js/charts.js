const canvas = document.getElementById('resultats-radar-chart');

const radarChart = new Chart(
  canvas,
  {
      'options': {
        'scale': {
          'ticks': {
            'min': 0,
            'max': 100
          }
        },
        'scales': {
          'r': {
            'beginAtZero': true,
            'pointLabels': {
              'font': {'size': 14}
            }
          }
        },
        'plugins': {
          'legend': {'position': 'bottom'}
        }
      },
      'type': canvas.getAttribute('data-type'),
      'data': {
          labels: canvas.getAttribute('data-labels').split(","),
          datasets: [{
              label: 'Mon score',
              data: canvas.getAttribute('data-series').split(","),
              fill: true,
              backgroundColor: 'rgba(175,70,29,0.2)',
              borderColor: 'rgb(175,70,29)',
          },
          {
              label: 'Moyenne vignoble',
              data: canvas.getAttribute("data-moyenne").split(','),
              fill: true,
              backgroundColor: 'rgba(75, 87, 103, 0.2)',
              borderColor: 'rgb(75, 87, 103)',
          },
          {
              label: 'Score année passée',
              data: canvas.getAttribute("data-lastYear").split(','),
              fill: true,
              backgroundColor: 'rgba(194, 145, 64, 0.2)',
              borderColor: 'rgb(194, 145, 64)',
          }
        ]
      }
    }
);
