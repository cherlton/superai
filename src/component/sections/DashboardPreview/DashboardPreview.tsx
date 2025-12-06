import React from 'react';
import { Container } from '../../layout/Container';
import { Card } from '../../Card';

export const DashboardPreview: React.FC = () => {
    return (
        <section id="dashboard" className="py-24 bg-white overflow-hidden">
            <Container>
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block px-4 py-2 bg-primary-purple/10 text-primary-purple text-sm font-semibold rounded-full mb-4">
                        Dashboard Preview
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-neutral-charcoal mb-6">
                        Your command center for
                        <br />
                        <span className="gradient-text">intelligent insights</span>
                    </h2>
                    <p className="text-lg text-neutral-dark-gray">
                        A dashboard-style layout with visual charts, skill trees,
                        and analytics-driven UI designed for content creators and learners.
                    </p>
                </div>

                {/* Dashboard Container - SPACE FOR ACTUAL DASHBOARD */}
                <div className="relative">
                    {/* Background Glow Effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary-blue/20 via-primary-purple/20 to-accent-pink/20 rounded-3xl blur-3xl opacity-50" />

                    {/* Dashboard Frame */}
                    <Card
                        variant="elevated"
                        padding="none"
                        className="relative z-10 overflow-hidden border border-neutral-gray/50"
                    >
                        {/* Browser-like Header */}
                        <div className="flex items-center gap-2 px-4 py-3 bg-neutral-light-gray border-b border-neutral-gray">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="px-4 py-1 bg-white rounded-md text-sm text-neutral-dark-gray">
                                    app.insight-sphere.ai/dashboard
                                </div>
                            </div>
                        </div>

                        {/* ============================================= */}
                        {/* DASHBOARD PLACEHOLDER - REPLACE WITH ACTUAL  */}
                        {/* ============================================= */}
                        <div className="min-h-[500px] md:min-h-[600px] bg-gradient-to-br from-neutral-light-gray to-white p-6 md:p-8">

                            {/* Mock Dashboard Layout */}
                            <div className="grid grid-cols-12 gap-4 md:gap-6 h-full">

                                {/* Sidebar */}
                                <div className="col-span-12 md:col-span-3 lg:col-span-2">
                                    <div className="glass rounded-xl p-4 h-full">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-blue to-primary-purple" />
                                            <span className="font-semibold text-neutral-charcoal text-sm">Menu</span>
                                        </div>
                                        {['TrendSleuth', 'OpinionForge', 'SkillBridge', 'Analytics', 'Settings'].map((item, i) => (
                                            <div
                                                key={item}
                                                className={`py-2 px-3 rounded-lg mb-2 text-sm ${i === 0 ? 'bg-primary-blue/10 text-primary-blue font-medium' : 'text-neutral-dark-gray hover:bg-neutral-gray/50'}`}
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Main Content Area */}
                                <div className="col-span-12 md:col-span-9 lg:col-span-10 space-y-4 md:space-y-6">

                                    {/* Stats Row */}
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                        {[
                                            { label: 'Trends Found', value: '2,847', change: '+12%' },
                                            { label: 'Sentiment Score', value: '78%', change: '+5%' },
                                            { label: 'Learning Hours', value: '124h', change: '+8%' },
                                            { label: 'AI Queries', value: '15.2K', change: '+23%' },
                                        ].map((stat) => (
                                            <div key={stat.label} className="glass rounded-xl p-4">
                                                <p className="text-neutral-dark-gray text-xs mb-1">{stat.label}</p>
                                                <p className="text-2xl font-bold text-neutral-charcoal">{stat.value}</p>
                                                <span className="text-xs text-green-500 font-medium">{stat.change}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Charts Row */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                                        {/* Trend Chart Placeholder */}
                                        <div className="glass rounded-xl p-6">
                                            <h4 className="font-semibold text-neutral-charcoal mb-4">Trend Analysis</h4>
                                            <div className="h-48 flex items-end justify-around gap-2">
                                                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
                                                    <div
                                                        key={i}
                                                        className="w-full bg-gradient-to-t from-primary-blue to-primary-purple rounded-t-md"
                                                        style={{ height: `${h}%` }}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Sentiment Chart Placeholder */}
                                        <div className="glass rounded-xl p-6">
                                            <h4 className="font-semibold text-neutral-charcoal mb-4">Sentiment Breakdown</h4>
                                            <div className="flex items-center justify-center h-48">
                                                <div className="relative w-40 h-40">
                                                    <svg className="w-full h-full transform -rotate-90">
                                                        <circle cx="80" cy="80" r="60" fill="none" stroke="#E5E5E5" strokeWidth="20" />
                                                        <circle
                                                            cx="80"
                                                            cy="80"
                                                            r="60"
                                                            fill="none"
                                                            stroke="url(#gradient)"
                                                            strokeWidth="20"
                                                            strokeDasharray="280"
                                                            strokeDashoffset="70"
                                                            strokeLinecap="round"
                                                        />
                                                        <defs>
                                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                                <stop offset="0%" stopColor="#5B7EE5" />
                                                                <stop offset="100%" stopColor="#8B7BE5" />
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <span className="text-2xl font-bold text-neutral-charcoal">78%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Activity Feed */}
                                    <div className="glass rounded-xl p-6">
                                        <h4 className="font-semibold text-neutral-charcoal mb-4">Recent AI Activity</h4>
                                        <div className="space-y-3">
                                            {[
                                                { agent: 'TrendAgent', action: 'Found 12 viral content gaps in Tech niche', time: '2m ago' },
                                                { agent: 'OpinionAgent', action: 'Analyzed 5.2K comments with 82% positive sentiment', time: '5m ago' },
                                                { agent: 'SkillAgent', action: 'Generated personalized learning path for React', time: '8m ago' },
                                            ].map((activity, i) => (
                                                <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                                                    <div className="w-2 h-2 rounded-full bg-green-400" />
                                                    <div className="flex-1">
                                                        <span className="text-primary-blue font-medium text-sm">{activity.agent}</span>
                                                        <span className="text-neutral-dark-gray text-sm"> — {activity.action}</span>
                                                    </div>
                                                    <span className="text-neutral-gray text-xs">{activity.time}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ============================================= */}
                        {/* END DASHBOARD PLACEHOLDER                    */}
                        {/* ============================================= */}
                    </Card>
                </div>
            </Container>
        </section>
    );
};

export default DashboardPreview;