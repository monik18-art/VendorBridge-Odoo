"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { 
  TrendingUp, 
  FileText, 
  Clock, 
  DollarSign, 
  AlertCircle,
  Plus,
  UserPlus,
  ListFilter
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { cn, formatCurrency } from "@/lib/utils";

const chartData = [
  { name: 'Jan', spending: 45000, invoices: 24 },
  { name: 'Feb', spending: 52000, invoices: 18 },
  { name: 'Mar', spending: 48000, invoices: 22 },
  { name: 'Apr', spending: 61000, invoices: 30 },
  { name: 'May', spending: 55000, invoices: 25 },
  { name: 'Jun', spending: 67000, invoices: 32 },
];


export default function DashboardPage() {
  const [summary, setSummary] = useState<any>(null);
  const [recentPOs, setRecentPOs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/dashboard/summary");
        setSummary(response.data.summary);
        setRecentPOs(response.data.recentPOs);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { label: "Active RFQs", value: summary?.activeRfqs || 0, icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Pending Approvals", value: summary?.pendingApprovals || 0, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "POs this month", value: formatCurrency(summary?.posTotalAmount || 0), icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Overdue Invoices", value: summary?.overdueInvoices || 0, icon: AlertCircle, color: "text-rose-600", bg: "bg-rose-50" },
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Welcome back, Procurement Officer
          </h1>
          <p className="text-gray-500 mt-1">Today's Overview of VendorBridge Procurement</p>
        </div>
        <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl bg-white text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm">
                <ListFilter className="w-4 h-4" /> Filter
            </button>
            <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                <Plus className="w-4 h-4" /> New RFQ
            </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</h3>
              </div>
              <div className={cn("p-3 rounded-xl", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs font-medium text-emerald-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>+12.5% from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent POs Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-lg text-gray-900 leading-tight">Recent Purchase Orders</h3>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">View all</button>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">PO#</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Vendor</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentPOs.map((po, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">#{po.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">{po.vendor}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{formatCurrency(po.amount)}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold",
                        po.status === 'approved' ? 'bg-emerald-50 text-emerald-700' : 
                        po.status === 'pending' ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-600'
                      )}>
                        {po.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart Card */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
          <div className="mb-6 flex justify-between items-center">
            <div>
                <h3 className="font-bold text-lg text-gray-900">Spending Trends</h3>
                <p className="text-xs text-gray-400 font-medium">Last 6 months overview</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          </div>
          <div className="flex-1 w-full min-h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                      <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}}
                  />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar 
                    dataKey="spending" 
                    fill="url(#barGradient)" 
                    radius={[6, 6, 0, 0]} 
                    barSize={24}
                  />
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-wrap gap-4 pt-4">
        <button className="flex-1 min-w-[200px] bg-white border border-gray-200 p-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all font-bold text-gray-900 shadow-sm group">
            <Plus className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" /> New RFQ
        </button>
        <button className="flex-1 min-w-[200px] bg-white border border-gray-200 p-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all font-bold text-gray-900 shadow-sm group">
            <UserPlus className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" /> Add Vendor
        </button>
        <button className="flex-1 min-w-[200px] bg-white border border-gray-200 p-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all font-bold text-gray-900 shadow-sm group">
            <DollarSign className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" /> View Invoices
        </button>
      </div>
    </div>
  );
}
