
import {useState} from "react";
import {Container, Row, Col} from "react-bootstrap";

const SearchBox = () => {
    const [searchfield, setSearchfield] = useState('Software Engineer');
    const displayText = (event) => {
        setSearchfield(event.target.value);
        console.log(searchfield);
    };

    return (
        <Container className="justify-content-center align-items-center searchbox">
            <Row>
                <Col>
                    <span>Search Job Titles: </span>
                </Col>
                <Col>
                <input
                    className="pa3 ba b--green bg-lightest-blue"
                    type="search"
                    placeholder='E.g Software Engineer'
                    value= {searchfield}
                    onChange={displayText}
                />
                    <p className="mt-5">{searchfield}</p>  
                </Col>
                  
            </Row>
        </Container>
    );
}

export default SearchBox;