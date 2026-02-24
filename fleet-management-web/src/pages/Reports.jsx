import React, { useState } from 'react';
import {
    BarChart3,
    TrendingUp,
    PieChart,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Filter,
    FileText,
    Activity,
    Users,
    Truck,
    MapPin,
    Fuel,
    Wrench
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    PieChart as RePieChart,
    Pie
} from 'recharts';
import ExportButton from '../components/common/ExportButton';
import {
    useGetVehiclesQuery,
    useGetDriversQuery,
    useGetTripsQuery,
    useGetMaintenanceQuery,
    useGetFuelLogsQuery
} from '../redux/api/fleetApi';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const ReportCard = ({ title, value, change, trend, icon: Icon, color }) => (
    <div className="glass-card p-6 rounded-[2rem] border-slate-100 hover:shadow-xl transition-all group">
        <div className="flex justify-between items-start mb-4">
            <div className={cn("p-4 rounded-2xl text-white shadow-lg", color)}>
                <Icon size={24} />
            </div>
            <div className={cn(
                "flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold",
                trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
            )}>
                {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {change}
            </div>
        </div>
        <p className="text-slate-500 font-medium text-sm mb-1">{title}</p>
        <h3 className="text-3xl font-extrabold text-slate-900">{value}</h3>
    </div>
);

const Reports = () => {
    const [activeTab, setActiveTab] = useState('fleet');
    const { data: vehicles } = useGetVehiclesQuery();
    const { data: drivers } = useGetDriversQuery();
    const { data: trips } = useGetTripsQuery();
    const { data: maintenance } = useGetMaintenanceQuery();
    const { data: fuelLogs } = useGetFuelLogsQuery();

    const COLORS = ['#8b5cf6', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444'];

    const tabs = [
        { id: 'fleet', label: 'Fleet Health', icon: Truck },
        { id: 'ops', label: 'Operations', icon: Activity },
        { id: 'drivers', label: 'Driver Analytics', icon: Users },
        { id: 'finance', label: 'Financials', icon: TrendingUp },
    ];

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight uppercase">Analytical Reports</h1>
                    <p className="text-slate-500 font-medium">Deep dive into fleet performance and operational metrics.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-slate-700 font-bold text-sm shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2 font-['Inter']">
                        <Calendar size={18} />
                        Filter Period
                    </button>
                    <ExportButton
                        data={vehicles || []}
                        filename={`Fleet_Report_${new Date().toISOString().split('T')[0]}`}
                    />
                </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap",
                            activeTab === tab.id
                                ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20"
                                : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
                        )}
                    >
                        <tab.icon size={18} />
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <ReportCard
                    title="Total Kilometers"
                    value="42,500"
                    change="+12.5%"
                    trend="up"
                    icon={MapPin}
                    color="bg-brand-500"
                />
                <ReportCard
                    title="Fuel Consumed"
                    value="12,200 L"
                    change="-2.4%"
                    trend="down"
                    icon={Fuel}
                    color="bg-emerald-500"
                />
                <ReportCard
                    title="Maintenance Cost"
                    value="$8,450"
                    change="+5.1%"
                    trend="up"
                    icon={Wrench}
                    color="bg-amber-500"
                />
                <ReportCard
                    title="Fleet Utilization"
                    value="86%"
                    change="+3.0%"
                    trend="up"
                    icon={Activity}
                    color="bg-indigo-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Cost Trend */}
                <div className="glass-card p-8 rounded-[2rem] border-slate-100">
                    <h3 className="text-xl font-extrabold text-slate-900 mb-6">Operational Cost Trend</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={[
                                { name: 'Jan', cost: 4000 },
                                { name: 'Feb', cost: 3000 },
                                { name: 'Mar', cost: 5000 },
                                { name: 'Apr', cost: 2780 },
                                { name: 'May', cost: 1890 },
                                { name: 'Jun', cost: 2390 },
                            ]}>
                                <defs>
                                    <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip />
                                <Area type="monotone" dataKey="cost" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorCost)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Fleet Distribution */}
                <div className="glass-card p-8 rounded-[2rem] border-slate-100">
                    <h3 className="text-xl font-extrabold text-slate-900 mb-6">Fleet Distribution</h3>
                    <div className="h-[300px] flex items-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <RePieChart>
                                <Pie
                                    data={[
                                        { name: 'Trucks', value: 45 },
                                        { name: 'Vans', value: 25 },
                                        { name: 'Cars', value: 20 },
                                        { name: 'Other', value: 10 },
                                    ]}
                                    innerRadius={80}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {COLORS.map((color, index) => (
                                        <Cell key={index} fill={color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </RePieChart>
                        </ResponsiveContainer>
                        <div className="space-y-4 pr-12">
                            {[
                                { name: 'Trucks', value: '45%', color: 'bg-violet-500' },
                                { name: 'Vans', value: '25%', color: 'bg-sky-500' },
                                { name: 'Cars', value: '20%', color: 'bg-emerald-500' },
                                { name: 'Other', value: '10%', color: 'bg-amber-500' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className={cn("w-3 h-3 rounded-full", item.color)}></div>
                                    <span className="text-sm font-bold text-slate-700">{item.name}</span>
                                    <span className="text-sm font-medium text-slate-400 ml-auto">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Performance Matrix */}
            <div className="glass-card p-8 rounded-[2rem] border-slate-100">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-extrabold text-slate-900">Performance Matrix</h3>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-brand-500 rounded-full"></div>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Revenue</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Costs</span>
                        </div>
                    </div>
                </div>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                            { name: 'Mon', rev: 4000, cost: 2400 },
                            { name: 'Tue', rev: 3000, cost: 1398 },
                            { name: 'Wed', rev: 2000, cost: 9800 },
                            { name: 'Thu', rev: 2780, cost: 3908 },
                            { name: 'Fri', rev: 1890, cost: 4800 },
                            { name: 'Sat', rev: 2390, cost: 3800 },
                            { name: 'Sun', rev: 3490, cost: 4300 },
                        ]}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                            <Tooltip cursor={{ fill: '#f8fafc' }} />
                            <Bar dataKey="rev" fill="#8b5cf6" radius={[6, 6, 0, 0]} barSize={20} />
                            <Bar dataKey="cost" fill="#10b981" radius={[6, 6, 0, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Reports;
