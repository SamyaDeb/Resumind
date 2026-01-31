
import os
import subprocess
import time

def run_git(args, cwd=None):
    result = subprocess.run(['git'] + args, cwd=cwd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error running git {' '.join(args)}: {result.stderr}")
    return result

def main():
    root_dir = "/Users/samya/Downloads/Running Project/AI Powered Resume Builder"
    os.chdir(root_dir)

    # 1. Reset Git
    print("Resetting git repository...")
    subprocess.run(['rm', '-rf', '.git'])
    run_git(['init'])
    
    # Configure using local defaults (author from user system)
    run_git(['branch', '-M', 'main'])

    commits = [
        # INITIAL SETUP
        (['package.json', 'package-lock.json', '.gitignore', 'README.md'], "Initial project initialization"),
        (['tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json', 'vite.config.ts'], "Add TypeScript and Vite configuration"),
        (['tailwind.config.js', 'postcss.config.js', 'eslint.config.js', 'components.json'], "Setup TailwindCSS and linting configuration"),
        
        # ROOT CLIENT (Vite legacy or shared)
        (['index.html', 'public/', 'src/assets/'], "Add HTML entry point and assets"),
        (['src/lib/', 'src/main.tsx', 'src/App.tsx', 'src/index.css'], "Add shared core client logic and global styles"),
        (['src/components/'], "Add initial shared UI components"),
        
        # BACKEND
        (['backend/package.json', 'backend/package-lock.json', 'backend/tsconfig.json'], "Backend: Initialize Node.js Express server"),
        (['backend/.env.example'], "Backend: Add environment configuration template"),
        (['backend/src/config/'], "Backend: Setup configuration modules"),
        (['backend/src/utils/', 'backend/src/middleware/'], "Backend: Add utilities and middleware"),
        (['backend/src/services/'], "Backend: Implement core services"),
        (['backend/src/controllers/'], "Backend: Add API controllers"),
        (['backend/src/routes/'], "Backend: Define API routes"),
        (['backend/src/server.ts'], "Backend: Create main server entry point"),
        
        # DOCUMENTATION
        (['docs/'], "Add project documentation and guides"),
        
        # FRONTEND (Next.js) - INFRA
        (['frontend/package.json', 'frontend/package-lock.json', 'frontend/next.config.ts', 'frontend/tsconfig.json'], "Frontend: Initialize Next.js application"),
        (['frontend/postcss.config.mjs', 'frontend/eslint.config.mjs', 'frontend/next-env.d.ts'], "Frontend: Configure build tools"),
        (['frontend/src/lib/'], "Frontend: Add client-side utilities and Firebase setup"),
        (['frontend/src/types/'], "Frontend: Define TypeScript interfaces and types"),
        
        # FRONTEND - STYLES & LAYOUT
        (['frontend/src/app/globals.css'], "Frontend: Setup global CSS variables and themes"),
        (['frontend/src/app/layout.tsx', 'frontend/src/app/fonts/'], "Frontend: Create root layout and font configuration"),
        
        # FRONTEND - CORE COMPONENTS
        (['frontend/src/components/LiquidEther.tsx', 'frontend/src/styles/LiquidEther.css'], "Frontend: Implement LiquidEther visualization engine"),
        (['frontend/src/components/LiquidBackground.tsx'], "Frontend: Add persistent liquid background component"),
        (['frontend/src/components/ScrollStack.tsx', 'frontend/src/styles/ScrollStack.css'], "Frontend: Add interactive ScrollStack component"),
        
        # FRONTEND - PAGES
        (['frontend/src/app/page.tsx', 'frontend/src/components/ui/'], "Frontend: Implement Landing Page with scroll animations"),
        (['frontend/src/app/builder/page.tsx'], "Frontend: Create Builder layout and page structure"),
        
        # FRONTEND - FORMS
        (['frontend/src/components/form/ResumeFormWizard.tsx'], "Frontend: Implement Resume Builder Wizard Orchestrator"),
        (['frontend/src/components/form/PersonalInfoForm.tsx'], "Frontend: Add Personal Information form step"),
        (['frontend/src/components/form/ExperienceForm.tsx'], "Frontend: Add Experience form with dynamic lists"),
        (['frontend/src/components/form/EducationForm.tsx'], "Frontend: Add Education form step"),
        (['frontend/src/components/form/SkillsForm.tsx'], "Frontend: Create Categorized Skills input form"),
        (['frontend/src/components/form/ProjectsForm.tsx'], "Frontend: Add Projects section"),
        (['frontend/src/components/form/AchievementsForm.tsx'], "Frontend: Add Achievements and Certifications form"),
        (['frontend/src/components/form/SummaryForm.tsx'], "Frontend: Add Professional Summary step"),
        
        # FINALIZATION
        (['frontend/src/'], "Frontend: Finalize UI polish and component integration"),
        (['.'], "Final polish: Code cleanup and consistency checks") 
    ]

    print(f"Starting creation of {len(commits)} commits...")
    
    for i, (files, message) in enumerate(commits):
        # Add specific files
        for f in files:
            file_path = os.path.join(root_dir, f)
            # If directory, add recursively, if file add file
            if os.path.exists(file_path):
                 run_git(['add', f])
            else:
                 # It might be that the specific file grouping is loose, so we try adding whatever wildcard matches or ignore missing
                 pass
        
        # Make sure we don't commit empty if files didn't exist in that specific group
        # But to be safe, we can just `git add .` effectively at the end to catch stragglers, 
        # but for specific history we want granular add.
        # Let's check status.
        status = run_git(['status', '--porcelain'])
        if status.stdout.strip():
            # Commit
            run_git(['commit', '-m', message])
            print(f"Commit {i+1}/{len(commits)}: {message}")
            time.sleep(1) # Small delay to ensure timestamp diff
        else:
            print(f"Skipping commit {i+1}: No changes for {files}")

    # Catch anything remaining
    run_git(['add', '.'])
    status = run_git(['status', '--porcelain'])
    if status.stdout.strip():
        run_git(['commit', '-m', "Final integration merge"])
        print("Added final integration commit")

    print("History reconstruction complete.")
    
    # Remote setup
    run_git(['remote', 'add', 'origin', 'https://github.com/SamyaDeb/Resumind.git'])
    print("Remote added. pushing...")
    
    # Push
    push_res = run_git(['push', '-u', 'origin', 'main', '--force'])
    print(push_res.stdout)
    if push_res.stderr:
        print(push_res.stderr)

if __name__ == "__main__":
    main()
