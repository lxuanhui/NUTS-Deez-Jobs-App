
import './App.css';
import {useState} from "react";
import {Form, Button, Stack, Collapse, Card, Col} from "react-bootstrap";
import JobTable from './components/table';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import { Helmet } from 'react-helmet';

function App() {
  const [searchfield, setSearchfield] = useState('Software Engineer');
    const handleChange = (event) => {
        setSearchfield(event.target.value);
    };

    const [data, setData] =  useState({});
    const [open, setOpen] = useState(false);
    const [ salary, setSalary ] = useState(0);
    const [ years, setYears ] = useState(0);
    const [checkboxesApplicants, setCheckboxesApplicants] = useState({
      'Applicants-1': false,
      'Applicants-2': false,
      'Applicants-3': false,
    });
    const [checkboxesLocation, setCheckboxesLocation] = useState({
      'location-1': false,
      'location-2': false,
      'location-3': false,
    });
    const handleChangeCheckboxLocation = (e) => {
      const checkboxIdLocation = e.target.id;
      const isChecked = e.target.checked;

      setCheckboxesLocation({ ...checkboxesLocation, [checkboxIdLocation]: isChecked });
    };
    const selectedCheckboxesLocation = Object.keys(checkboxesLocation).filter(
      (checkboxIdLocation) => checkboxesLocation[checkboxIdLocation]
    );

    
    
    const handleCheckboxChangeApplicants = (e) => {
      const checkboxIdApplicants = e.target.id;
      const isChecked = e.target.checked;
    
      setCheckboxesApplicants({ ...checkboxesApplicants, [checkboxIdApplicants]: isChecked });
    };
    
    const selectedCheckboxesApplicants = Object.keys(checkboxesApplicants).filter(
      (checkboxIdApplicants) => checkboxesApplicants[checkboxIdApplicants]
    );


    const handleSubmit = async (event) => {
      event.preventDefault();
      const requestBody = { 
        'searchfield': searchfield,
      };
      console.log(requestBody);
      fetch('http://localhost:5000/time', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
      })
      .catch(error => console.log(error));
    };
    

    
  return (
    <div className="App"> 
      <Helmet>
        <title>NUT JOB</title>
        <meta name="DEEZ JOBS" content="HAVE SOME OF DEEZ JOBS" />
        <link rel="icon"  href="NUTS.png" sizes="16x16" />
      </Helmet>
          
        <Form onSubmit={handleSubmit}>
            <Form.Group className="p-4">      
              <Stack direction='vertical' gap = {3}>
                <Stack direction="horizontal" gap={5}>
                  <Form.Label className='text-right ml-3'>Search Job Titles: </Form.Label>
                  <Form.Control className='w-50' type="search" placeholder={searchfield} onChange={handleChange}/>
                  <div  className="d-grid gap-2">
                    <Button  variant="outline-secondary" type="submit">Submit</Button>
                  </div>                
                </Stack>      
                <Button
                  onClick={() => setOpen(!open)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                  variant="outline-secondary"
                  style={{ width: '40vw', justifyContent: 'center', margin: 'auto', display: 'block' }}
                >
                  Filters
                </Button>
              </Stack>
              <div style={{ marginTop: '8rem', position: 'absolute', marginLeft:'25vw' }}>
                <div style={{ backgroundColor: '#fff', padding: '10px' }}>
                  <Collapse in={open}>
                    <div>
                      <Stack>
                      <Card className="flex-row modal-card" style={{width:'50vw'}}>
                        <Col lg={3} style={{textAlign:'center', justifyContent:'center', alignItems:'center', display:'flex'}}>
                          Salary:
                        </Col>
                        <Col lg={9}>
                          
                          <Card.Body className="companyLogo">
                            $0 
                          <RangeSlider

                            value={salary}
                            onChange={changeEvent => setSalary(changeEvent.target.value)}
                            min={0}
                            max={15000}
                            step={500}
                            variant="secondary"
                            style={{width:'20vw', padding:'10px'}}
                          /> 
                          $15000  <span style={{marginLeft:'20px', fontFamily:'arial'}}>${salary}</span>
                          </Card.Body>
                        </Col>
                      </Card>
                      <Card className="flex-row modal-card" style={{width:'50vw'}}>
                        <Col lg={3} style={{textAlign:'center', justifyContent:'center', alignItems:'center', display:'flex'}}>
                          Years of Experience:
                        </Col>
                        <Col lg={9}>
                          
                        <Card.Body className="companyLogo">
                          0 
                          <RangeSlider

                            value={years}
                            onChange={changeEvent => setYears(changeEvent.target.value)}
                            min={0}
                            max={10}
                            step={1}
                            variant="secondary"
                            style={{width:'20vw', padding:'10px'}}
                          /> 
                          10  <span style={{marginLeft:'20px', fontFamily:'arial'}}>{years} years</span>
                          </Card.Body>
                        </Col>
                      </Card>
                      <Card className="flex-row modal-card" style={{width:'50vw'}}>
                        <Col lg={3} style={{textAlign:'center', justifyContent:'center', alignItems:'center', display:'flex'}}>
                          Number of Applicants:
                        </Col>
                        <Col lg={9}>
                          
                          <Card.Body className="companyLogo">
                          <div  className="mb-3 inline-checkbox">
                            <Form.Check
                              inline
                              label="Lowest (lowest number of applicants)"
                              name="group1"
                              type='checkbox'
                              id={`Applicants-1`}
                              onChange={handleCheckboxChangeApplicants}
                              checked={checkboxesApplicants["Applicants-1"]}
                              
                            />
                            <Form.Check
                              inline
                              label="Average (Average number of applicants)"
                              name="group1"
                              type='checkbox'
                              id={`Applicants-2`}
                              onChange={handleCheckboxChangeApplicants}
                              checked={checkboxesApplicants["Applicants-2"]}
                              
                            />
                            <Form.Check
                              inline
                              name="group1"
                              label="Highest (Highest number of applicants)"
                              type='checkbox'
                              id={`Applicants-3`}
                              onChange={handleCheckboxChangeApplicants}
                              checked={checkboxesApplicants["Applicants-3"]}
                              
                            />
                          </div>
                          <p>Selected values: {selectedCheckboxesApplicants.join(", ")}</p>
                          </Card.Body>
                        </Col>
                      </Card>
                      <Card className="flex-row modal-card" style={{width:'50vw'}}>
                        <Col lg={3} style={{textAlign:'center', justifyContent:'center', alignItems:'center', display:'flex'}}>
                          Location:
                        </Col>
                        <Col lg={9}>
                          
                          <Card.Body className="companyLogo">
                          <div  className="mb-3 inline-checkbox">
                            <Form.Check
                              inline
                              label="Remote"
                              name="group1"
                              type='checkbox'
                              id={`location-1`}
                              onChange={handleChangeCheckboxLocation}
                              checked={checkboxesLocation["location-1"]}
                              
                            />
                            <Form.Check
                              inline
                              label="Onsite"
                              name="group1"
                              type='checkbox'
                              id={`location-2`}
                              onChange={handleChangeCheckboxLocation}
                              checked={checkboxesLocation["location-2"]}
                              
                            />
                            <Form.Check
                              inline
                              name="group1"
                              label="Hyrbrid"
                              type='checkbox'
                              id={`location-3`}
                              onChange={handleChangeCheckboxLocation}
                              checked={checkboxesLocation["location-3"]}
                              
                            />
                          </div>
                          <p>Selected values: {selectedCheckboxesLocation.join(", ")}</p>

                          </Card.Body>
                        </Col>
                      </Card>

                      </Stack>
                    
                    </div>
                    
                  </Collapse>
                </div>
              </div>
            </Form.Group>
        </Form>
        <JobTable jobsObject={data} />
      
    </div>
  );
}

export default App;
