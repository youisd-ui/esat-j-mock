/* ---------------- items built from the round data R ---------------- */
const D_TALK = `Hello everyone. Today you will make this short speech: ${R.D.question} Choose one of these ideas: ${R.D.hints.join(", ")}, or your own idea. Tell us ${R.D.why}. Give reasons and examples in your short speech.`;
const ITEMS = {
  A1:{part:"A",no:"No. 1",label:"Part A No.1 音読",prep:30,rec:30,context:R.A[0].context,script:R.A[0].script},
  A2:{part:"A",no:"No. 2",label:"Part A No.2 音読",prep:30,rec:30,context:R.A[1].context,script:R.A[1].script},
  B5:{part:"B",no:"No. 5",label:"Part B No.5（質問する）",prep:10,rec:15,
    context:`${R.B.friend}に対して${R.B.ask}について英語で質問する。`, model:R.B.models[4]},
  C:{part:"C",no:"",label:"Part C ナレーション",prep:30,rec:40,
    context:`留学生の${R.C.listener}に、先週の出来事を英語で説明する。“Last week” で始める。イラスト：${R.C.scenes.map((s,i)=>`(${i+1}) ${s}`).join(" ")} 説明する上で重要なポイント：${R.C.points.join("／")}。`,
    model:R.C.model},
  D:{part:"D",no:"",label:"Part D 意見",prep:60,rec:40,
    context:`テーマ「${R.D.question}」。ヒント：${R.D.hints.join(" / ")} / your own idea。理由や具体例を加えてできるだけ詳しく述べる。`,
    model:R.D.model}
};
R.B.q.forEach((q,i)=>{ ITEMS["B"+(i+1)]={part:"B",no:`No. ${i+1}`,label:`Part B No.${i+1}`,prep:0,rec:15,question:q,
  context: i<2 ? `${R.B.figureName}（${R.B.cards.map(c=>c.title).join(" / ")}）を見ながら、${R.B.friend}に質問される。` : "日本での生活について聞かれる。",
  model:R.B.models[i]}; });
for(const k of ["A1","A2"]) ITEMS[k].model="（原稿どおりに、意味のまとまりで区切りながら読む）";
const ORDER = {A:["A1","A2"],B:["B1","B2","B3","B4","B5"],C:["C"],D:["D"]};
const PART_NAME = {A:"Part A 音読",B:"Part B 会話",C:"Part C ナレーション",D:"Part D 意見"};
