import React from 'react';
import { MapPin, Navigation, Flag, Clock, Zap } from 'lucide-react';
import Modal from './Modal';

const TripMapModal = ({ isOpen, onClose, trip }) => {
    if (!trip) return null;

    // Helper to format addresses for Google Maps Embed
    const getMapUrl = (origin, current, destination) => {
        const query = `${origin} to ${destination}`;
        return `https://www.google.com/maps/embed/v1/directions?key=YOUR_API_KEY_HERE&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=driving`;
        // Since I don't have a key, I'll use the search embed which is more permissive but might show less detail for three points.
        // Actually, without a key, a simple search iframe is better.
    };

    const googleMapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(trip.currentLocation || trip.destination?.address || trip.destination)}&output=embed`;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Live Trip Tracking"
        >
            <div className="space-y-6">
                {/* Map View */}
                <div className="w-full h-[400px] bg-slate-100 rounded-[2rem] overflow-hidden border border-slate-200 relative">
                    <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={googleMapsEmbedUrl}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>

                    {/* Floating Info Overlay */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 space-y-3 min-w-[200px]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                                <Zap size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Status</p>
                                <p className="text-sm font-bold text-brand-500 uppercase">In Transit</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trip Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-card p-6 rounded-3xl bg-slate-50/50 border-slate-100">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Route Details</h4>
                        <div className="space-y-6 relative">
                            {/* Vertical Line Connector */}
                            <div className="absolute left-[11px] top-6 bottom-6 w-0.5 bg-slate-200 border-dashed border-l"></div>

                            <div className="flex gap-4 relative">
                                <div className="w-6 h-6 rounded-full bg-white border-4 border-blue-500 shrink-0 z-10"></div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Origin</p>
                                    <p className="text-sm font-bold text-slate-900 leading-tight">{trip.origin?.address || trip.origin}</p>
                                </div>
                            </div>

                            <div className="flex gap-4 relative">
                                <div className="w-6 h-6 rounded-full bg-white border-4 border-amber-500 shrink-0 z-10 animate-pulse"></div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Current Location</p>
                                    <p className="text-sm font-bold text-amber-600 leading-tight">{trip.currentLocation || "Near Lyon, FR"}</p>
                                </div>
                            </div>

                            <div className="flex gap-4 relative">
                                <div className="w-6 h-6 rounded-full bg-white border-4 border-emerald-500 shrink-0 z-10"></div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Destination</p>
                                    <p className="text-sm font-bold text-slate-900 leading-tight">{trip.destination?.address || trip.destination}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="glass-card p-6 rounded-3xl bg-slate-50/50 border-slate-100 flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center">
                                <Clock size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Estimated Arrival</p>
                                <p className="text-lg font-bold text-slate-900 leading-none">2h 45m</p>
                            </div>
                        </div>

                        <div className="glass-card p-6 rounded-3xl bg-slate-50/50 border-slate-100 flex items-center gap-4">
                            <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
                                <Flag size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Distance</p>
                                <p className="text-lg font-bold text-slate-900 leading-none">{trip.distance} km</p>
                            </div>
                        </div>

                        <div className="glass-card p-6 rounded-3xl bg-slate-50/50 border-slate-100 flex items-center gap-4">
                            <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center">
                                <Navigation size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Vehicle Speed</p>
                                <p className="text-lg font-bold text-slate-900 leading-none">84.2 km/h</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        onClick={onClose}
                        className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                    >
                        Close
                    </button>
                    <button
                        className="flex-1 py-4 bg-brand-500 text-white font-bold rounded-2xl shadow-xl shadow-brand-500/20 hover:bg-brand-600 transition-all"
                    >
                        Contact Driver
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default TripMapModal;
