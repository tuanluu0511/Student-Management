import './StudentFilter.scss';
import { FaSearch } from 'react-icons/fa';
import { ListParams } from 'models';
import React from 'react';

export interface StudentFilterProps {
  filter: ListParams;
  onSearchChange: (newFiler: ListParams) => void;
}

export default function StudentFilter({ filter, onSearchChange }: StudentFilterProps) {
  const labelElement = document.querySelector('.filter-label');
  const legendElement = document.querySelector('.filter-legend');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter = {
      ...filter,
      name_like: e.currentTarget.value,
    };

    if (e.currentTarget.value !== '') {
      labelElement?.classList.add('filled');
      legendElement?.classList.add('filter-legend-filled');
    }
    if (e.currentTarget.value === '') {
      labelElement?.classList.remove('filled');
      legendElement?.classList.remove('filter-legend-filled');
    }

    onSearchChange(newFilter);
  };

  return (
    <div className="filter-container">
      <div className="filter-box">
        <label className="filter-label" htmlFor="searchByName" data-shrink="false">
          Search by name
        </label>
        <div className="filter-input-box">
          <input
            className="filter-input"
            type="text"
            id="searchByName"
            aria-invalid="false"
            defaultValue={filter.name_like}
            onChange={handleSearchChange}
          />
          <FaSearch />
          <fieldset aria-hidden="true" className="filter-outline">
            <legend className="filter-legend">
              <span>Search by name</span>
            </legend>
          </fieldset>
        </div>
      </div>
    </div>
  );
}
