export const LOCALES = ['ko','en','fr','es','pt','de','zh','ja','ar','hi'];
export const NATIVE_LANGUAGES = ['한국어','English','Français','Español','Português','Deutsch','中文','日本語','العربية','हिन्दी'];
const keys = `rooms new_room members add_member settings connected connecting reconnecting back_list empty_prompt first_room chat_log interject_placeholder interject_label send_interject new_messages close topic topic_placeholder participants select_all deselect_all conversation_language start_room edit_member default_photos upload_photo photo_url photo_url_label name personality label optional profile_note save delete_member delete cancel appearance system light dark default_language model refresh limit limit_note pace away_time pause_away animation settings_note ui_language choose_language continue live paused finishing finish_reply pause resume reply_count member_count thinking viewer member delete_question photo_error reason_limit reason_empty reason_restart reason_manual reason_new error_connection error_storage error_response error_session error_cli error_models error_input error_too_large error_member error_members error_language error_limit error_action error_wait error_not_found error_origin error_method avatar_sol avatar_mo avatar_ru avatar_bear avatar_duck avatar_fox`.split(' ');
const packs = {
de: `Gespräche
Neues Gespräch
Mitglieder
Mitglied hinzufügen
Systemeinstellungen
Verbunden
Verbindung wird hergestellt
Verbindung wird erneuert
Gespräche
Worüber reden wir?
Erstes Gespräch starten
Unterhaltung
Manchmal möchte ich auch etwas sagen
Den Mitgliedern etwas sagen
Kommentar senden
Neue Nachrichten
Schließen
Was ist das Thema?
Was dir gerade einfällt
Wer macht mit?
Alle auswählen
Auswahl aufheben
Gesprächssprache
Gespräch starten
Mitglied bearbeiten
Standardprofilbilder
Foto hochladen
Bildadresse verwenden
Adresse des Profilbilds
Name
Persönlichkeit
Kurzbeschreibung
Optional
Bearbeiten oder Löschen verändert bestehende Gespräche nicht.
Speichern
Mitglied löschen
Löschen
Abbrechen
Darstellung
System
Hell
Dunkel
Standardgesprächssprache
Modell für neue Gespräche
Aktualisieren
Antwortlimit pro Gespräch
0 lässt das Gespräch laufen, bis du pausierst.
Antwortabstand · Sekunden
Abwesenheitswartezeit · Sekunden
Pausieren, wenn niemand zusieht
Standardfiguren animieren
Modell und Standardsprache gelten für neue Gespräche. Es läuft nur eines gleichzeitig.
Sprache der Oberfläche
Wähle deine Sprache
Weiter
Im Gespräch
Pausiert
Antwort vor der Pause beenden
Antwort wird beendet
Pause
Fortsetzen
Antworten: {count}
Mitglieder: {count}
{name} denkt nach
Ich
Mitglied
{name} löschen? In bestehenden Gesprächen bleibt das Mitglied erhalten.
Lade ein Bild im Format PNG, JPG, WebP oder GIF hoch.
Das Antwortlimit ist erreicht. Du kannst es in den Einstellungen ändern.
Pausiert, weil niemand zusieht.
Hier fortsetzen.
Eine kurze Pause.
Fortsetzen bringt dich zu diesem Gespräch zurück.
Prüfe deine Verbindung.
Das Gespräch konnte nicht gespeichert werden. Versuche es durch Fortsetzen erneut.
Keine Antwort erhalten. Setze das Gespräch gleich wieder fort.
Die Sitzung konnte nicht geprüft werden.
Prüfe die Installation und Anmeldung von agy.
Modelle konnten nicht geladen werden. Prüfe die Anmeldung bei agy.
Prüfe die Eingabe.
Die Eingabe ist zu lang.
Mitglied nicht gefunden.
Wähle mindestens zwei Mitglieder.
Wähle eine Sprache.
Erhöhe das Antwortlimit oder setze es in den Einstellungen auf 0.
Prüfe die gewünschte Aktion.
Warte zuerst auf die Antwort der Mitglieder.
Gespräch nicht gefunden.
Versuche es erneut von dieser Seite aus.
Diese Anfrage wird nicht unterstützt.
Sol · Katze
Mo · grüner Freund
Ru · Kaninchen
Nuri · Bär
Dan · Ente
Bi · Fuchs`,
pt: `Conversas
Nova conversa
Membros
Adicionar membro
Configurações do sistema
Conectado
Conectando
Reconectando
Conversas
Sobre o que vamos conversar?
Começar a primeira conversa
Conversa
Às vezes também tenho algo a dizer
Dizer algo aos membros
Enviar comentário
Novas mensagens
Fechar
Qual é o assunto?
O que vier à cabeça
Quem participa?
Selecionar todos
Limpar seleção
Idioma da conversa
Começar a conversar
Editar membro
Avatares padrão
Enviar foto
Usar endereço de imagem
Endereço da foto de perfil
Nome
Personalidade
Breve apresentação
Opcional
Editar ou excluir um membro preserva as conversas existentes.
Salvar
Excluir membro
Excluir
Cancelar
Aparência
Sistema
Claro
Escuro
Idioma padrão da conversa
Modelo para novas conversas
Atualizar
Limite de respostas por conversa
0 mantém a conversa até você pausar.
Intervalo · segundos
Espera por ausência · segundos
Pausar quando ninguém estiver assistindo
Animar personagens padrão
Modelo e idioma padrão valem para novas conversas. Só uma roda por vez.
Idioma da interface
Escolha seu idioma
Continuar
Conversando
Em pausa
Terminando antes de pausar
Terminando a resposta
Pausar
Continuar
Respostas: {count}
Membros: {count}
{name} está pensando
Eu
Membro
Excluir {name}? O membro continuará nas conversas existentes.
Envie uma imagem PNG, JPG, WebP ou GIF.
O limite de respostas foi atingido. Altere nas configurações.
Em pausa porque ninguém está assistindo.
Continue a partir daqui.
Uma pequena pausa.
Continue para voltar a esta conversa.
Verifique sua conexão.
Não foi possível salvar a conversa. Continue para tentar novamente.
Nenhuma resposta recebida. Continue daqui a pouco.
Não foi possível verificar a sessão.
Verifique a instalação e o login do agy.
Não foi possível carregar os modelos. Verifique o login do agy.
Verifique os dados informados.
O texto é muito longo.
Membro não encontrado.
Selecione pelo menos dois membros.
Escolha um idioma.
Aumente o limite de respostas ou defina 0 nas configurações.
Verifique a ação solicitada.
Espere primeiro a resposta dos membros.
Conversa não encontrada.
Tente novamente a partir desta página.
Esta solicitação não é suportada.
Sol · gato
Mo · amigo verde
Ru · coelho
Nuri · urso
Dan · pato
Bi · raposa`,
ar: `المحادثات
محادثة جديدة
الأعضاء
إضافة عضو
إعدادات النظام
متصل
جارٍ الاتصال
إعادة الاتصال
المحادثات
عن ماذا نتحدث؟
ابدأ المحادثة الأولى
حديث الأعضاء
أحيانًا لدي ما أقوله أيضًا
قل شيئًا للأعضاء
إرسال التعليق
رسائل جديدة
إغلاق
ما الموضوع؟
أي شيء يخطر ببالك
من سيشارك؟
تحديد الجميع
إلغاء التحديد
لغة المحادثة
ابدأ الحديث
تعديل العضو
صور الملف الافتراضية
رفع صورة
استخدام عنوان صورة
عنوان صورة الملف
الاسم
الشخصية
نبذة قصيرة
اختياري
تعديل العضو أو حذفه لا يغير المحادثات السابقة.
حفظ
حذف العضو
حذف
إلغاء
المظهر
النظام
فاتح
داكن
لغة المحادثة الافتراضية
نموذج المحادثات الجديدة
تحديث
حد الردود لكل محادثة
0 يعني الاستمرار حتى الإيقاف المؤقت.
الفاصل بين الردود · ثوانٍ
مهلة الغياب · ثوانٍ
توقف عندما لا يشاهد أحد
تحريك الشخصيات الافتراضية
النموذج واللغة الافتراضية للمحادثات الجديدة. تعمل محادثة واحدة في كل مرة.
لغة الواجهة
اختر لغتك
متابعة
يتحدثون
متوقف مؤقتًا
إنهاء الرد قبل التوقف
جارٍ إنهاء الرد
إيقاف مؤقت
استئناف
الردود: {count}
الأعضاء: {count}
{name} يفكر
أنا
عضو
هل تريد حذف {name}؟ سيبقى في المحادثات السابقة.
ارفع صورة بصيغة PNG أو JPG أو WebP أو GIF.
تم بلوغ حد الردود. يمكنك تغييره في إعدادات النظام.
توقفت المحادثة لأن لا أحد يشاهد.
استأنف للمتابعة من هنا.
استراحة قصيرة.
استأنف للعودة إلى هذه المحادثة.
تحقق من الاتصال.
تعذر حفظ المحادثة. استأنف للمحاولة مجددًا.
لم يصل رد. استأنف بعد قليل.
تعذر التحقق من الجلسة.
تحقق من تثبيت agy وتسجيل الدخول.
تعذر تحميل النماذج. تحقق من تسجيل الدخول إلى agy.
تحقق من المدخلات.
النص طويل جدًا.
العضو غير موجود.
اختر عضوين على الأقل.
اختر لغة.
ارفع حد الردود أو اجعله 0 في الإعدادات.
تحقق من الإجراء المطلوب.
انتظر رد الأعضاء أولًا.
المحادثة غير موجودة.
حاول مجددًا من هذه الصفحة.
هذا الطلب غير مدعوم.
سول · قط
مو · صديق أخضر
رو · أرنب
نوري · دب
دان · بطة
بي · ثعلب`,
zh: `聊天列表
新聊天
成员
添加成员
全局设置
已连接
连接中
重新连接中
聊天列表
聊点什么？
开始第一次聊天
成员对话
偶尔我也想说一句
给成员留言
发送留言
新消息
关闭
聊什么话题？
随便说点什么
参与成员
全选
取消全选
聊天语言
开始聊天
编辑成员
默认头像
上传照片
使用图片地址
头像图片地址
姓名
性格
简短介绍
选填
编辑或删除成员不会改变已有聊天。
保存
删除成员
删除
取消
外观
跟随系统
浅色
深色
默认聊天语言
新聊天的模型
刷新
每场聊天的回复上限
0 表示持续聊天，直到手动暂停。
回复间隔 · 秒
离开等待 · 秒
无人观看时暂停
默认角色动画
模型和默认语言用于新聊天，一次只进行一场聊天。
界面语言
请选择语言
继续
聊天中
已暂停
回复结束后暂停
正在完成回复
暂停
继续
回复：{count}
成员：{count}
{name} 正在思考
我
成员
删除 {name}？已有聊天中仍会保留该成员。
请上传 PNG、JPG、WebP 或 GIF 图片。
已达到回复上限，可在全局设置中更改。
因为无人观看，聊天已暂停。
点击继续，从这里接着聊。
暂时休息一下。
点击继续，回到这场聊天。
请检查网络连接。
无法保存聊天，请继续以重试。
未收到回复，请稍后点击继续。
无法验证会话。
请检查 agy 安装和登录状态。
无法加载模型，请检查 agy 登录状态。
请检查输入内容。
输入内容过长。
找不到成员。
请选择至少两位成员。
请选择语言。
请在设置中提高回复上限或设为 0。
请检查请求的操作。
请先等待成员回复。
找不到聊天。
请在此页面重试。
不支持此请求。
索尔 · 猫
莫 · 绿色朋友
露 · 兔子
努莉 · 熊
丹 · 鸭子
比 · 狐狸`,
ja: `会話一覧
新しい会話
メンバー
メンバー追加
システム設定
接続済み
接続中
再接続中
会話一覧
何を話そう？
最初の会話を始める
メンバーの会話
たまには私もひと言
メンバーにひと言
コメント送信
新しい発言
閉じる
何について話す？
気になることを自由に
参加メンバー
すべて選択
選択を解除
会話の言語
会話を始める
メンバー編集
標準アバター
写真をアップロード
画像のアドレスを使う
プロフィール画像のアドレス
名前
性格
短い紹介
任意
編集・削除しても過去の会話のメンバーは変わりません。
保存
メンバー削除
削除
キャンセル
画面
システム
ライト
ダーク
標準の会話言語
新しい会話のモデル
更新
会話ごとの応答上限
0なら手動で止めるまで続きます。
応答の間隔 · 秒
不在時の待ち時間 · 秒
誰も見ていないときに停止
標準キャラクターの動き
モデルと標準言語は新しい会話に適用され、同時に進む会話は1つです。
表示言語
言語を選んでください
続ける
会話中
休憩中
話し終えてから休憩
応答を完了中
ひと休み
再開
発言数：{count}
人数：{count}
{name} が考え中
私
メンバー
{name} を削除しますか？過去の会話には残ります。
PNG、JPG、WebP、GIF の画像を選んでください。
応答上限に達しました。システム設定で変更できます。
誰も見ていないので停止しました。
再開を押すとここから続きます。
少し休憩しよう。
再開を押すとこの会話に戻ります。
接続を確認してください。
会話を保存できませんでした。再開して再試行してください。
応答を受け取れませんでした。少し待って再開してください。
セッションを確認できませんでした。
agy のインストールとログインを確認してください。
モデルを取得できません。agy のログインを確認してください。
入力内容を確認してください。
入力が長すぎます。
メンバーが見つかりません。
2人以上のメンバーを選んでください。
言語を選んでください。
設定で応答上限を増やすか0にしてください。
操作を確認してください。
まずメンバーの応答を待ってください。
会話が見つかりません。
この画面から再試行してください。
このリクエストには対応していません。
ソル · 猫
モ · 緑の友達
ル · ウサギ
ヌリ · クマ
ダン · アヒル
ビ · キツネ`,
hi: `बातचीत की सूची
नई बातचीत
सदस्य
सदस्य जोड़ें
सिस्टम सेटिंग
जुड़ा हुआ
जुड़ रहा है
फिर जुड़ रहा है
बातचीत की सूची
किस बारे में बात करें?
पहली बातचीत शुरू करें
सदस्यों की बातचीत
कभी मुझे भी कुछ कहना है
सदस्यों से कुछ कहें
टिप्पणी भेजें
नए संदेश
बंद करें
विषय क्या है?
जो मन में हो
कौन शामिल है?
सभी चुनें
चयन हटाएँ
बातचीत की भाषा
बातचीत शुरू करें
सदस्य बदलें
डिफ़ॉल्ट प्रोफ़ाइल तस्वीरें
तस्वीर अपलोड करें
छवि का पता इस्तेमाल करें
प्रोफ़ाइल तस्वीर का पता
नाम
व्यक्तित्व
संक्षिप्त परिचय
वैकल्पिक
सदस्य बदलने या हटाने से पुरानी बातचीत नहीं बदलती।
सहेजें
सदस्य हटाएँ
हटाएँ
रद्द करें
दिखावट
सिस्टम
हल्का
गहरा
डिफ़ॉल्ट बातचीत भाषा
नई बातचीत का मॉडल
ताज़ा करें
हर बातचीत की उत्तर सीमा
0 होने पर रोकने तक बातचीत चलती है।
उत्तर अंतराल · सेकंड
अनुपस्थिति प्रतीक्षा · सेकंड
कोई न देखे तो विराम
डिफ़ॉल्ट पात्रों का एनिमेशन
मॉडल और डिफ़ॉल्ट भाषा नई बातचीत पर लागू होते हैं। एक समय में एक बातचीत चलती है।
इंटरफ़ेस की भाषा
अपनी भाषा चुनें
जारी रखें
बातचीत जारी
विराम
उत्तर पूरा करके विराम
उत्तर पूरा हो रहा है
रोकें
जारी करें
उत्तर: {count}
सदस्य: {count}
{name} सोच रहा है
मैं
सदस्य
{name} को हटाएँ? पुरानी बातचीत में यह सदस्य रहेगा।
PNG, JPG, WebP या GIF तस्वीर अपलोड करें।
उत्तर सीमा पूरी हुई। सिस्टम सेटिंग में बदल सकते हैं।
कोई दर्शक नहीं है, इसलिए विराम है।
यहीं से जारी करें।
थोड़ा आराम करें।
इस बातचीत पर लौटने के लिए जारी करें।
कनेक्शन जाँचें।
बातचीत सहेजी नहीं जा सकी। जारी करके फिर कोशिश करें।
उत्तर नहीं मिला। थोड़ी देर बाद जारी करें।
सत्र सत्यापित नहीं हो सका।
agy की स्थापना और लॉगिन जाँचें।
मॉडल नहीं मिले। agy का लॉगिन जाँचें।
दी गई जानकारी जाँचें।
पाठ बहुत लंबा है।
सदस्य नहीं मिला।
कम से कम दो सदस्य चुनें।
भाषा चुनें।
सेटिंग में उत्तर सीमा बढ़ाएँ या 0 करें।
माँगी गई कार्रवाई जाँचें।
पहले सदस्यों के उत्तर की प्रतीक्षा करें।
बातचीत नहीं मिली।
इसी पृष्ठ से फिर कोशिश करें।
यह अनुरोध समर्थित नहीं है।
सोल · बिल्ली
मो · हरा दोस्त
रू · खरगोश
नूरी · भालू
डैन · बत्तख
बी · लोमड़ी`,
ko: `수다 목록
새로운 수다
멤버
멤버 추가
시스템 설정
연결됨
연결 중
다시 연결 중
수다 목록
어떤 얘기부터 할까?
첫 수다 열기
멤버들의 대화
가끔은 나도 한마디
멤버들에게 한마디
한마디 보내기
새로운 말
닫기
무슨 얘기할까?
그냥 아무 얘기
함께할 멤버
모두 선택
선택 해제
대화 언어
모여서 수다 떨기
멤버 편집
기본 프로필 사진
사진 올리기
사진 주소 사용
프로필 사진 주소
이름
성격
짧은 소개
선택
편집하거나 삭제해도 기존 수다의 멤버는 그대로 남아요.
저장
멤버 삭제
삭제
취소
화면
시스템 설정
라이트
다크
기본 대화 언어
새 수다의 모델
새로고침
수다당 대화 개수 제한
0이면 중단하기 전까지 계속해요.
말 사이 간격 · 초
자리 비움 대기 · 초
자리를 비우면 잠시 멈춤
기본 캐릭터 움직임
모델과 기본 언어는 새 수다부터 적용돼요. 한 번에 한 수다가 진행돼요.
화면 언어
언어를 골라주세요
계속
수다 중
쉬는 중
말 마치고 쉬는 중
말 마치는 중
잠깐 쉬기
이어 듣기
{count}마디
{count}명
{name} 생각 중
나
멤버
{name} 멤버를 삭제할까요? 기존 수다에는 남아요.
PNG, JPG, WebP, GIF 이미지를 올려주세요.
설정한 대화 개수에 도달했어요. 시스템 설정에서 제한을 바꿀 수 있어요.
자리가 비어서 잠시 멈췄어.
이어 듣기를 누르면 여기서 계속.
잠깐 쉬어 가자.
이어 듣기를 누르면 이 수다로 돌아와.
연결을 확인해주세요.
대화를 저장하지 못했어요. 다시 이어주세요.
답변을 받지 못했어요. 잠시 뒤 다시 이어주세요.
세션을 확인하지 못했어요.
agy 설치와 로그인을 확인해주세요.
모델 목록을 가져오지 못했어요. agy 로그인을 확인해주세요.
입력을 확인해주세요.
입력이 너무 길어요.
멤버를 찾지 못했어요.
멤버를 두 명 이상 골라주세요.
언어를 골라주세요.
설정에서 대화 개수 제한을 늘리거나 0으로 바꿔주세요.
동작을 확인해주세요.
친구들 답변을 먼저 기다려주세요.
수다를 찾지 못했어요.
이 화면에서 다시 시도해주세요.
지원하지 않는 요청이에요.
솔 · 고양이
모 · 초록 친구
루 · 토끼
누리 · 곰
단 · 오리
비 · 여우`,
en: `Chats
New chat
Members
Add member
System settings
Connected
Connecting
Reconnecting
Chats
What shall we talk about?
Start the first chat
Conversation
Sometimes I have something to say
Say something to the members
Send comment
New messages
Close
What’s the topic?
Anything on your mind
Who’s joining?
Select all
Clear selection
Conversation language
Start chatting
Edit member
Default profile photos
Upload photo
Use image URL
Profile photo URL
Name
Personality
Short bio
Optional
Editing or deleting a member keeps their existing chats intact.
Save
Delete member
Delete
Cancel
Appearance
System
Light
Dark
Default conversation language
Model for new chats
Refresh
Reply limit per chat
0 keeps the conversation going until you pause it.
Reply interval · seconds
Absence timeout · seconds
Pause when nobody is watching
Animate default characters
Model and default language apply to new chats. One chat runs at a time.
Interface language
Choose your language
Continue
Chatting
Paused
Finishing before pausing
Finishing reply
Pause
Resume
Replies: {count}
Members: {count}
{name} is thinking
Me
Member
Delete {name}? They will remain in existing chats.
Upload a PNG, JPG, WebP or GIF image.
The reply limit was reached. You can change it in system settings.
Paused because nobody is watching.
Resume to carry on from here.
Taking a short break.
Resume to return to this chat.
Check your connection.
The conversation could not be saved. Please resume to retry.
No reply was received. Please resume in a moment.
The session could not be verified.
Check the agy installation and login.
Could not load models. Check your agy login.
Check the input.
The input is too long.
Member not found.
Select at least two members.
Choose a language.
Increase the reply limit or set it to 0 in settings.
Check the requested action.
Wait for the members to reply first.
Chat not found.
Please try again from this page.
This request is not supported.
Sol · cat
Mo · green friend
Ru · rabbit
Nuri · bear
Dan · duck
Bi · fox`,
es: `Conversaciones
Nueva conversación
Miembros
Añadir miembro
Ajustes del sistema
Conectado
Conectando
Reconectando
Conversaciones
¿De qué hablamos?
Empezar la primera conversación
Conversación
A veces yo también tengo algo que decir
Comentar a los miembros
Enviar comentario
Mensajes nuevos
Cerrar
¿Cuál es el tema?
Lo que tengas en mente
¿Quién participa?
Seleccionar todos
Quitar selección
Idioma de la conversación
Empezar a conversar
Editar miembro
Avatares predeterminados
Subir foto
Usar dirección de imagen
Dirección de la foto
Nombre
Personalidad
Presentación breve
Opcional
Editar o eliminar un miembro conserva sus conversaciones anteriores.
Guardar
Eliminar miembro
Eliminar
Cancelar
Apariencia
Sistema
Claro
Oscuro
Idioma predeterminado de conversación
Modelo para nuevas conversaciones
Actualizar
Límite de respuestas por conversación
0 permite continuar hasta que pauses.
Intervalo · segundos
Espera por ausencia · segundos
Pausar cuando nadie mira
Animar personajes predeterminados
Modelo e idioma se aplican a nuevas conversaciones. Solo se ejecuta una a la vez.
Idioma de la interfaz
Elige tu idioma
Continuar
Conversando
En pausa
Terminando antes de pausar
Terminando la respuesta
Pausar
Continuar
Respuestas: {count}
Miembros: {count}
{name} está pensando
Yo
Miembro
¿Eliminar a {name}? Permanecerá en las conversaciones existentes.
Sube una imagen PNG, JPG, WebP o GIF.
Se alcanzó el límite de respuestas. Puedes cambiarlo en los ajustes.
En pausa porque nadie está mirando.
Continúa desde aquí.
Tomando un descanso.
Continúa para volver a esta conversación.
Comprueba tu conexión.
No se pudo guardar la conversación. Continúa para reintentar.
No se recibió respuesta. Continúa dentro de un momento.
No se pudo verificar la sesión.
Comprueba la instalación y el inicio de sesión de agy.
No se cargaron los modelos. Comprueba el inicio de sesión de agy.
Revisa los datos introducidos.
El texto es demasiado largo.
No se encontró al miembro.
Selecciona al menos dos miembros.
Elige un idioma.
Aumenta el límite de respuestas o ponlo a 0 en los ajustes.
Comprueba la acción solicitada.
Espera primero la respuesta de los miembros.
No se encontró la conversación.
Vuelve a intentarlo desde esta página.
Esta solicitud no es compatible.
Sol · gato
Mo · amigo verde
Ru · conejo
Nuri · oso
Dan · pato
Bi · zorro`,
fr: `Conversations
Nouvelle conversation
Membres
Ajouter un membre
Réglages du système
Connecté
Connexion
Reconnexion
Conversations
De quoi parle-t-on ?
Lancer la première conversation
Conversation
Parfois, j’ai aussi quelque chose à dire
Dire quelque chose aux membres
Envoyer le commentaire
Nouveaux messages
Fermer
Quel est le sujet ?
Ce qui vous passe par la tête
Qui participe ?
Tout sélectionner
Effacer la sélection
Langue de conversation
Commencer à discuter
Modifier le membre
Avatars par défaut
Importer une photo
Utiliser une adresse d’image
Adresse de la photo
Nom
Personnalité
Présentation courte
Facultatif
Modifier ou supprimer un membre conserve ses conversations existantes.
Enregistrer
Supprimer le membre
Supprimer
Annuler
Apparence
Système
Clair
Sombre
Langue de conversation par défaut
Modèle des nouvelles conversations
Actualiser
Limite de réponses par conversation
0 continue jusqu’à une pause manuelle.
Intervalle · secondes
Délai d’absence · secondes
Pause quand personne ne regarde
Animer les personnages par défaut
Modèle et langue concernent les nouvelles conversations. Une seule tourne à la fois.
Langue de l’interface
Choisissez votre langue
Continuer
En discussion
En pause
Termine avant la pause
Réponse en cours de finition
Pause
Reprendre
Réponses : {count}
Membres : {count}
{name} réfléchit
Moi
Membre
Supprimer {name} ? Ce membre restera dans les conversations existantes.
Importez une image PNG, JPG, WebP ou GIF.
La limite de réponses est atteinte. Modifiez-la dans les réglages.
En pause parce que personne ne regarde.
Reprenez pour continuer ici.
Une petite pause.
Reprenez pour revenir à cette conversation.
Vérifiez votre connexion.
Impossible d’enregistrer la conversation. Reprenez pour réessayer.
Aucune réponse reçue. Reprenez dans un instant.
Impossible de vérifier la session.
Vérifiez l’installation et la connexion agy.
Impossible de charger les modèles. Vérifiez la connexion agy.
Vérifiez les données saisies.
Le texte est trop long.
Membre introuvable.
Choisissez au moins deux membres.
Choisissez une langue.
Augmentez la limite ou réglez-la à 0 dans les réglages.
Vérifiez l’action demandée.
Attendez d’abord la réponse des membres.
Conversation introuvable.
Réessayez depuis cette page.
Cette requête n’est pas prise en charge.
Sol · chat
Mo · ami vert
Ru · lapin
Nuri · ours
Dan · canard
Bi · renard`,
};

const actionKeys = ['reset_settings','delete_history','reset_confirm','history_confirm','settings_reset','history_deleted','error_confirm','delete_room','delete_room_confirm','room_deleted'];
const actions = {
ko:['설정 초기화','대화 내역 전체 삭제','화면 언어는 유지하고 나머지 설정을 기본값으로 돌립니다. 대화 제한은 0(무제한)이 됩니다. 멤버와 수다 기록은 그대로 남습니다.','앱의 모든 수다와 메시지를 삭제합니다. 진행 중인 수다는 멈추며, 멤버와 설정은 유지됩니다. 되돌릴 수 없습니다.','설정을 초기화했어요.','대화 내역을 모두 삭제했어요.','확인 창에서 다시 확인해주세요.',"수다 삭제","‘{topic}’ 수다를 삭제할까요? 진행 중인 수다는 멈추며 메시지도 삭제됩니다. 되돌릴 수 없습니다.","수다를 삭제했어요."],
en:['Reset settings','Delete all conversations','Keep the interface language and reset other settings to their defaults. The reply limit becomes 0 (unlimited). Members and conversation history stay intact.','Delete every conversation and message in this app. Running conversations stop; members and settings stay intact. This cannot be undone.','Settings reset.','All conversations deleted.','Confirm this action in the dialog.',"Delete conversation","Delete “{topic}”? This conversation stops if running, and its messages are deleted. This cannot be undone.","Conversation deleted."],
es:['Restablecer ajustes','Eliminar todas las conversaciones','Mantener el idioma de la interfaz y restablecer los demás ajustes. El límite será 0 (ilimitado). Se conservan los miembros y el historial.','Eliminar todas las conversaciones y mensajes de esta aplicación. Las conversaciones activas se detienen; los miembros y ajustes se conservan. No se puede deshacer.','Ajustes restablecidos.','Todas las conversaciones eliminadas.','Confirma la acción en el diálogo.',"Eliminar conversación","¿Eliminar «{topic}»? La conversación se detendrá si está activa y sus mensajes se eliminarán. No se puede deshacer.","Conversación eliminada."],
zh:['重置设置','删除全部聊天记录','保留界面语言，将其他设置恢复为默认值。回复上限将变为 0（无限制）。成员和聊天记录保持不变。','删除本应用的全部聊天和消息，停止正在进行的聊天，保留成员和设置。此操作无法撤销。','设置已重置。','全部聊天记录已删除。','请在确认窗口中确认此操作。',"删除聊天","要删除“{topic}”吗？正在进行的聊天会停止，其消息也会删除。此操作无法撤销。","聊天已删除。"],
ja:['設定を初期化','会話履歴をすべて削除','表示言語を保持し、ほかの設定を初期値に戻します。応答上限は0（無制限）になります。メンバーと会話履歴は保持します。','このアプリのすべての会話とメッセージを削除します。進行中の会話は停止し、メンバーと設定は保持します。元に戻せません。','設定を初期化しました。','すべての会話履歴を削除しました。','確認画面で操作を確認してください。',"会話を削除","「{topic}」を削除しますか？進行中の会話は停止し、メッセージも削除されます。元に戻せません。","会話を削除しました。"],
hi:['सेटिंग रीसेट करें','सभी बातचीत मिटाएँ','इंटरफ़ेस की भाषा रखकर बाकी सेटिंग डिफ़ॉल्ट पर लौटाएँ। उत्तर सीमा 0 (असीमित) हो जाएगी। सदस्य और बातचीत का इतिहास सुरक्षित रहेगा।','इस ऐप की सभी बातचीत और संदेश मिटाएँ। चल रही बातचीत रुक जाएगी; सदस्य और सेटिंग सुरक्षित रहेंगे। इसे वापस नहीं किया जा सकता।','सेटिंग रीसेट हुई।','सभी बातचीत मिटा दी गईं।','पुष्टि वाले संवाद में कार्रवाई की पुष्टि करें।',"बातचीत मिटाएँ","“{topic}” मिटाएँ? चल रही बातचीत रुक जाएगी और उसके संदेश भी मिट जाएँगे। इसे वापस नहीं किया जा सकता।","बातचीत मिटा दी गई।"],
fr:['Réinitialiser les réglages','Supprimer toutes les conversations','Conserver la langue de l’interface et rétablir les autres valeurs par défaut. La limite devient 0 (illimitée). Les membres et l’historique sont conservés.','Supprimer toutes les conversations et tous les messages de cette application. Les conversations en cours s’arrêtent ; les membres et réglages sont conservés. Cette action est irréversible.','Réglages réinitialisés.','Toutes les conversations supprimées.','Confirmez cette action dans la fenêtre.',"Supprimer la conversation","Supprimer « {topic} » ? La conversation en cours s’arrête et ses messages sont supprimés. Cette action est irréversible.","Conversation supprimée."],
de:['Einstellungen zurücksetzen','Alle Gespräche löschen','Die Oberflächensprache bleibt, andere Einstellungen werden zurückgesetzt. Das Antwortlimit wird 0 (unbegrenzt). Mitglieder und Verlauf bleiben erhalten.','Alle Gespräche und Nachrichten dieser App löschen. Laufende Gespräche stoppen; Mitglieder und Einstellungen bleiben erhalten. Dies ist unwiderruflich.','Einstellungen zurückgesetzt.','Alle Gespräche gelöscht.','Bestätige diese Aktion im Dialog.',"Gespräch löschen","„{topic}“ löschen? Ein laufendes Gespräch wird gestoppt und seine Nachrichten werden gelöscht. Dies ist unwiderruflich.","Gespräch gelöscht."],
pt:['Redefinir configurações','Excluir todas as conversas','Manter o idioma da interface e restaurar as outras configurações. O limite passa a 0 (ilimitado). Membros e histórico são preservados.','Excluir todas as conversas e mensagens deste aplicativo. As conversas em andamento param; membros e configurações são preservados. Não é possível desfazer.','Configurações redefinidas.','Todas as conversas excluídas.','Confirme esta ação na janela.',"Excluir conversa","Excluir “{topic}”? A conversa para se estiver em andamento, e suas mensagens são excluídas. Não é possível desfazer.","Conversa excluída."],
ar:['إعادة ضبط الإعدادات','حذف جميع المحادثات','الاحتفاظ بلغة الواجهة وإعادة بقية الإعدادات إلى القيم الافتراضية. يصبح حد الردود 0 (بلا حد). يبقى الأعضاء وسجل المحادثات.','حذف جميع المحادثات والرسائل في هذا التطبيق. تتوقف المحادثات الجارية، ويبقى الأعضاء والإعدادات. لا يمكن التراجع عن هذا الإجراء.','تمت إعادة ضبط الإعدادات.','تم حذف جميع المحادثات.','أكد هذا الإجراء في نافذة التأكيد.',"حذف المحادثة","هل تريد حذف «{topic}»؟ تتوقف المحادثة إن كانت جارية وتُحذف رسائلها. لا يمكن التراجع عن هذا الإجراء.","تم حذف المحادثة."],
};
export const UI = Object.fromEntries(LOCALES.map(locale => {
  const pack = packs[locale];
  const values = pack.split('\n');
  if (values.length !== keys.length) throw new Error(`Incomplete ${locale} translation: ${values.length}/${keys.length}`);
  if (actions[locale]?.length !== actionKeys.length) throw new Error(`Incomplete ${locale} action translation`);
  return [locale,{ ...Object.fromEntries(keys.map((key,i) => [key,values[i]])),...Object.fromEntries(actionKeys.map((key,i) => [key,actions[locale][i]])) }];
}));
export function t(locale,key,variables = {}) {
  const value = UI[locale]?.[key];
  if (value === undefined) throw new Error(`Missing translation: ${locale}.${key}`);
  return value.replace(/\{(\w+)\}/g,(_,name) => String(variables[name] ?? ''));
}

export const CHARACTER_IDS = ['sol','mo','ru','bear','duck','fox'];
export const CONTENT = {
ko: {
languages:['한국어','영어','프랑스어','스페인어','포르투갈어','독일어','중국어','일본어','아랍어','힌디어'],
topics:['평생 한 가지 야식만 먹을 수 있다면','쓸모없는데 갖고 싶은 초능력','회사에서 기계식 키보드를 써도 되는걸까?','계획 없이 떠나는 주말','나만 좋아하는 이상한 조합','월요일을 없애는 방법'],
characters:[
['솔','일단 재밌고 봄','호기심 많고 엉뚱한 낙관론자. 사소한 얘기에서 이상한 상상을 잘 꺼낸다. 말투는 가볍고 장난스럽다. 가끔 허술해서 친구에게 놀림받는다. 무조건 긍정하거나 모든 말에 감탄하지는 않는다.'],
['모','태클도 애정이야','건조한 유머가 있는 현실주의자. 말을 짧게 하고 은근히 웃긴다. 친구들의 비약에 툭 태클을 걸지만 따뜻한 편이다. 늘 반박하는 기계가 아니며 자기의 이상한 취향도 가끔 털어놓는다.'],
['루','그 얘기 좀 더 해봐','취향에 진심인 과몰입 수집가. 영화, 음식, 음악, 여행 같은 일상에 자기만의 디테일이 있다. 다른 사람의 작은 말을 기억해서 다시 꺼낸다. 질문만 하지 않고 자기 이야기도 한다. 강의나 해설을 하지 않는다.'],
['누리','느긋한 한마디','느긋한 곰 같은 친구. 편하게 자기 경험을 말하고 작은 농담을 한다.'],
['단','비유가 떠올랐어','활발하지만 눈치 있는 친구. 예상치 못한 비유를 좋아하고 친구들 이야기를 잘 이어받는다.'],
['비','조용히 보고 있었지','차분한 관찰자. 남들이 놓친 작은 부분을 보고 짧고 다정하게 이야기한다.'],
]},
en: {
languages:['Korean','English','French','Spanish','Portuguese','German','Chinese','Japanese','Arabic','Hindi'],
topics:['If you could eat only one midnight snack forever','A useless superpower you still want','Are mechanical keyboards okay in the office?','A weekend without a plan','An odd combination only you like','How to get rid of Mondays'],
characters:[
['Sol','Fun comes first','A curious, quirky optimist who turns small remarks into unusual ideas. Light and playful, occasionally clumsy enough to be teased. Does not agree with everything or gush at every remark.'],
['Mo','Teasing is affection','A realist with dry humor and short, quietly funny remarks. Gently challenges friends’ leaps of logic but stays warm. Not constantly contrary; sometimes shares unusual personal tastes.'],
['Ru','Tell me a little more','An enthusiastic collector of tastes, with personal details about movies, food, music and travel. Remembers friends’ small remarks and brings them back. Shares stories rather than only asking questions, without lecturing.'],
['Nuri','A laid-back remark','A relaxed, bear-like friend who comfortably shares experiences and little jokes.'],
['Dan','That reminds me of something','Lively and considerate. Enjoys unexpected analogies and picks up on friends’ stories.'],
['Bi','Quietly taking it in','A calm observer who notices overlooked details and speaks briefly and warmly.'],
]},
es: {
languages:['Coreano','Inglés','Francés','Español','Portugués','Alemán','Chino','Japonés','Árabe','Hindi'],
topics:['Un solo tentempié nocturno para toda la vida','Un superpoder inútil que aun así quieres','¿Se pueden usar teclados mecánicos en la oficina?','Un fin de semana sin planes','Una combinación extraña que solo te gusta a ti','Cómo eliminar los lunes'],
characters:[
['Sol','La diversión va primero','Optimista curioso y peculiar que convierte pequeños comentarios en ideas inesperadas. Habla con ligereza y humor; a veces sus despistes dan pie a bromas. No está de acuerdo con todo ni se maravilla de cada frase.'],
['Mo','Bromear también es cariño','Realista de humor seco y comentarios breves y discretamente graciosos. Cuestiona con cariño los saltos de lógica de sus amigos. No lleva siempre la contraria y a veces comparte gustos raros.'],
['Ru','Cuéntame un poco más','Coleccionista entusiasta de gustos, con detalles propios sobre cine, comida, música y viajes. Recuerda pequeños comentarios de los demás. También cuenta historias, sin limitarse a preguntas ni dar lecciones.'],
['Nuri','Un comentario tranquilo','Amigo relajado, como un oso, que comparte experiencias y pequeñas bromas con naturalidad.'],
['Dan','Eso me recuerda a algo','Vivaz y atento. Le gustan las analogías inesperadas y sigue bien las historias de sus amigos.'],
['Bi','Observando en silencio','Observador sereno que nota detalles olvidados y habla de forma breve y cálida.'],
]},
fr: {
languages:['Coréen','Anglais','Français','Espagnol','Portugais','Allemand','Chinois','Japonais','Arabe','Hindi'],
topics:['Un seul en-cas de minuit pour toute la vie','Un super-pouvoir inutile dont tu rêves quand même','Les claviers mécaniques sont-ils acceptables au bureau ?','Un week-end sans programme','Une combinaison bizarre que toi seul aimes','Comment supprimer les lundis'],
characters:[
['Sol','S’amuser d’abord','Optimiste curieux et décalé qui transforme les petites remarques en idées inattendues. Léger et joueur, parfois maladroit au point de se faire taquiner. N’approuve pas tout et ne s’extasie pas à chaque phrase.'],
['Mo','Taquiner, c’est aussi aimer','Réaliste à l’humour sec et aux remarques courtes, discrètement drôles. Conteste gentiment les raccourcis de ses amis. Ne s’oppose pas systématiquement et partage parfois ses goûts étranges.'],
['Ru','Raconte-moi encore un peu','Collectionneur passionné de goûts, avec ses détails sur le cinéma, la cuisine, la musique et les voyages. Se souvient des petites remarques. Raconte aussi ses histoires, sans seulement poser des questions ni faire la leçon.'],
['Nuri','Un mot tranquille','Ami détendu, un peu comme un ours, qui raconte simplement ses expériences et ses petites blagues.'],
['Dan','Ça me fait penser à quelque chose','Vif et attentionné. Aime les analogies inattendues et rebondit sur les histoires de ses amis.'],
['Bi','J’observais en silence','Observateur calme qui remarque les détails oubliés et parle brièvement, avec chaleur.'],
]},
zh: {
languages:['韩语','英语','法语','西班牙语','葡萄牙语','德语','中文','日语','阿拉伯语','印地语'],
topics:['如果一辈子只能吃一种夜宵','没什么用但还是想要的超能力','办公室能用机械键盘吗？','没有计划的周末旅行','只有我喜欢的奇怪搭配','怎样才能取消星期一'],
characters:[
['索尔','先开心再说','好奇又古灵精怪的乐观派，常从小事想到奇怪点子。语气轻松爱开玩笑，偶尔迷糊被朋友打趣。不是什么都赞同，也不会对每句话都惊叹。'],
['莫','吐槽也是关心','带着冷幽默的现实派，话短却暗暗好笑。温和地质疑朋友跳跃的逻辑，内心亲切。不总是唱反调，有时也说出自己的古怪喜好。'],
['露','再多讲一点','热衷收集喜好，对电影、食物、音乐和旅行都有自己的细节。记得别人随口说的话，也会再次提起。不只提问，也分享故事，不讲课或说教。'],
['努莉','悠闲地说一句','像熊一样放松的朋友，自然分享经历和小笑话。'],
['丹','想到了一个比喻','活泼而体贴，喜欢意想不到的比喻，善于接住朋友的话题。'],
['比','刚才在安静观察','平静的观察者，注意别人忽略的细节，简短而温柔地表达。'],
]},
ja: {
languages:['韓国語','英語','フランス語','スペイン語','ポルトガル語','ドイツ語','中国語','日本語','アラビア語','ヒンディー語'],
topics:['一生ひとつの夜食しか食べられないなら','役に立たないけど欲しい超能力','職場でメカニカルキーボードはあり？','予定を立てない週末旅行','自分だけが好きな変わった組み合わせ','月曜日をなくす方法'],
characters:[
['ソル','まずは楽しもう','好奇心旺盛でちょっと変わった楽観派。小さな話から不思議な想像を広げる。軽くふざけた口調で、時々抜けていて友達にからかわれる。何でも肯定したり、毎回大げさに感心したりはしない。'],
['モ','ツッコミも愛情','乾いたユーモアを持つ現実派。短い言葉でさりげなく笑わせる。友達の飛躍に軽くツッコミを入れるが温かい。いつも反論するわけではなく、自分の変わった好みも時々話す。'],
['ル','もう少し聞かせて','好きなものに夢中になる収集家。映画、食べ物、音楽、旅行に自分なりの細かなこだわりがある。人の小さな発言を覚えてまた話題にする。質問だけでなく自分の話もする。講義や解説はしない。'],
['ヌリ','のんびりひと言','クマのようにのんびりした友達。気軽に経験を話し、小さな冗談を言う。'],
['ダン','たとえ話が浮かんだ','元気で気配り上手。意外なたとえ話が好きで、友達の話をうまくつなげる。'],
['ビ','静かに見ていたよ','落ち着いた観察者。見落とされがちな細部に気づき、短く優しく話す。'],
]},
hi: {
languages:['कोरियाई','अंग्रेज़ी','फ़्रेंच','स्पेनिश','पुर्तगाली','जर्मन','चीनी','जापानी','अरबी','हिन्दी'],
topics:['ज़िंदगी भर आधी रात का सिर्फ एक नाश्ता','बेकार मगर फिर भी चाहिए ऐसी महाशक्ति','क्या कार्यालय में मैकेनिकल कीबोर्ड ठीक है?','बिना योजना का सप्ताहांत','अजीब मेल जो सिर्फ मुझे पसंद है','सोमवार हटाने का तरीका'],
characters:[
['सोल','पहले मज़ा','जिज्ञासु और अनोखा आशावादी, जो छोटी बातों से अजीब कल्पनाएँ बनाता है। हल्के और मज़ाकिया अंदाज़ में बोलता है; कभी उसकी भूलों पर दोस्त चिढ़ाते हैं। हर बात से सहमत या हर वाक्य पर प्रभावित नहीं होता।'],
['मो','छेड़ना भी अपनापन है','सूखे हास्य वाला व्यावहारिक दोस्त। छोटे मगर मज़ेदार वाक्य बोलता है। दोस्तों की तर्क की छलाँग पर प्यार से सवाल करता है। हमेशा विरोध नहीं करता और कभी अपनी अजीब पसंद बताता है।'],
['रू','थोड़ा और बताओ','अपनी पसंद में डूबा संग्रहकर्ता। फ़िल्मों, खाने, संगीत और यात्राओं में अपने छोटे विवरण रखता है। दूसरों की छोटी बातें याद रखकर फिर उठाता है। सिर्फ प्रश्न नहीं करता, अपनी कहानी भी बताता है; व्याख्यान नहीं देता।'],
['नूरी','आराम से एक बात','भालू जैसा शांत दोस्त, जो सहजता से अनुभव और छोटे मज़ाक साझा करता है।'],
['डैन','एक तुलना याद आई','जीवंत मगर ध्यान रखने वाला दोस्त। अनपेक्षित तुलना पसंद करता है और दोस्तों की बातें आगे बढ़ाता है।'],
['बी','चुपचाप देख रहा था','शांत निरीक्षक, जो छूटे हुए छोटे विवरण देखता है और संक्षेप में अपनापन दिखाता है।'],
]},
de: {
languages:['Koreanisch','Englisch','Französisch','Spanisch','Portugiesisch','Deutsch','Chinesisch','Japanisch','Arabisch','Hindi'],
topics:['Nur ein Mitternachtssnack für den Rest des Lebens','Eine nutzlose Superkraft, die du trotzdem willst','Sind mechanische Tastaturen im Büro okay?','Ein Wochenende ohne Plan','Eine seltsame Mischung, die nur du magst','Wie man Montage abschafft'],
characters:[
['Sol','Hauptsache Spaß','Ein neugieriger, eigenwilliger Optimist, der aus kleinen Bemerkungen ungewöhnliche Ideen macht. Leicht und verspielt, manchmal verpeilt genug für freundliche Neckereien. Stimmt nicht allem zu und staunt nicht über jeden Satz.'],
['Mo','Necken heißt auch mögen','Realist mit trockenem Humor und kurzen, leise witzigen Bemerkungen. Hinterfragt die Gedankensprünge der Freunde freundlich. Widerspricht nicht ständig und erzählt manchmal von eigenen seltsamen Vorlieben.'],
['Ru','Erzähl ein bisschen mehr','Begeisterter Sammler von Vorlieben mit eigenen Details zu Filmen, Essen, Musik und Reisen. Erinnert sich an kleine Bemerkungen. Erzählt auch eigene Geschichten, statt nur Fragen zu stellen oder Vorträge zu halten.'],
['Nuri','Ganz entspannt','Ein entspannter, bärenhafter Freund, der locker Erfahrungen und kleine Witze teilt.'],
['Dan','Mir fällt ein Vergleich ein','Lebhaft und aufmerksam. Mag unerwartete Vergleiche und knüpft an Geschichten der Freunde an.'],
['Bi','Still beobachtet','Ein ruhiger Beobachter, der übersehene Details bemerkt und kurz und herzlich spricht.'],
]},
pt: {
languages:['Coreano','Inglês','Francês','Espanhol','Português','Alemão','Chinês','Japonês','Árabe','Hindi'],
topics:['Um só lanche da madrugada para a vida toda','Um superpoder inútil que você ainda quer','Teclados mecânicos são aceitáveis no escritório?','Um fim de semana sem planos','Uma combinação estranha de que só você gosta','Como acabar com as segundas-feiras'],
characters:[
['Sol','Diversão primeiro','Otimista curioso e peculiar que transforma pequenas falas em ideias inesperadas. Leve e brincalhão, às vezes distraído o bastante para os amigos provocarem. Não concorda com tudo nem se impressiona com cada frase.'],
['Mo','Provocar também é carinho','Realista com humor seco e comentários curtos, discretamente engraçados. Questiona com carinho os saltos de lógica dos amigos. Não discorda de tudo e às vezes conta suas preferências estranhas.'],
['Ru','Conta um pouco mais','Colecionador entusiasmado de gostos, com detalhes próprios sobre filmes, comida, música e viagens. Lembra pequenas falas dos outros. Também conta histórias, sem só perguntar ou dar palestras.'],
['Nuri','Um comentário tranquilo','Amigo relaxado, como um urso, que compartilha experiências e pequenas piadas à vontade.'],
['Dan','Pensei numa comparação','Animado e atencioso. Gosta de analogias inesperadas e acompanha as histórias dos amigos.'],
['Bi','Observando em silêncio','Observador calmo que nota detalhes esquecidos e fala de forma breve e acolhedora.'],
]},
ar: {
languages:['الكورية','الإنجليزية','الفرنسية','الإسبانية','البرتغالية','الألمانية','الصينية','اليابانية','العربية','الهندية'],
topics:['وجبة ليلية واحدة لبقية الحياة','قوة خارقة بلا فائدة لكنك تريدها','هل لوحات المفاتيح الميكانيكية مناسبة للمكتب؟','عطلة نهاية أسبوع بلا خطة','مزيج غريب يعجبني وحدي','كيف نتخلص من أيام الاثنين'],
characters:[
['سول','المتعة أولًا','متفائل فضولي وغريب الأطوار يحول الملاحظات الصغيرة إلى أفكار غير متوقعة. يتحدث بخفة ومرح، وأحيانًا يخطئ فيداعبه الأصدقاء. لا يوافق على كل شيء ولا ينبهر بكل جملة.'],
['مو','المزاح أيضًا مودة','واقعي ذو حس فكاهي جاف وكلمات قصيرة مضحكة بهدوء. يناقش قفزات أصدقائه المنطقية بلطف ودفء. لا يعارض دائمًا ويشارك أحيانًا أذواقه الغريبة.'],
['رو','احكِ لي أكثر قليلًا','جامع شغوف للأذواق لديه تفاصيله الخاصة عن الأفلام والطعام والموسيقى والسفر. يتذكر ملاحظات الآخرين الصغيرة ويعود إليها. يحكي قصصه أيضًا، دون الاكتفاء بالأسئلة أو إلقاء المحاضرات.'],
['نوري','كلمة على مهل','صديق هادئ يشبه الدب يشارك تجاربه ونكاته الصغيرة براحة.'],
['دان','تذكرت تشبيهًا','حيوي ومراعٍ للآخرين. يحب التشبيهات غير المتوقعة ويتابع حكايات أصدقائه.'],
['بي','كنت أراقب بهدوء','مراقب هادئ يلاحظ التفاصيل المنسية ويتحدث بإيجاز ودفء.'],
]},
};

export function characterProfile(id,locale = 'ko') {
  const values = CONTENT[locale]?.characters[CHARACTER_IDS.indexOf(id)];
  if (!values) throw new Error(`Unknown character: ${locale}.${id}`);
  const [name,label,personality] = values;
  return { id,name,label,personality,avatar:{ type:'builtin',id },template:id,customFields:{} };
}
export function annotateTemplate(person) {
  if (CHARACTER_IDS.includes(person.template)) return person;
  for (const locale of LOCALES) for (const id of CHARACTER_IDS) {
    const profile = characterProfile(id,locale);
    if (['name','label','personality'].every(key => person[key] === profile[key])) return { ...person,template:id,customFields:{} };
  }
  return person;
}
export function localizeMember(person,locale) {
  const p = annotateTemplate(person);
  if (!p.template) return { ...p };
  const translated = characterProfile(p.template,locale);
  return { ...p,...Object.fromEntries(['name','label','personality'].map(key => [key,p.customFields?.[key] ? p[key] : translated[key]])) };
}
export const topicsFor = locale => CONTENT[locale].topics;
export const languageName = (locale,code) => CONTENT[locale].languages[LOCALES.indexOf(code)] || code;
