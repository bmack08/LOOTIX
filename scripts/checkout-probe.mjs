// Creates ONE test-mode checkout session via the local /api/checkout route and
// prints which payment methods it lists. Never pays it. Prints no secrets/URLs.
import fs from 'node:fs';
const env = Object.fromEntries(fs.readFileSync('.env.local','utf8').split(/\r?\n/).filter(l=>/^[A-Z_]+=/.test(l)).map(l=>{const i=l.indexOf('=');return [l.slice(0,i),l.slice(i+1).replace(/^"|"$/g,'')];}));
const key = process.env.PROBE_KEY || env.STRIPE_SECRET_KEY;
if (!key?.startsWith('sk_test_') && !key?.startsWith('rk_test_')) { console.log('refusing: local key is not a test key'); process.exit(1); }
const slug = process.argv[2]; const size = process.argv[3];
const r = await fetch('http://localhost:3000/api/checkout',{method:'POST',headers:{'content-type':'application/json',origin:'http://localhost:3000'},body:JSON.stringify({items:[{slug,qty:1,size}],agreed:true})});
const txt = await r.text(); let j; try { j = JSON.parse(txt); } catch { console.log('non-JSON', r.status, r.headers.get('content-type'), txt.replace(/\s+/g,' ').match(/<title>[^<]*<\/title>|Error[^<]{0,200}/)?.[0]); process.exit(1); } if (!j.ok) { console.log('route error', r.status, j.error); process.exit(1); }
const id = (j.url.match(/cs_test_[A-Za-z0-9]+/)||[])[0];
const s = await (await fetch(`https://api.stripe.com/v1/checkout/sessions/${id}`,{headers:{authorization:`Bearer ${key}`}})).json();
console.log(JSON.stringify({id:s.id,livemode:s.livemode,status:s.status,payment_status:s.payment_status,payment_method_types:s.payment_method_types,payment_method_configuration_details:s.payment_method_configuration_details,amount_total:s.amount_total},null,1));