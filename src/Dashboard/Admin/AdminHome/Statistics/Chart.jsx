import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const Chart = ({ dashboardStats }) => {
  // custom pie chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const maleBio = dashboardStats?.totalMaleBiodata;
  const femaleBio = dashboardStats?.totalFemaleBiodata;
  const totalBio = dashboardStats?.totalBiodata;
  const premiumBio = dashboardStats?.totalPremiumBiodata;
  console.log(maleBio, femaleBio, totalBio, premiumBio);
  // });
  // const data=[name: 'a']
  const data = [
    { name: "Male biodata", value: maleBio },
    { name: "Female biodata", value: femaleBio },
  ];

  return (
    <div>
      <PieChart width={1000} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend></Legend>
        <Tooltip></Tooltip>
      </PieChart>
    </div>
  );
};

export default Chart;
