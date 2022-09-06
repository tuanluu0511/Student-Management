import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import { studentActions } from '../studentSlice';
import './ListPage.scss';
export default function ListPage() {
  const dispatch = useAppDispatch();
  const studentList = useAppSelector((state) => state.student.list);
  console.log(studentList);

  useEffect(() => {
    dispatch(studentActions.fetchStudentList({ _limit: 15, _page: 1 }));
  }, [dispatch]);

  return <div>List Page</div>;
}
