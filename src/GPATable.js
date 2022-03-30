import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { FaTrash } from 'react-icons/fa';



var semesterGPA = []
var semesterGPA2 = []
var semesterGPA3 = []

function GPATable({ data, setDataItems, courseData }) {
    const [dataRows, setDataRows] = useState();
    const [totalGrade, settotalGrade] = useState(0);

    const styles = {
      textCenter: {textAlign: 'center'},
      textRight: {textAlign: 'right'},
      textLeft: {textAlign: 'left'}
    }

    useEffect(() => {

      let gpa = 0
      let currentGrade = 0
      let credit = 0
      let totalcredit = 0

      const z = data.map((v, i) => {

        if (v.grade === "A") {
          currentGrade = "4.00"
        } 
        else if (v.grade === "A-") {
          currentGrade = "3.75"
        } 
        else if (v.grade === "B+") {
          currentGrade = "3.25"
        } 
        else if (v.grade === "B") {
          currentGrade = "3.00"
        } 
        else if (v.grade === "B-") {
          currentGrade = "2.75"
        } 
        else if (v.grade === "C+") {
          currentGrade = "2.25"
        } 
        else if (v.grade === "C") {
          currentGrade = "2.00"
        } 
        else if (v.grade === "C-") {
          currentGrade = "1.75"
        } 
        else if (v.grade === "D") {
          currentGrade = "1.00"
        } 
        else if (v.grade === "F") {
          currentGrade = "0.00"
        } 
        else if (v.grade === "-") {
          currentGrade = "0.00"
        }

        courseData.forEach((e) => {

          if (v.grade !== "-" && e[0] === v.course) {
            credit = e[2]
            totalcredit += Number(credit)
          }

        })

        gpa += Number(currentGrade) * Number(credit) 

        let sem = "" + v.term + "/" + v.year
        let existInArr = semesterGPA.indexOf(sem) > -1
        let semChanged = false

        if (existInArr === false) {
          semesterGPA.push(sem)
          semChanged = true
        }

        if (semChanged === true) {
          semesterGPA2.push([sem, 0, 0, 0, 0]) 
          semesterGPA3.push([sem, 0]) 
        }

        let currGPA = 0
        semesterGPA2.forEach((s) => {

          if (s[0] === sem) {
            s[1] += Number(currentGrade) 
            s[2] += Number(credit) 
            s[3] += Number(currentGrade) * Number(credit) 
            s[4] = s[3] / s[2] 
            currGPA = s[4]
          }

        })

        semesterGPA3.forEach((sg) => {
          if (sg[0] === sem) {
            sg[1] = currGPA
          }
        })
        
        return (
          <tr key={i}>
            <td style={styles.textCenter}><FaTrash onClick={() => deleteClick(i)}/></td>
            <td style={styles.textleft}>{v.term}{"/"}{v.year}</td>
            <td style={styles.textleft}>{v.course}</td>
            <td style={styles.textCenter}>{v.grade}</td>
          </tr>
        );
      });
    setDataRows(z);
    settotalGrade(gpa / totalcredit) 
    }, [data]);

    const clearData = () => {

      setDataItems([])
      setDataRows([])

    }

    const deleteClick = (i) => {

      data.splice(i,1)
      setDataItems([...data])

    }

    return (
      <Container>
        <Row>
          <Col>
            <h2>Kasemdet Soommart</h2>
            <h2>6213639</h2>
            <br />
          </Col>
        </Row>

        <Table bordered hover>
          <thead>
            <tr>
              <th style={styles.textCenter}>Delete</th>
              <th style={styles.textCenter}>Semester</th>
              <th style={styles.textCenter}>Course</th>
              <th style={styles.textCenter}>Grade</th>
            </tr>
          </thead>
          <tbody>
            {dataRows}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={2}></th>
              <th style={styles.textRight}>GPA</th>
              <th style={styles.textCenter}>{(totalGrade).toFixed(2)}</th>
            </tr>
          </tfoot>
        </Table>
        <Col>
          <Button onClick={clearData} variant="dark">Clear</Button>
        </Col>
      </Container>
    )
}

export default GPATable;