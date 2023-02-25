import '../App.css';
import { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";

const JobTable = (props) => {
    const [jobsObject, setJobsObject] = useState(props.jobsObject);

    useEffect(() => {
        setJobsObject(props.jobsObject);
      }, [props.jobsObject]);
      if (!jobsObject) {
        return <div>Loading...</div>;
      }
      console.log(jobsObject.companyName)

  return (
    <div>
      <Container className="w-100">
        <Table striped bordered hover>
          <tr id="companyRow">
            <th>Company</th>
            <td className='companyLogo'><img src={jobsObject.logo} alt={jobsObject.companyName}></img></td>
          </tr>
          <tr id="salaryRow">
            <th>Salary</th>
            <td>$1000</td>
            <td>$2000</td>
          </tr>
          <tr id="yearsRow">
            <th>Years of Experience</th>
            <td>1</td>
            <td>2</td>
          </tr>
          <tr id="numberRow">
            <th>Number of Applicants</th>
            <td>100</td>
            <td>200</td>
          </tr>
          <tr id="locationRow">
            <th>Location</th>
            <td>Singapore</td>
            <td>USA</td>
          </tr>
          <tr id="sourceRow">
            <th>Source</th>
            <td>Indeed</td>
            <td>LinkedIn</td>
          </tr>
        </Table>
      </Container>
    </div>
  );
};

export default JobTable;
