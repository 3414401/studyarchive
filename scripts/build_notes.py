from pathlib import Path
import json, re, subprocess, datetime

ROOT = Path(__file__).resolve().parents[1]
NOTES = ROOT / 'notes'

def previous_records(path):
    text = path.read_text(encoding='utf-8') if path.exists() else ''
    try:
        obj = json.loads(text)
        return [x for x in obj.get('posts', []) if isinstance(x, dict)]
    except (ValueError, TypeError):
        # Recover entries even when a user accidentally broke the JSON.
        matches = []
        for m in re.finditer(r'"file"\s*:\s*"([^"]+)"', text):
            chunk = text[max(0, m.start()-450):m.start()]
            title = re.findall(r'"title"\s*:\s*"([^"]+)"', chunk)
            slug = re.findall(r'"slug"\s*:\s*"([^"]+)"', chunk)
            summary = re.findall(r'"summary"\s*:\s*"([^"]+)"', chunk)
            matches.append({'file':m.group(1),'title':title[-1] if title else '', 'slug':slug[-1] if slug else '', 'summary':summary[-1] if summary else ''})
        return matches

def unique_slug(stem, used):
    base = re.sub(r'[^a-z0-9가-힣]+', '-', stem.lower()).strip('-') or 'note'
    slug = base
    n = 2
    while slug in used:
        slug = f'{base}-{n}'
        n += 1
    used.add(slug)
    return slug

for folder in sorted(NOTES.iterdir()):
    if not folder.is_dir():
        continue
    manifest = folder / 'manifest.json'
    old = previous_records(manifest)
    by_file = {x.get('file'):x for x in old if x.get('file')}
    used = set()
    posts = []
    files = sorted((p for p in folder.iterdir() if p.is_file() and p.suffix.lower() in ('.html','.md')), key=lambda p:p.name.casefold())
    for f in files:
        item = by_file.get(f.name, {})
        desired_slug = str(item.get('slug') or '').strip()
        if desired_slug and desired_slug not in used:
            slug = desired_slug
            used.add(slug)
        else:
            slug = unique_slug(f.stem, used)
        title = item.get('title') or f.stem
        tags = item.get('tags', [])
        if not isinstance(tags, list):
            tags = []
        posts.append({
            'slug':slug,
            'title':title,
            'date':item.get('date') or datetime.date.today().isoformat(),
            'tags':tags,
            'summary':item.get('summary') or '',
            'file':f.name,
            'format':'markdown' if f.suffix.lower()=='.md' else 'html'
        })
    manifest.write_text(json.dumps({'posts':posts}, ensure_ascii=False, indent=2)+'\n',encoding='utf-8')
    print(f'{folder.name}: {len(posts)} notes')
