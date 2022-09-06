import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import StudentTable from '../components/StudentTable';
import { studentActions } from '../studentSlice';
import './ListPage.scss';
export default function ListPage() {
  const dispatch = useAppDispatch();
  const studentList = useAppSelector((state) => state.student.list);

  useEffect(() => {
    dispatch(studentActions.fetchStudentList({ _limit: 15, _page: 1 }));
  }, [dispatch]);

  const removeHandler = () => {};
  const editHandler = () => {};

  return (
    <div className="student__container">
      <div className="student__header">
        <h4 className="student__header--title">Students</h4>
        <button type="button" className="student__header--button">
          Add new student
        </button>
      </div>
      <StudentTable studentList={studentList} onRemove={removeHandler} onEdit={editHandler} />
    </div>
  );
}
