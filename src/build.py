"""Build mock1..mock5 from template.html + lib.js + rounds.js. Run: python3 src/build.py"""
import re, pathlib
S = pathlib.Path(__file__).parent; ROOT = S.parent
t = (S/"template.html").read_text()
lib, items, runners = (S/"lib.js").read_text(), (S/"items.js").read_text(), (S/"runners.js").read_text()
rounds = (S/"rounds.js").read_text()
starts = [m for m in re.finditer(r"^(\d): \{$", rounds, re.M)]
chunks = {}
for i, m in enumerate(starts):
    end = starts[i+1].start() if i+1 < len(starts) else rounds.rindex("};")
    body = rounds[m.end()-1:end].rstrip().rstrip(",")
    chunks[int(m.group(1))] = body
assert len(chunks) == 5, chunks.keys()

def sub_once(pat, repl, s, flags=re.S):
    out, n = re.subn(pat, lambda _: repl, s, count=1, flags=flags)
    assert n == 1, pat
    return out

for n, body in chunks.items():
    h = t.replace("模試 第1回", f"模試 第{n}回")
    h = sub_once(r'<p class="eyebrow">中学校英語スピーキングテスト ESAT-J YEAR 3 形式</p>',
        '<a class="back" href="../">← 模試の一覧に戻る</a>\n    <p class="eyebrow">中学校英語スピーキングテスト ESAT-J YEAR 3 形式</p>', h)
    h = sub_once(r"\.toast\{", ".back{font-size:.9rem;color:var(--accent);text-decoration:none;font-weight:500;align-self:flex-start}\n.back:hover{text-decoration:underline}\n.toast{", h)
    h = sub_once(r"/\* -+ content -+ \*/.*?(?=/\* -+ utilities -+ \*/)",
        lib + f"\n/* ---------------- round {n} ---------------- */\nconst R = {body};\nR.no = {n};\n" + items + "\n", h)
    for fn in ("runB", "runC", "runD"):
        h = sub_once(r"async function %s\(token\)\{.*?\n\}\n" % fn, "", h)
    h = sub_once(r"const RUNNERS=", runners + "const RUNNERS=", h)
    h = sub_once(r'\$\("prompt-out"\)\.value=buildPrompt\(\); show\("results"\);',
        '$("prompt-out").value=buildPrompt(); show("results");\n  try{ localStorage.setItem("esatj-done-"+R.no, new Date().toISOString()); }catch(_){}', h)
    h = sub_once(r"同じ形式の模試を受けました", "同じ形式の模試（第${R.no}回）を受けました", h)
    h = sub_once(r"ESAT-J模試_", "ESAT-J模試第${R.no}回_", h)
    out = ROOT/f"mock{n}"/"index.html"; out.parent.mkdir(exist_ok=True); out.write_text(h)
    print("built", out.relative_to(ROOT), len(h))
