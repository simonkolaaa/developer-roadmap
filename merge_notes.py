import os
import re

IT_NOTES_DIR = 'IT_notes'
ROADMAP_PYTHON_DIR = 'src/data/roadmaps/python/content'
ROADMAP_BACKEND_DIR = 'src/data/roadmaps/backend/content'

def slugify(text):
    return re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')

# Step 1: Collect IT notes
notes = []
for root, dirs, files in os.walk(IT_NOTES_DIR):
    for file in files:
        if file.endswith('.md'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            name_no_ext = os.path.splitext(file)[0].lower()
            # remove numbers like 01_ 
            name_clean = re.sub(r'^\d+_', '', name_no_ext)
            notes.append({'file': file, 'name': name_clean, 'content': content})

# Step 2: Inject to roadmap Python/Backend
def inject_to_roadmap(content_dir):
    if not os.path.exists(content_dir): return
    for rf in os.listdir(content_dir):
        if not rf.endswith('.md'): continue
        rf_path = os.path.join(content_dir, rf)
        # roadmap files look like "variables-and-data-types@someId.md"
        base_topic = rf.split('@')[0].replace('-', ' ')
        
        # Find matching notes
        matching_notes = []
        for n in notes:
            # naive keyword matching
            if base_topic.lower() in n['name'].replace('_', ' ').lower() or \
               any(word in n['name'].lower() for word in base_topic.split(' ') if len(word)>3):
                matching_notes.append(n)
                
        if matching_notes:
            with open(rf_path, 'a', encoding='utf-8') as f:
                f.write('\n\n## 📚 Appunti Personali (IT)\n\n')
                for mn in matching_notes:
                    f.write(f"### {mn['file']}\n")
                    f.write(mn['content'] + '\n\n')
            print(f"Appended {len(matching_notes)} notes to {rf}")

inject_to_roadmap(ROADMAP_PYTHON_DIR)
inject_to_roadmap(ROADMAP_BACKEND_DIR)
