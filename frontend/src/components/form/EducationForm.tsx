"use client";

import { useFieldArray, useForm } from 'react-hook-form';
import { Education } from '@/types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
    initialData?: Education[];
    onSubmit: (data: Education[]) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function EducationForm({ initialData = [], onSubmit, onNext, onBack }: Props) {
    const { register, control, handleSubmit } = useForm({
        defaultValues: {
            educations: initialData.length > 0 ? initialData : [{
                id: crypto.randomUUID(),
                school: '',
                degree: '',
                field: '',
                location: '',
                startDate: '',
                endDate: '',
                gpa: ''
            }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'educations'
    });

    const handleFormSubmit = (data: any) => {
        onSubmit(data.educations);
        onNext();
    };

    const inputClass = "w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-neutral-500 outline-none transition-all";
    const labelClass = "block text-sm font-medium mb-2 text-neutral-300";

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white tracking-tight">Education</h2>
                <p className="text-neutral-400">Add your academic background.</p>
            </div>



            {fields.map((field, index) => (
                <div key={field.id} className="border border-neutral-700 rounded-lg p-6 space-y-4 bg-neutral-800/50 backdrop-blur-sm">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg text-white">Education {index + 1}</h3>
                        {fields.length > 1 && (
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                                title="Remove Education"
                            >
                                <Trash2 size={20} />
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className={labelClass}>School / University</label>
                            <input
                                {...register(`educations.${index}.school`)}
                                className={inputClass}
                                placeholder="Massachusetts Institute of Technology"
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Degree</label>
                            <input
                                {...register(`educations.${index}.degree`)}
                                className={inputClass}
                                placeholder="Bachelor of Science"
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Field of Study</label>
                            <input
                                {...register(`educations.${index}.field`)}
                                className={inputClass}
                                placeholder="Computer Science"
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Location</label>
                            <input
                                {...register(`educations.${index}.location`)}
                                className={inputClass}
                                placeholder="Cambridge, MA"
                            />
                        </div>

                        <div>
                            <label className={labelClass}>GPA (Optional)</label>
                            <input
                                {...register(`educations.${index}.gpa`)}
                                className={inputClass}
                                placeholder="3.8/4.0"
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Start Date</label>
                            <input
                                {...register(`educations.${index}.startDate`)}
                                type="month"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>End Date (or Expected)</label>
                            <input
                                {...register(`educations.${index}.endDate`)}
                                type="month"
                                className={inputClass}
                            />
                        </div>
                    </div>
                </div>
            ))}

            <button
                type="button"
                onClick={() => append({
                    id: crypto.randomUUID(),
                    school: '',
                    degree: '',
                    field: '',
                    location: '',
                    startDate: '',
                    endDate: '',
                    gpa: ''
                })}
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
                <Plus size={20} />
                Add Another Education
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
