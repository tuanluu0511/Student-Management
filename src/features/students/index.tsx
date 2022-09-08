import { useAppDispatch } from 'app/hooks';
import { cityActions } from 'features/city/citySlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export default function StudentFeature() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(cityActions.fetchCityList());
  }, [dispatch]);

  return (
    <div>
      <Outlet />
    </div>
  );
}
