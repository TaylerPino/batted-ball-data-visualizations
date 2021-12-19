const express = require("express");
const path = require('path');

const PORT = process.env.PORT || 3001;

const numberColumns = [ 
    'gamepk', 'hometeamid', 'awayteamid', 'parkid', 'batterid', 'batterteamid', 
    'pitcherid', 'pitcherteamid', 'balls', 'strikes', 'pitch_speed', 'zone_location_x',
    'zone_location_z', 'launch_speed', 'launch_vert_ang', 'launch_horiz_ang', 'landing_location_x',
    'landing_location_y', 'hang_time'
];

//Load all csv data into memory
const loadData =() => {
    const fs = require('fs');
    let path = 'server/data/ALWestBattedBalls2017.csv';
    let data = fs.readFileSync(path, "utf8");
    let lines = data.split("\r\n")
    let headers = [];
    let jsonResponse = [];

    lines.forEach((row, rowIndex) => {
        let values  = row.split(/(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g);
        values = values.filter(Boolean);

        if(rowIndex === 0)
        {
            headers = values;
        }
        else{
            let jsonData = {};
            values.forEach((element, valueIndex) => {
                let isNum = numberColumns.includes(headers[valueIndex]);
                jsonData[headers[valueIndex]] = isNum ? parseFloat(element) : element;
            });

            jsonResponse.push(jsonData);
        }
    });

    return jsonResponse;
}

const data = loadData();

const app = express();

//Serve web app
app.use(express.static(path.resolve(__dirname, '../client/build')));

//Return all players with available data
app.get("/v1/player", (req, res) => {
    let uniquePlayerList = [];
    
    data.filter(item => {
        var i = uniquePlayerList.findIndex(player => (item.pitcherid === player.id));
        if(i <= -1){
            uniquePlayerList.push({ id: item.pitcherid, name: item.pitchername});
        }

        var j = uniquePlayerList.findIndex(player => (item.batterid === player.id));
        if(j <= -1){
            uniquePlayerList.push({ id: item.batterid, name: item.battername});
        }

        return null;
    })

    res.json(uniquePlayerList);
});

//Return player data for a single player
app.get("/v1/playerData/:id", (req, res) => {
    let id = req.params.id;
    let playerData = [];

    data.filter(item => {
        if(item.pitcherid == id || item.batterid == id){
            playerData.push(item);
        }
    });

    res.json(playerData);
});

//Any GET requests that aren't defined will return the web app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});