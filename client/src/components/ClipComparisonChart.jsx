import {

Bar

} from "react-chartjs-2";

import {

Chart as ChartJS,

CategoryScale,

LinearScale,

BarElement,

Tooltip,

Legend

} from "chart.js";

ChartJS.register(

CategoryScale,

LinearScale,

BarElement,

Tooltip,

Legend

);

function ClipComparisonChart({

original,

enhanced

}){

const data={

labels:[

"Original",

"Enhanced"

],

datasets:[

{

label:"Similarity",

data:[

original,

enhanced

],

backgroundColor:[

"#ef4444",

"#22c55e"

]

}

]

};

return(

<Bar

data={data}

/>

);

}

export default ClipComparisonChart;