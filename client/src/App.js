
import './App.css';
import {useState} from "react";
import {Form, Button, Stack} from "react-bootstrap";
import JobTable from './components/table';

function App() {
  const [searchfield, setSearchfield] = useState('Software Engineer');
    const handleChange = (event) => {
        setSearchfield(event.target.value);
    };

    const [data, setData] =  useState({});


    const handleSubmit = async (event) => {
        event.preventDefault();
        fetch('http://localhost:5000/time', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
          console.log(data); // Log the response data
          setData(data);
        })
        .catch(error => console.log(error));

    };
    

    
  return (
    <div className="App"> 
      
        <Form onSubmit={handleSubmit}>
            <Form.Group className="p-4">      
              <Stack direction="horizontal" gap={5}>        
                <Form.Label className='text-right ml-3'>Search Job Titles: </Form.Label>
                <Form.Control className='w-50' type="search" placeholder={searchfield} onChange={handleChange}/>
                <div  className="d-grid gap-2">
                  <Button  variant="outline-secondary" type="submit">Submit</Button>
                </div>
              </Stack>
            </Form.Group>
        </Form>
        <JobTable jobsObject={data} />
      
    </div>
  );
}

export default App;
