import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, MessageSquare, BookOpen, Search, Plus, Bell, Settings, Home, BarChart3, Users, Layers, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';
const AnimatedBackground = () => {
    const lines = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        delay: i * 0.2,
        duration: 6 + Math.random() * 4,
        startX: Math.random() * 100,
        startY: Math.random() * 100,
        angle: Math.random() * 360,
    }));

    const particles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        delay: i * 0.1,
        x: Math.random() * 100,
        y: Math.random() * 100,
    }));

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {/* Main gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900" />

            {/* Overlay gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-700/30 via-transparent to-blue-900/40" />

            {/* Animated gradient orbs */}
            <motion.div
                className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                    x: [0, -30, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Animated lines */}
            {lines.map((line) => (
                <motion.div
                    key={line.id}
                    className="absolute h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent"
                    style={{
                        width: '400px',
                        left: `${line.startX}%`,
                        top: `${line.startY}%`,
                        transform: `rotate(${line.angle}deg)`,
                    }}
                    animate={{
                        x: ['-100%', '200vw'],
                        opacity: [0, 0.6, 0],
                    }}
                    transition={{
                        duration: line.duration,
                        delay: line.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            ))}

            {/* Floating particles */}
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 4 + Math.random() * 2,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
};

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const navItems = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'trends', icon: TrendingUp, label: 'Content Strategy' },
        { id: 'sentiment', icon: MessageSquare, label: 'Sentiment Navigator' },
        { id: 'skills', icon: BookOpen, label: 'Skill Path Builder' },
        { id: 'analytics', icon: BarChart3, label: 'Analytics' },
        { id: 'community', icon: Users, label: 'Community' },
    ];

    const bottomItems = [
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{
                x: 0,
                opacity: 1,
                width: isExpanded ? 240 : 80
            }}
            transition={{ type: "spring", bounce: 0.2 }}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            className="fixed left-0 top-20 h-[calc(100vh-5rem)] bg-teal-900/40 backdrop-blur-xl border-r border-cyan-400/20 flex flex-col py-6 z-40"
            style={{ width: isExpanded ? 240 : 80 }}
        >
            {/* Logo */}
            <motion.div
                className="mb-8 px-5"
                whileHover={{ scale: 1.1, rotate: 5 }}
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/50 flex-shrink-0">
                        <Layers className="w-6 h-6 text-white" />
                    </div>
                    <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{
                            opacity: isExpanded ? 1 : 0,
                            width: isExpanded ? 'auto' : 0
                        }}
                        className="text-white font-bold text-lg whitespace-nowrap overflow-hidden"
                    >
                        Insight-Sphere
                    </motion.span>
                </div>
            </motion.div>

            {/* Main Navigation */}
            <div className="flex-1 flex flex-col gap-2 px-4 overflow-hidden">
                {navItems.map((item, index) => (
                    <motion.button
                        key={item.id}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveTab(item.id)}
                        className={`h-12 rounded-xl flex items-center transition-all relative ${activeTab === item.id
                            ? 'bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                            : 'text-cyan-300 hover:bg-teal-800/60 hover:text-cyan-200'
                            }`}
                        style={{
                            justifyContent: isExpanded ? 'flex-start' : 'center',
                            paddingLeft: isExpanded ? '16px' : '0'
                        }}
                        title={item.label}
                    >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{
                                opacity: isExpanded ? 1 : 0,
                                width: isExpanded ? 'auto' : 0,
                                marginLeft: isExpanded ? '12px' : '0'
                            }}
                            className="whitespace-nowrap overflow-hidden font-medium"
                        >
                            {item.label}
                        </motion.span>
                        {activeTab === item.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 rounded-xl border-2 border-cyan-300"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                    </motion.button>
                ))}
            </div>

            {/* Bottom Navigation */}
            <div className="flex flex-col gap-2 px-4">
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-12 rounded-xl flex items-center text-cyan-300 hover:bg-teal-800/60 hover:text-cyan-200 transition-all relative"
                    style={{
                        justifyContent: isExpanded ? 'flex-start' : 'center',
                        paddingLeft: isExpanded ? '16px' : '0'
                    }}
                >
                    <Bell className="w-5 h-5 flex-shrink-0" />
                    <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{
                            opacity: isExpanded ? 1 : 0,
                            width: isExpanded ? 'auto' : 0,
                            marginLeft: isExpanded ? '12px' : '0'
                        }}
                        className="whitespace-nowrap overflow-hidden font-medium"
                    >
                        Notifications
                    </motion.span>
                    <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                </motion.button>
                {bottomItems.map((item) => (
                    <motion.button
                        key={item.id}
                        whileHover={{ scale: 1.05, rotate: 90 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveTab(item.id)}
                        className={`h-12 rounded-xl flex items-center transition-all ${activeTab === item.id
                            ? 'bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                            : 'text-cyan-300 hover:bg-teal-800/60 hover:text-cyan-200'
                            }`}
                        style={{
                            justifyContent: isExpanded ? 'flex-start' : 'center',
                            paddingLeft: isExpanded ? '16px' : '0'
                        }}
                        title={item.label}
                    >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{
                                opacity: isExpanded ? 1 : 0,
                                width: isExpanded ? 'auto' : 0,
                                marginLeft: isExpanded ? '12px' : '0'
                            }}
                            className="whitespace-nowrap overflow-hidden font-medium"
                        >
                            {item.label}
                        </motion.span>
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
};

const StatCard = ({ title, value, change, icon: Icon, color, delay }: {
    title: string;
    value: string;
    change: string;
    icon: React.ElementType;
    color: string;
    delay: number;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay, type: "spring", bounce: 0.4 }}
        whileHover={{
            y: -8,
            scale: 1.02,
            boxShadow: '0 25px 50px rgba(0, 255, 255, 0.2)',
        }}
        className="bg-teal-900/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-400/30 relative overflow-hidden group"
    >
        <motion.div
            className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse',
            }}
        />

        <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
                <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}
                >
                    <Icon className="w-6 h-6 text-white" />
                </motion.div>
                <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: delay + 0.3, type: "spring" }}
                    className="text-sm font-semibold text-emerald-300 bg-emerald-900/50 px-3 py-1 rounded-full border border-emerald-400/30"
                >
                    {change}
                </motion.span>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.2 }}
                className="text-3xl font-bold text-white mb-1"
            >
                {value}
            </motion.div>
            <div className="text-sm text-cyan-300">{title}</div>
        </div>
    </motion.div>
);

const TrendCard = ({ title, views, engagement, thumbnail, delay }: {
    title: string;
    views: string;
    engagement: string;
    thumbnail: string;
    delay: number;
}) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, type: "spring", bounce: 0.3 }}
        whileHover={{ scale: 1.05, y: -5 }}
        className="bg-teal-900/40 backdrop-blur-xl rounded-xl p-4 border border-cyan-400/30 cursor-pointer group relative overflow-hidden"
    >
        <motion.div
            className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-blue-500/0 group-hover:from-cyan-400/20 group-hover:to-blue-500/20 transition-all duration-500"
        />

        <div className="relative z-10">
            <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-full h-32 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg mb-3 flex items-center justify-center shadow-lg"
            >
                <span className="text-white text-4xl">{thumbnail}</span>
            </motion.div>
            <h3 className="font-semibold text-white mb-2 line-clamp-2">{title}</h3>
            <div className="flex justify-between text-sm text-cyan-300">
                <span>{views} views</span>
                <span className="text-emerald-400 font-semibold">{engagement}</span>
            </div>
        </div>
    </motion.div>
);

export const DashboardPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [activeTab, setActiveTab] = useState('home');
    const [searchQuery, setSearchQuery] = useState('');

    // Protection logic: Redirect to login if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    // If not authenticated, return null while redirecting
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen relative">
            <AnimatedBackground />

            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Main Content */}
            <div className="ml-20 relative z-10 pt-24">
                {/* Header */}
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.3 }}
                    className="bg-teal-900/30 backdrop-blur-xl border-b border-cyan-400/30 px-8 py-4"
                >
                    <div className="flex items-center justify-between max-w-7xl mx-auto">
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <motion.h1
                                className="text-2xl font-bold text-white flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Sparkles className="w-6 h-6 text-cyan-400" />
                                The Insight-Sphere
                            </motion.h1>
                            <p className="text-sm text-cyan-300 mt-1">
                                AI-Powered Content & Skill Intelligence Platform
                            </p>
                        </motion.div>

                        <motion.div
                            className="flex items-center gap-4"
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                                <input
                                    type="text"
                                    placeholder="Search trends, topics..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-80 rounded-xl border border-cyan-400/30 bg-teal-900/40 backdrop-blur-xl text-white placeholder-cyan-400/50 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30 transition-all"
                                />
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(34, 211, 238, 0.4)' }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-cyan-500/40"
                            >
                                <Plus className="w-5 h-5" />
                                New Analysis
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Dashboard Content */}
                <div className="px-8 py-8 max-w-7xl mx-auto">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-6 mb-8">
                        <StatCard
                            title="Active Trends"
                            value="2,847"
                            change="+12.5%"
                            icon={TrendingUp}
                            color="from-cyan-500 to-cyan-600"
                            delay={0.1}
                        />
                        <StatCard
                            title="Sentiment Analyzed"
                            value="15.2K"
                            change="+8.3%"
                            icon={MessageSquare}
                            color="from-blue-500 to-blue-600"
                            delay={0.2}
                        />
                        <StatCard
                            title="Learning Paths"
                            value="324"
                            change="+23.1%"
                            icon={BookOpen}
                            color="from-purple-500 to-purple-600"
                            delay={0.3}
                        />
                        <StatCard
                            title="Opportunities"
                            value="89"
                            change="+15.7%"
                            icon={BarChart3}
                            color="from-emerald-500 to-emerald-600"
                            delay={0.4}
                        />
                    </div>

                    {/* Trending Opportunities */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-8"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <span className="text-2xl">🔥</span>
                                Trending Opportunities
                            </h2>
                            <motion.button
                                whileHover={{ x: 5 }}
                                className="text-sm text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
                            >
                                View all →
                            </motion.button>
                        </div>

                        <div className="grid grid-cols-4 gap-6">
                            <TrendCard
                                title="AI in Healthcare: The Next Revolution"
                                views="128K"
                                engagement="High ROI"
                                thumbnail="🏥"
                                delay={0.6}
                            />
                            <TrendCard
                                title="React Hooks Deep Dive Tutorial"
                                views="94K"
                                engagement="Medium"
                                thumbnail="⚛️"
                                delay={0.7}
                            />
                            <TrendCard
                                title="Climate Tech Innovations 2025"
                                views="76K"
                                engagement="High ROI"
                                thumbnail="🌍"
                                delay={0.8}
                            />
                            <TrendCard
                                title="Personal Finance for Gen Z"
                                views="112K"
                                engagement="Very High"
                                thumbnail="💰"
                                delay={0.9}
                            />
                        </div>
                    </motion.div>

                    {/* Recent Activity */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="bg-teal-900/40 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-6"
                    >
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="text-2xl">📊</span>
                            Recent Activity
                        </h2>
                        <div className="space-y-4">
                            {[
                                { action: 'New trend identified', topic: 'AI Ethics in Education', time: '2 min ago', type: 'trend' },
                                { action: 'Sentiment analysis complete', topic: 'Electric Vehicles Discussion', time: '15 min ago', type: 'sentiment' },
                                { action: 'Learning path created', topic: 'Python for Data Science', time: '1 hour ago', type: 'skill' },
                                { action: 'High engagement detected', topic: 'Remote Work Culture', time: '3 hours ago', type: 'trend' },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ x: -30, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 1.1 + i * 0.1 }}
                                    whileHover={{ x: 8, scale: 1.02 }}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-teal-800/30 hover:bg-teal-800/50 transition-all cursor-pointer border border-transparent hover:border-cyan-400/30"
                                >
                                    <motion.div
                                        whileHover={{ rotate: 360, scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.type === 'trend' ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/30' :
                                            item.type === 'sentiment' ? 'bg-blue-500/30 text-blue-300 border border-blue-400/30' :
                                                'bg-purple-500/30 text-purple-300 border border-purple-400/30'
                                            }`}
                                    >
                                        {item.type === 'trend' ? <TrendingUp className="w-5 h-5" /> :
                                            item.type === 'sentiment' ? <MessageSquare className="w-5 h-5" /> :
                                                <BookOpen className="w-5 h-5" />}
                                    </motion.div>
                                    <div className="flex-1">
                                        <div className="font-semibold text-white">{item.action}</div>
                                        <div className="text-sm text-cyan-300">{item.topic}</div>
                                    </div>
                                    <div className="text-sm text-cyan-400">{item.time}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;