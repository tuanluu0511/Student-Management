import { Student } from 'models';
import { capitalizeString, getMarkColor } from 'utils';
import './StudentTable.scss';

export interface StudentTableProps {
  studentList: Student[];
  onEdit: (student: Student) => void;
  onRemove: (student: Student) => void;
}

export default function StudentTable({ studentList, onEdit, onRemove }: StudentTableProps) {
  return (
    <table className="student__table">
      <thead className="student__table__head">
        <tr className="student__table__head--row">
          <th className="student__table__head--cells student__table__head--cells--1st">ID</th>
          <th className="student__table__head--cells student__table__head--cells--2nd">Name</th>
          <th className="student__table__head--cells student__table__head--cells--3rd">Gender</th>
          <th className="student__table__head--cells student__table__head--cells--4th">Mark</th>
          <th className="student__table__head--cells student__table__head--cells--5th">City</th>
          <th className="student__table__head--cells student__table__head--cells--6th">Action</th>
        </tr>
      </thead>
      <tbody className="student__table__body">
        {studentList.map((student) => (
          <tr className="student__table__body--row" key={student.id}>
            <td className="student__table__body--cells student__table__body--cells--1st">
              {student.id}
            </td>
            <td className="student__table__body--cells student__table__body--cells--2nd">
              {student.name}
            </td>
            <td className="student__table__body--cells student__table__body--cells--3rd">
              {capitalizeString(student.gender)}
            </td>
            <td
              className={
                'student__table__body--cells student__table__body--cells--4th ' +
                `${getMarkColor(student.mark)}`
              }
            >
              {student.mark}
            </td>
            <td className="student__table__body--cells student__table__body--cells--5th">
              {student.city}
            </td>
            <td className="student__table__body--cells student__table__body--cells--6th">
              <button
                className="button button--edit"
                type="button"
                onClick={() => onEdit?.(student)}
              >
                Edit
              </button>
              <button
                className="button button--remove"
                type="button"
                onClick={() => onRemove?.(student)}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
