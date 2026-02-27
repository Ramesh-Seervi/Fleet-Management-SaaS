import React from 'react';
import { User, Mail, Phone, Building2, Shield, Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { useGetProfileQuery } from '../../redux/api/authApi';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { data: profileData, isLoading } = useGetProfileQuery();
    const user = profileData?.user;
    const tenant = profileData?.tenant;
    const isGuest = localStorage.getItem('token') === 'dev-bypass-token';

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
            </div>
        );
    }

    const DetailItem = ({ icon: Icon, label, value }) => (
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                <Icon size={20} />
            </div>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
                <p className="text-sm font-bold text-slate-900">{value || 'Not Provided'}</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Account Profile</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage your personal information and preferences.</p>
                </div>
                <Link
                    to="/security"
                    className="px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-slate-700 font-bold text-sm shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2"
                >
                    <Shield size={18} />
                    Security Settings
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-card p-8 rounded-[2rem] border-slate-100 text-center">
                        <div className="relative inline-block mb-6">
                            <div className="w-24 h-24 rounded-3xl bg-brand-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-brand-500/30">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-xl shadow-lg border border-slate-100 flex items-center justify-center text-emerald-500">
                                <Shield size={16} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-extrabold text-slate-900 mb-1">{isGuest ? 'Guest User' : user?.name}</h3>
                        <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">{isGuest ? 'Guest' : user?.role}</p>

                        <div className="mt-8 pt-6 border-t border-slate-100">
                            <div className="flex items-center justify-between text-sm mb-4">
                                <span className="text-slate-400 font-medium">Status</span>
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase">Active</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-400 font-medium">Joined</span>
                                <span className="text-slate-900 font-bold">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-[2rem] border-slate-100 bg-slate-900 text-white">
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                            <Building2 size={18} className="text-brand-400" />
                            Organization
                        </h4>
                        <p className="text-2xl font-extrabold mb-1">{tenant?.name || 'Personal Account'}</p>
                        <p className="text-slate-400 text-sm mb-6">Plan: <span className="text-brand-400 font-bold uppercase tracking-wider">{tenant?.plan || 'Free'}</span></p>
                        <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2">
                            View Organization <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-8 rounded-[2rem] border-slate-100">
                        <h3 className="text-xl font-extrabold text-slate-900 mb-6">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <DetailItem icon={User} label="Full Name" value={isGuest ? 'Guest User' : user?.name} />
                            <DetailItem icon={Mail} label="Email Address" value={isGuest ? 'guest@example.com' : user?.email} />
                            <DetailItem icon={Phone} label="Phone Number" value={isGuest ? '+1 (555) 000-0000' : user?.phone} />
                            <DetailItem icon={Calendar} label="Last Login" value={user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Just now'} />
                        </div>
                    </div>

                    <div className="glass-card p-8 rounded-[2rem] border-slate-100">
                        <h3 className="text-xl font-extrabold text-slate-900 mb-6">Quick Actions</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link to="/security" className="p-6 rounded-2xl bg-indigo-50 border border-indigo-100 hover:shadow-lg hover:shadow-indigo-200/50 transition-all group">
                                <Shield className="text-indigo-500 mb-4 group-hover:scale-110 transition-transform" size={24} />
                                <h4 className="font-bold text-indigo-900 mb-1">Update Security</h4>
                                <p className="text-xs text-indigo-600 font-medium">Manage your password and 2FA settings.</p>
                            </Link>
                            <Link to="/platform-info" className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100 hover:shadow-lg hover:shadow-emerald-200/50 transition-all group">
                                <ExternalLink className="text-emerald-500 mb-4 group-hover:scale-110 transition-transform" size={24} />
                                <h4 className="font-bold text-emerald-900 mb-1">Platform Info</h4>
                                <p className="text-xs text-emerald-600 font-medium">View your role permissions and access levels.</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
