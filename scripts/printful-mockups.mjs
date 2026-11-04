#!/usr/bin/env node
// Printful MOCKUP GENERATOR only (owner-approved Nov 3 2026). Calls:
//   GET  /store/variants/{id}                     (read the print file)
//   GET  /mockup-generator/printfiles/{blank}     (read)
//   POST /mockup-generator/create-task/{blank}    (renders images; no order, no product/price edit, free)
//   GET  /mockup-generator/task?task_key=         (poll)
// Writes webp images to public/products/mockups/{slug}/ and the index to
// src/config/printful-mockups.json. Usage: node scripts/printful-mockups.mjs first|rest [--blank=317]
// Key from env / .env.local; never printed.
import fs from 'node:fs';
import sharp from 'sharp';
function envFromFile(n){if(process.env[n])return process.env[n];for(const f of['.env.local','.env']){if(!fs.existsSync(f))continue;const m=fs.readFileSync(f,'utf8').match(new RegExp('^\\s*'+n+'\\s*=\\s*(.*)$','m'));if(m)return m[1].trim().replace(/^['"]|['"]$/g,'');}}
const KEY=envFromFile('PRINTFUL_API')||envFromFile('PRINTFUL_API_KEY');if(!KEY){console.error('no key');process.exit(1);}
const STORE=envFromFile('PRINTFUL_STORE_ID')||'15871910';
const H={Authorization:`Bearer ${KEY}`,'X-PF-Store-Id':STORE};
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
async function api(path,init={}){
  for(let i=0;i<6;i++){
    const r=await fetch('https://api.printful.com'+path,{...init,headers:{...H,...(init.body?{'content-type':'application/json'}:{})}});
    if(r.status===429){const w=+(r.headers.get('retry-after')||60);console.log(`  429, waiting ${w}s`);await sleep(w*1000+500);continue;}
    const j=await r.json();if(!r.ok)throw new Error(`${path} ${r.status} ${JSON.stringify(j.error||j.result).slice(0,300)}`);return j.result;
  }
  throw new Error('rate limited too long');
}
// Which renders to keep, per blank: [view, option_group, option] in priority order.
const WANT={
  317:{back:[['Ghost','Back'],['Flat','Back']],detail:[['Product details','Product details'],['Product details','Product details 2']],worn:[["Women's Lifestyle",'Front'],["Women's 2",'Front']]},
  1420:{back:[['Ghost','Back'],['Flat','Back']],detail:[['Folded','Front'],['Flat','Front']],worn:[["Men's",'Front'],["Women's",'Front']]},
  360:{back:[['Ghost','Back'],['Flat','Back']],detail:[['Wrinkled','Front'],['Hanger','Front']],worn:[["Women's Lifestyle",'Front'],["Women's",'Front']]},
  917:{back:[['Ghost','Back'],['Flat','Back']],detail:[['Product details','Product details'],['Folded','Front']],worn:[["Men's Lifestyle",'Front'],["Men's",'Front']]},
  206:{back:[['Product details','Back'],['Default','Back'],["Men's",'Back']],detail:[['Product details','Product details'],['Product details','Front']],worn:[['Lifestyle','Front'],["Men's Lifestyle",'Front'],["Women's Lifestyle",'Front']]},
};
const phase=process.argv[2]||'first';const onlyBlank=(process.argv.find(a=>a.startsWith('--blank='))||'').slice(8);
const src=fs.readFileSync('src/config/printful-catalog.ts','utf8');
const entries=[...src.matchAll(/\{slug: "([^"]+)",name: "([^"]+)".*?colour: "([^"]+)",printfulProductId: (\d+).*?variants: \{([^}]*)\}/g)].map(m=>({slug:m[1],title:JSON.parse('"'+m[2]+'"').split(' \u2014 ')[0],colour:m[3],vids:[...m[5].matchAll(/:\s*(\d+)/g)].map(x=>+x[1])}));
const groups={};for(const e of entries)(groups[e.title]??=[]).push(e);
const OUT='src/config/printful-mockups.json';const index=fs.existsSync(OUT)?JSON.parse(fs.readFileSync(OUT,'utf8')):{};
let made=0,tasks=0;
for(const [title,es] of Object.entries(groups)){
  const todo=(phase==='first'?es.slice(0,1):es.slice(1)).filter(e=>!index[e.slug]);
  if(!todo.length)continue;
  // Resolve each colourway's catalog variant + front print file.
  const items=[];let blank;
  for(const e of todo){const sv=await api(`/store/variants/${e.vids[0]}`);blank=sv.product.product_id;
    const f=sv.files.find(f=>f.type!=='preview');items.push({e,variant:sv.variant_id,placement:f.type==='default'?'front':f.type,url:f.url||f.preview_url,w:f.width,h:f.height});await sleep(400);}
  if(onlyBlank&&String(blank)!==onlyBlank)continue;
  const want=WANT[blank];if(!want){console.log('skip, no plan for blank',blank);continue;}
  const pfs=await api(`/mockup-generator/printfiles/${blank}`);
  const groupsWanted=[...new Set(Object.values(want).flat().map(x=>x[0]))];
  const optsWanted=[...new Set(Object.values(want).flat().map(x=>x[1]))];
  // One task per distinct print file (colourways of the same ink share one).
  const byFile={};for(const it of items)(byFile[it.placement+'|'+it.url]??=[]).push(it);
  for(const [k,its] of Object.entries(byFile)){
    const [placement,url]=[k.slice(0,k.indexOf('|')),k.slice(k.indexOf('|')+1)];
    // Position: the print file scaled to fit the placement's print area, centred
    // across, top-aligned (centred both ways for embroidery).
    const vp=pfs.variant_printfiles.find(v=>v.variant_id===its[0].variant);const pf=pfs.printfiles.find(p=>p.printfile_id===vp.placements[placement]);
    const W=pf.width,Hh=pf.height,iw=its[0].w||W,ih=its[0].h||Hh,sc=Math.min(W/iw,Hh/ih),w=Math.round(iw*sc),h=Math.round(ih*sc);
    const position={area_width:W,area_height:Hh,width:w,height:h,left:Math.round((W-w)/2),top:placement.startsWith('embroidery')?Math.round((Hh-h)/2):0};
    const body={variant_ids:its.map(i=>i.variant),format:'png',width:1600,files:[{placement,image_url:url,position}],option_groups:groupsWanted,options:optsWanted};
    const t=await api(`/mockup-generator/create-task/${blank}`,{method:'POST',body:JSON.stringify(body)});tasks++;
    console.log(`${title}: task for ${its.length} colourway(s) [${its.map(i=>i.e.colour).join(', ')}]`);
    let res;for(let i=0;i<40;i++){await sleep(5000);res=await api(`/mockup-generator/task?task_key=${t.task_key}`);if(res.status!=='pending')break;}
    if(res.status!=='completed'){console.log('  task',res.status,res.error||'');continue;}
    const renders=[];for(const m of res.mockups){renders.push({vids:m.variant_ids,group:'',option:'',url:m.mockup_url,placement:m.placement});for(const x of m.extra||[])renders.push({vids:m.variant_ids,group:x.option_group,option:x.option,url:x.url});}
    for(const it of its){
      const mine=renders.filter(r=>r.vids.includes(it.variant));const imgs=[];
      for(const [view,prefs] of Object.entries(want)){
        const hit=prefs.map(([g,o])=>mine.find(r=>r.group===g&&r.option===o)).find(Boolean);if(!hit){console.log(`  no ${view}; have: ${[...new Set(mine.map(r=>r.group+'/'+r.option))].join('; ')}`);continue;}
        const buf=Buffer.from(await (await fetch(hit.url)).arrayBuffer());
        const dir=`public/products/mockups/${it.e.slug}`;fs.mkdirSync(dir,{recursive:true});
        await sharp(buf).resize({width:1200,height:1200,fit:'inside',withoutEnlargement:true}).webp({quality:80}).toFile(`${dir}/${view}.webp`);
        imgs.push({url:`/products/mockups/${it.e.slug}/${view}.webp`,kind:'mockup',placement:view});made++;
      }
      index[it.e.slug]=imgs;console.log(`  ${it.e.colour}: ${imgs.map(i=>i.placement).join(', ')||'none'}`);
    }
    fs.writeFileSync(OUT,JSON.stringify(index,null,1)+'\n');
    await sleep(6000); // stay well under the create-task limit
  }
}
console.log(`done: ${tasks} task(s), ${made} image(s)`);
