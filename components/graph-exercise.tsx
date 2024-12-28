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
  reps: number;
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
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#a593f3",
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-full h-full mx-4">
      <CardHeader>
        <CardTitle>Exercise Progress Chart</CardTitle>
        <CardDescription>Weight over Time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="w-full" config={chartConfig}>
          <LineChart
            data={chartData}
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
              content={({ payload, label }) => {
                if (!payload || payload.length === 0) return null;

                const { weight, reps } = payload[0].payload;

                return (
                  <div className="bg-white p-2 rounded shadow-md border">
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(label).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Weight:</strong> {weight} kg
                    </p>
                    <p>
                      <strong>Reps:</strong> {reps}
                    </p>
                  </div>
                );
              }}
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
