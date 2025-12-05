import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface TrainingData {
  date: string;
  totalVolume: number;
}

interface TrainingProgressChartProps {
  data: TrainingData[];
}

export const TrainingProgressChart = ({ data }: TrainingProgressChartProps) => {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="totalVolume" stroke="#8884d8" />
    </LineChart>
  );
};
