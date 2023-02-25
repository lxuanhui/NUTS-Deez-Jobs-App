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
    const [numbertd, setNumbertd] = useState([]);
    const [locationtd, setLocationtd] = useState([]);
    const [sourcetd, setSourcetd] = useState([]);
    const [coverLettertd, setCoverLettertd] = useState([]);

    useEffect(() => {
        setJobsObject(props.jobsObject);

      }, [props.jobsObject]);

    useEffect(() => {
        let logotd = [];
        for (let key in jobsObject) {

            logotd.push(<td className="companyLogo"><img src={jobsObject[key].logo} alt={jobsObject[key].companyName}></img></td>);
        }
        setLogotd(logotd);
    }, [jobsObject]);

    useEffect(() => {
        let salarytd = [];
        for (let key in jobsObject) {
            salarytd.push(<td className='companySalary'>{jobsObject[key].salary[0]} <div><small>Sourced from:{jobsObject[key].salary[1]}</small></div></td>);
        }
        setSalarytd(salarytd);
    }, [jobsObject]);

    useEffect(() => {
        let yearstd = [];
        for (let key in jobsObject) {
            if (jobsObject[key].yearOfExperience[0] === 0 && jobsObject[key].yearOfExperience[1] === 0) {
                yearstd.push(<td className='companyYears'>No prior experience required</td>);
                continue;
            }
            yearstd.push(<td className='companyYears'>{jobsObject[key].yearOfExperience[0]} - {jobsObject[key].yearOfExperience[1]} years</td>);
        }
        setYearstd(yearstd);
    }, [jobsObject]);

    useEffect(() => {
        let numbertd = [];
        for (let key in jobsObject) {
            numbertd.push(<td className='companyNumber'>{jobsObject[key].noOfApplicants[0]}<div><small>Sourced from:{jobsObject[key].noOfApplicants[1]}</small></div></td>);
        }
        setNumbertd(numbertd);
    }, [jobsObject]);

    useEffect(() => {
        let locationtd = [];
        for (let key in jobsObject) {
            locationtd.push(<td className='companyLocation'>{jobsObject[key].typeOfWork}</td>);
        }
        setLocationtd(locationtd);
    }, [jobsObject]);

    useEffect(() => {
        let sourcetd = [];
        for (let key in jobsObject) {
            sourcetd.push(<td className='companySource'><a href={jobsObject[key].source[1]} target='_blank'>{jobsObject[key].source[0]}</a></td>);
        }
        setSourcetd(sourcetd);
    }, [jobsObject]);

    useEffect(() => {
        let coverLettertd = [];
        for (let key in jobsObject) {
            coverLettertd.push(<td className='companyCoverLetter'><Button variant="outline-secondary" onClick={() => generateCoverLetter(jobsObject[key].source[1])}>Generate Cover Letter</Button></td>);
        }
        setCoverLettertd(coverLettertd);
    }, [jobsObject]);

    async function generateDocument(data) {
        const doc = new Document();
        
        // Add content to the document based on the data
        doc.addSection({
        children: [
            new Paragraph(data.title),
            new Paragraph(data.description),
            new Paragraph(`Author: ${data.author}`)
        ]
        });
    
        // Save the document as a blob
        const blob = await Packer.toBlob(doc);
    
        // Save the blob as a file using the file-saver package
        saveAs(blob, 'document.docx');
    }

    const generateCoverLetter = async (event) => {
        event.preventDefault();
        //TODO: Send the data to the server
        const dataToSend = { value: event.target.value };
        const response = await fetch('http://localhost:5000/time', {
          method: 'POST',
          body: JSON.stringify(dataToSend),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log(data); // Log the response data
        //TODO: Generate the document
        // generateDocument(data);
      };

    
    if (jobsObject[1] === undefined) {
        return <div style={{width:'100vw', marginTop:'40vh', justifyContent:'center', display:'flex', alignItems:'center', fontSize:'2rem'}}>Please Search For a Job Position &#128070;</div>;
    };

  return (
    
    <div style={{ width: '100vw', overflowX: 'auto' }}>
      <Container className="w-100">
        <Table striped bordered hover responsive scrollx>
          <tr id="companyRow">
            <th>Company:</th>
            {logotd}
          </tr>
          <tr id="salaryRow">
            <th>Salary:</th>
            {salarytd}
          </tr>
          <tr id="yearsRow">
            <th>Years of Experience:</th>
            {yearstd}
          </tr>
          <tr id="numberRow">
            <th>Number of Applicants:</th>
            {numbertd}
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
