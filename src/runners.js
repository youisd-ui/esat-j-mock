async function runB(token){
  const B=R.B, F=B.friend;
  const intro="Part B は、会話の問題で、全部で5問あります。あなたが質問に答える問題が4問と、あなたから質問する問題が1問あります。質問に答える問題には準備時間はありません。あなたから質問する問題には準備時間が10秒間あります。解答時間はそれぞれ15秒以内です。";
  setHeader(ITEMS.B1); setStage(""); setInstr(intro); listening("説明"); await speak(intro,"ja",token);
  const sit=`${B.setting}下に表示されているのは、二人が見ている${B.figureName}です。`;
  setInstr(sit); setStage(infoBoard(B)); listening("説明"); await speak(sit,"ja",token);
  await countdown(10,"listen",`${B.figureName}を見る`,token);
  const i1=`はじめに、${F}が${B.figureName}について二つの質問をします。質問に対して英語で答えてください。録音開始の音が鳴ってから、解答を始めてください。`;
  setInstr(i1); listening("説明"); await speak(i1,"ja",token);
  for(const k of ["B1","B2"]){ setHeader(ITEMS[k]); listening("質問を聞く"); await sleep(400,token); await speak(ITEMS[k].question,"en",token); await recordItem(k,token); await sleep(700,token); }
  const i2=`次に、${F}があなたの日本での生活について二つの質問をします。録音開始の音が鳴ってから、解答を始めてください。`;
  setStage(""); setInstr(i2); listening("説明"); await speak(i2,"ja",token);
  for(const k of ["B3","B4"]){ setHeader(ITEMS[k]); listening("質問を聞く"); await sleep(400,token); await speak(ITEMS[k].question,"en",token); await recordItem(k,token); await sleep(700,token); }
  setHeader(ITEMS.B5);
  const i3=`今度は、あなたが${F}に対して、次の画面で表示されることについて英語で質問してください。準備時間は10秒間です。録音開始の音が鳴ってから、質問してください。`;
  setInstr(i3); listening("説明"); await speak(i3,"ja",token);
  setStage(`<p class="small muted">${F}に対して、次のことを英語で質問してください。</p><div class="prompt-box">${B.ask}</div>`);
  await countdown(10,"prep","準備時間",token); await recordItem("B5",token); await sleep(700,token);
}
async function runC(token){
  const it=ITEMS.C; setHeader(it);
  const ins=`Part C は、イラストを説明する問題です。1から4までの全てのイラストについて、順番にストーリーを英語で話してください。あなたは、留学生の${R.C.listener}に、先週の出来事を英語で説明しようとしています。一番上のイラストに描かれた人物になったつもりで、${R.C.listener}に伝わるように英語で話してください。イラストの上に表示される表現、ラスト・ウィークを最初に使って解答してください。準備時間は30秒間、解答時間は40秒以内です。`;
  setInstr(ins.replace("ラスト・ウィーク","“Last week”")); setStage(comic(R.C.panels)); listening("説明"); await speak(ins,"ja",token);
  await countdown(it.prep,"prep","準備時間",token); await recordItem("C",token); await sleep(700,token);
}
async function runD(token){
  const it=ITEMS.D; setHeader(it);
  const ins="Part D は、英語の授業で、与えられたテーマに対して、自分の意見とその理由を英語で述べる問題です。先生の英語の説明を聞き、あなたの意見とそう考える理由を、具体的な例を加えるなどして、できるだけ詳しく話してください。三つのヒントから一つ選ぶか、あなた自身の考えを述べても構いません。準備時間は60秒間、解答時間は40秒以内です。";
  setInstr(ins); setStage(`<div class="theme-card"><span class="eyebrow">TODAY'S SHORT SPEECH</span><p class="q">${R.D.question}</p>
    <div class="chips">${R.D.hints.map(h=>`<span class="chip">${h}</span>`).join("")}<span class="chip">your own idea</span></div></div>`);
  listening("説明"); await speak(ins,"ja",token);
  listening("先生の説明"); await speak(D_TALK,"en",token); await sleep(600,token);
  await speak("Listen again.","en",token); await speak(D_TALK.replace("Hello everyone. ",""),"en",token);
  await countdown(it.prep,"prep","準備時間",token); await recordItem("D",token); await sleep(700,token);
}
