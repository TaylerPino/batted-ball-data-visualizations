import { useEffect, useState } from "react"
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import { IFilter } from "../../models/IFilter"

type Props = {
    handleChange: any
}

const Filter = ({ handleChange } : Props) =>{
    const [filter, setFilter] = useState<IFilter>({
        balls:'',
        date_start: '',
        date_end: '',
        hang_time: '',
        launch_horiz_ang_start: '',
        launch_horiz_ang_end: '',
        launch_speed_start:  '',
        launch_speed_end:  '',
        launch_vert_ang_start: '',
        launch_vert_ang_end: '',
        pitch_speed_start: '',
        pitch_speed_end: '',
        pitch_type: '',
        result_type: '',
        strikes: ''
    });

    useEffect(() => {
        handleChange(filter);
    }, [filter]);
    
    const resetFilters = () => {
        setFilter({
            balls:'',
            date_start: '',
            date_end: '',
            hang_time: '',
            launch_horiz_ang_start: '',
            launch_horiz_ang_end: '',
            launch_speed_start:  '',
            launch_speed_end:  '',
            launch_vert_ang_start: '',
            launch_vert_ang_end: '',
            pitch_speed_start: '',
            pitch_speed_end: '',
            pitch_type: '',
            result_type: '',
            strikes: ''
        })
    };

    return (
        <Form>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>Date</Form.Label>
                <Col sm={4}>
                    <Form.Control value={filter.date_start} type="date"
                        onChange={(e) => {
                            setFilter({...filter, date_start: e.target.value});
                        }
                    }/>
                </Col>
                <Col sm={1}>To</Col>
                <Col sm={4}>
                    <Form.Control value={filter.date_end} type="date" 
                        onChange={(e) => {
                            setFilter({...filter, date_end: e.target.value});
                        }
                    }/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>Vertical Launch Angle</Form.Label>
                <Col sm={4}>
                    <Form.Control type="number" value={filter?.launch_vert_ang_start}
                        onChange={(e) => {
                            setFilter({...filter, launch_vert_ang_start: e.target.value});
                        }
                    }/>
                </Col>
                <Col sm={1}>To</Col>
                <Col sm={4}>
                    <Form.Control type="number" value={filter?.launch_vert_ang_end}
                        onChange={(e) => {
                            setFilter({...filter, launch_vert_ang_end: e.target.value});
                        }
                    }/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} >Horizontal Launch Angle</Form.Label>
                <Col sm={4}>
                    <Form.Control type="number" value={filter?.launch_horiz_ang_start}
                        onChange={(e) => {
                            setFilter({...filter, launch_horiz_ang_start: e.target.value});
                        }
                    }/>
                </Col>
                <Col sm={1}>To</Col>
                <Col sm={4}>
                    <Form.Control type="number" value={filter?.launch_horiz_ang_end}
                        onChange={(e) => {
                            setFilter({...filter, launch_horiz_ang_end: e.target.value});
                        }
                    }/>
                </Col>

            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>Pitch Type</Form.Label>
                <Col sm={9}>
                    <Form.Select value={filter?.pitch_type}
                        onChange={(e) => {
                            setFilter({...filter, pitch_type: e.target.value});
                        }} name="pitchType" id="pitchType">
                        <option value="">Any</option>
                        <option value="CH">Changeup</option>
                        <option value="CU">Curveball</option>
                        <option value="FC">Fastball (Cutter)</option>
                        <option value="FF">Four-Seam Fastball</option>
                        <option value="FS">Splitter</option>
                        <option value="FT">Two-Seam Fastball</option>
                        <option value="KC">Knuckle-Curve</option>
                        <option value="SI">Sinker</option>
                        <option value="SL">Slider</option>
                    </Form.Select>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>Result Type</Form.Label>
                <Col sm={9}>
                    <Form.Select value={filter?.result_type}
                        onChange={(e) => {
                            setFilter({...filter, result_type: e.target.value});
                        }} name="resultType" id="resultType">
                        <option value="">Any</option>
                        <option value='field_out'>Field Out</option>
                        <option value='home_run'>Home Run</option>
                        <option value='single'>Single</option>
                        <option value='grounded_into_double_play'>Grounded Into Double Play</option>
                        <option value='double'>Double</option>
                        <option value='force_out'>Force Out</option>
                        <option value='double_play'>Double Play</option>
                        <option value='field_error'>Field Error</option>
                        <option value='sac_fly'>Sac Fly</option>
                        <option value='triple'>Triple</option>
                        <option value='fielders_choice_out'>Fielders Choice Out</option>
                        <option value='hit_by_pitch'>Hit by Pitch</option>
                        <option value='catcher_interf'>Catcher Interference</option>
                        <option value='sac_bunt'>Sac Bunt</option>
                        <option value='fielders_choice'>Fielders Choice</option>
                        <option value='walk'>Walk</option>
                        <option value='balk'>Balk</option>
                        <option value='sac_fly_double_play'>Sac Fly Double Play</option>
                    </Form.Select>
                </Col>
            </Form.Group>  
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>Balls</Form.Label>
                <Col sm={9}>
                    <Form.Select value={filter?.balls}
                            onChange={(e) => {
                                setFilter({...filter, balls: e.target.value});
                            }} name="balls" id="balls">
                        <option value="">Any</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </Form.Select>
                </Col>    
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>Strikes</Form.Label>
                <Col sm={9}>
                    <Form.Select value={filter?.strikes}
                            onChange={(e) => {
                                setFilter({...filter, strikes: e.target.value});
                            }} name="strikes" id="strikes">
                        <option value="">Any</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </Form.Select>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Pitch Speed</Form.Label>
                <Col sm={4}>
                    <Form.Control type="number"  value={filter?.pitch_speed_start}
                        onChange={(e) => {
                            setFilter({...filter, pitch_speed_start: e.target.value});
                        }
                    }/>
                </Col>
                <Col sm={1}>To</Col>
                <Col sm={4}>
                    <Form.Control type="number"  value={filter?.pitch_speed_end}
                        onChange={(e) => {
                            setFilter({...filter, pitch_speed_end: e.target.value});
                        }
                    }/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>Launch Speed</Form.Label>
                <Col sm={4}>
                    <Form.Control type="number"  value={filter?.launch_speed_start}
                        onChange={(e) => {
                            setFilter({...filter, launch_speed_start: e.target.value});
                        }
                    }/>
                </Col>
                <Col sm={1}>To</Col>
                <Col sm={4}>
                    <Form.Control type="number"  value={filter?.launch_speed_end}
                        onChange={(e) => {
                            setFilter({...filter, launch_speed_end: e.target.value});
                        }
                    }/>
                </Col>
            </Form.Group> 
            <div className="filter-buttons">
                <Button variant="primary" onClick={resetFilters}>Reset</Button>
            </div>
        </Form>
    )
}

export default Filter;