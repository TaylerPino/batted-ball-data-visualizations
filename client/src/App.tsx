import './App.css';
import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Navbar from 'react-bootstrap/esm/Navbar';
import Row from 'react-bootstrap/esm/Row';
import Filter from './components/Filter/Filter';
import HeatMap from './components/HeatMap/HeatMap';
import Search from './components/Search/Search';
import { PlayerDisplay } from './components/PlayerDisplay/PlayerDisplay';
import { IBattedBallData } from './models/IBattedBallData';
import { IFilter } from './models/IFilter';
import { IPlayer } from './models/IPlayer';
import SprayChart from './components/SprayChart/SprayChart';

const App = () => {
  const [battedBallData, setBattedBallData] = useState<Array<IBattedBallData>>(Array<IBattedBallData>());
  const [filteredBattedBallData, setFilteredBattedBallData] = useState<Array<IBattedBallData>>(Array<IBattedBallData>());
  const [players, setPlayers] = useState<Array<IPlayer>>(Array<IPlayer>());
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer>();

  useEffect(() => {
    fetch("/v1/player")
      .then(response => response.json())
      .then(data => {
        setPlayers(data)
      })
  }, []);

  const getPlayerData = (player: any) => {
    setSelectedPlayer({ id: player.value, name: player.label});
    fetch("/v1/playerData/" + player.value)
      .then(response => response.json())
      .then(data => {
        setBattedBallData(data);
        setFilteredBattedBallData(data);
      })
  }

  const filterData = (filter: IFilter) => {
    setFilteredBattedBallData(battedBallData.filter(item => {
      return (filter.balls === '' || parseInt(filter.balls) === item.balls)
        && (filter.strikes === '' || parseInt(filter.strikes) === item.strikes)
        && (filter.pitch_type === '' || filter.pitch_type === item.pitch_type)
        && ((filter.date_start === '' || filter.date_end ==='') || (item.date >= filter.date_start && item.date <= filter.date_end))
        && ((filter.launch_vert_ang_start === '' || filter.launch_vert_ang_end === '') || (item.launch_horiz_ang >= (parseFloat(filter.launch_vert_ang_start) && item.launch_horiz_ang <= parseFloat(filter.launch_vert_ang_end))))
        && ((filter.pitch_speed_start === '' || filter.pitch_speed_end === '') || (item.pitch_speed>= parseFloat(filter.pitch_speed_start) && item.pitch_speed <= parseFloat(filter.pitch_speed_end)))
        && ((filter.launch_speed_start === '' || filter.launch_speed_end === '') || (item.launch_speed>= parseFloat(filter.launch_speed_start) && item.launch_speed <= parseFloat(filter.launch_speed_end)))
        && (filter.result_type === '' || filter.result_type === item.result_type);
    }));
  }

  return (
    <div className="App">
      <Navbar className="navbar-dark background-colour" expand="lg">
        <Container fluid>
          <Navbar.Brand>Batted Ball Data Visualizations</Navbar.Brand>
          <div style={{width: '400px'}}>
            <Search data={players} parentCallback={getPlayerData}></Search>
          </div>
        </Container>
      </Navbar>
      <Container fluid>
      <Row >
        <Col className='pt-md-4'>
          <PlayerDisplay player={selectedPlayer}></PlayerDisplay>
          <div className='border border-dark rounded center'>
              <HeatMap battedBallData={filteredBattedBallData}></HeatMap>
          </div>
          <div className='p-md-1 mt-md-2 border border-dark rounded border-bottom-0 background-colour filter-title'>
            Legend
          </div>
          <ul id="legend" className="border border-dark rounded p-md-4"></ul>
        </Col>
        <Col className='pt-md-4' >
          <div className="chart-container border border-dark rounded">
            <SprayChart battedBallData={filteredBattedBallData}></SprayChart>
          </div>
        </Col>
        <Col className='pt-md-4'>
          <div className='p-md-1 border border-dark rounded border-bottom-0 background-colour filter-title'>
            Filter
          </div>
          <div className='p-md-3 border border-dark rounded'>
            <Filter handleChange={filterData}></Filter>
          </div>
        </Col>
      </Row>
      </Container>
    </div>
  );
}

export default App;
