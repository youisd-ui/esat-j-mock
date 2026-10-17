/* ---------------- illustration library (shared by every round) ---------------- */
const INK="var(--ill-stroke)", SW='stroke="var(--ill-stroke)"';
function face(x,y,mood){
  const m = mood==="happy" ? `<path d="M${x-5} ${y+3} Q${x} ${y+8} ${x+5} ${y+3}" fill="none" ${SW} stroke-width="1.6"/>`
          : mood==="sad" ? `<path d="M${x-5} ${y+6} Q${x} ${y+1} ${x+5} ${y+6}" fill="none" ${SW} stroke-width="1.6"/>`
          : mood==="wow" ? `<circle cx="${x}" cy="${y+5}" r="2.6" fill="none" ${SW} stroke-width="1.5"/>`
          : `<line x1="${x-4}" y1="${y+5}" x2="${x+4}" y2="${y+5}" ${SW} stroke-width="1.6"/>`;
  return `<circle cx="${x-4}" cy="${y-2}" r="1.6" fill="${INK}"/><circle cx="${x+4}" cy="${y-2}" r="1.6" fill="${INK}"/>${m}`;
}
/* person standing with feet at (x,y). o: {old, long, cap, color, mood, armsUp, pointUp, s, tears, label} */
function person(x,y,o={}){
  const hx=x, hy=y-72, top=y-60, hip=y-28;
  let hair;
  if(o.old) hair=`<circle cx="${hx}" cy="${hy-4}" r="12" fill="var(--ill-grey)"/><circle cx="${hx+10}" cy="${hy-10}" r="6" fill="var(--ill-grey)"/>`;
  else if(o.long) hair=`<path d="M${hx-13} ${hy+12} L${hx-13} ${hy-2} A13 13 0 0 1 ${hx+13} ${hy-2} L${hx+13} ${hy+12} L${hx+9} ${hy+12} L${hx+9} ${hy-2} L${hx-9} ${hy-2} L${hx-9} ${hy+12}Z" fill="var(--ill-hair)"/>`;
  else hair=`<path d="M${hx-12} ${hy} A12 12 0 0 1 ${hx+12} ${hy} L${hx+12} ${hy-3} L${hx-12} ${hy-3}Z" fill="var(--ill-hair)"/>`;
  const cap = o.cap ? `<rect x="${hx-13}" y="${hy-14}" width="26" height="9" rx="3" fill="var(--ill-stroke)"/><rect x="${hx-2}" y="${hy-6}" width="18" height="3" rx="1.5" fill="var(--ill-stroke)"/>` : "";
  const color = o.color || (o.old ? "var(--ill-coat)" : "var(--ill-shirt)");
  const body = `<rect x="${x-12}" y="${top}" width="24" height="${hip-top}" rx="6" fill="${color}"/>`;
  const legs = `<line x1="${x-6}" y1="${hip}" x2="${x-7}" y2="${y}" ${SW} stroke-width="4" stroke-linecap="round"/><line x1="${x+6}" y1="${hip}" x2="${x+7}" y2="${y}" ${SW} stroke-width="4" stroke-linecap="round"/>`;
  const arm=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--ill-skin)" stroke-width="5" stroke-linecap="round"/>`;
  let arms;
  if(o.pointUp) arms = arm(x-11,top+6,x-16,top+30) + arm(x+11,top+6,x+20,top-18);
  else if(o.armsUp) arms = arm(x-11,top+6,x-18,top+26) + arm(x+11,top+6,x+22,top+18);
  else if(o.armsFront) arms = arm(x-11,top+6,x+14,top+18) + arm(x+11,top+6,x+24,top+16);
  else arms = arm(x-11,top+6,x-16,top+30) + arm(x+11,top+6,x+16,top+30);
  const tears = o.tears ? `<path d="M${hx-7} ${hy+2} q-2 5 0 7 q2 -2 0 -7z M${hx+7} ${hy+2} q-2 5 0 7 q2 -2 0 -7z" fill="var(--accent)"/>` : "";
  const label = o.label ? `<text x="${hx}" y="${hy-18}" text-anchor="middle" font-family="Lexend,Arial" font-size="11" font-weight="600" fill="var(--ill-shirt)">${o.label}</text>` : "";
  const g = `${legs}${body}${arms}<circle cx="${hx}" cy="${hy}" r="12" fill="var(--ill-skin)"/>${hair}${cap}${face(hx,hy,o.mood)}${tears}${label}`;
  const s=o.s||1;
  return s===1 ? `<g>${g}</g>` : `<g transform="translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})">${g}</g>`;
}
function bag(x,y,w=20,h=18){return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="var(--ill-bag)" ${SW} stroke-width="1"/><path d="M${x+5} ${y} q${w/2-5} -8 ${w-10} 0" fill="none" ${SW} stroke-width="1.4"/>`;}
function box(x,y,w=22,h=16){return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="var(--prep)" ${SW} stroke-width="1"/><line x1="${x+w/2}" y1="${y}" x2="${x+w/2}" y2="${y+h}" stroke="var(--rec)" stroke-width="2"/><line x1="${x}" y1="${y+h/2}" x2="${x+w}" y2="${y+h/2}" stroke="var(--rec)" stroke-width="2"/>`;}
function stairs(x0,y0,n=5,step=20,dir=1){
  let d=`M${x0} ${y0}`; let x=x0,y=y0;
  for(let i=0;i<n;i++){ y-=step; d+=` L${x} ${y}`; x+=step*dir; d+=` L${x} ${y}`; }
  d+=` L${x} ${y0} Z`;
  return `<path d="${d}" fill="var(--ill-ground)" ${SW} stroke-width="1.2"/>`;
}
function bubble(x,y,content){return `<g><rect x="${x-20}" y="${y-18}" width="40" height="28" rx="12" fill="var(--sheet)" ${SW} stroke-width="1.2"/><path d="M${x-4} ${y+10} L${x-8} ${y+20} L${x+4} ${y+10}" fill="var(--sheet)" ${SW} stroke-width="1.2"/><text x="${x}" y="${y+2}" text-anchor="middle" font-family="Lexend,Arial" font-size="15" font-weight="600" fill="${INK}">${content}</text></g>`;}
function sign(x,y,text,w=74){return `<rect x="${x}" y="${y}" width="${w}" height="22" rx="4" fill="var(--sheet)" ${SW} stroke-width="1.2"/><text x="${x+w/2}" y="${y+15}" text-anchor="middle" font-family="Lexend,Arial" font-size="11" font-weight="600" fill="${INK}">${text}</text>`;}
function tree(x,y=160){return `<rect x="${x-8}" y="${y-70}" width="16" height="70" fill="var(--ill-bag)"/><circle cx="${x}" cy="${y-92}" r="34" fill="var(--ok)" opacity=".85"/><circle cx="${x-24}" cy="${y-76}" r="20" fill="var(--ok)" opacity=".85"/><circle cx="${x+24}" cy="${y-76}" r="20" fill="var(--ok)" opacity=".85"/>`;}
function ball(x,y,r=9){return `<circle cx="${x}" cy="${y}" r="${r}" fill="var(--rec)" ${SW} stroke-width="1.2"/><path d="M${x-r} ${y} q${r} ${-r*.6} ${2*r} 0" fill="none" stroke="var(--sheet)" stroke-width="1.5"/>`;}
function rain(x0=10,x1=230,y0=40,y1=150){ let s=""; for(let x=x0;x<x1;x+=18) for(let y=y0+((x/18)%2)*14;y<y1;y+=34) s+=`<line x1="${x}" y1="${y}" x2="${x-4}" y2="${y+10}" stroke="var(--accent)" stroke-width="1.6" opacity=".7"/>`; return s;}
function cloud(x,y){return `<g fill="var(--ill-grey)"><circle cx="${x}" cy="${y}" r="16"/><circle cx="${x+20}" cy="${y-6}" r="20"/><circle cx="${x+42}" cy="${y}" r="15"/><rect x="${x}" y="${y}" width="42" height="15"/></g>`;}
function sun(x,y){let r="";for(let i=0;i<8;i++){const a=i*Math.PI/4;r+=`<line x1="${x+Math.cos(a)*18}" y1="${y+Math.sin(a)*18}" x2="${x+Math.cos(a)*25}" y2="${y+Math.sin(a)*25}" stroke="var(--prep)" stroke-width="2.4" stroke-linecap="round"/>`;}return `<circle cx="${x}" cy="${y}" r="13" fill="var(--prep)"/>${r}`;}
function umbrella(cx,top,w=60,color="var(--ok)"){return `<path d="M${cx-w/2} ${top+w/3} A${w/2} ${w/2.6} 0 0 1 ${cx+w/2} ${top+w/3} Z" fill="${color}" ${SW} stroke-width="1.2"/><line x1="${cx}" y1="${top+w/3}" x2="${cx}" y2="${top+w/3+34}" ${SW} stroke-width="2"/>`;}
function building(x,y,w,h,label){return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="var(--sheet)" ${SW} stroke-width="1.2"/><path d="M${x-6} ${y} L${x+w/2} ${y-22} L${x+w+6} ${y}Z" fill="var(--ill-grey)" ${SW} stroke-width="1.2"/>${label?sign(x+w/2-34,y+8,label,68):""}<rect x="${x+w/2-11}" y="${y+h-34}" width="22" height="34" fill="var(--ill-ground)" ${SW} stroke-width="1"/>`;}
function phone(x,y){return `<rect x="${x}" y="${y}" width="9" height="15" rx="2" fill="var(--ill-stroke)"/><rect x="${x+1.5}" y="${y+2}" width="6" height="9" fill="var(--accent-soft)"/>`;}
function wallet(x,y){return `<rect x="${x}" y="${y}" width="18" height="12" rx="2" fill="var(--rec)" ${SW} stroke-width="1"/><line x1="${x}" y1="${y+5}" x2="${x+18}" y2="${y+5}" ${SW} stroke-width="1"/>`;}
function you(x,y){return `<text x="${x}" y="${y}" text-anchor="middle" font-family="Lexend,Arial" font-size="11" font-weight="600" fill="var(--ill-shirt)">You</text>`;}
function panel(n,inner,opts={}){
  const ground = opts.noGround ? "" : `<rect x="2" y="160" width="236" height="28" fill="var(--ill-ground)"/>`;
  return `<svg viewBox="0 0 240 190" role="img" aria-label="イラスト${n}"><defs><clipPath id="cp${n}"><rect x="2" y="2" width="236" height="186" rx="7"/></clipPath></defs><rect x="1" y="1" width="238" height="188" rx="8" fill="var(--ill-sky)" stroke="var(--line)" stroke-width="2"/>
  <g clip-path="url(#cp${n})">${ground}${inner}</g>
  <circle cx="20" cy="20" r="12" fill="var(--sheet)" ${SW} stroke-width="1.2"/><text x="20" y="25" text-anchor="middle" font-family="Lexend,Arial" font-size="13" font-weight="600" fill="${INK}">${n}</text></svg>`;
}
function comic(panels,starter="Last week …"){
  return `<div style="display:flex;flex-direction:column;gap:10px"><span class="starter">${starter}</span>
   <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px">${panels.map((p,i)=>panel(i+1,p)).join("")}</div></div>`;
}

/* icons for the Part B information board, drawn around (0,0) within about ±40 */
const ICON = {
  pan:`<ellipse cx="-6" cy="8" rx="34" ry="14" fill="var(--ill-grey)" ${SW} stroke-width="1.4"/><rect x="26" y="4" width="34" height="8" rx="4" fill="var(--ill-bag)"/><path d="M-16 -18 q6 -10 0 -20 M-2 -16 q6 -10 0 -20 M12 -18 q6 -10 0 -20" fill="none" stroke="var(--muted)" stroke-width="2"/>`,
  kite:`<path d="M0 -40 L28 0 L0 34 L-28 0Z" fill="var(--ill-shirt)" ${SW} stroke-width="1.4"/><line x1="0" y1="-40" x2="0" y2="34" ${SW}/><line x1="-28" y1="0" x2="28" y2="0" ${SW}/><path d="M0 34 q8 6 -3 10" fill="none" ${SW} stroke-width="1.4"/>`,
  music:`<path d="M-14 26 V-24 L22 -34 V16" fill="none" ${SW} stroke-width="4"/><ellipse cx="-22" cy="26" rx="10" ry="8" fill="var(--ill-coat)"/><ellipse cx="14" cy="16" rx="10" ry="8" fill="var(--ill-coat)"/><circle cx="-40" cy="-30" r="3" fill="var(--prep)"/><circle cx="40" cy="-10" r="3" fill="var(--prep)"/>`,
  bone:`<g transform="rotate(-25)" fill="var(--ill-grey)"><circle cx="-30" cy="-8" r="10"/><circle cx="-30" cy="8" r="10"/><circle cx="30" cy="-8" r="10"/><circle cx="30" cy="8" r="10"/><rect x="-30" y="-7" width="60" height="14"/></g>`,
  planet:`<circle r="22" fill="var(--ill-shirt)"/><ellipse rx="40" ry="9" fill="none" stroke="var(--prep)" stroke-width="3" transform="rotate(-18)"/><circle cx="-36" cy="-28" r="2.5" fill="var(--prep)"/><circle cx="34" cy="-32" r="2" fill="var(--prep)"/><circle cx="38" cy="26" r="2.5" fill="var(--prep)"/>`,
  robot:`<line x1="0" y1="-40" x2="0" y2="-30" ${SW} stroke-width="2"/><circle cx="0" cy="-41" r="4" fill="var(--rec)"/><rect x="-22" y="-30" width="44" height="30" rx="6" fill="var(--ill-grey)" ${SW} stroke-width="1.4"/><circle cx="-9" cy="-16" r="5" fill="var(--accent)"/><circle cx="9" cy="-16" r="5" fill="var(--accent)"/><rect x="-16" y="4" width="32" height="30" rx="4" fill="var(--ill-grey)" ${SW} stroke-width="1.4"/><rect x="-8" y="12" width="16" height="8" rx="2" fill="var(--ok)"/>`,
  pizza:`<path d="M-32 -26 L32 -26 L0 36Z" fill="var(--prep)" ${SW} stroke-width="1.4"/><rect x="-34" y="-34" width="68" height="10" rx="5" fill="var(--ill-bag)"/><circle cx="-10" cy="-12" r="5" fill="var(--rec)"/><circle cx="10" cy="-8" r="5" fill="var(--rec)"/><circle cx="0" cy="10" r="4.5" fill="var(--rec)"/>`,
  curry:`<ellipse cx="0" cy="10" rx="42" ry="16" fill="var(--ill-grey)" ${SW} stroke-width="1.4"/><ellipse cx="-12" cy="4" rx="20" ry="11" fill="var(--sheet)" ${SW} stroke-width="1"/><path d="M-2 0 Q16 -8 32 4 Q22 18 -2 14Z" fill="var(--ill-bag)"/>`,
  sandwich:`<path d="M-36 20 L36 20 L-36 -24Z" fill="var(--prep)" ${SW} stroke-width="1.4"/><path d="M-36 12 L26 12" stroke="var(--ok)" stroke-width="5"/><path d="M-36 4 L16 4" stroke="var(--rec)" stroke-width="4"/>`,
  swim:`<path d="M-40 -10 q10 -10 20 0 t20 0 t20 0 t20 0 M-40 6 q10 -10 20 0 t20 0 t20 0 t20 0 M-40 22 q10 -10 20 0 t20 0 t20 0 t20 0" fill="none" stroke="var(--accent)" stroke-width="3.5" stroke-linecap="round"/><circle cx="-6" cy="-28" r="8" fill="var(--ill-skin)"/>`,
  tennis:`<ellipse cx="-8" cy="-12" rx="20" ry="26" fill="none" ${SW} stroke-width="3" transform="rotate(-30 -8 -12)"/><line x1="4" y1="10" x2="24" y2="38" ${SW} stroke-width="6" stroke-linecap="round"/><circle cx="28" cy="-20" r="10" fill="var(--prep)" ${SW} stroke-width="1.2"/>`,
  basketball:`<circle r="32" fill="var(--prep)" ${SW} stroke-width="1.6"/><line x1="-32" y1="0" x2="32" y2="0" ${SW} stroke-width="1.6"/><line x1="0" y1="-32" x2="0" y2="32" ${SW} stroke-width="1.6"/><path d="M-22 -23 Q-8 0 -22 23 M22 -23 Q8 0 22 23" fill="none" ${SW} stroke-width="1.6"/>`,
  paw:`<g fill="var(--ill-bag)"><ellipse cx="0" cy="14" rx="20" ry="16"/><ellipse cx="-24" cy="-8" rx="8" ry="10"/><ellipse cx="-9" cy="-22" rx="8" ry="10"/><ellipse cx="9" cy="-22" rx="8" ry="10"/><ellipse cx="24" cy="-8" rx="8" ry="10"/></g>`,
  palette:`<path d="M0 -34 C30 -34 42 -10 34 8 C28 20 12 12 8 22 C4 34 -6 36 -14 32 C-36 22 -40 -34 0 -34Z" fill="var(--ill-bag)" ${SW} stroke-width="1.4"/><circle cx="-14" cy="-16" r="6" fill="var(--rec)"/><circle cx="4" cy="-22" r="6" fill="var(--prep)"/><circle cx="20" cy="-10" r="6" fill="var(--accent)"/><circle cx="-18" cy="6" r="6" fill="var(--ok)"/>`,
  boat:`<path d="M-38 10 L38 10 L26 28 L-26 28Z" fill="var(--ill-bag)" ${SW} stroke-width="1.4"/><line x1="0" y1="10" x2="0" y2="-38" ${SW} stroke-width="2"/><path d="M2 -36 L30 4 L2 4Z" fill="var(--sheet)" ${SW} stroke-width="1.2"/><path d="M-40 36 q10 -6 20 0 t20 0 t20 0 t20 0" fill="none" stroke="var(--accent)" stroke-width="2.5"/>`
};
/* Part B information board: three cards under a heading */
function infoBoard(b){
  const card=(x,c)=>`<g transform="translate(${x} 92)">
    <rect width="190" height="190" rx="10" fill="var(--sheet)" ${SW} stroke-width="1.4"/>
    <g transform="translate(95 60)">${ICON[c.icon]}</g>
    <text x="95" y="128" text-anchor="middle" font-family="Lexend,Arial" font-size="17" font-weight="600" fill="${INK}">${c.title}</text>
    <text x="95" y="152" text-anchor="middle" font-family="Lexend,Arial" font-size="14" fill="${INK}">${c.line1}</text>
    <text x="95" y="172" text-anchor="middle" font-family="Lexend,Arial" font-size="13" fill="var(--muted)">${c.line2}</text></g>`;
  return `<svg viewBox="0 0 640 300" role="img" aria-label="${b.figureName}"><rect x="1" y="1" width="638" height="298" rx="12" fill="var(--ill-sky)" stroke="var(--line)" stroke-width="2"/>
   <text x="320" y="44" text-anchor="middle" font-family="Lexend,Arial" font-size="24" font-weight="600" fill="${INK}">${b.boardTitle}</text>
   <text x="320" y="72" text-anchor="middle" font-family="Lexend,Arial" font-size="15" fill="var(--muted)">${b.boardSub}</text>
   ${card(15,b.cards[0])}${card(225,b.cards[1])}${card(435,b.cards[2])}</svg>`;
}
function ICON_CURRY_SMALL(x,y){return `<g transform="translate(${x} ${y}) scale(.42)">${ICON.curry}</g>`;}
