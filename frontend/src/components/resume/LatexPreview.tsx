"use client";
import Editor from "@monaco-editor/react";

interface Props {
    code: string;
}

export default function LatexPreview({ code }: Props) {
    return (
        <div className="h-[600px] border rounded-lg overflow-hidden shadow-lg mt-4">
            <div className="bg-gray-800 text-white p-2 text-sm font-mono">LaTeX Source Preview</div>
            <Editor
                height="100%"
                defaultLanguage="latex"
                value={code}
                theme="vs-dark"
                options={{ readOnly: true, minimap: { enabled: false } }}
            />
        </div>
    );
}
