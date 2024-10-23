"use client";

import { Bar, BarChart, LabelList, XAxis } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

export const description = "A bar chart with a label";
const chartData = [
  { day: "Monday", desktop: 13 },
  { day: "Tuesday", desktop: 12 },
  { day: "Wednesday", desktop: 5 },
  { day: "Thursday", desktop: 5 },
  { day: "Friday", desktop: 5 },
  { day: "Saturday", desktop: 3 },
  { day: "Sunday", desktop: 1 },
];
const chartConfig = {
  desktop: {
    label: "Training Intensity",
    color: "#a593f3",
  },
} satisfies ChartConfig;

export const DashboardChart = () => {
  return (
    <div className="w-1/3 shadow bg-white items-center  rounded-3xl flex flex-col justify-evenly">
      <span className="font-semibold tracking-widest text-muted-foreground">
        TRAINING INTENSITY
      </span>
      <ChartContainer config={chartConfig} className="h-1/2 w-1/2">
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 20,
          }}
        >
          <XAxis
            dataKey="day"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />

          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
      <span className="font-semibold tracking-widest text-muted-foreground">
        January - June 2024
      </span>
    </div>
  );
};
