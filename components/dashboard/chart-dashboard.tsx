"use client";

import { Bar, BarChart, LabelList, XAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useTrainingIntensity } from "@/features/accounts/api/dashboard/use-get-training-intensity";
import { Loader2 } from "lucide-react";

export const description = "A bar chart with a label";

const chartConfig = {
  desktop: {
    label: "Training Intensity",
    color: "#a593f3",
  },
} satisfies ChartConfig;

export const DashboardChart = () => {
  const chartData = useTrainingIntensity();

  if (chartData.isLoading) {
    return (
      <div className="w-full md:w-1/3 shadow bg-white items-center rounded-3xl flex flex-col justify-evenly">
        <Loader2 className="animate-spin text-prim" />
      </div>
    );
  }

  if (!chartData.data || chartData.data.length === 0) {
    return (
      <div className="w-full md:w-1/3 shadow bg-white items-center rounded-3xl flex flex-col justify-evenly">
        <span>No workout have been done yet</span>
      </div>
    );
  }

  return (
    <div className="w-full md:w-1/3 shadow bg-white items-center rounded-3xl flex flex-col justify-evenly">
      <span className="font-semibold tracking-widest text-muted-foreground">
        TRAINING INTENSITY
      </span>
      <ChartContainer config={chartConfig} className="h-1/2 w-1/2">
        <BarChart
          accessibilityLayer
          data={chartData.data}
          margin={{
            top: 20,
          }}
        >
          <XAxis
            dataKey="day" // Ensure this key matches your data structure
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)} // Abbreviates day names
          />
          <Bar dataKey="count" fill="var(--color-desktop)" radius={8}>
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
};
