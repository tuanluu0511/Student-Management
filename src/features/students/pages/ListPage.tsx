import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Fragment, useEffect } from 'react';
import StudentTable from '../components/StudentTable';
import './ListPage.scss';

import { LoadingBar } from 'components/Common/LoadingBar';
import Pagination from 'components/Common/Pagination';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from '../studentSlice';

import { selectCityList } from 'features/city/citySlice';
import StudentFilter from '../components/StudentFilter';
import { ListParams, Student } from 'models';
import studentApi from 'api/studentApi';

export default function ListPage() {
  const dispatch = useAppDispatch();
  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const loading = useAppSelector(selectStudentLoading);
  const cityList = useAppSelector(selectCityList);

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    dispatch(studentActions.setFilter({ ...filter, _page: page }));
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };

  const removeStudentHandler = async (student: Student) => {
    try {
      // Remove student API
      await studentApi.remove(student?.id || '');
      // Trigger to re-fetch student list with current filter
      const newFilter = { ...filter };
      dispatch(studentActions.setFilter(newFilter));
    } catch (error) {
      // Toast error
      console.log('Failed to fetch student', error);
    }
  };
  const editHandler = () => {};

  return (
    <div className="student__container">
      <Fragment>
        {loading && <LoadingBar />}
        <div className="student__header">
          <h4 className="student__header--title">Students</h4>
          <button type="button" className="student__header--button">
            Add new student
          </button>
        </div>

        {/* Search bar */}
        <StudentFilter
          filter={filter}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
        />

        {/* Student table */}
        <StudentTable
          studentList={studentList}
          onRemove={removeStudentHandler}
          onEdit={editHandler}
          cityList={cityList}
        />

        {/* Pagination */}
        {
          <Pagination
            count={Math.ceil(pagination._totalRows / pagination._limit)}
            page={pagination?._page}
            onChange={handlePageChange}
          />
        }
      </Fragment>
    </div>
  );
}
