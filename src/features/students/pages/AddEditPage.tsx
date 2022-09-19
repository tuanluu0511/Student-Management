import { useParams } from 'react-router-dom';
import './AddEditPage.scss';
import { Fragment, useEffect, useState } from 'react';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import { Link } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';

export default function AddEditPage() {
  const { studentId } = useParams();
  const isEdit = Boolean(studentId);
  const [studentData, setStudentData] = useState<Student>();

  useEffect(() => {
    if (!studentId) return;

    (async () => {
      try {
        const data: Student = await studentApi.getById(studentId as string);
        setStudentData(data);
      } catch (error) {
        console.log('Failed to fetch student data', error);
      }
    })();
  }, [studentId]);

  // TODO: Check why the component rendered twice
  console.log('Student data', studentData);

  return (
    <Fragment>
      <Link to="/admin/students" className="back-link">
        <FaAngleLeft /> <em>Back to students page</em>
      </Link>
      {isEdit ? <div>Edit Page</div> : <div>Add new Student</div>}
    </Fragment>
  );
}
