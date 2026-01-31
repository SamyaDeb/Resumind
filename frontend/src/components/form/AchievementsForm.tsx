"use client";

import { useFieldArray, useForm } from 'react-hook-form';
import { Certification } from '@/types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
    initialData?: Certification[];
    onSubmit: (data: Certification[]) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function AchievementsForm({ initialData = [], onSubmit, onNext, onBack }: Props) {
    const { register, control, handleSubmit } = useForm({
        defaultValues: {
            certifications: initialData.length > 0 ? initialData : []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'certifications'
    });

    const handleFormSubmit = (data: any) => {
        onSubmit(data.certifications);
        onNext();
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Achievements & Certifications</h2>
            <p className="text-neutral-400">Add your hackathon wins, certifications, and awards.</p>

            {fields.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed border-neutral-700 rounded-lg bg-neutral-800/20">
                    <p className="text-neutral-500 mb-4">No achievements added yet.</p>
                    <button
                        type="button"
                        onClick={() => append({
                            id: crypto.randomUUID(),
                            name: '',
                            issuer: '',
                            date: '',
                            description: '',
                            credentialId: ''
                        })}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                    >
                        + Add Achievement
                    </button>
                </div>
            )}

            {fields.map((field, index) => (
                <div key={field.id} className="border border-neutral-700 rounded-lg p-6 space-y-4 bg-neutral-800/50 backdrop-blur-sm">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg text-white">Achievement {index + 1}</h3>
                        {fields.length > 1 && (
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                                title="Remove Entry"
                            >
                                <Trash2 size={20} />
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2 text-neutral-300">Title / Name</label>
                            <input
                                {...register(`certifications.${index}.name`)}
                                className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-neutral-500 outline-none transition-all"
                                placeholder="e.g. AWS Certified Solutions Architect or Hackathon Winner 2024"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-neutral-300">Issuer / Organization</label>
                            <input
                                {...register(`certifications.${index}.issuer`)}
                                className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-neutral-500 outline-none transition-all"
                                placeholder="Amazon Web Services"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-neutral-300">Date</label>
                            <input
                                {...register(`certifications.${index}.date`)}
                                type="month"
                                className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-neutral-500 outline-none transition-all"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2 text-neutral-300">Description / Details (Optional)</label>
                            <textarea
                                {...register(`certifications.${index}.description`)}
                                className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-neutral-500 outline-none transition-all"
                                placeholder="Briefly describe what you achieved or learned..."
                                rows={3}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2 text-neutral-300">Credential URL / ID (Optional)</label>
                            <input
                                {...register(`certifications.${index}.credentialId`)}
                                className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-neutral-500 outline-none transition-all"
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                </div>
            ))}

            <button
                type="button"
                onClick={() => append({
                    id: crypto.randomUUID(),
                    name: '',
                    issuer: '',
                    date: '',
                    description: '',
                    credentialId: ''
                })}
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
                <Plus size={20} />
                Add Another Achievement
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
