import { useAppSelector } from 'app/hooks';
import { selectCityList } from 'features/city/citySlice';
import { ListParams, Sort } from 'models';
import React, { useState } from 'react';
import { FaAngleDown, FaSearch } from 'react-icons/fa';
import './StudentFilter.scss';

export interface StudentFilterProps {
  filter: ListParams;
  onSearchChange: (newFiler: ListParams) => void;
  onFilterChange: (newFiler: ListParams) => void;
}

export interface SortValue {
  [key: string]: Sort;
}

const sortValue: SortValue = {
  'name.asc': { value: 'name.asc', name: 'Name ASC' },
  'name.desc': { value: 'name.desc', name: 'Name DESC' },
  'mark.asc': { value: 'mark.asc', name: 'Mark ASC' },
  'mark.desc': { value: 'mark.desc', name: 'Mark DESC' },
};

export default function StudentFilter({
  filter,
  onSearchChange,
  onFilterChange,
}: StudentFilterProps) {
  const [cityName, setCityName] = useState('Filter by city');
  const [sortName, setSortName] = useState('Sort');
  const cityList = useAppSelector(selectCityList);

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
  //{ dataset: { [value: string]: string | unknown } }
  const handleCityChange = (e: React.MouseEvent<HTMLLIElement>) => {
    if (!onFilterChange) return;

    const data = e.currentTarget.dataset.value;

    if (data) {
      const cityData = JSON.parse(data);

      setCityName(cityData.name);

      const newFilter: ListParams = {
        ...filter,
        _page: 1,
        city: cityData.code,
      };

      onFilterChange(newFilter);
    } else {
      setCityName('');
      const newFilter: ListParams = {
        ...filter,
        _page: 1,
        city: undefined,
      };

      onFilterChange(newFilter);
    }
  };

  const handleSortChange = (e: React.MouseEvent<HTMLLIElement>) => {
    if (!onFilterChange) return;

    if (e.currentTarget.dataset.name) {
      setSortName(e.currentTarget.dataset.name);
    } else {
      setSortName('');
    }

    const value = e.currentTarget.dataset.value;
    const [_sort, _order] = (value as string).split('.');
    const newFilter: ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    };
    onFilterChange(newFilter);
  };

  const handleClearFilter = () => {
    if (!onFilterChange) return;

    setCityName('Filter by city');
    setSortName('Sort');

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      city: undefined,
      name_like: undefined,
    };
    onFilterChange(newFilter);

    // if (searchRef.current) {
    //   searchRef.current.value = '';
    // }
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
      <div className="dropdown-box">
        <label className="dropdown-label" htmlFor="filterByCity" data-shrink="false">
          Filter by city
        </label>
        <div className="dropdown-input-box">
          <div className="dropdown-city" role="button" aria-labelledby="filterByCity">
            {cityName}
          </div>

          <FaAngleDown />
          <fieldset aria-hidden="true" className="dropdown-outline">
            <legend className="dropdown-legend">
              <span>Filter by city</span>
            </legend>
          </fieldset>
        </div>
        <ul className="sub-list" role="listbox">
          <li className="sub-list-item" data-value="" onClick={handleCityChange}>
            <em>All</em>
          </li>

          {Object.entries(cityList).map(([key, value]) => (
            <li
              className="sub-list-item"
              key={key}
              role="option"
              aria-selected="false"
              data-value={JSON.stringify(value)}
              onClick={handleCityChange}
            >
              {value?.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="dropdown-box">
        <label className="dropdown-label" htmlFor="filterByCity" data-shrink="false">
          Sort
        </label>
        <div className="dropdown-input-box">
          <div className="dropdown-city" role="button" aria-labelledby="filterByCity">
            {sortName}
          </div>

          <FaAngleDown />
          <fieldset aria-hidden="true" className="dropdown-outline">
            <legend className="dropdown-legend">
              <span>Sort</span>
            </legend>
          </fieldset>
        </div>
        <ul className="sub-list" role="listbox">
          <li className="sub-list-item" data-value="" onClick={handleSortChange}>
            <em>No sort</em>
          </li>

          {Object.entries(sortValue).map(([key, value]) => (
            <li
              className="sub-list-item"
              key={key}
              role="option"
              aria-selected="false"
              data-value={value.value}
              data-name={value.name}
              onClick={handleSortChange}
            >
              {value?.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="btn-container">
        <button type="button" className="btn-clear" onClick={handleClearFilter}>
          clear
        </button>
      </div>
    </div>
  );
}
