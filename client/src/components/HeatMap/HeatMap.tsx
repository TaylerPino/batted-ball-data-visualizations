import Plot from "react-plotly.js";
import { IBattedBallData } from "../../models/IBattedBallData";

type Props = {
    battedBallData: Array<IBattedBallData>
};

const HeatMap = ({battedBallData} : Props) =>{
    let zData = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    //Translate zone location data onto heatmap
    battedBallData.forEach(element => {
        if(isHit(element.result_type))
        {
            let x = Math.round((element.zone_location_x)+4);
            let y = Math.round(element.zone_location_z);
            zData[y][x]++;
        }    
    });
    
    return(
        <Plot
            data={[
                {     
                    z: zData,
                    x: ['-2','-1.5', '-1', '-0.5', '0', '0.5', '1', '1.5', '2'],
                    y: ['1', '1.5', '2', '2.5', '3', '3.5','4', '4.5', '5'],
                    type: 'heatmap'
                }
            ]}

            layout={ 
                {
                    width: 450, 
                    height: 450, 
                    title: 'Heat Map (View: Catcher)',
                    shapes: [                
                        {
                            type: 'rect',
                            xref: 'x',
                            yref: 'y',
                            x0: -1,
                            y0: 1.5,
                            x1: 1,
                            y1: 3.5,
                            line: {
                                color: 'rgb(0, 0, 0)',
                                width: 3
                            }
                        }
                    ],
                    xaxis: {
                        title: "Horizontal Location (ft.)"
                    },
                    yaxis: {
                        title: "Vertical Location (ft.)"
                    }
                }
            }
      />
    );
}

const isHit = (result: string) => {
    const hits = ['single', 'double', 'triple', 'home_run'];
    return hits.includes(result);
}

export default HeatMap;