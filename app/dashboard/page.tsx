"use client";

import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  ComposedChart,
  Bar,
} from "recharts";

export default function Dashboard() {
  // GRAPH DATA
  const studentData = [
    { month: "Jan", students: 50 },
    { month: "Feb", students: 72 },
    { month: "Mar", students: 120 },
    { month: "Apr", students: 90 },
    { month: "May", students: 150 },
    { month: "Jun", students: 200 },
  ];

  // RIGHT PANEL — RECENT STUDENTS
  const students = [
    { name: "Samantha William", class: "Class VII A", img: "/assets/images/user1.jpg" },
    { name: "Tony Soap", class: "Class VII B", img: "/assets/images/user2.jpg" },
    { name: "Karen Hope", class: "Web Developer", img: "/assets/images/user3.jpg" },
    { name: "Jordan Nico", class: "Class VII A", img: "/assets/images/user4.jpg" },
    { name: "Nadila Adja", class: "Class VII B", img: "/assets/images/user5.jpg" },
  ];

  // RIGHT PANEL — MESSAGES
  const messages = [
    { name: "Samantha William", msg: "Lorem ipsum dolor sit", time: "12:45 PM", img: "/assets/images/user1.jpg" },
    { name: "Tony Soap", msg: "Lorem ipsum dolor sit", time: "12:45 PM", img: "/assets/images/user2.jpg" },
    { name: "Karen Hope", msg: "Lorem ipsum dolor sit", time: "12:45 PM", img: "/assets/images/user3.jpg" },
  ];

  // SUMMARY CARD SVG ICONS
 const summaryCards = [
  {
    title: "Students",
    count: 932,
    color: "#9B5DE5",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
        <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zM4 21v-1c0-3.5 5-5 8-5s8 1.5 8 5v1H4z" />
      </svg>
    ),
  },

  {
    title: "Courses",
    count: 754,
    color: "#F15A29",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
        <path d="M4 3h14c.6 0 1 .4 1 1v14c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V4c0-.6.4-1 1-1zm2 3v2h10V6H6zm0 4v2h10v-2H6zm0 4v2h7v-2H6z" />
      </svg>
    ),
  },

  {
    title: "Popular",
    count: 40,
    color: "#F6C026",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
        <path d="M12 2l3 6 6 .9-4.5 4.4 1 6.7L12 17l-5.5 2.9 1-6.7L3 8.9 9 8l3-6z" />
      </svg>
    ),
  },

  {
    title: "Upcoming",
    count: "32K",
    color: "#2D3561",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
        <path d="M7 2v2H5v3h14V4h-2V2h-2v2H9V2H7zm12 7H5v13h14V9z" />
      </svg>
    ),
  },
];

  return (
    <div className="flex gap-6 h-full py-4">
      <div className="flex-1  pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {summaryCards.map((card, i) => (
            <div key={i} className="bg-white flex items-center gap-4 px-4 py-5 rounded-lg shadow">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: card.color }}
              >
                {card.icon}
              </div>
              <div>
                <p className="text-gray-500 text-sm">{card.title}</p>
                <h3 className="text-[#003b7d] text-xl font-bold">{card.count}</h3>
              </div>
            </div>
          ))}
        </div>
        {/* Student Registration Graph */}
        <div className="bg-white rounded-xl shadow p-4 h-[350px] mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#003b7d]">
              School Overview
            </h2>

            {/* Toggle Buttons */}
            <div className="flex gap-2">
              {["Week", "Month", "Year", "All"].map((item, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded-lg text-sm ${item === "Week"
                      ? "bg-[#f3e9ff] text-[#003b7d] font-semibold"
                      : "text-gray-500 hover:text-[#003b7d]"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* GRAPH */}
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={[
              { month: "Jan", bar: 72, line1: 50, line2: 25 },
              { month: "Feb", bar: 85, line1: 60, line2: 30 },
              { month: "Mar", bar: 70, line1: 65, line2: 28 },
              { month: "Apr", bar: 98, line1: 55, line2: 22 },
              { month: "May", bar: 50, line1: 70, line2: 26 },
              { month: "Jun", bar: 98, line1: 48, line2: 18 },
              { month: "Jul", bar: 78, line1: 55, line2: 32 },
              { month: "Aug", bar: 80, line1: 60, line2: 28 },
              { month: "Sep", bar: 92, line1: 65, line2: 30 },
              { month: "Oct", bar: 34, line1: 47, line2: 20 },
              { month: "Nov", bar: 79, line1: 50, line2: 29 },
              { month: "Dec", bar: 100, line1: 52, line2: 22 },
            ]}>
              <CartesianGrid stroke="#e0e0e0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />

              {/* Purple Bars */}
              <Bar
                dataKey="bar"
                barSize={20}
                radius={[10, 10, 10, 10]}
                fill="#7a4da0"
              />

              {/* Green Line */}
              <Line
                type="monotone"
                dataKey="line1"
                stroke="#4CAF50"
                strokeWidth={2.5}
                dot={false}
              />

              {/* Red Dotted Line */}
              <Line
                type="monotone"
                dataKey="line2"
                stroke="#FF5A5A"
                strokeDasharray="5 5"
                strokeWidth={2}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

      </div>
      <div className="w-[300px] flex flex-col gap-6 pr-2">

        {/* RECENT STUDENTS */}
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#003b7d]">Recent Students</h3>
         </div>

          <ul className="space-y-4">
            {students.map((s, i) => (
              <li key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={s.img} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-sm font-semibold">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.class}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <button className="mt-4 w-full bg-[#f3e9ff] py-2 rounded-full text-[#003b7d] font-semibold">
            View More
          </button>
        </div>

        {/* MESSAGES PANEL */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold text-[#003b7d] mb-4">Messages</h3>

          <ul className="space-y-4">
            {messages.map((m, i) => (
              <li key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src={m.img} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-sm font-semibold">{m.name}</p>
                    <p className="text-xs text-gray-600">{m.msg}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">{m.time}</p>
              </li>
            ))}
          </ul>
            <button className="mt-4 w-full bg-[#f3e9ff] py-2 rounded-full text-[#003b7d] font-semibold">
            View More
          </button>
        </div>

      </div>
    </div>
  );
}
