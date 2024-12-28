"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Loader2 } from "lucide-react";
interface ProgressTraining {
  date: string; // Data treningu, np. "2024-01-01"
  totalVolume: number; // Łączna objętość treningowa
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#a593f3",
  },
} satisfies ChartConfig;

export const Graph = ({ chartData }: { chartData: ProgressTraining[] }) => {
  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin text-prim" />
      </div>
    );
  }

  return (
    <Card className="w-full  h-full mx-4">
      <CardHeader>
        <CardTitle>Progress Chart</CardTitle>
        <CardDescription>Trening Volume</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="w-full" config={chartConfig}>
          <LineChart
            data={chartData}
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
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <YAxis />
            <ChartTooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="totalVolume"
              type="monotone"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
