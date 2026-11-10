/**
 * Remove repeated SEO footer paragraphs from blog post bodies (rendered once in BlogPostStandardFooter.astro).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const postsPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'blog', 'posts.ts');

const BOILERPLATE = new Set([
  'DayZ Cheats at cheats-dayz.com sells DayZ cheats for Windows PC official and community servers. Check status before you queue after a patch.',
  'DayZ Cheats at cheats-dayz.com sells DayZ cheats for Windows PC official and community servers.',
  'BattlEye enforcement is real: read status, reload loader after patches, and use conservative presets. Smooth aimbot smoothness and limited ESP range reduce report volume compared to max automation on day one.',
  'Internal links across our blog connect setup guides—ESP wallhack, zoom, aimbot, Elite tier, BattlEye checklist, and purchase walkthrough. Start at [DayZ Cheats](/products/dayz-cheats/) when you are ready to move beyond test servers.',
  'Compare [Lite vs Pro](/blog/dayz-lite-vs-pro/) and [features guide](/blog/dayz-cheats-features/) before checkout. Elite adds bots, kill steal, and Clothing Changer for operators who mastered Pro aimbot.',
  'Stream-proof mode, external loader architecture, and cloud config sync distinguish cheats-dayz.com from free paste tools that vanish after BattlEye waves. Private maintenance every patch beats feature bullet lists from unknown forums.',
]);

let src = fs.readFileSync(postsPath, 'utf8');
let removed = 0;

for (const text of BOILERPLATE) {
  const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`\\s*\\{ type: 'p', text: "${escaped}" \\},\\n`, 'g');
  const next = src.replace(re, '\n');
  if (next !== src) {
    const count = (src.match(re) || []).length;
    removed += count;
    src = next;
  }
}

// Remove exact duplicate consecutive paragraphs (copy-paste errors)
const dupRe = /(\{ type: 'p', text: "([^"]+)" \},\n)\1+/g;
src = src.replace(dupRe, '$1');

fs.writeFileSync(postsPath, src);
console.log(`strip-blog-boilerplate: removed ${removed} boilerplate paragraph(s)`);
