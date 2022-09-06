import './StatisticItem.scss';

export interface StatisticItemProps {
  icon: React.ReactElement;
  label: string;
  value: string | number;
}

export default function StatisticItem({ icon, label, value }: StatisticItemProps) {
  return (
    <div className="statistic__item">
      <div className="statistic__item--icon">{icon}</div>
      <div>
        <p className="statistic__item--value">{value}</p>
        <p className="statistic__item--label">{label}</p>
      </div>
    </div>
  );
}
