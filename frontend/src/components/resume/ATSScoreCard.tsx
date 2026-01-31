"use client";

import { ATSScore } from '@/types/resume';

interface Props {
    score: ATSScore;
}

export default function ATSScoreCard({ score }: Props) {
    const getScoreColor = (value: number) => {
        if (value >= 90) return 'text-green-600';
        if (value >= 70) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getScoreLabel = (value: number) => {
        if (value >= 90) return 'Excellent';
        if (value >= 80) return 'Very Good';
        if (value >= 70) return 'Good';
        if (value >= 60) return 'Fair';
        return 'Needs Improvement';
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">ATS Score</h3>

            {/* Overall Score */}
            <div className="text-center mb-6">
                <div className={`text-6xl font-bold ${getScoreColor(score.overallScore)}`}>
                    {score.overallScore}
                </div>
                <div className="text-gray-600 text-lg mt-2">
                    {getScoreLabel(score.overallScore)}
                </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-3">
                <h4 className="font-semibold mb-2">Score Breakdown</h4>
                {Object.entries(score.breakdown).map(([key, value]) => (
                    <div key={key}>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="capitalize">{key}</span>
                            <span className={getScoreColor(value)}>{value}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${value >= 90 ? 'bg-green-600' :
                                        value >= 70 ? 'bg-yellow-600' :
                                            'bg-red-600'
                                    }`}
                                style={{ width: `${value}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Suggestions */}
            {score.suggestions.length > 0 && (
                <div className="mt-6">
                    <h4 className="font-semibold mb-2">Suggestions</h4>
                    <ul className="space-y-2">
                        {score.suggestions.map((suggestion, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start">
                                <span className="mr-2">•</span>
                                <span>{suggestion}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
