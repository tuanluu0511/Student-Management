import { RemovePopup } from 'components/Common/RemovePopup';
import { City, Student } from 'models';
import { Fragment, useState } from 'react';
import { capitalizeString, getMarkColor } from 'utils';
import './StudentTable.scss';

export interface StudentTableProps {
  studentList: Student[];
  cityList: { [key: string]: City };
  onEdit: (student: Student) => void;
  onRemove: (student: Student) => void;
}

export default function StudentTable({
  studentList,
  onEdit,
  onRemove,
  cityList,
}: StudentTableProps) {
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>();

  const closeModalHandler = () => {
    setOpen(false);
  };

  const removeClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true);
    const data = e.currentTarget.dataset.value;

    if (data) {
      const studentData: Student = JSON.parse(data);
      setSelectedStudent(studentData);
    }
  };

  const removeConfirmHandler = (student: Student) => {
    setOpen(false);
    onRemove(student);
  };

  return (
    <Fragment>
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
                {cityList[student.city]?.name}
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
                  data-value={JSON.stringify(student)}
                  onClick={removeClickHandler}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {open && (
        <RemovePopup
          onClose={closeModalHandler}
          onConfirm={() => removeConfirmHandler(selectedStudent as Student)}
          name={selectedStudent?.name as string}
        />
      )}
    </Fragment>
  );
}
