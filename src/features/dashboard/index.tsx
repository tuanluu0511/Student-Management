import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import StatisticItem from './components/StatisticItem';
import { FaMale, FaFemale, FaBookOpen } from 'react-icons/fa';
import './index.scss';

import {
  dashboardActions,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingByCityList,
} from './dashboardSlice';
import { LoadingProgress } from 'components/Common';

export default function Dashboard() {
  console.log('Dashboard render');
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistics);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);

  console.log({
    loading,
    statistics,
    highestStudentList,
    lowestStudentList,
    rankingByCityList,
  });

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  return (
    <div className="dashboard__container">
      {/* Loading */}
      {loading && <LoadingProgress />}

      {/* Statistic Section */}
      {!loading && (
        <div className="statistic__container">
          <StatisticItem icon={<FaMale />} label="male" value={statistics.maleCount} />

          <StatisticItem icon={<FaFemale />} label="female" value={statistics.femaleCount} />

          <StatisticItem icon={<FaBookOpen />} label="mark >= 8" value={statistics.highMarkCount} />

          <StatisticItem icon={<FaBookOpen />} label="mark <= 5" value={statistics.lowMarkCount} />
        </div>
      )}
    </div>
  );
}
