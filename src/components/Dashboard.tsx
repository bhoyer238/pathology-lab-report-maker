import React, { useMemo, useState } from "react";
import type{ Report } from "../types";

interface DashboardProps {
  reports: Report[];
}

export const Dashboard: React.FC<DashboardProps> = ({ reports }) => {
  
  const today = new Date().toISOString().split("T")[0];

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  /* ---------------- TOTAL PATIENTS ---------------- */

  const totalPatients = useMemo(() => {
    const unique = new Set(reports.map(r => r.patient.name));
    return unique.size;
  }, [reports]);

  /* ---------------- TOTAL REVENUE LIFETIME ---------------- */

  const totalRevenue = useMemo(() => {
    return reports.reduce(
      (sum, r) => sum + (r.totalPrice || 0),
      0
    );
  }, [reports]);

  /* ---------------- TODAY REPORTS ---------------- */

  const todayReports = useMemo(() => {
    return reports.filter(
      r => r.createdAt && r.createdAt.startsWith(today)
    );
  }, [reports]);

  const todayCount = todayReports.length;

  /* ---------------- MONTHLY REVENUE ---------------- */

  const monthlyRevenue = useMemo(() => {
    return reports
      .filter(
        r =>
          r.createdAt &&
          r.createdAt.startsWith(selectedMonth)
      )
      .reduce(
        (sum, r) => sum + (r.totalPrice || 0),
        0
      );
  }, [reports, selectedMonth]);

  /* ---------------- EXPORT EXCEL ---------------- */

  const exportExcel = () => {
    const headers = [
      "Patient Name",
      "Date",
      "Total Price"
    ];

    const rows = reports.map(r => [
      r.patient.name,
      r.createdAt?.split("T")[0],
      r.totalPrice
    ]);

    const csv =
      [headers, ...rows]
        .map(row => row.join(","))
        .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "lab-reports.csv";

    a.click();

    URL.revokeObjectURL(url);
  };

  /* ---------------- RECENT TODAY REPORTS ---------------- */

  const recentReports = todayReports.slice(0, 5);

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-2xl font-bold dark:text-white">
            Admin Dashboard
          </h2>

          <p className="text-gray-500 dark:text-gray-400">
            Lab overview and analytics
          </p>

        </div>

        <button
          onClick={exportExcel}
          className="
          px-4 py-2
          bg-blue-600
          text-white
          rounded-lg
          hover:bg-blue-700
          "
        >
          Export Excel
        </button>

      </div>

      {/* Stats Cards */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* Total Patients */}

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Total Patients
          </p>

          <p className="text-3xl font-bold dark:text-white">
            {totalPatients}
          </p>

        </div>

        {/* Total Revenue */}

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Total Revenue
          </p>

          <p className="text-3xl font-bold dark:text-white">
            ₹{totalRevenue}
          </p>

        </div>

        {/* Today Reports */}

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Today's Reports
          </p>

          <p className="text-3xl font-bold dark:text-white">
            {todayCount}
          </p>

        </div>

        {/* Monthly Revenue */}

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Monthly Revenue
          </p>

          <p className="text-3xl font-bold dark:text-white">
            ₹{monthlyRevenue}
          </p>

          <input
            type="month"
            value={selectedMonth}
            onChange={e =>
              setSelectedMonth(e.target.value)
            }
            className="
            mt-2
            w-full
            p-1
            border
            rounded
            dark:bg-gray-700
            dark:border-gray-600
            dark:text-white
            "
          />

        </div>

      </div>

      {/* Recent Reports */}

      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">

        <h3 className="font-semibold mb-3 dark:text-white">
          Today's Recent Reports
        </h3>

        {recentReports.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No reports today
          </p>
        ) : (
          <div className="space-y-2">

            {recentReports.map(report => (

              <div
                key={report.id}
                className="
                flex
                justify-between
                p-3
                bg-gray-50
                dark:bg-gray-700
                rounded-lg
                "
              >

                <div>

                  <p className="font-medium dark:text-white">
                    {report.patient.name}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ₹{report.totalPrice}
                  </p>

                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400">

                  {report.createdAt?.split("T")[0]}

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
};




