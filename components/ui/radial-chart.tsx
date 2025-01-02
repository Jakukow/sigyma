import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

interface RadialCharProps {
  exerciseName: string;
  score: number;
  color: string;
  goal: number;
  unit: string;
}

export function RadialChart({
  exerciseName,
  score,
  color,
  goal,
  unit,
}: RadialCharProps) {
  const endAngle = (score / goal) * 360;

  const chartData = [{ browser: "safari", visitors: score, fill: color }];

  const chartConfig = {
    visitors: {
      label: unit,
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <div className="flex justify-center">
      <div className="flex m-5 flex-col items-center">
        <span className="font-bold">Goal for {exerciseName}</span>

        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full aspect-square h-[220px] max-h-[220px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0} // Start od góry (0 stopni)
            endAngle={endAngle} // Dynamiczny kąt końcowy
            innerRadius={80}
            outerRadius={140}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="visitors" background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {score.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {unit}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
        <span className="text-center text-muted-foreground text-sm ">
          <span className="font-bold text-center">
            {goal - score} {unit}{" "}
          </span>
          to reach your goal!
        </span>
      </div>
    </div>
  );
}
