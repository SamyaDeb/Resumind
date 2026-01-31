"use client";

import { useForm } from 'react-hook-form';

interface Props {
    initialData?: string;
    onSubmit: (data: string) => void;
    onBack: () => void;
    onComplete: () => void;
}

export default function SummaryForm({ initialData = '', onSubmit, onBack, onComplete }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { summary: initialData }
    });

    const handleFormSubmit = (data: { summary: string }) => {
        onSubmit(data.summary);
        onComplete();
    };

    const inputClass = "w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-neutral-500 outline-none transition-all";

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white tracking-tight">Professional Summary</h2>
                <p className="text-neutral-400">
                    Write a brief overview of your background, key achievements, and career goals.
                    Stuck? We can help you generate this later with AI.
                </p>
            </div>

            <div>
                <textarea
                    {...register('summary')}
                    className={`${inputClass} h-48`}
                    placeholder="Experienced software engineer with a passion for building scalable web applications..."
                />
                {errors.summary && (
                    <p className="text-red-400 text-sm mt-1">{errors.summary.message}</p>
                )}
            </div>

            <div className="flex gap-4 pt-4">
                <button
                    type="button"
                    onClick={onBack}
                    className="flex-1 px-6 py-3 rounded-lg bg-white text-black hover:bg-neutral-200 transition-all font-bold text-lg shadow-lg hover:shadow-white/20"
                >
                    Back
                </button>
                <button
                    type="submit"
                    className="flex-1 px-6 py-3 rounded-lg bg-green-500 text-black hover:bg-green-400 transition-all font-bold text-lg shadow-lg hover:shadow-green-500/20"
                >
                    Complete Resume
                </button>
            </div>
        </form>
    );
}
