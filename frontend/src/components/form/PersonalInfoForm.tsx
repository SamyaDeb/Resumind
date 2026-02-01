"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PersonalInfo } from '@/types/resume';
import { useEffect } from 'react';

const schema = z.object({
    fullName: z.string().optional().or(z.literal('')),
    title: z.string().optional().or(z.literal('')),
    email: z.string().email('Invalid email address').optional().or(z.literal('')),
    phone: z.string().optional().or(z.literal('')),
    location: z.string().optional().or(z.literal('')),
    linkedin: z.string().url().optional().or(z.literal('')),
    github: z.string().url().optional().or(z.literal('')),
    portfolio: z.string().url().optional().or(z.literal('')),
});

interface Props {
    initialData?: PersonalInfo;
    onSubmit: (data: PersonalInfo) => void;
    onNext: () => void;
}

export default function PersonalInfoForm({ initialData, onSubmit, onNext }: Props) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<PersonalInfo>({
        resolver: zodResolver(schema),
        defaultValues: initialData,
    });

    // Reset form when initialData changes (e.g., loading demo data)
    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    const handleFormSubmit = (data: PersonalInfo) => {
        onSubmit(data);
        onNext();
    };

    const inputClass = "w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-neutral-500 outline-none transition-all";
    const labelClass = "block text-sm font-medium mb-2 text-neutral-300";

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white tracking-tight">Personal Information</h2>
                <p className="text-neutral-400">Let's start with your basic contact details.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className={labelClass}>Full Name</label>
                    <input
                        {...register('fullName')}
                        className={inputClass}
                        placeholder="John Doe"
                    />
                    {errors.fullName && (
                        <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>
                    )}
                </div>

                <div>
                    <label className={labelClass}>Professional Title</label>
                    <input
                        {...register('title')}
                        className={inputClass}
                        placeholder="Senior Software Engineer"
                    />
                    {errors.title && (
                        <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
                    )}
                </div>

                <div>
                    <label className={labelClass}>Email</label>
                    <input
                        {...register('email')}
                        type="email"
                        className={inputClass}
                        placeholder="john@example.com"
                    />
                    {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label className={labelClass}>Phone</label>
                    <input
                        {...register('phone')}
                        className={inputClass}
                        placeholder="+1 234 567 8900"
                    />
                    {errors.phone && (
                        <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                    )}
                </div>

                <div>
                    <label className={labelClass}>Location</label>
                    <input
                        {...register('location')}
                        className={inputClass}
                        placeholder="New York, NY"
                    />
                    {errors.location && (
                        <p className="text-red-400 text-sm mt-1">{errors.location.message}</p>
                    )}
                </div>

                <div>
                    <label className={labelClass}>LinkedIn</label>
                    <input
                        {...register('linkedin')}
                        className={inputClass}
                        placeholder="https://linkedin.com/in/yourprofile"
                    />
                </div>

                <div>
                    <label className={labelClass}>GitHub</label>
                    <input
                        {...register('github')}
                        className={inputClass}
                        placeholder="https://github.com/yourusername"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className={labelClass}>Portfolio / Website</label>
                    <input
                        {...register('portfolio')}
                        className={inputClass}
                        placeholder="https://yourportfolio.com"
                    />
                </div>
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-lg bg-green-500 text-black hover:bg-green-400 transition-all font-bold text-lg shadow-lg hover:shadow-green-500/20"
                >
                    Next
                </button>
            </div>
        </form>
    );
}
