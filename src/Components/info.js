import React, { useEffect, useState } from "react"
import Footer from "./footer";
import {findCharacterImage, checkHouseImg, formatTime} from '../data/superData'
import Loading from "./loading";
import { courseService, userService } from "../API/service";
import { checkCID, checkSID } from "../data/superData";

const Subject = ({ props }) => {
    return (
        <tr className="col-12 row text-center">
            <td className="col-3 col-md-2">
                <p>{props.name}</p>
            </td>
            <td className="d-none d-sm-block col-md-2">
                <p>{props.cid}</p>
            </td>
            <td className="d-none d-sm-block col-md-2">
                <p>{props.credit}</p>
            </td>
            <td className="col-3 col-md-2">
                <p>{checkSID(checkCID(props.cid).tid).name}</p>
            </td>
            <td className="col-3 col-md-2">
                <p>{checkCID(props.cid).place}</p>
            </td>
            <td className="col-3 col-md-2">
                <p>{formatTime(checkCID(props.cid).time)}</p>
            </td>
        </tr>
    )
}

export const Info = () => {
    const [student, setStudent] = useState(userService.currentUserValue())
    const [loading, setLoading] = useState(true)
    const [allCourse, setAllCourse] = useState([])
    useEffect(() => {
        setLoading(true)
        userService.getUser().then(data => {
            setStudent(data)
        })
            .then(() => setLoading(false))
            .catch(() => setLoading(false))
        return () => setLoading(false)

    }, [])
    useEffect(() => {
        setLoading(true)
        courseService.getStudentCourse()
            .then(({score}) => {
                setAllCourse(score.map((item, i) => <Subject key={i} props={item} />))
                console.log(score)
            })
            .then(() => setLoading(false))
            .catch(() => setLoading(false))
        return () => setLoading(false)

    }, [])

    
    if (loading || !student || !allCourse) return <Loading />
    else {
        return (
            <div>
                <br /> <br />
                <div className="container header text-center body_font">
                    <h3>{student.role === 'Student'
                        ? `Student` : `Teacher`}'s Infomation</h3>
                    <hr />
                </div>
                <div className="container body_font">
                    <table className="row" border="2" cellPadding="15" cellSpacing="0">
                        <tr className="col-12 row">
                            <th className="col-6 col-md-3 col-lg-2">
                                <img className="student_image"
                                    src={findCharacterImage(student.name)}
                                    alt="student" />
                            </th>
                            <th className="col-6 col-md-6 col-lg-8">
                                <h5>{student.role === 'Student'
                                    ? `Student` : `Teacher`}'s ID:
                                        {student.role === 'Student'
                                        ? student.sid : student.tid}</h5>
                                <h5>Full Name: {student.name}</h5>
                                <h5>Date of Birth: {student.dob}</h5>
                                <h5>House: {student.house}</h5>
                                <h5>{student.role === 'Student'
                                    ? `GPA: ${student.gpa}` : ''}</h5>
                                <h5>{student.role === 'Student'
                                    ? `Credit: ${student.credit}` : ''}</h5>

                            </th>
                            <th className="col-lg-2 d-none d-sm-inline">
                                <img className="student_image" src={checkHouseImg(student.house)} alt="house" />
                            </th>
                        </tr>
                        <tr className="col-12 row text-center">
                            <td className="col-3 col-md-2">
                                <h4>Subject</h4>
                            </td>
                            <td className="d-none d-sm-block col-md-2">
                                <h4>Code</h4>
                            </td>
                            <td className="d-none d-sm-block col-md-2">
                                <h4>Credits</h4>
                            </td>
                            <td className="col-3 col-md-2">
                                <h4>Teacher</h4>
                            </td>
                            <td className="col-3 col-md-2">
                                <h4>Room</h4>
                            </td>
                            <td className="col-3 col-md-2">
                                <h4>Time</h4>
                            </td>
                        </tr>

                        {allCourse}
                    </table>
                </div>
                <br />
                <Footer />
            </div>
        )
    }

}
