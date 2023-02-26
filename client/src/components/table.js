import '../App.css';
import { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { Document, Packer, Paragraph } from "docx";
import { saveAs } from 'file-saver';

const JobTable = (props) => {
    const [jobsObject, setJobsObject] = useState(props.jobsObject);
    const [logotd, setLogotd] = useState([]);
    const [salarytd, setSalarytd] = useState([]);
    const [yearstd, setYearstd] = useState([]);
    const [locationtd, setLocationtd] = useState([]);
    const [sourcetd, setSourcetd] = useState([]);
    const [coverLettertd, setCoverLettertd] = useState([]);
    const [jobTitletd, setJobTitletd] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [apiResponse, setApiResponse] = useState("");


    

    useEffect(() => {
        setJobsObject(props.jobsObject);

      }, [props.jobsObject]);
    
    useEffect(() => {
        setFilter(props.filter);
        console.log(props.filter);
    }, [props.filter]);

    useEffect(() => {
        let logotd = [];
        
        for (let key in jobsObject) {
          if (filter.years !== 0 && jobsObject[key].yearOfExperience[0] < filter.years) {
            continue;
          }
          if(filter.salary !== 0 && jobsObject[key].salary[0][1] < filter.salary) {
              continue;
          }
          if((filter.selectedCheckboxesLocation['remote'] === false && jobsObject[key].typeOfWork === 'Remote') 
          || (filter.selectedCheckboxesLocation['onsite'] === false && jobsObject[key].typeOfWork === 'Onsite') 
          || (filter.selectedCheckboxesLocation['hybrid'] === false && jobsObject[key].typeOfWork === 'Hybrid') ) {
              continue;
          }

            logotd.push(<td className="companyLogo"><img src={jobsObject[key].logo} alt={jobsObject[key].companyName}></img></td>);
        }
        setLogotd(logotd);
    }, [jobsObject, filter]);

    useEffect(() => {
        let salarytd = [];
        for (let key in jobsObject) {
            if (filter.years !== 0 && jobsObject[key].yearOfExperience[0] < filter.years) {
              continue;
            }
            if(filter.salary !== 0 && jobsObject[key].salary[0][1] < filter.salary) {
                continue;
            }
            if((filter.selectedCheckboxesLocation['remote'] === false && jobsObject[key].typeOfWork === 'Remote') 
            || (filter.selectedCheckboxesLocation['onsite'] === false && jobsObject[key].typeOfWork === 'Onsite') 
            || (filter.selectedCheckboxesLocation['hybrid'] === false && jobsObject[key].typeOfWork === 'Hybrid') ) {
                continue;
            }
            if (jobsObject[key].salary[0][0] === 0 && jobsObject[key].salary[0][1] === 0) {
                salarytd.push(<td className='companySalary'>No salary information<div><small>Sourced from: {jobsObject[key].source[0]}</small></div></td>);
                continue;
            }
            

            salarytd.push(<td className='companySalary'>${jobsObject[key].salary[0][0]} - ${jobsObject[key].salary[0][1]}<div><small>Sourced from: {jobsObject[key].source[0]}</small></div></td>);
        }
        setSalarytd(salarytd);
    }, [jobsObject, filter]);


    useEffect(() => {
        let yearstd = [];
        for (let key in jobsObject) {
            // check filter
            if (filter.years !== 0 && jobsObject[key].yearOfExperience[0] < filter.years) {
                continue;
            }
            if(filter.salary !== 0 && jobsObject[key].salary[0][1] < filter.salary) {
                continue;
            }
            if((filter.selectedCheckboxesLocation['remote'] === false && jobsObject[key].typeOfWork === 'remote') 
            || (filter.selectedCheckboxesLocation['onsite'] === false && jobsObject[key].typeOfWork === 'onsite') 
            || (filter.selectedCheckboxesLocation['hybrid'] === false && jobsObject[key].typeOfWork === 'hybrid') ) {
                continue;
            }

            if (jobsObject[key].yearOfExperience[0] === 0) {
                yearstd.push(<td className='companyYears'>No prior experience required</td>);
                continue;
            }

            yearstd.push(<td className='companyYears'>{jobsObject[key].yearOfExperience[0]}</td>);
        }
        setYearstd(yearstd);
    }, [jobsObject,filter]);

   

    useEffect(() => {
        let locationtd = [];
        for (let key in jobsObject) {
            if (filter.years !== 0 && jobsObject[key].yearOfExperience[0] < filter.years) {
                continue;
            }
            if(filter.salary !== 0 && jobsObject[key].salary[0][1] < filter.salary) {
                continue;
            }
            if((filter.selectedCheckboxesLocation['remote'] === false && jobsObject[key].typeOfWork === 'Remote') 
            || (filter.selectedCheckboxesLocation['onsite'] === false && jobsObject[key].typeOfWork === 'Onsite') 
            || (filter.selectedCheckboxesLocation['hybrid'] === false && jobsObject[key].typeOfWork === 'Hybrid') ) {
                continue;
            }
            locationtd.push(<td className='companyLocation'>{jobsObject[key].typeOfWork}</td>);
        }
        setLocationtd(locationtd);
    }, [jobsObject, filter]);

    useEffect(() => {
        let sourcetd = [];
        for (let key in jobsObject) {
            if (filter.years !== 0 && jobsObject[key].yearOfExperience[0] < filter.years) {
              continue;
            }
            if(filter.salary !== 0 && jobsObject[key].salary[0][1] < filter.salary) {
                continue;
            }
            if((filter.selectedCheckboxesLocation['remote'] === false && jobsObject[key].typeOfWork === 'Remote') 
            || (filter.selectedCheckboxesLocation['onsite'] === false && jobsObject[key].typeOfWork === 'Onsite') 
            || (filter.selectedCheckboxesLocation['hybrid'] === false && jobsObject[key].typeOfWork === 'Hybrid') ) {
                continue;
            }
            sourcetd.push(<td className='companySource'><a href={jobsObject[key].source[1]} target='_blank'>{jobsObject[key].source[0]}</a></td>);
        }
        setSourcetd(sourcetd);
    }, [jobsObject, filter]);

    useEffect(() => {
        let coverLettertd = [];
        for (let key in jobsObject) {
            if (filter.years !== 0 && jobsObject[key].yearOfExperience[0] < filter.years) {
                continue;
            }
            if(filter.salary !== 0 && jobsObject[key].salary[0][1] < filter.salary) {
                continue;
            }
            if((filter.selectedCheckboxesLocation['remote'] === false && jobsObject[key].typeOfWork === 'Remote') 
            || (filter.selectedCheckboxesLocation['onsite'] === false && jobsObject[key].typeOfWork === 'Onsite') 
            || (filter.selectedCheckboxesLocation['hybrid'] === false && jobsObject[key].typeOfWork === 'Hybrid') ) {
                continue;
            }
            coverLettertd.push(<td className='companyCoverLetter'><Button variant="outline-secondary" onClick={(event) => {
              event.preventDefault();
              generateCoverLetter(jobsObject[key].source[1]);
              
            }}>Generate Cover Letter</Button>
            <div>
              <textarea rows={5} cols={50} value={apiResponse}></textarea>
            </div>
            </td>
            
            );
        }
        setCoverLettertd(coverLettertd);
    }, [jobsObject, filter, apiResponse]);

    useEffect(() => {
        let jobTitletd = [];
        for (let key in jobsObject) {
            if (filter.years !== 0 && jobsObject[key].yearOfExperience[0] < filter.years) {
              continue;
            }
            if(filter.salary !== 0 && jobsObject[key].salary[0][1] < filter.salary) {
                continue;
            }
            if (Object.keys(filter.selectedCheckboxesLocation).some(option => filter.selectedCheckboxesLocation[option] && jobsObject[key].typeOfWork === option)) {
              jobTitletd.push(<td className='companyJobTitle'>{jobsObject[key].jobTitle}</td>);
            }

            jobTitletd.push(<td className='companyJobTitle'>{jobsObject[key].jobTitle}</td>);
        }
        setJobTitletd(jobTitletd);
    }, [jobsObject, filter]);

    async function generateDocument(data) {
        const doc = new Document();
        
        // Add content to the document based on the data
        doc.addSection({
        children: [
            new Paragraph(data),

        ]
        });
    
        // Save the document as a blob
        const blob = await Packer.toBlob(doc);
    
        // Save the blob as a file using the file-saver package
        saveAs(blob, 'document.docx');
    }

    const generateCoverLetter = async (source) => {
        
        setIsLoading(true);
        const dataToSend = { value: `${source}` };
        const response = await fetch('http://localhost:5000/coverLetter', {
          method: 'POST',
          body: JSON.stringify(dataToSend),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        // check if the response is ok
        if (!response.ok) {
          setIsLoading(false);
          throw new Error('Something went wrong!');
        }
        // get the response data
        const data = await response.json();
        setShowModal(true);
        setApiResponse(data.text);
        setIsLoading(false);
        console.log(data.text, 'Hello'); // Log the response data
        console.log(apiResponse, 'apiResponseHere'); // Log the response data
        //TODO: Generate the document
        
        // generateDocument(data.text);
        
      };
    const modalContent = () => showModal && (
      console.log(apiResponse,'apiResponse'),
      <div className="modal">
          <textarea defaultValue={apiResponse}></textarea>
          <button type="button" onClick={() => setShowModal(false)}>
            Close
          </button>
      </div>
    );
    
    
    if (isLoading) {
        return <div style={{width:'100vw', marginTop:'40vh', justifyContent:'center', display:'flex', alignItems:'center', fontSize:'2rem'}}>Loading &#128070;</div>;
    };

    
    if (jobsObject[1] === undefined) {
        return <div style={{width:'100vw', marginTop:'40vh', justifyContent:'center', display:'flex', alignItems:'center', fontSize:'2rem'}}>Please Search For a Job Position &#128070;</div>;
    };

  return (
    
    <div style={{ width: '100vw', overflowX: 'auto' }}>
      <Container className="w-100">
        <Table striped bordered hover responsive >
          <tr id="companyRow">
            <th>Company:</th>
            {logotd}
          </tr>
          <tr id="jobTitle">
            <th>Job Title:</th>
            {jobTitletd}
          </tr>
          <tr id="salaryRow">
            <th>Salary:</th>
            {salarytd}
          </tr>
          <tr id="yearsRow">
            <th>Years of Experience:</th>
            {yearstd}
          </tr>
          <tr id="locationRow">
            <th>Location:</th>
            {locationtd}
          </tr>
          <tr id="sourceRow">
            <th>Source:</th>
            {sourcetd}
          </tr>
          <tr id="coverLetter">
            <th>Cover Letter:</th>
                {coverLettertd}
          </tr>
        </Table>
      </Container>
    </div>
  );
};

export default JobTable;
