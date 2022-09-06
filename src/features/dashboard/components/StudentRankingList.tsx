import './StudentRankingList.scss';

import { Student } from 'models';

export interface StudentRankingListProps {
  studentList: Student[];
  label: string;
}

export default function StudentRankingList({ studentList, label }: StudentRankingListProps) {
  return (
    <div className="table__cover">
      <p className="table--label">{label}</p>
      <div className="table__container">
        <table className="table">
          <thead className="table__head">
            <tr className="table__head--row">
              <th className="table__head--cells table__head--cells--1st">#</th>
              <th className="table__head--cells table__head--cells--2nd">Name</th>
              <th className="table__head--cells table__head--cells--3rd">Mark</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {studentList.map((student, idx) => (
              <tr className="table__body--row" key={student.id}>
                <td className="table__body--cells table__body--cells--1st">{idx + 1}</td>
                <td className="table__body--cells table__body--cells--2nd">{student.name}</td>
                <td className="table__body--cells table__body--cells--3rd">{student.mark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
