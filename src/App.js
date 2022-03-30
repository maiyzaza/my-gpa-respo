import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useRef, useState  } from 'react';
import useLocalStorage from 'react-localstorage-hook';
import Data from './cs-2019.json';
import GPATable from './GPATable';

function App() {

  const yearRef = useRef();
  const termRef = useRef();
  const courseRef = useRef();
  const gradeRef = useRef();

  const [dataItems, setDataItems] = useLocalStorage("dataItems", []);

  var courseData = []

  var x = []
  const options = Data.curriculum.subjects.map((v, i) => {
    x = [] 
    v.subjects.forEach((e, j) => {

      x.push(<option key={j} value={e.name}>{e.code} {e.name}</option>)
      courseData.push([e.name, e.code, e.credits])

    })

    return x
  })

  const addItem = () => {

    var itemObj = {
      year: yearRef.current.value,
      term: termRef.current.value,
      course: courseRef.current.value,
      grade: gradeRef.current.value
    }

    dataItems.push(itemObj)
    setDataItems([...dataItems])

  }

  return (
    <Container>
      <Row>
        <Col xs={5} style={{backgroundColor: '#eaeaea'}}>
          <br/><h1>Information</h1><br/>
          <Form>
          <h3>Semester</h3>
            <Row>
              <Form.Group as={Col} className="mb-3">
                Year
                <Form.Select aria-label="Select year" ref={yearRef}>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} className="mb-3">
                Term
                <Form.Select aria-label="Select semester" ref={termRef}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Form.Select>
              </Form.Group>     
            </Row>  

            <Form.Group as={Col} className="mb-3">
              Course
              <Form.Select aria-label="Select course" ref={courseRef}>
                {options}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} className="mb-3">
              Grade
              <Form.Select aria-label="Select grade" ref={gradeRef}>
                <option value="A">A</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="B-">B-</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="C-">C-</option>
                <option value="D">D</option>
                <option value="F">F</option>
                <option value="-">W, I, S, U, R, TR</option>
              </Form.Select>
            </Form.Group>

            <Button variant="outline-dark" onClick={addItem}>
              Submit
            </Button>
          </Form>
        </Col>

        <Col>
          <GPATable data={dataItems} setDataItems={setDataItems} courseData={courseData}/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
