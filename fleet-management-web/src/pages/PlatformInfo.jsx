import React from 'react';
import { Shield, Users, Truck, BarChart3, Settings, Check, X, Lock, Info } from 'lucide-react';

const PlatformInfo = () => {
    const roles = [
        {
            title: 'Super Admin',
            icon: Shield,
            color: 'bg-rose-500',
            textColor: 'text-rose-500',
            bgColor: 'bg-rose-50',
            description: 'Highest level of access across the entire platform and all organizations.',
            permissions: [
                'Manage all tenants and organizations',
                'Access global reports and analytics',
                'Configure system-wide settings',
                'Manage superadmin accounts',
                'Override any permission'
            ]
        },
        {
            title: 'Admin',
            icon: Users,
            color: 'bg-brand-500',
            textColor: 'text-brand-500',
            bgColor: 'bg-brand-50',
            description: 'Managing your specific organization and its resources.',
            permissions: [
                'Add and manage organization users',
                'Manage vehicle fleet and drivers',
                'Access full organization reports',
                'Configure organization profile',
                'Manage billing and subscriptions'
            ]
        },
        {
            title: 'Manager',
            icon: BarChart3,
            color: 'bg-emerald-500',
            textColor: 'text-emerald-500',
            bgColor: 'bg-emerald-50',
            description: 'Overseeing daily operations and performance tracking.',
            permissions: [
                'Track live vehicle missions',
                'Manage driver schedules and logs',
                'Generate operational reports',
                'Approve maintenance requests',
                'Monitor fuel efficiency'
            ]
        },
        {
            title: 'Driver',
            icon: Truck,
            color: 'bg-amber-500',
            textColor: 'text-amber-500',
            bgColor: 'bg-amber-50',
            description: 'Focused on assigned tasks and vehicle operation.',
            permissions: [
                'View assigned trips and routes',
                'Log fuel consumption',
                'Report vehicle maintenance issues',
                'Update trip progress status',
                'View personal performance'
            ]
        }
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-600 rounded-full text-sm font-bold uppercase tracking-wider">
                    <Info size={16} />
                    Platform Access Guide
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Roles & Permissions</h1>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
                    Our platform uses a sophisticated Role-Based Access Control (RBAC) system to ensure everyone has the tools they need while maintaining security and privacy.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {roles.map((role, idx) => (
                    <div key={idx} className="glass-card p-10 rounded-[2.5rem] border-slate-100 flex flex-col h-full hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 group">
                        <div className="flex items-center gap-6 mb-8">
                            <div className={`w-16 h-16 rounded-[1.5rem] ${role.color} flex items-center justify-center text-white shadow-xl shadow-${role.color.split('-')[1]}-500/30 group-hover:scale-110 transition-transform duration-500`}>
                                <role.icon size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-extrabold text-slate-900">{role.title}</h3>
                                <span className={`text-xs font-bold uppercase tracking-widest ${role.textColor}`}>Access Level {4 - idx}</span>
                            </div>
                        </div>

                        <p className="text-slate-500 font-medium mb-10 leading-relaxed italic">
                            "{role.description}"
                        </p>

                        <div className="space-y-4 flex-1">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Core Capabilities</p>
                            {role.permissions.map((perm, pIdx) => (
                                <div key={pIdx} className="flex items-start gap-3">
                                    <div className={`w-6 h-6 rounded-full ${role.bgColor} ${role.textColor} flex items-center justify-center shrink-0 mt-0.5`}>
                                        <Check size={14} />
                                    </div>
                                    <span className="text-slate-600 font-medium text-sm">{perm}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 pt-8 border-t border-slate-100">
                            <button className={`w-full py-4 ${role.bgColor} ${role.textColor} rounded-2xl font-bold text-sm hover:opacity-80 transition-all flex items-center justify-center gap-2 uppercase tracking-widest`}>
                                <Lock size={16} />
                                Restricted Access
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Summary Table */}
            <div className="glass-card p-12 rounded-[3rem] border-slate-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="relative">
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-8">Permission Matrix Summary</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-100">
                                    <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Feature Module</th>
                                    <th className="text-center py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Superadmin</th>
                                    <th className="text-center py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Admin</th>
                                    <th className="text-center py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Manager</th>
                                    <th className="text-center py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Driver</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {[
                                    { module: 'User Management', s: true, a: true, m: false, d: false },
                                    { module: 'Fleet Configuration', s: true, a: true, m: false, d: false },
                                    { module: 'Billing & Settings', s: true, a: true, m: false, d: false },
                                    { module: 'Operations Tracking', s: true, a: true, m: true, d: false },
                                    { module: 'Reporting & KPIs', s: true, a: true, m: true, d: false },
                                    { module: 'Trip Assignments', s: true, a: true, m: true, d: false },
                                    { module: 'Personal Logs', s: true, a: true, m: true, d: true },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-all">
                                        <td className="py-4 px-6 text-sm font-bold text-slate-700">{row.module}</td>
                                        <td className="text-center"><PermissionCheck enabled={row.s} /></td>
                                        <td className="text-center"><PermissionCheck enabled={row.a} /></td>
                                        <td className="text-center"><PermissionCheck enabled={row.m} /></td>
                                        <td className="text-center"><PermissionCheck enabled={row.d} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PermissionCheck = ({ enabled }) => (
    <div className="flex justify-center">
        {enabled ? (
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Check size={14} strokeWidth={3} />
            </div>
        ) : (
            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-300 flex items-center justify-center">
                <X size={14} strokeWidth={3} />
            </div>
        )}
    </div>
);

export default PlatformInfo;
