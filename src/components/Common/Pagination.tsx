import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import './Pagination.scss';

export interface PaginationProps {
  count: number;
  page: number;
  onChange: (e: any, value: number) => void;
}

export interface ButtonEvent {}

export default function Pagination({ count, page, onChange }: PaginationProps) {
  let curPage = +page;

  const gotoPage = (e: React.MouseEvent<HTMLButtonElement>): void => {
    curPage = +e.currentTarget.value;
    onChange(e, curPage);
  };

  const nextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    curPage = curPage + 1;
    onChange(e, curPage);
  };

  const prePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    curPage = curPage - 1;
    onChange(e, curPage);
  };

  return (
    <div className="pagination">
      <nav className="pagination_nav">
        <button
          className={
            // eslint-disable-next-line no-useless-concat
            'pagination--button pagination--button--prev ' + `${curPage === 1 ? 'disabled' : ''}`
          }
          // Disable button when the page is first and last to prevent user go to invalid page
          type="button"
          aria-label="Go to previous page"
          onClick={prePage}
        >
          <FaAngleLeft />
        </button>
        <ul className="pagination_page_container">
          {/* The code below render pagination page depend on "count" */}
          {[...Array(count)].map((x, i) => (
            <li key={i + 1}>
              <button
                className={
                  'pagination--button pagination--button--page ' +
                  `${+curPage === i + 1 ? 'pagination--button--active' : ''}`
                }
                type="button"
                value={i + 1}
                aria-label={`Page ${i + 1}`}
                onClick={gotoPage}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
        <button
          className={
            // eslint-disable-next-line no-useless-concat
            'pagination--button pagination--button--next ' +
            `${+curPage === count ? 'disabled' : ''}`
          }
          type="button"
          aria-label="Go to next page"
          onClick={nextPage}
        >
          <FaAngleRight />
        </button>
      </nav>
    </div>
  );
}
