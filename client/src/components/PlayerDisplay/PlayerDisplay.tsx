import Row from "react-bootstrap/esm/Row";
import Col from 'react-bootstrap/esm/Col';
import { IPlayer } from "../../models/IPlayer";

type Props = {
    player: IPlayer | undefined
};

export const PlayerDisplay = ({player} : Props) =>{
    let display = <div></div>
    if(player !== undefined){
        display = <div className='p-md-1 border border-dark rounded border-bottom-0 background-colour'>
                    <Row>
                        <Col sm={2}>
                            <img src={'https://content.mlb.com/images/headshots/current/60x60/'+player.id+'.png'} alt={PlayerDisplay.name}/>
                        </Col>
                        <Col sm={10}>
                            <span className="player-name">{player?.name}</span>
                        </Col>
                    </Row>
                </div>;
    }

    return display;
}