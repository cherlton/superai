import React, { useState } from 'react';
import { Container } from '../../component/layout/Container';
import { Card } from '../../component/Card';
import { Button } from '../../component/common/Button';
import logo from '../../assets/logo.png';

export const SignUpPage: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            console.log('Sign Up:', formData);
            setIsLoading(false);
        }, 1500);
    };

    // Password strength indicator
    const getPasswordStrength = (password: string) => {
        if (password.length === 0) return { strength: 0, label: '', color: '' };
        if (password.length < 6) return { strength: 25, label: 'Weak', color: 'bg-red-500' };
        if (password.length < 10) return { strength: 50, label: 'Fair', color: 'bg-yellow-500' };
        if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)) return { strength: 100, label: 'Strong', color: 'bg-green-500' };
        return { strength: 75, label: 'Good', color: 'bg-blue-500' };
    };

    const passwordStrength = getPasswordStrength(formData.password);

    return (
        <div className="min-h-screen hero-gradient flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary-purple/20 rounded-full blur-3xl" />
            </div>

            <Container size="sm" className="relative z-10">
                <Card variant="glass" padding="lg" className="max-w-md mx-auto backdrop-blur-xl">
                    {/* Logo & Header */}
                    <div className="text-center mb-8">
                        <a href="/" className="inline-flex items-center gap-2 mb-6">
                            <img src={logo} alt="Insight-Sphere" className="w-12 h-12 rounded-xl" />
                            <span className="font-bold text-xl text-neutral-charcoal">Insight-Sphere</span>
                        </a>
                        <h1 className="text-2xl font-bold text-neutral-charcoal mb-2">Create your account</h1>
                        <p className="text-neutral-dark-gray">Start your AI-powered journey today</p>
                    </div>

                    {/* Sign Up Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name Field */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-neutral-charcoal mb-2">
                                Full name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-neutral-gray bg-white/50 text-neutral-charcoal placeholder-neutral-dark-gray/50 focus:outline-none focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue transition-all"
                                placeholder="John Doe"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-neutral-charcoal mb-2">
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-neutral-gray bg-white/50 text-neutral-charcoal placeholder-neutral-dark-gray/50 focus:outline-none focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue transition-all"
                                placeholder="you@example.com"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-neutral-charcoal mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={8}
                                className="w-full px-4 py-3 rounded-xl border border-neutral-gray bg-white/50 text-neutral-charcoal placeholder-neutral-dark-gray/50 focus:outline-none focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue transition-all"
                                placeholder="Create a strong password"
                            />
                            {/* Password Strength Indicator */}
                            {formData.password && (
                                <div className="mt-2">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs text-neutral-dark-gray">Password strength</span>
                                        <span className={`text-xs font-medium ${passwordStrength.color.replace('bg-', 'text-')}`}>
                                            {passwordStrength.label}
                                        </span>
                                    </div>
                                    <div className="h-1.5 bg-neutral-gray rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${passwordStrength.color} transition-all duration-300`}
                                            style={{ width: `${passwordStrength.strength}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-charcoal mb-2">
                                Confirm password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-neutral-gray bg-white/50 text-neutral-charcoal placeholder-neutral-dark-gray/50 focus:outline-none focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue transition-all"
                                placeholder="Confirm your password"
                            />
                            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
                            )}
                        </div>

                        {/* Terms Checkbox */}
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onChange={handleChange}
                                required
                                className="w-4 h-4 mt-0.5 rounded border-neutral-gray text-primary-blue focus:ring-primary-blue/50"
                            />
                            <span className="text-sm text-neutral-dark-gray">
                                I agree to the{' '}
                                <a href="/terms" className="text-primary-blue hover:underline">Terms of Service</a>
                                {' '}and{' '}
                                <a href="/privacy" className="text-primary-blue hover:underline">Privacy Policy</a>
                            </span>
                        </label>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth
                            isLoading={isLoading}
                        >
                            Create account
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-gray" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-neutral-dark-gray">Or sign up with</span>
                        </div>
                    </div>

                    {/* Social Sign Up */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 px-4 py-3 border border-neutral-gray rounded-xl hover:bg-neutral-light-gray transition-colors">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="text-sm font-medium text-neutral-charcoal">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-3 border border-neutral-gray rounded-xl hover:bg-neutral-light-gray transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            <span className="text-sm font-medium text-neutral-charcoal">GitHub</span>
                        </button>
                    </div>

                    {/* Login Link */}
                    <p className="text-center mt-8 text-neutral-dark-gray">
                        Already have an account?{' '}
                        <a href="/login" className="text-primary-blue hover:text-primary-dark-blue font-semibold">
                            Sign in
                        </a>
                    </p>
                </Card>
            </Container>
        </div>
    );
};

export default SignUpPage;
