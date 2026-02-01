"use client";

import { useState, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Experience } from '@/types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
    initialData?: Experience[];
    onSubmit: (data: Experience[]) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function ExperienceForm({ initialData = [], onSubmit, onNext, onBack }: Props) {
    const { register, control, handleSubmit, watch, reset } = useForm({
        defaultValues: {
            experiences: initialData.length > 0 ? initialData : []
        }
    });

    useEffect(() => {
        if (initialData && initialData.length > 0) {
            reset({ experiences: initialData });
        }
    }, [initialData, reset]);

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'experiences'
    });

    const handleFormSubmit = (data: any) => {
        onSubmit(data.experiences);
        onNext();
    };

    const inputClass = "w-full px-3 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-neutral-500 outline-none transition-all text-sm";
    const labelClass = "block text-sm font-medium mb-2 text-neutral-300";

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white tracking-tight">Work Experience</h2>
                <p className="text-neutral-400">Detail your professional background.</p>
            </div>

            {fields.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed border-neutral-700 rounded-lg bg-neutral-800/20">
                    <p className="text-neutral-500 mb-4">No experience added yet.</p>
                    <button
                        type="button"
                        onClick={() => append({
                            id: crypto.randomUUID(),
                            company: '',
                            position: '',
                            location: '',
                            startDate: '',
                            endDate: '',
                            current: false,
                            bullets: ['']
                        })}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                    >
                        + Add Experience
                    </button>
                </div>
            )}

            {fields.map((field, index) => (
                <div key={field.id} className="border border-neutral-700 rounded-lg p-5 space-y-4 bg-neutral-800/50 backdrop-blur-sm">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg text-white">Experience {index + 1}</h3>
                        {fields.length > 1 && (
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                                title="Remove Experience"
                            >
                                <Trash2 size={20} />
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Company</label>
                            <input
                                {...register(`experiences.${index}.company`)}
                                className={inputClass}
                                placeholder="Google"
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Position</label>
                            <input
                                {...register(`experiences.${index}.position`)}
                                className={inputClass}
                                placeholder="Software Engineer"
                            />
                        </div>

                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                                <label className={labelClass}>Location</label>
                                <input
                                    {...register(`experiences.${index}.location`)}
                                    className={inputClass}
                                    placeholder="San Francisco, CA"
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Start Date</label>
                                <input
                                    {...register(`experiences.${index}.startDate`)}
                                    type="month"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>End Date</label>
                                <input
                                    {...register(`experiences.${index}.endDate`)}
                                    type="month"
                                    disabled={watch(`experiences.${index}.current`)}
                                    className={`${inputClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    {...register(`experiences.${index}.current`)}
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-neutral-600 bg-neutral-700 text-purple-600 focus:ring-purple-500"
                                />
                                <span className="text-sm text-neutral-300">Currently working here</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Responsibilities & Achievements</label>
                        <BulletPointsInput
                            experienceIndex={index}
                            register={register}
                        />
                    </div>
                </div>
            ))}

            <button
                type="button"
                onClick={() => append({
                    id: crypto.randomUUID(),
                    company: '',
                    position: '',
                    location: '',
                    startDate: '',
                    endDate: '',
                    current: false,
                    bullets: ['']
                })}
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
                <Plus size={20} />
                Add Another Experience
            </button>

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
                    Next
                </button>
            </div>
        </form>
    );
}

function BulletPointsInput({ experienceIndex, register }: any) {
    const [bullets, setBullets] = useState(['', '', '']);
    const inputClass = "w-full px-3 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-neutral-500 outline-none transition-all text-sm";

    return (
        <div className="space-y-2">
            {bullets.map((_, bulletIndex) => (
                <textarea
                    key={bulletIndex}
                    {...register(`experiences.${experienceIndex}.bullets.${bulletIndex}`)}
                    className={inputClass}
                    rows={2}
                    placeholder={`• Achievement or responsibility ${bulletIndex + 1}`}
                />
            ))}
            <button
                type="button"
                onClick={() => setBullets([...bullets, ''])}
                className="text-sm text-purple-400 hover:text-purple-300 font-medium"
            >
                + Add bullet point
            </button>
        </div>
    );
}
