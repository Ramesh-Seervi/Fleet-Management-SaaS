import React from 'react';
import { UserPlus, LogIn, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

const GuestRestrictionModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Access Restricted"
        >
            <div className="text-center py-4">
                <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Lock size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Login Required</h3>
                <p className="text-slate-600 font-medium mb-8">
                    Please register or login to have access for this feature. <br />
                    <span className="text-slate-400 text-sm">Create an account to manage your fleet, drivers, and operations.</span>
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="flex items-center justify-center gap-2 py-4 bg-slate-50 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-all border border-slate-100"
                    >
                        <LogIn size={18} />
                        Sign In
                    </button>
                    <button
                        onClick={() => navigate('/register')}
                        className="flex items-center justify-center gap-2 py-4 bg-brand-500 text-white font-bold rounded-2xl shadow-xl shadow-brand-500/20 hover:bg-brand-600 transition-all"
                    >
                        <UserPlus size={18} />
                        Register
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default GuestRestrictionModal;
