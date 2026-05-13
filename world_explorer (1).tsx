import { useState, useEffect, useRef, useCallback } from "react";

const SECTIONS = [
  { id: "geo", icon: "🗺️", label: "المعلومات الجغرافية", img: "geography" },
  { id: "history", icon: "📜", label: "التاريخ والحضارة", img: "history" },
  { id: "population", icon: "👥", label: "السكان والديموغرافيا", img: "population" },
  { id: "religion", icon: "🕌", label: "الأديان والمعتقدات", img: "religion" },
  { id: "regions", icon: "🏙️", label: "المناطق والعواصم", img: "regions" },
  { id: "tourism", icon: "🏛️", label: "أبرز المعالم السياحية", img: "tourism" },
  { id: "economy", icon: "💰", label: "الاقتصاد والتجارة", img: "economy" },
  { id: "culture", icon: "🎭", label: "الثقافة والفنون", img: "culture" },
  { id: "politics", icon: "🏛", label: "النظام السياسي", img: "politics" },
  { id: "climate", icon: "🌤️", label: "المناخ والطبيعة", img: "climate" },
  { id: "language", icon: "🗣️", label: "اللغة والتعليم", img: "language" },
];

const COUNTRIES_EN = {
  "مصر":"Egypt","السعودية":"Saudi Arabia","الإمارات":"United Arab Emirates","الكويت":"Kuwait",
  "قطر":"Qatar","البحرين":"Bahrain","عُمان":"Oman","الأردن":"Jordan","لبنان":"Lebanon",
  "سوريا":"Syria","العراق":"Iraq","اليمن":"Yemen","ليبيا":"Libya","المغرب":"Morocco",
  "الجزائر":"Algeria","تونس":"Tunisia","السودان":"Sudan","الصومال":"Somalia",
  "موريتانيا":"Mauritania","جيبوتي":"Djibouti","فلسطين":"Palestine","تركيا":"Turkey",
  "إيران":"Iran","باكستان":"Pakistan","أفغانستان":"Afghanistan","الهند":"India",
  "الصين":"China","اليابان":"Japan","كوريا الجنوبية":"South Korea","إندونيسيا":"Indonesia",
  "ماليزيا":"Malaysia","تايلاند":"Thailand","فيتنام":"Vietnam","الفلبين":"Philippines",
  "سنغافورة":"Singapore","بنغلاديش":"Bangladesh","سريلانكا":"Sri Lanka","نيبال":"Nepal",
  "ميانمار":"Myanmar","كمبوديا":"Cambodia","روسيا":"Russia","ألمانيا":"Germany",
  "فرنسا":"France","المملكة المتحدة":"United Kingdom","إيطاليا":"Italy","إسبانيا":"Spain",
  "هولندا":"Netherlands","بلجيكا":"Belgium","السويد":"Sweden","النرويج":"Norway",
  "الدنمارك":"Denmark","فنلندا":"Finland","سويسرا":"Switzerland","النمسا":"Austria",
  "البرتغال":"Portugal","اليونان":"Greece","بولندا":"Poland","التشيك":"Czech Republic",
  "أوكرانيا":"Ukraine","رومانيا":"Romania","الولايات المتحدة":"United States","كندا":"Canada",
  "المكسيك":"Mexico","البرازيل":"Brazil","الأرجنتين":"Argentina","كولومبيا":"Colombia",
  "تشيلي":"Chile","بيرو":"Peru","فنزويلا":"Venezuela","الإكوادور":"Ecuador",
  "جنوب أفريقيا":"South Africa","نيجيريا":"Nigeria","إثيوبيا":"Ethiopia","كينيا":"Kenya",
  "غانا":"Ghana","تنزانيا":"Tanzania","أوغندا":"Uganda","موزمبيق":"Mozambique",
  "زيمبابوي":"Zimbabwe","أستراليا":"Australia","نيوزيلندا":"New Zealand",
};

const ALL_COUNTRIES = Object.keys(COUNTRIES_EN);

const COUNTRY_CODES = {
  "مصر":"EG","السعودية":"SA","الإمارات":"AE","الكويت":"KW","قطر":"QA","البحرين":"BH",
  "عُمان":"OM","الأردن":"JO","لبنان":"LB","سوريا":"SY","العراق":"IQ","اليمن":"YE",
  "ليبيا":"LY","المغرب":"MA","الجزائر":"DZ","تونس":"TN","السودان":"SD","الصومال":"SO",
  "موريتانيا":"MR","جيبوتي":"DJ","فلسطين":"PS","تركيا":"TR","إيران":"IR","باكستان":"PK",
  "أفغانستان":"AF","الهند":"IN","الصين":"CN","اليابان":"JP","كوريا الجنوبية":"KR",
  "إندونيسيا":"ID","ماليزيا":"MY","تايلاند":"TH","فيتنام":"VN","الفلبين":"PH",
  "سنغافورة":"SG","بنغلاديش":"BD","سريلانكا":"LK","نيبال":"NP","ميانمار":"MM",
  "كمبوديا":"KH","روسيا":"RU","ألمانيا":"DE","فرنسا":"FR","المملكة المتحدة":"GB",
  "إيطاليا":"IT","إسبانيا":"ES","هولندا":"NL","بلجيكا":"BE","السويد":"SE","النرويج":"NO",
  "الدنمارك":"DK","فنلندا":"FI","سويسرا":"CH","النمسا":"AT","البرتغال":"PT",
  "اليونان":"GR","بولندا":"PL","التشيك":"CZ","أوكرانيا":"UA","رومانيا":"RO",
  "الولايات المتحدة":"US","كندا":"CA","المكسيك":"MX","البرازيل":"BR","الأرجنتين":"AR",
  "كولومبيا":"CO","تشيلي":"CL","بيرو":"PE","فنزويلا":"VE","الإكوادور":"EC",
  "جنوب أفريقيا":"ZA","نيجيريا":"NG","إثيوبيا":"ET","كينيا":"KE","غانا":"GH",
  "تنزانيا":"TZ","أوغندا":"UG","موزمبيق":"MZ","زيمبابوي":"ZW","أستراليا":"AU",
  "نيوزيلندا":"NZ",
};

const UNSPLASH_QUERIES = {
  geography: "landscape nature country",
  history: "ancient history civilization ruins",
  population: "city crowd urban people",
  religion: "mosque church temple religion",
  regions: "capital city skyline",
  tourism: "famous landmark tourist",
  economy: "city finance business",
  culture: "traditional culture festival art",
  politics: "government parliament building",
  climate: "nature weather landscape",
  language: "school education university",
};

function getFlagUrl(code) {
  return `https://flagcdn.com/w80/${code.toLowerCase()}.png`;
}

function getUnsplashUrl(country_en, topic) {
  const q = encodeURIComponent(`${country_en} ${UNSPLASH_QUERIES[topic] || topic}`);
  return `https://source.unsplash.com/400x200/?${q}`;
}

function LoadingDots() {
  return (
    <div style={{display:"flex",gap:6,justifyContent:"center",padding:"1.5rem 0"}}>
      {[0,1,2].map(i=>(
        <div key={i} style={{
          width:8,height:8,borderRadius:"50%",background:"#3b82f6",
          animation:`bounce 1.2s ${i*0.2}s infinite ease-in-out`
        }}/>
      ))}
      <style>{`@keyframes bounce{0%,80%,100%{transform:scale(0)}40%{transform:scale(1.2)}}`}</style>
    </div>
  );
}

function SectionCard({ section, data, isLoading, countryEn }) {
  const [open, setOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  useEffect(() => { if (data) setOpen(true); }, [data]);

  return (
    <div style={{
      background:"rgba(15,25,45,0.85)",
      border:"1px solid rgba(59,130,246,0.2)",
      borderRadius:16,
      overflow:"hidden",
      transition:"box-shadow 0.3s",
      boxShadow: open ? "0 6px 30px rgba(59,130,246,0.15)" : "none"
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width:"100%",display:"flex",alignItems:"center",gap:12,
          padding:"13px 16px",background:"none",border:"none",cursor:"pointer",
          color:"#cbd5e1",textAlign:"right",
        }}
      >
        <span style={{fontSize:20}}>{section.icon}</span>
        <span style={{flex:1,fontWeight:700,fontSize:14,fontFamily:"'Cairo',sans-serif"}}>{section.label}</span>
        {isLoading && <span style={{width:8,height:8,borderRadius:"50%",background:"#f59e0b",animation:"pulse 1s infinite"}}/>}
        {data && !isLoading && <span style={{fontSize:11,background:"rgba(59,130,246,0.2)",color:"#93c5fd",padding:"2px 8px",borderRadius:20}}>مكتمل</span>}
        <span style={{color:"#3b82f6",fontSize:16,transition:"transform 0.3s",transform:open?"rotate(180deg)":"rotate(0deg)"}}>▾</span>
      </button>

      {open && (
        <div style={{borderTop:"1px solid rgba(59,130,246,0.1)"}}>
          {countryEn && (
            <div style={{position:"relative",height:160,overflow:"hidden",background:"#0a1628"}}>
              <img
                src={getUnsplashUrl(countryEn, section.img)}
                alt=""
                onLoad={()=>setImgLoaded(true)}
                style={{width:"100%",height:"100%",objectFit:"cover",opacity:imgLoaded?0.7:0,transition:"opacity 0.5s"}}
              />
              {!imgLoaded && <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32}}>{section.icon}</div>}
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(10,22,40,0.95) 0%,transparent 60%)"}}/>
              <div style={{position:"absolute",bottom:10,right:14,color:"#e2e8f0",fontFamily:"'Cairo',sans-serif",fontWeight:700,fontSize:13}}>{section.label}</div>
            </div>
          )}
          <div style={{
            padding:"12px 16px 14px",
            fontFamily:"'Cairo',sans-serif",
            color:"#94a3b8",fontSize:14,lineHeight:1.9,direction:"rtl"
          }}>
            {isLoading ? <LoadingDots /> : (
              data
                ? <p style={{margin:0,whiteSpace:"pre-wrap",color:"#cbd5e1"}}>{data}</p>
                : <p style={{margin:0,color:"#3b5280",fontStyle:"italic"}}>اختر دولة لعرض المعلومات</p>
            )}
          </div>
        </div>
      )}
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </div>
  );
}

function AiChat({ country }) {
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(()=>{
    if(bottomRef.current) bottomRef.current.scrollIntoView({behavior:"smooth"});
  },[msgs]);

  async function sendMsg() {
    if(!input.trim()||loading) return;
    const userMsg = input.trim();
    setInput("");
    setMsgs(m=>[...m,{role:"user",text:userMsg}]);
    setLoading(true);
    try {
      const history = msgs.map(m=>({role:m.role==="user"?"user":"assistant",content:m.text}));
      const resp = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system:`أنت مستشار سياحي وجغرافي متخصص في دولة ${country}. أجب بالعربية الفصحى بأسلوب ودود ومختصر.`,
          messages:[...history,{role:"user",content:userMsg}]
        })
      });
      const d = await resp.json();
      const text = d.content?.[0]?.text || "عذراً، حدث خطأ.";
      setMsgs(m=>[...m,{role:"assistant",text}]);
    } catch {
      setMsgs(m=>[...m,{role:"assistant",text:"حدث خطأ في الاتصال."}]);
    }
    setLoading(false);
  }

  const suggestions = [
    `ما هي أفضل وجهة سياحية في ${country}؟`,
    `ما الطعام التقليدي المشهور في ${country}؟`,
    `ما هي العملة في ${country}؟`,
  ];

  return (
    <div style={{background:"rgba(10,18,35,0.9)",border:"1px solid rgba(59,130,246,0.25)",borderRadius:16,overflow:"hidden"}}>
      <div style={{padding:"12px 16px",background:"rgba(59,130,246,0.1)",borderBottom:"1px solid rgba(59,130,246,0.15)",display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:18}}>🤖</span>
        <span style={{color:"#93c5fd",fontFamily:"'Cairo',sans-serif",fontWeight:700,fontSize:14}}>مساعد AI – اسأل عن {country}</span>
      </div>

      {msgs.length===0 && (
        <div style={{padding:"12px 14px",display:"flex",flexDirection:"column",gap:8}}>
          <p style={{margin:"0 0 6px",color:"#64748b",fontFamily:"'Cairo',sans-serif",fontSize:12}}>اقتراحات سريعة:</p>
          {suggestions.map((s,i)=>(
            <button key={i} onClick={()=>{setInput(s);}} style={{
              background:"rgba(59,130,246,0.08)",border:"1px solid rgba(59,130,246,0.2)",
              borderRadius:10,padding:"8px 12px",color:"#93c5fd",fontFamily:"'Cairo',sans-serif",
              fontSize:13,cursor:"pointer",textAlign:"right",direction:"rtl"
            }}>{s}</button>
          ))}
        </div>
      )}

      <div style={{maxHeight:260,overflowY:"auto",padding:"10px 14px",display:"flex",flexDirection:"column",gap:10}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-start":"flex-end"}}>
            <div style={{
              maxWidth:"85%",padding:"9px 13px",borderRadius:12,
              background:m.role==="user"?"rgba(59,130,246,0.15)":"rgba(30,50,80,0.8)",
              border:`1px solid ${m.role==="user"?"rgba(59,130,246,0.3)":"rgba(100,130,180,0.15)"}`,
              color:"#cbd5e1",fontFamily:"'Cairo',sans-serif",fontSize:13,lineHeight:1.7,direction:"rtl"
            }}>{m.text}</div>
          </div>
        ))}
        {loading && <div style={{display:"flex",justifyContent:"flex-end"}}><div style={{background:"rgba(30,50,80,0.8)",border:"1px solid rgba(100,130,180,0.15)",borderRadius:12,padding:"9px 13px"}}><LoadingDots/></div></div>}
        <div ref={bottomRef}/>
      </div>

      <div style={{padding:"10px 14px",borderTop:"1px solid rgba(59,130,246,0.1)",display:"flex",gap:8}}>
        <input
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&sendMsg()}
          placeholder="اكتب سؤالك هنا..."
          style={{
            flex:1,background:"rgba(59,130,246,0.07)",border:"1px solid rgba(59,130,246,0.2)",
            borderRadius:10,padding:"9px 12px",color:"#e2e8f0",fontFamily:"'Cairo',sans-serif",
            fontSize:13,outline:"none",direction:"rtl"
          }}
        />
        <button onClick={sendMsg} disabled={loading||!input.trim()} style={{
          background:loading||!input.trim()?"rgba(59,130,246,0.1)":"rgba(59,130,246,0.7)",
          border:"1px solid rgba(59,130,246,0.3)",borderRadius:10,padding:"9px 14px",
          color:"#fff",cursor:loading||!input.trim()?"not-allowed":"pointer",fontSize:16
        }}>↑</button>
      </div>
    </div>
  );
}

function CountryHero({ country, countryCode, countryEn, overview }) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const flagUrl = countryCode ? getFlagUrl(countryCode) : null;
  const mapUrl = countryCode
    ? `https://www.openstreetmap.org/export/embed.html?bbox=-180,-90,180,90&layer=mapnik&marker=0,0`
    : null;

  const embedUrl = countryEn
    ? `https://maps.google.com/maps?q=${encodeURIComponent(countryEn)}&output=embed&z=5`
    : null;

  return (
    <div style={{margin:"0 0 16px",borderRadius:16,overflow:"hidden",border:"1px solid rgba(59,130,246,0.25)"}}>
      {/* Map */}
      <div style={{position:"relative",height:220,background:"#0a1020"}}>
        {embedUrl && (
          <iframe
            src={embedUrl}
            style={{width:"100%",height:"100%",border:"none",opacity:0.85}}
            title="map"
            onLoad={()=>setMapLoaded(true)}
          />
        )}
        {!mapLoaded && (
          <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",color:"#3b5280",fontFamily:"'Cairo',sans-serif",fontSize:14}}>
            <LoadingDots/>
          </div>
        )}
        <div style={{position:"absolute",inset:0,pointerEvents:"none",background:"linear-gradient(to bottom, transparent 60%, rgba(10,18,35,1) 100%)"}}/>
      </div>

      {/* Info bar */}
      <div style={{background:"rgba(10,18,35,0.97)",padding:"14px 18px",display:"flex",alignItems:"center",gap:16,direction:"rtl"}}>
        {flagUrl && (
          <img src={flagUrl} alt={`علم ${country}`} style={{height:42,borderRadius:6,boxShadow:"0 2px 8px rgba(0,0,0,0.4)",border:"1px solid rgba(255,255,255,0.1)"}}
            onError={e=>e.target.style.display="none"}
          />
        )}
        <div style={{flex:1}}>
          <div style={{color:"#f1f5f9",fontFamily:"'Cairo',sans-serif",fontWeight:700,fontSize:20}}>{country}</div>
          <div style={{color:"#64748b",fontFamily:"'Cairo',sans-serif",fontSize:12}}>{countryEn}</div>
        </div>
        {overview && (
          <div style={{
            background:"rgba(59,130,246,0.12)",border:"1px solid rgba(59,130,246,0.2)",
            borderRadius:10,padding:"6px 10px",color:"#93c5fd",fontSize:12,
            fontFamily:"'Cairo',sans-serif",maxWidth:200,lineHeight:1.5,direction:"rtl"
          }}>
            {overview.substring(0,80)}...
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [showList, setShowList] = useState(false);
  const [sectionData, setSectionData] = useState({});
  const [loadingIds, setLoadingIds] = useState([]);
  const [overview, setOverview] = useState(null);
  const [activeTab, setActiveTab] = useState("info");
  const abortRef = useRef(null);

  const filtered = ALL_COUNTRIES.filter(c => c.includes(search)).slice(0,12);

  const fetchSection = useCallback(async (country, section) => {
    const prompts = {
      geo:`اذكر المعلومات الجغرافية لدولة ${country} باختصار: الموقع، المساحة، الحدود، التضاريس، أهم المدن. فقرة واحدة.`,
      history:`أبرز المحطات التاريخية لدولة ${country} بأسلوب سردي مختصر.`,
      population:`معلومات ديموغرافية عن ${country}: عدد السكان، الكثافة، التركيبة العمرية، الأقليات.`,
      religion:`الأديان والمعتقدات في ${country}: نسبها، أثرها في المجتمع والثقافة.`,
      regions:`اذكر أبرز 5 مناطق وعواصم المحافظات أو الولايات في ${country} مع وصف مختصر لكل منها.`,
      tourism:`أبرز 5 معالم سياحية في ${country} مع وصف مختصر لكل.`,
      economy:`الاقتصاد في ${country}: الناتج المحلي، العملة، الصادرات، أهم القطاعات.`,
      culture:`الثقافة والفنون في ${country}: الموسيقى، الأدب، المأكولات، التقاليد.`,
      politics:`النظام السياسي في ${country}: نوع الحكم، رئيس الدولة، البرلمان.`,
      climate:`مناخ وطبيعة ${country}: نوع المناخ، الفصول، الموارد الطبيعية.`,
      language:`اللغة والتعليم في ${country}: اللغة الرسمية، نسبة التعليم، أبرز الجامعات.`,
    };
    const resp = await fetch("https://api.anthropic.com/v1/messages",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        model:"claude-sonnet-4-20250514",
        max_tokens:1000,
        system:"أنت موسوعة جغرافية. أجب بالعربية الفصحى في فقرة مختصرة مفيدة بدون عناوين فرعية.",
        messages:[{role:"user",content:prompts[section.id]}]
      })
    });
    const d = await resp.json();
    return d.content?.[0]?.text || "لم تتوفر معلومات.";
  },[]);

  async function loadAllSections(country) {
    const token = Symbol();
    abortRef.current = token;
    setSectionData({});
    setLoadingIds(SECTIONS.map(s=>s.id));
    setOverview(null);

    // fetch overview first
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:200,
          system:"أنت موسوعة. أجب بالعربية الفصحى في جملتين فقط.",
          messages:[{role:"user",content:`لخص دولة ${country} في جملتين.`}]
        })
      });
      const d = await r.json();
      if(abortRef.current===token) setOverview(d.content?.[0]?.text);
    } catch {}

    // sequential fetch
    for(const section of SECTIONS){
      if(abortRef.current!==token) return;
      try {
        const text = await fetchSection(country, section);
        if(abortRef.current!==token) return;
        setSectionData(prev=>({...prev,[section.id]:text}));
      } catch {
        setSectionData(prev=>({...prev,[section.id]:"حدث خطأ أثناء جلب البيانات."}));
      }
      setLoadingIds(prev=>prev.filter(id=>id!==section.id));
    }
  }

  function selectCountry(c) {
    setSelected(c);
    setSearch(c);
    setShowList(false);
    setActiveTab("info");
    loadAllSections(c);
  }

  const countryCode = selected ? COUNTRY_CODES[selected] : null;
  const countryEn = selected ? COUNTRIES_EN[selected] : null;
  const doneCount = Object.keys(sectionData).length;
  const progress = selected ? Math.round((doneCount / SECTIONS.length) * 100) : 0;

  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(160deg,#020810 0%,#040f1e 60%,#071525 100%)",
      fontFamily:"'Cairo',sans-serif",
      direction:"rtl",
      paddingBottom:40
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet"/>

      {/* Header */}
      <div style={{
        background:"rgba(5,12,25,0.95)",
        backdropFilter:"blur(10px)",
        borderBottom:"1px solid rgba(59,130,246,0.15)",
        padding:"12px 18px",
        display:"flex",alignItems:"center",gap:14,
        position:"sticky",top:0,zIndex:50
      }}>
        <div style={{
          width:44,height:44,borderRadius:12,
          background:"rgba(59,130,246,0.2)",
          display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0,
          border:"1px solid rgba(59,130,246,0.3)"
        }}>🌐</div>
        <div>
          <div style={{color:"#f1f5f9",fontWeight:700,fontSize:16,letterSpacing:.3}}>مستكشف دول العالم</div>
          <div style={{color:"#3b5280",fontSize:11}}>World Explorer • AI-Powered</div>
        </div>
        {selected && (
          <div style={{marginRight:"auto",display:"flex",alignItems:"center",gap:10}}>
            {countryCode && <img src={getFlagUrl(countryCode)} alt="" style={{height:24,borderRadius:3,border:"1px solid rgba(255,255,255,0.1)"}} onError={e=>e.target.style.display="none"}/>}
            <span style={{color:"#60a5fa",fontFamily:"'Cairo',sans-serif",fontWeight:700,fontSize:13}}>{selected}</span>
          </div>
        )}
      </div>

      {/* Search */}
      <div style={{padding:"18px 16px 12px",position:"relative"}}>
        <div style={{
          display:"flex",alignItems:"center",
          background:"rgba(59,130,246,0.06)",
          border:"1px solid rgba(59,130,246,0.25)",
          borderRadius:14,overflow:"hidden",
        }}>
          <span style={{padding:"0 12px",fontSize:18,color:"#3b5280"}}>🔍</span>
          <input
            value={search}
            onChange={e=>{setSearch(e.target.value);setShowList(true);}}
            onFocus={()=>setShowList(true)}
            placeholder="ابحث عن دولة... (مصر، فرنسا، اليابان)"
            style={{
              flex:1,padding:"13px 6px",background:"none",border:"none",
              color:"#e2e8f0",fontSize:14,fontFamily:"'Cairo',sans-serif",
              outline:"none",direction:"rtl"
            }}
          />
          {search && (
            <button onClick={()=>{setSearch("");setSelected(null);setSectionData({});setShowList(false);setOverview(null);}}
              style={{padding:"0 12px",background:"none",border:"none",color:"#3b5280",cursor:"pointer",fontSize:16}}>✕</button>
          )}
        </div>

        {showList && filtered.length>0 && (
          <div style={{
            position:"absolute",top:"calc(100% - 6px)",right:16,left:16,
            background:"#071525",border:"1px solid rgba(59,130,246,0.25)",
            borderRadius:12,maxHeight:220,overflowY:"auto",zIndex:100,
            boxShadow:"0 12px 40px rgba(0,0,0,0.6)"
          }}>
            {filtered.map(c=>{
              const code = COUNTRY_CODES[c];
              return (
                <div key={c} onClick={()=>selectCountry(c)}
                  style={{
                    padding:"10px 14px",cursor:"pointer",color:"#94a3b8",fontSize:13,
                    borderBottom:"1px solid rgba(59,130,246,0.06)",
                    display:"flex",alignItems:"center",gap:10,direction:"rtl",
                    transition:"background 0.15s"
                  }}
                  onMouseEnter={e=>e.currentTarget.style.background="rgba(59,130,246,0.1)"}
                  onMouseLeave={e=>e.currentTarget.style.background="none"}
                >
                  {code && <img src={getFlagUrl(code)} alt="" style={{height:18,borderRadius:2,border:"1px solid rgba(255,255,255,0.08)"}} onError={e=>e.target.style.display="none"}/>}
                  <span>{c}</span>
                  <span style={{color:"#3b5280",fontSize:11,marginRight:"auto"}}>{COUNTRIES_EN[c]}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div style={{padding:"0 16px"}} onClick={()=>setShowList(false)}>
        {!selected ? (
          <div style={{textAlign:"center",padding:"60px 20px",color:"#1e3a5f"}}>
            <div style={{fontSize:56,marginBottom:14}}>🌍</div>
            <div style={{fontSize:17,fontWeight:700,color:"#2d4a7a",marginBottom:6}}>اختر دولة للبدء</div>
            <div style={{fontSize:12,color:"#1a2e50"}}>{ALL_COUNTRIES.length} دولة متاحة • معلومات شاملة • خريطة تفاعلية • مساعد AI</div>
          </div>
        ) : (
          <>
            {/* Hero + Map */}
            <CountryHero country={selected} countryCode={countryCode} countryEn={countryEn} overview={overview}/>

            {/* Progress bar */}
            {loadingIds.length > 0 && (
              <div style={{marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{color:"#3b5280",fontSize:11,fontFamily:"'Cairo',sans-serif"}}>جارٍ تحميل المعلومات...</span>
                  <span style={{color:"#60a5fa",fontSize:11}}>{progress}%</span>
                </div>
                <div style={{height:3,background:"rgba(59,130,246,0.1)",borderRadius:4}}>
                  <div style={{height:"100%",width:`${progress}%`,background:"linear-gradient(90deg,#3b82f6,#60a5fa)",borderRadius:4,transition:"width 0.4s"}}/>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div style={{display:"flex",gap:8,marginBottom:14,background:"rgba(10,18,35,0.8)",padding:6,borderRadius:12,border:"1px solid rgba(59,130,246,0.15)"}}>
              {[{id:"info",label:"📚 المعلومات"},{id:"ai",label:"🤖 مساعد AI"}].map(t=>(
                <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{
                  flex:1,padding:"9px 0",background:activeTab===t.id?"rgba(59,130,246,0.3)":"none",
                  border:activeTab===t.id?"1px solid rgba(59,130,246,0.4)":"1px solid transparent",
                  borderRadius:8,color:activeTab===t.id?"#93c5fd":"#3b5280",
                  fontFamily:"'Cairo',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"
                }}>{t.label}</button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab==="info" && (
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {SECTIONS.map(section=>(
                  <SectionCard
                    key={section.id}
                    section={section}
                    data={sectionData[section.id]}
                    isLoading={loadingIds.includes(section.id)}
                    countryEn={countryEn}
                  />
                ))}
              </div>
            )}

            {activeTab==="ai" && (
              <AiChat country={selected}/>
            )}
          </>
        )}
      </div>

      <div style={{textAlign:"center",marginTop:28,color:"#1a2e50",fontSize:11,fontFamily:"'Cairo',sans-serif"}}>
        مستكشف دول العالم • {ALL_COUNTRIES.length} دولة • مدعوم بـ Claude AI
      </div>
    </div>
  );
}
