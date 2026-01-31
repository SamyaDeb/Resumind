"use client";

import { useFieldArray, useForm } from 'react-hook-form';
import { Project } from '@/types/resume';
import { Plus, Trash2, Github, ExternalLink, Code2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface Props {
    initialData?: Project[];
    onSubmit: (data: Project[]) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function ProjectsForm({ initialData = [], onSubmit, onNext, onBack }: Props) {
    const { register, control, handleSubmit } = useForm({
        defaultValues: {
            projects: initialData.length > 0 ? initialData : []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'projects'
    });

    // Local state for the "New Project" being added
    const [newProject, setNewProject] = useState({
        title: '',
        link: '',
        technologies: '',
        description: ''
    });

    const handleAddProject = () => {
        if (!newProject.title.trim()) {
            toast.error("Project title is required");
            return;
        }
        if (!newProject.description.trim()) {
            toast.error("Description is required");
            return;
        }

        append({
            id: crypto.randomUUID(),
            title: newProject.title,
            link: newProject.link,
            description: newProject.description,
            technologies: newProject.technologies.split(',').map(t => t.trim()).filter(Boolean)
        });

        setNewProject({
            title: '',
            link: '',
            technologies: '',
            description: ''
        });

        toast.success("Project added!");
    };

    const handleFormSubmit = (data: any) => {
        onSubmit(data.projects);
        onNext();
    };

    const inputClass = "w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-neutral-500 outline-none transition-all text-sm";
    const labelClass = "block text-sm font-medium mb-2 text-neutral-300";

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white tracking-tight">Projects</h2>
                <p className="text-neutral-400">Highlight your best work, side projects, or open source contributions.</p>
            </div>

            {/* 1. "Add New" Form Section */}
            <div className="border border-dashed border-neutral-700 rounded-xl p-6 bg-neutral-900/30 space-y-5">
                <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-white font-semibold text-lg">Add New Project</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Project Title *</label>
                        <input
                            value={newProject.title}
                            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                            className={inputClass}
                            placeholder="e.g. AI Content Generator"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Project Link</label>
                        <input
                            value={newProject.link}
                            onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                            className={inputClass}
                            placeholder="https://github.com/..."
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className={labelClass}>Used Technologies <span className="text-neutral-500 text-xs font-normal">(Comma separated)</span></label>
                        <input
                            value={newProject.technologies}
                            onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                            className={inputClass}
                            placeholder="React, Node.js, TypeScript..."
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className={labelClass}>Description *</label>
                        <textarea
                            value={newProject.description}
                            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                            className={inputClass}
                            rows={3}
                            placeholder="Briefly describe what you built..."
                        />
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleAddProject}
                    className="w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-purple-400 font-bold rounded-lg border border-neutral-700 dashed transition-all flex items-center justify-center gap-2"
                >
                    <Plus size={20} />
                    Add Project
                </button>
            </div>

            {/* 2. List of Added Projects (Cards) */}
            <div className="grid gap-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="relative group border border-neutral-700 rounded-xl p-5 bg-neutral-800/40 backdrop-blur-sm hover:border-purple-500/50 transition-all">
                        {/* Hidden Inputs to keep Valid Data in Form State */}
                        <input type="hidden" {...register(`projects.${index}.title`)} />
                        <input type="hidden" {...register(`projects.${index}.link`)} />
                        <input type="hidden" {...register(`projects.${index}.description`)} />
                        {field.technologies.map((tech, i) => (
                            <input key={i} type="hidden" {...register(`projects.${index}.technologies.${i}`)} />
                        ))}

                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                                    {field.title}
                                    {field.link && (
                                        <a
                                            href={(field.link.startsWith('http') ? field.link : `https://${field.link}`)}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-neutral-400 hover:text-purple-400 transition-colors p-1"
                                            title="Open Project Link"
                                        >
                                            <ExternalLink size={16} />
                                        </a>
                                    )}
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-neutral-500 hover:text-red-400 p-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all"
                                title="Remove Project"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <p className="text-neutral-300 text-sm mb-3 line-clamp-2">{field.description}</p>

                        <div className="flex flex-wrap gap-2">
                            {field.technologies.map((tech, i) => (
                                <span key={i} className="text-xs bg-purple-900/30 text-purple-200 px-2 py-1 rounded border border-purple-800/50 flex items-center gap-1">
                                    <Code2 size={10} />
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-4 pt-4 border-t border-neutral-800">
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
