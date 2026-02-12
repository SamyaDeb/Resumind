export interface Template {
    id: string;
    name: string;
    description: string;
    previewUrl: string;
    category: string;
}

const TEMPLATES: Template[] = [
    {
        id: 'professional',
        name: 'Professional',
        description: 'ATS Score: 95+ | Perfect for blockchain and tech professionals. Clean structure with bold headers.',
        previewUrl: '/previews/professional.png',
        category: 'Technical'
    },
    {
        id: 'modern',
        name: 'Modern Clean',
        description: 'ATS Score: 93+ | Contemporary single-column design. Ideal for modern tech roles and startups.',
        previewUrl: '/previews/modern.png',
        category: 'Modern'
    },
    {
        id: 'classic',
        name: 'Classic',
        description: 'ATS Score: 94+ | Traditional format with education first. Best for academic and research positions.',
        previewUrl: '/previews/classic.png',
        category: 'Traditional'
    },
    {
        id: 'creative',
        name: 'Simple Professional',
        description: 'ATS Score: 96+ | Ultra-clean layout with maximum ATS compatibility. Works for all industries.',
        previewUrl: '/previews/creative.png',
        category: 'Creative'
    },
    {
        id: 'compact',
        name: 'Tech Focused',
        description: 'ATS Score: 95+ | Optimized for software engineers. Emphasizes technical skills and projects.',
        previewUrl: '/previews/compact.png',
        category: 'Technical'
    }
];

export class TemplateService {
    static getTemplates(): Template[] {
        return TEMPLATES;
    }

    static getTemplate(id: string): Template | undefined {
        return TEMPLATES.find(template => template.id === id);
    }

    static getTemplatesByCategory(category: string): Template[] {
        return TEMPLATES.filter(template => template.category === category);
    }

    static isValidTemplate(id: string): boolean {
        return TEMPLATES.some(template => template.id === id);
    }

    /**
     * Get template LaTeX content.
     * In serverless, we embed the template content directly instead of reading from filesystem.
     */
    static getTemplateContent(id: string): string {
        const templates: Record<string, string> = {
            modern: MODERN_TEMPLATE,
            professional: MODERN_TEMPLATE,
            classic: MODERN_TEMPLATE,
            creative: MODERN_TEMPLATE,
            compact: MODERN_TEMPLATE,
        };

        const content = templates[id];
        if (!content) {
            throw new Error(`Template ${id} not found`);
        }
        return content;
    }
}

// Embed the modern template content directly for serverless compatibility
const MODERN_TEMPLATE = `%-------------------------
% Resume in Latex
% Author: Samya Deb Biswas
% Adapted for AI Resume Builder
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{fontawesome5}
\\usepackage{multicol}
\\setlength{\\multicolsep}{-3.0pt}
\\setlength{\\columnsep}{-1pt}
\\input{glyphtounicode}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\addtolength{\\oddsidemargin}{-0.6in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1.19in}
\\addtolength{\\topmargin}{-.7in}
\\addtolength{\\textheight}{1.4in}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{
  \\vspace{-6pt}\\scshape\\raggedright\\large\\bfseries
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\pdfgentounicode=1

\\newcommand{\\resumeItem}[1]{\\item\\small{#1 \\vspace{-2pt}}}
\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{1.0\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & \\textbf{\\small #2} \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-6pt}
}
\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{1.001\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & \\textbf{\\small #2}\\\\
    \\end{tabular*}\\vspace{-6pt}
}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}
\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.0in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}

\\hypersetup{
    pdftitle={{personalInfo.fullName}} - Resume,
    pdfauthor={{personalInfo.fullName}},
    urlcolor=blue
}

\\begin{document}

%----------HEADING----------
\\begin{center}
    {\\Huge \\scshape {{escapeLatex personalInfo.fullName}} } \\\\ \\vspace{4pt}
    {{#if personalInfo.title}}
    {\\Large \\scshape {{escapeLatex personalInfo.title}} } \\\\ \\vspace{4pt}
    {{/if}}
    \\small 
    {{#if personalInfo.phone}}
    \\faPhone\\ {{escapeLatex personalInfo.phone}} ~ 
    {{/if}}
    {{#if personalInfo.email}}
    \\href{mailto:{{personalInfo.email}} }{\\faEnvelope\\ \\underline{ {{escapeLatex personalInfo.email}} }} ~ 
    {{/if}}
    {{#if personalInfo.linkedin}}
    \\href{ {{personalInfo.linkedin}} }{\\faLinkedin\\ \\underline{LinkedIn}} 
    {{/if}}
    {{#if personalInfo.github}}
    \\href{ {{personalInfo.github}} }{\\faGithub\\ \\underline{GitHub}}
    {{/if}}
    {{#if personalInfo.portfolio}}
    \\href{ {{personalInfo.portfolio}} }{\\faGlobe\\ \\underline{Portfolio}}
    {{/if}}
\\end{center}

%-----------SUMMARY-----------
{{#if summary}}
\\section{Summary}
{{escapeLatex summary}}
{{/if}}

%-----------SKILLS-----------
{{#if skills}}
\\section{Skills}
{{#each skills}}
\\textbf{ {{escapeLatex category}}: } {{escapeLatex skillsList}} \\\\
{{/each}}
{{/if}}

%-----------AWARDS-----------
{{#if certifications}}
\\section{Awards \\& Certifications}
\\resumeItemListStart
{{#each certifications}}
  \\resumeItem{\\textbf{ {{escapeLatex name}} {{#if date}}({{escapeLatex date}}){{/if}}: } {{escapeLatex description}} }
{{/each}}
\\resumeItemListEnd
{{/if}}

%-----------EXPERIENCE-----------
{{#if experience}}
\\section{Experience}
\\resumeSubHeadingListStart
{{#each experience}}
  \\resumeSubheading
    { {{escapeLatex position}} }{ {{escapeLatex duration}} }
    { {{escapeLatex company}} }{ {{escapeLatex location}} }
    \\resumeItemListStart
      {{#each bullets}}
      \\resumeItem{ {{escapeLatex this}} }
      {{/each}}
    \\resumeItemListEnd
{{/each}}
\\resumeSubHeadingListEnd
{{/if}}

%-----------PROJECTS-----------
{{#if projects}}
\\section{Projects}
\\resumeSubHeadingListStart
{{#each projects}}
  \\resumeProjectHeading
      {\\textbf{ {{escapeLatex title}} } {{#if technologies}} $|$ \\emph{ {{escapeLatex technologies}} } {{/if}} }{ {{escapeLatex year}} }
      \\resumeItemListStart
        {{#if description}}
        \\resumeItem{ {{escapeLatex description}} }
        {{/if}}
        {{#each bullets}}
        \\resumeItem{ {{escapeLatex this}} }
        {{/each}}
      \\resumeItemListEnd
{{/each}}
\\resumeSubHeadingListEnd
{{/if}}

%-----------EDUCATION-----------
{{#if education}}
\\section{Education}
\\resumeSubHeadingListStart
{{#each education}}
  \\resumeSubheading
    { {{escapeLatex degree}} {{#if field}}in {{escapeLatex field}}{{/if}} }{Graduated: {{escapeLatex graduationYear}} }
    { {{escapeLatex school}} }{ {{#if gpa}}CGPA: {{escapeLatex gpa}}{{/if}} }
{{/each}}
\\resumeSubHeadingListEnd
{{/if}}

\\end{document}`;

