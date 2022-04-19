const canvas = document.getElementById('resultats-radar-chart');
const lolli = document.getElementById('lollipop-graph');

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

const lollipop = new Chart(
  lolli,
  {
    type: 'bar',
    plugins: [ChartDataLabels],
    options: {
      indexAxis: 'y',
      responsive: true
    },
    data: {
      labels: canvas.getAttribute('data-labels').split(','),
      datasets: [
        {
          label: 'AZERTY',
          data: [
            [0,3], [6,4], [3,9], [4,12], [2,10], [1,2]
          ],
          barThickness: 3,
          backgroundColor: "#C29140",
          datalabels: {
            labels: {
              moyenne: {
                color: '#964320',
                align: 'top',
                anchor: 'start',
                formatter: function (value, context) {
                  return context.dataset.data[context.dataIndex][0]
                }
              },
              perso: {
                color: '#1C2436',
                align: 'top',
                anchor: 'end',
                formatter: function (value, context) {
                  return context.dataset.data[context.dataIndex][1]
                }
              }
            }
          }
        }
      ]
    },
  }
);
