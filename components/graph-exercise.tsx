"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { ChartConfig, ChartContainer } from "./ui/chart";

interface ProgressExercise {
  date: string;
  reps?: number | null;
  weight: number;
}

export const GraphExercise = ({
  chartData,
}: {
  chartData: ProgressExercise[] | undefined;
}) => {
  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin text-prim" />
      </div>
    );
  }

  const sanitizedData = chartData
    .filter((entry) => {
      const isValidDate = !isNaN(new Date(entry.date).getTime());
      const isValidWeight =
        typeof entry.weight === "number" && entry.weight > 0;
      return isValidDate && isValidWeight;
    })
    .map((entry) => ({
      ...entry,
      reps: entry.reps ?? 1,
    }));

  if (sanitizedData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No valid data available to display.</p>
      </div>
    );
  }

  const isEnduranceExercise = sanitizedData.every(
    (entry) => entry.reps === null || entry.reps === 1
  );

  const chartTitle = isEnduranceExercise
    ? "Exercise Duration Chart"
    : "Exercise Progress Chart";

  const chartDescription = isEnduranceExercise
    ? "Duration over Time"
    : "Weight over Time";

  const tooltipContent = (
    payload: { payload?: ProgressExercise }[] | undefined,
    label: string | number
  ) => {
    if (!payload || payload.length === 0 || !payload[0].payload) {
      return null;
    }

    const { weight, reps } = payload[0].payload;

    return (
      <div className="bg-white p-2 rounded shadow-md border">
        <p>
          <strong>Date:</strong> {new Date(label).toLocaleDateString()}
        </p>
        {!isEnduranceExercise && (
          <p>
            <strong>Weight:</strong> {weight} kg
          </p>
        )}
        {isEnduranceExercise ? (
          <p>
            <strong>Duration:</strong> {weight} seconds
          </p>
        ) : (
          <p>
            <strong>Reps:</strong> {reps}
          </p>
        )}
      </div>
    );
  };

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#a593f3",
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-full h-full mx-4">
      <CardHeader>
        <CardTitle>{chartTitle}</CardTitle>
        <CardDescription>{chartDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="w-full" config={chartConfig}>
          <LineChart
            data={sanitizedData}
            width={500}
            height={300}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => new Date(value).toLocaleDateString()} // Formatowanie daty
            />
            <YAxis />
            <Tooltip
              content={({ payload, label }) => tooltipContent(payload, label)}
            />
            <Line
              dataKey="weight"
              name="Weight"
              type="monotone"
              stroke="#8884d8"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
