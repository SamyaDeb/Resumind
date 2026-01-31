"use client";

import { useState, useRef, useEffect } from 'react';
import { X, Plus, ChevronDown } from 'lucide-react';
import { SkillGroup } from '@/types/resume';

interface Props {
    initialData?: SkillGroup[];
    onSubmit: (data: SkillGroup[]) => void;
    onNext: () => void;
    onBack: () => void;
}

const SKILL_CATEGORIES = [
    'Programming Languages',
    'Frameworks',
    'Tools',
    'Databases'
] as const;

const SUGGESTIONS: Record<string, string[]> = {
    'Programming Languages': ['JavaScript', 'TypeScript', 'Solidity', 'C', 'C++', 'Python', 'HTML', 'Rust', 'Java', 'Go', 'Kotlin', 'Swift'],
    'Frameworks': ['React.js', 'Next.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'Bootstrap', 'ShadCN', 'Vue.js', 'Angular', 'Django', 'Spring Boot', 'Flutter'],
    'Tools': ['Git', 'GitHub', 'Docker', 'VS Code', 'Cursor', 'Recoil', 'Hardhat', 'RainbowKit', 'Kubernetes', 'AWS', 'Jenkins', 'Figma'],
    'Databases': ['MongoDB', 'MySQL', 'PostgreSQL', 'Prisma', 'Firebase', 'Supabase', 'Redis', 'Cassandra', 'DynamoDB']
};

export default function SkillsForm({ initialData = [], onSubmit, onNext, onBack }: Props) {
    // Initialize state with all categories, preserving existing data if any
    const [skillGroups, setSkillGroups] = useState<SkillGroup[]>(() => {
        return SKILL_CATEGORIES.map(category => {
            const existing = initialData.find(g => g.category === category);
            return existing || { category, items: [] };
        });
    });

    const [inputs, setInputs] = useState<Record<string, string>>({});
    const [activeSuggestion, setActiveSuggestion] = useState<string | null>(null);

    // Refs for click outside to close suggestions
    const suggestionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
                setActiveSuggestion(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (category: string, value: string) => {
        setInputs(prev => ({ ...prev, [category]: value }));
        setActiveSuggestion(category);
    };

    const addSkill = (category: string, skill: string) => {
        const trimmedSkill = skill.trim();
        if (!trimmedSkill) return;

        setSkillGroups(prev => prev.map(group => {
            if (group.category === category && !group.items.includes(trimmedSkill)) {
                return { ...group, items: [...group.items, trimmedSkill] };
            }
            return group;
        }));

        setInputs(prev => ({ ...prev, [category]: '' }));
        setActiveSuggestion(null);
    };

    const removeSkill = (category: string, skillToRemove: string) => {
        setSkillGroups(prev => prev.map(group => {
            if (group.category === category) {
                return { ...group, items: group.items.filter(s => s !== skillToRemove) };
            }
            return group;
        }));
    };

    const handleFormSubmit = (e: any) => {
        e.preventDefault();
        onSubmit(skillGroups.filter(g => g.items.length > 0)); // Only submit groups with items? Or all? Let's keep all for now or filter.
        onNext();
    };

    const inputClass = "w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-neutral-500 outline-none transition-all";

    return (
        <form onSubmit={handleFormSubmit} className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white tracking-tight">Technical Skills</h2>
                <p className="text-neutral-400">Showcase your specialized skills.</p>
            </div>

            <div className="grid gap-6">
                {skillGroups.map((group) => {
                    const suggestions = SUGGESTIONS[group.category] || [];
                    const inputValue = inputs[group.category] || '';
                    const filteredSuggestions = suggestions.filter(s =>
                        s.toLowerCase().includes(inputValue.toLowerCase()) &&
                        !group.items.includes(s)
                    );

                    return (
                        <div key={group.category} className="space-y-3 p-5 bg-neutral-800/30 border border-neutral-700/50 rounded-xl hover:border-neutral-600 transition-colors">
                            <label className="block text-lg font-semibold text-white mb-2">{group.category}</label>

                            <div className="relative">
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <input
                                            value={inputValue}
                                            onChange={(e) => handleInputChange(group.category, e.target.value)}
                                            onFocus={() => setActiveSuggestion(group.category)}
                                            className={inputClass}
                                            placeholder={`Add ${group.category}...`}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    addSkill(group.category, inputValue);
                                                }
                                            }}
                                        />
                                        {/* Auto-suggestions Dropdown */}
                                        {activeSuggestion === group.category && filteredSuggestions.length > 0 && (
                                            <div ref={suggestionsRef} className="absolute z-50 left-0 right-0 mt-2 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                                                {filteredSuggestions.map(suggestion => (
                                                    <button
                                                        key={suggestion}
                                                        type="button"
                                                        onClick={() => addSkill(group.category, suggestion)}
                                                        className="w-full text-left px-4 py-2 hover:bg-purple-600/20 hover:text-purple-300 text-neutral-300 transition-colors"
                                                    >
                                                        {suggestion}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => addSkill(group.category, inputValue)}
                                        className="bg-purple-600/80 text-white px-4 rounded-lg hover:bg-purple-600 transition-colors"
                                    >
                                        <Plus size={24} />
                                    </button>
                                </div>
                            </div>

                            {/* Selected Skills Tags */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                {group.items.length === 0 && (
                                    <span className="text-neutral-600 text-sm italic">No skills added yet</span>
                                )}
                                {group.items.map(skill => (
                                    <span
                                        key={skill}
                                        className="bg-neutral-700/50 border border-neutral-600 text-neutral-200 px-3 py-1 rounded-full text-sm flex items-center gap-2 group hover:border-purple-500/50 transition-all"
                                    >
                                        {skill}
                                        <button
                                            type="button"
                                            onClick={() => removeSkill(group.category, skill)}
                                            className="text-neutral-500 hover:text-red-400 transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex gap-4 pt-6">
                <button
                    type="button"
                    onClick={onBack}
                    className="flex-1 px-6 py-3 rounded-lg border border-neutral-600 text-neutral-300 hover:bg-neutral-800 transition-all font-medium"
                >
                    Back
                </button>
                <button
                    type="submit"
                    className="flex-1 bg-white text-black py-3 rounded-lg hover:bg-neutral-200 transition-all font-bold"
                >
                    Next: Achievements
                </button>
            </div>
        </form>
    );
}
