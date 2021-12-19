import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { IBattedBallData } from '../../models/IBattedBallData';

const getOrCreateLegendList = (chart: any, id:any):any => {
const legendContainer = document.getElementById(id);
let listContainer = legendContainer?.querySelector('ul');

if (!listContainer) {
    listContainer = document.createElement('ul');
    listContainer.style.display = 'flex';
    listContainer.style.flexWrap = 'wrap';
    listContainer.style.justifyContent = 'space-between';

    legendContainer?.appendChild(listContainer);
}

return listContainer;
};
const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate(chart:any, args:any, options:any) {
    const ul = getOrCreateLegendList(chart, 'legend');
  
      // Remove old legend items
      while (ul.firstChild) {
        ul.firstChild.remove();
      }
  
      // Reuse the built-in legendItems generator
      const items = chart.options.plugins.legend.labels.generateLabels(chart);
  
      items.forEach((item:any) => {
        const li = document.createElement('li');
        li.style.alignItems = 'center';
        li.style.cursor = 'pointer';
        li.style.display = 'flex';
        li.style.flexDirection = 'row';
        li.style.marginLeft = '10px';
  
        li.onclick = () => {
            chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
            chart.update();
        };
  
        // Color box
        const boxSpan = document.createElement('span');
        boxSpan.style.background = item.fillStyle;
        boxSpan.style.borderColor = item.strokeStyle;
        boxSpan.style.borderWidth = item.lineWidth + 'px';
        boxSpan.style.display = 'inline-block';
        boxSpan.style.height = '20px';
        boxSpan.style.marginRight = '10px';
        boxSpan.style.width = '20px';
  
        // Text
        const textContainer = document.createElement('p');
        textContainer.style.color = item.fontColor;
        textContainer.style.textDecoration = item.hidden ? 'line-through' : '';
  
        const text = document.createTextNode(item.text);
        textContainer.appendChild(text);
  
        li.appendChild(boxSpan);
        li.appendChild(textContainer);
        ul.appendChild(li);
      });
    }
  };

//Set axis min and max and tooltip hover data
const options = {
    scales: {
        x: {    
            suggestedMin: -500,
            suggestedMax: 500
        },
        y: {
            suggestedMin: -200,
            suggestedMax: 500
        }
    },
    plugins: {
        tooltip: {
            callbacks: {
                label: (ctx: any) => ctx.dataset.label
            }
        },
        htmlLegend: {
            // ID of the container to put the legend in
            containerID: 'legend-container',
          },
        legend: {
            display: false,
        }
    }
};

export const resultTypes = new Map([
    ['field_out', ({displayValue: 'Field Out', colour: 'rgb(255, 41, 68)'})],
    ['home_run',  ({displayValue: 'Home Run', colour: 'rgb(75, 192, 192)'})],
    ['single', ({displayValue: 'Single', colour: 'rgb(255, 159, 64)'})],
    ['grounded_into_double_play', ({displayValue: "Grounded Into Double Play", colour: 'rgb(229, 255, 255)'})],
    ['double', ({displayValue: "Double", colour: 'rgb(153, 102, 255)'})],
    ['force_out', ({displayValue:  "Force Out", colour: 'rgb(204, 204, 255)'})],
    ['double_play', ({displayValue:  "Double Play", colour: 'rgb(102, 102, 255)'})],
    ['field_error', ({displayValue:  "Field Error", colour: 'rgb(128, 128, 128)'})],
    ['sac_fly', ({displayValue:  "Sac Fly", colour: 'rgb(255, 255, 102)'})],
    ['triple', ({displayValue:  "Triple", colour: 'rgb(15, 183, 104)'})],
    ['fielders_choice_out', ({displayValue:  "Fielders Choice Out", colour: 'rgb(102, 0, 51)'})],
    ['hit_by_pitch', ({displayValue:  "Hit by Pitch", colour: 'rgb(255, 99, 132)'})],
    ['catcher_interf', ({displayValue:  "Catcher Interference", colour: 'rgb(255, 99, 132)'})],
    ['sac_bunt', ({displayValue:  "Sac Bunt", colour: 'rgb(255, 99, 132)'})],
    ['fielders_choice', ({displayValue:  "Fielders Choice", colour: 'rgb(255, 99, 132)'})],
    ['walk', ({displayValue: 'Walk', colour: 'rgb(255, 99, 132)'})],
    ['balk', ({displayValue: 'Balk', colour: 'rgb(255, 99, 132)'})],
    ['sac_fly_double_play', ({displayValue: 'Sac Fly Double Play', colour: 'rgb(255, 99, 132)'})]
]);

type Props = {
    battedBallData: Array<IBattedBallData>;
};

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const SprayChart = ({battedBallData} : Props) => {
    //Add image to chart background and align
    const image = new Image();
    image.src = './coordinates.png';
    image.height = 650;
    image.width = 650;

    const plugin = [{
        id: 'field_background',
        beforeDraw: (chart: any) => {
            if (image.complete) {
                const ctx = chart.ctx;
                const {top, left, width, height} = chart.chartArea;
                const x = (left + width / 2 - image.width / 2) - 10;
                const y = (top + height / 2 - image.height / 2) - 70;
                ctx.drawImage(image, x, y);
            } 
            else {
                image.onload = () => chart.draw();
            }
        }
    },htmlLegendPlugin];

    //Map landing location coordinates with result type
    const locationData = new Map();
    battedBallData.forEach(element => {
        if(locationData.has(element.result_type)){
            locationData.get(element.result_type).push(({ x : element.landing_location_x, y : element.landing_location_y}))
        }
        else{
            locationData.set(element.result_type,new Array(({ x : element.landing_location_x, y : element.landing_location_y})));
        }
    });

    //Create data set object for scatter plot
    const dataSet = new Array();
    locationData.forEach((value: any, key: string) => {
        dataSet.push({
            label: resultTypes.get(key)?.displayValue, 
            data: value, 
            backgroundColor: resultTypes.get(key)?.colour
        });
    });

    const data = {
        datasets: dataSet,
      };

  return <Scatter options={options} data={data} width={800} height={800} plugins={plugin}/>;
}

export default SprayChart;