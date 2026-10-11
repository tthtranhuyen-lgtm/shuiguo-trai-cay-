export interface GrammarPoint {
  id: string;
  title: string;
  pinyin: string;
  formula: string;
  explanation: string;
  usageTips: string[];
  examples: {
    zh: string;
    pinyin: string;
    vn: string;
  }[];
  exercises: {
    id: string;
    type: 'fill' | 'choice' | 'order';
    question: string;
    options?: string[];
    correctAnswer: string;
    explanation: string;
  }[];
}

export const GRAMMAR_LESSONS: GrammarPoint[] = [
  {
    id: 'grammar-1',
    title: '越来越……',
    pinyin: 'yuè lái yuè……',
    formula: 'Chủ ngữ + 越来越 + Tính từ / Động từ tâm lý',
    explanation: 'Dùng để biểu thị mức độ phát triển hoặc biến đổi ngày một tăng dần theo thời gian. Tương đương với "ngày càng...", "càng ngày càng..." trong tiếng Việt.',
    usageTips: [
      'Sau "越来越" KHÔNG được dùng thêm phó từ chỉ mức độ như 很, 非常, 特别.',
      'Ví dụ sai: ❌ 水果越来越很贵。 | Ví dụ đúng: ✅ 水果越来越贵。',
      'Có thể đi kèm động từ tâm lý như: 喜欢 (thích), 想 (nhớ/muốn).'
    ],
    examples: [
      {
        zh: '现在的水果越来越贵了。',
        pinyin: 'Xiànzài de shuǐguǒ yuè lái yuè guì le.',
        vn: 'Trái cây bây giờ càng ngày càng đắt rồi.'
      },
      {
        zh: '这种西瓜越来越甜。',
        pinyin: 'Zhè zhǒng xīguā yuè lái yuè tián.',
        vn: 'Loại dưa hấu này ngày càng ngọt.'
      },
      {
        zh: '我越来越喜欢吃榴莲了。',
        pinyin: 'Wǒ yuè lái yuè xǐhuan chī liúlián le.',
        vn: 'Tôi ngày càng thích ăn sầu riêng rồi.'
      }
    ],
    exercises: [
      {
        id: 'g1-1',
        type: 'fill',
        question: '夏天的天气越来越___了。',
        options: ['热', '很热', '非常热'],
        correctAnswer: '热',
        explanation: 'Sau "越来越" là tính từ trực tiếp, không kết hợp với phó từ mức độ như "很" hay "非常".'
      },
      {
        id: 'g1-2',
        type: 'choice',
        question: 'Câu nào sau đây đúng ngữ pháp tiếng Trung chuẩn?',
        options: [
          '这里的水果越来越新鲜。',
          '这里的水果越来越很新鲜。',
          '这里的水果很越来越新鲜。'
        ],
        correctAnswer: '这里的水果越来越新鲜。',
        explanation: 'Cấu trúc chuẩn: Chủ ngữ + 越来越 + Tính từ.'
      },
      {
        id: 'g1-3',
        type: 'order',
        question: 'Sắp xếp các từ thành câu đúng: 【芒果 / 越来越 / 好吃 / 了】',
        correctAnswer: '芒果越来越好吃了',
        explanation: 'Thứ tự đúng: Chủ ngữ (芒果) + 越来越 + Tính từ (好吃) + 了.'
      }
    ]
  },
  {
    id: 'grammar-2',
    title: '除了……（以外），还……',
    pinyin: 'chúle…… (yǐwài), hái……',
    formula: '除了 A（以外），（主语）还 + V / Adj + B',
    explanation: 'Mẫu câu biểu thị sự bổ sung ("Ngoài A ra, còn có B"). Lưu ý: "以外" có thể lược bỏ trong khẩu ngữ hằng ngày.',
    usageTips: [
      'Khi dùng với "还" hoặc "也", mang nghĩa bao hàm thêm (A và B đều có).',
      'Phân biệt với "除了……都……": biểu thị ngoại trừ (chỉ có A là không, còn lại đều có).'
    ],
    examples: [
      {
        zh: '除了苹果以外，我还买了香蕉。',
        pinyin: 'Chúle píngguǒ yǐwài, wǒ hái mǎi le xiāngjiāo.',
        vn: 'Ngoài táo ra, tôi còn mua cả chuối nữa.'
      },
      {
        zh: '除了火龙果，这家店还卖山竹。',
        pinyin: 'Chúle huǒlóngguǒ, zhè jiā diàn hái mài shānzhú.',
        vn: 'Ngoài thanh long ra, tiệm này còn bán măng cụt.'
      },
      {
        zh: '除了甜的水果，她还喜欢酸的。',
        pinyin: 'Chúle tián de shuǐguǒ, tā hái xǐhuan suān de.',
        vn: 'Ngoài trái cây ngọt, cô ấy còn thích cả loại quả chua.'
      }
    ],
    exercises: [
      {
        id: 'g2-1',
        type: 'fill',
        question: '除了西瓜___，我还买了两斤葡萄。',
        options: ['以外', '以前', '以后'],
        correctAnswer: '以外',
        explanation: 'Cấu trúc tương ứng là "除了……以外".'
      },
      {
        id: 'g2-2',
        type: 'choice',
        question: '"Ngoài hoa quả ra, anh ấy còn mua bánh mì" nói như thế nào?',
        options: [
          '除了水果以外，他还买了面包。',
          '除了水果以外，他都没买面包。',
          '除了面包以外，他只要水果。'
        ],
        correctAnswer: 'Ngoài hoa quả ra, anh ấy còn mua bánh mì.',
        explanation: 'Dùng cấu trúc "除了……还……" biểu thị bổ sung thêm cả hai đối tượng.'
      },
      {
        id: 'g2-3',
        type: 'order',
        question: 'Sắp xếp: 【还买了草莓 / 以外 / 除了橙子 / 我】',
        correctAnswer: '除了橙子以外我还买了草莓',
        explanation: 'Thứ tự đúng: 除了橙子以外 + 我 + 还买了草莓.'
      }
    ]
  },
  {
    id: 'grammar-3',
    title: '买到 / 买不到',
    pinyin: 'mǎi dào / mǎi bú dào',
    formula: 'Động từ + 到 (Bổ ngữ kết quả) / Động từ + 不到 (Bổ ngữ khả năng)',
    explanation: '"到" đi sau động từ biểu thị hành động đã đạt được mục đích hoặc kết quả. "买到" = mua được, thành công mua; "买不到" = không mua được, hết hàng hoặc không có nơi bán.',
    usageTips: [
      'Thể khẳng định hoàn thành: 买到了 (Đã mua được).',
      'Thể phủ định khả năng: 买不到 (Không thể mua được vì hết hàng/mùa vụ).',
      'Thể phủ định quá khứ: 没买到 (Đã không mua được).'
    ],
    examples: [
      {
        zh: '今天在水果店我买到了新鲜的榴莲。',
        pinyin: 'Jīntiān zài shuǐguǒdiàn wǒ mǎi dào le xīnxiān de liúlián.',
        vn: 'Hôm nay ở tiệm hoa quả tôi đã mua được sầu riêng tươi ngon.'
      },
      {
        zh: '现在这个季节买不到荔枝。',
        pinyin: 'Xiànzài zhège jìjié mǎi bú dào lìzhī.',
        vn: 'Mùa này bây giờ không mua được vải đâu.'
      },
      {
        zh: '你买到火龙果了吗？— 没买到，都卖完了。',
        pinyin: 'Nǐ mǎi dào huǒlóngguǒ le ma? — Méi mǎi dào, dōu mài wán le.',
        vn: 'Bạn đã mua được thanh long chưa? — Chưa mua được, bán hết rồi.'
      }
    ],
    exercises: [
      {
        id: 'g3-1',
        type: 'fill',
        question: '太棒了！我终于买___新鲜的芒果了！',
        options: ['到', '不到', '没'],
        correctAnswer: '到',
        explanation: 'Biểu thị đã mua thành công, đạt kết quả thì dùng "买到".'
      },
      {
        id: 'g3-2',
        type: 'choice',
        question: 'Hôm qua siêu thị đóng cửa nên tôi không mua được bưởi. Chọn câu đúng:',
        options: [
          '昨天超市关门，我没买到柚子。',
          '昨天超市关门，我不买到柚子。',
          '昨天超市关门，我买到柚子了。'
        ],
        correctAnswer: '昨天超市关门，我没买到柚子。',
        explanation: 'Phủ định sự việc trong quá khứ dùng "没 + Động từ + 到".'
      },
      {
        id: 'g3-3',
        type: 'fill',
        question: '冬天一般买___新鲜西瓜。',
        options: ['不到', '到了', '得到'],
        correctAnswer: '不到',
        explanation: 'Biểu thị điều kiện khách quan không thể mua được dùng "买不到".'
      }
    ]
  }
];

export interface DialogueLine {
  id: string;
  speaker: 'xiaoming' | 'boss';
  speakerNameZh: string;
  speakerNameVn: string;
  textZh: string;
  pinyin: string;
  textVn: string;
  grammarKeywords?: string[];
  vocabKeywords?: string[];
}

export const DIALOGUE_DATA: DialogueLine[] = [
  {
    id: 'd1',
    speaker: 'xiaoming',
    speakerNameZh: '小明',
    speakerNameVn: 'Tiểu Minh',
    textZh: '老板，请问今天的火龙果新鲜吗？怎么卖？',
    pinyin: 'Lǎobǎn, qǐngwèn jīntiān de huǒlóngguǒ xīnxiān ma? Zěnme mài?',
    textVn: 'Bác chủ quán ơi, cho cháu hỏi hôm nay thanh long có tươi không ạ? Bán như thế nào?',
    vocabKeywords: ['火龙果', '新鲜', '怎么卖'],
  },
  {
    id: 'd2',
    speaker: 'boss',
    speakerNameZh: '老板',
    speakerNameVn: 'Chủ quán',
    textZh: '非常新鲜！红心的，特别甜。一斤八块钱。',
    pinyin: 'Fēicháng xīnxiān! Hóngxīn de, tèbié tián. Yì jīn bā kuài qián.',
    textVn: 'Cực kỳ tươi luôn! Ruột đỏ đấy, đặc biệt ngọt. Tám đồng một cân (1 cân = 500g).',
    vocabKeywords: ['红心', '甜', '一斤'],
  },
  {
    id: 'd3',
    speaker: 'xiaoming',
    speakerNameZh: '小明',
    speakerNameVn: 'Tiểu Minh',
    textZh: '哇，现在的水果越来越贵了！除了火龙果以外，还有什么甜的水果吗？',
    pinyin: 'Wā, xiànzài de shuǐguǒ yuè lái yuè guì le! Chúle huǒlóngguǒ yǐwài, hái yǒu shénme tián de shuǐguǒ ma?',
    textVn: 'Oa, hoa quả dạo này ngày càng đắt rồi! Ngoài thanh long ra, còn có quả nào ngọt nữa không bác?',
    grammarKeywords: ['越来越', '除了', '以外', '还'],
    vocabKeywords: ['水果', '火龙果', '甜'],
  },
  {
    id: 'd4',
    speaker: 'boss',
    speakerNameZh: '老板',
    speakerNameVn: 'Chủ quán',
    textZh: '你尝尝这个山竹，酸酸甜甜的，水分很足，非常好吃。',
    pinyin: 'Nǐ chángchang zhège shānzhú, suānsuān tiántián de, shuǐfèn hěn zú, fēicháng hǎochī.',
    textVn: 'Cháu nếm thử quả măng cụt này xem, chua chua ngọt ngọt, nhiều nước lắm, cực kỳ ngon.',
    vocabKeywords: ['山竹', '尝尝', '酸酸甜甜'],
  },
  {
    id: 'd5',
    speaker: 'xiaoming',
    speakerNameZh: '小明',
    speakerNameVn: 'Tiểu Minh',
    textZh: '挺好的！给我来两斤火龙果，一斤山竹吧。',
    pinyin: 'Tǐng hǎo de! Gěi wǒ lái liǎng jīn huǒlóngguǒ, yì jīn shānzhú ba.',
    textVn: 'Ngon thật đấy ạ! Cho cháu lấy hai cân thanh long với một cân măng cụt nhé.',
    vocabKeywords: ['火龙果', '山竹', '两斤', '一斤'],
  },
  {
    id: 'd6',
    speaker: 'boss',
    speakerNameZh: '老板',
    speakerNameVn: 'Chủ quán',
    textZh: '好嘞！火龙果十六块，山竹十六块，一共三十二块钱。算你三十块吧！',
    pinyin: 'Hǎo lei! Huǒlóngguǒ shíliù kuài, shānzhú shíliù kuài, yígòng sānshí\'èr kuài qián. Suàn nǐ sānshí kuài ba!',
    textVn: 'Được rồi! Thanh long 16 tệ, măng cụt 16 tệ, tổng 32 tệ. Tính cháu chẵn 30 tệ nhé!',
    vocabKeywords: ['一共', '算你'],
  }
];

export const DIALOGUE_QUIZ = [
  {
    qZh: '小明在水果店主要想买什么水果？',
    qVn: 'Tiểu Minh ở tiệm trái cây chủ yếu muốn mua loại quả nào?',
    options: ['火龙果和山竹', '苹果和香蕉', '西瓜和草莓', '榴莲和芒果'],
    answer: '火龙果和山竹',
    explanation: 'Tiểu Minh hỏi mua thanh long (火龙果) và được bác chủ quán mời thử măng cụt (山竹).'
  },
  {
    qZh: '火龙果一斤多少钱？',
    qVn: 'Thanh long bán bao nhiêu tiền một cân (500g)?',
    options: ['八块钱', '十块钱', '六块钱', '十二块钱'],
    answer: '八块钱',
    explanation: 'Bác chủ quán nói: "一斤八块钱" (Tám đồng một cân).'
  },
  {
    qZh: '老板怎么形容山竹的味道？',
    qVn: 'Bác chủ quán miêu tả hương vị của măng cụt như thế nào?',
    options: ['酸酸甜甜的', '特别苦', '很辣', '完全不甜'],
    answer: '酸酸甜甜的',
    explanation: 'Bác chủ quán bảo: "酸酸甜甜的，水分很足" (Chua chua ngọt ngọt, nhiều nước).'
  },
  {
    qZh: '小明买了多少斤火龙果？',
    qVn: 'Tiểu Minh đã mua bao nhiêu cân thanh long?',
    options: ['两斤', '一斤', '三斤', '半斤'],
    answer: '两斤',
    explanation: 'Tiểu Minh nói: "给我来两斤火龙果" (Cho cháu lấy hai cân thanh long).'
  },
  {
    qZh: '老板最后收了小明多少钱？',
    qVn: 'Bác chủ quán cuối cùng thu của Tiểu Minh bao nhiêu tiền?',
    options: ['三十块', '三十二块', '二十四块', '二十块'],
    answer: '三十块',
    explanation: 'Tổng là 32 tệ, nhưng chủ quán bớt hữu nghị: "算你三十块吧!" (Tính cháu 30 đồng thôi).'
  }
];

export interface PhraseItem {
  id: string;
  role: 'seller' | 'buyer';
  category: string;
  zh: string;
  pinyin: string;
  vn: string;
  tips: string;
}

export const MARKET_PHRASES: PhraseItem[] = [
  // SELLER
  {
    id: 's1',
    role: 'seller',
    category: 'Chào khách',
    zh: '帅哥 / 美女，来看看，今天的水果刚到，特别新鲜！',
    pinyin: 'Shuàigē / Měinǚ, lái kànkan, jīntiān de shuǐguǒ gāng dào, tèbié xīnxiān!',
    vn: 'Anh đẹp trai / Người đẹp ơi ghé xem đi, hoa quả hôm nay mới về tươi lắm!',
    tips: 'Tiểu thương Trung Quốc thường gọi khách hàng trẻ tuổi là 帅哥 (Soái ca) hoặc 美女 (Mỹ nữ) rất thân mật.'
  },
  {
    id: 's2',
    role: 'seller',
    category: 'Giới thiệu chất lượng',
    zh: '不甜不要钱！你可以先尝后买。',
    pinyin: 'Bù tián bú yào qián! Nǐ kěyǐ xiān cháng hòu mǎi.',
    vn: 'Không ngọt không lấy tiền! Bạn có thể nếm thử trước rồi mua sau.',
    tips: 'Câu khẩu hiệu quen thuộc ở các chợ truyền thống: "先尝后买" (Thử trước mua sau).'
  },
  {
    id: 's3',
    role: 'seller',
    category: 'Báo giá',
    zh: '西瓜三块钱一斤，买一个送小刀。',
    pinyin: 'Xīguā sān kuài qián yì jīn, mǎi yí gè sòng xiǎodāo.',
    vn: 'Dưa hấu 3 đồng một cân, mua 1 quả tặng dao nhỏ gọt quả.',
    tips: 'Ở Trung Quốc tính theo "斤" (1 cân = 500g = 0.5kg), không phải kilogram (公斤).'
  },
  {
    id: 's4',
    role: 'seller',
    category: 'Cân đo & Tính tiền',
    zh: '一共三斤二两，算你三斤整！一共十八块。',
    pinyin: 'Yígòng sān jīn èr liǎng, suàn nǐ sān jīn zhěng! Yígòng shíbā kuài.',
    vn: 'Tổng cộng 3 cân 2 lạng, làm tròn tính bạn 3 cân chẵn! Tổng 18 đồng.',
    tips: '1 斤 = 10 两 (50g). Người bán hay bớt phần lẻ để giữ khách.'
  },

  // BUYER
  {
    id: 'b1',
    role: 'buyer',
    category: 'Hỏi giá',
    zh: '老板，这个芒果怎么卖？一斤多少钱？',
    pinyin: 'Lǎobǎn, zhè gè mángguǒ zěnme mài? Yì jīn duōshao qián?',
    vn: 'Bác chủ quán, xoài này bán sao ạ? Bao nhiêu tiền một cân?',
    tips: '"怎么卖" là cách hỏi giá tự nhiên và phổ biến nhất của người bản xứ.'
  },
  {
    id: 'b2',
    role: 'buyer',
    category: 'Thử chất lượng',
    zh: '甜不甜？我可以尝一个吗？',
    pinyin: 'Tián bu tián? Wǒ kěyǐ cháng yí gè ma?',
    vn: 'Có ngọt không ạ? Cháu có thể nếm thử một miếng không?',
    tips: 'Nên lịch sự hỏi trước khi nếm hoa quả cắt sẵn ở sạp.'
  },
  {
    id: 'b3',
    role: 'buyer',
    category: 'Mặc cả',
    zh: '太贵了，便宜一点儿吧！买多能打折吗？',
    pinyin: 'Tài guì le, piányi yìdiǎnr ba! Mǎi duō néng dǎzhé ma?',
    vn: 'Đắt quá, rẻ một chút đi ạ! Mua nhiều có giảm giá không bác?',
    tips: 'Câu cửa miệng khi đi chợ: "便宜一点儿吧" (Bớt chút đi).'
  },
  {
    id: 'b4',
    role: 'buyer',
    category: 'Thanh toán',
    zh: '可以微信或者支付宝扫码付款吗？',
    pinyin: 'Kěyǐ Wēixìn huòzhě Zhīfùbǎo sǎomǎ fùkuǎn ma?',
    vn: 'Có thể quét mã thanh toán bằng WeChat hoặc Alipay không ạ?',
    tips: 'Hầu như 100% sạp hoa quả ở Trung Quốc đều có mã QR WeChat / Alipay.'
  }
];

export interface TestQuestion {
  id: string;
  type: 'vocab' | 'grammar' | 'dialogue' | 'listening';
  questionZh: string;
  questionVn: string;
  options: string[];
  answer: string;
  explanation: string;
}

export const COMPREHENSIVE_TEST: TestQuestion[] = [
  {
    id: 't1',
    type: 'vocab',
    questionZh: '“榴莲”的中文拼音和意思是什么？',
    questionVn: 'Phiên âm pinyin và nghĩa của từ "榴莲" là gì?',
    options: ['liúlián - Quả sầu riêng', 'huǒlóngguǒ - Quả thanh long', 'shānzhú - Quả măng cụt', 'bōluó - Quả dứa'],
    answer: 'liúlián - Quả sầu riêng',
    explanation: '榴莲 (liúlián) nghĩa là quả sầu riêng, vỏ có gai, vị béo ngọt.'
  },
  {
    id: 't2',
    type: 'vocab',
    questionZh: '在中文里，香蕉的量词通常用哪一个？',
    questionVn: 'Trong tiếng Trung, lượng từ của chuối (1 quả chuối) thường dùng từ nào?',
    options: ['根 (gēn)', '张 (zhāng)', '件 (jiàn)', '把 (bǎ)'],
    answer: '根 (gēn)',
    explanation: 'Chuối dạng dài thon nên lượng từ cho 1 quả là "根" (一根香蕉).'
  },
  {
    id: 't3',
    type: 'grammar',
    questionZh: '“天气越来越冷了”中的“越来越”表示什么意思？',
    questionVn: 'Cụm "越来越" trong câu biểu thị ý nghĩa gì?',
    options: ['Mức độ tăng dần theo thời gian (ngày càng...)', 'Hành động xảy ra trong quá khứ', 'Chỉ sự phủ định tuyệt đối', 'Biểu thị sự lựa chọn giữa 2 vật'],
    answer: 'Mức độ tăng dần theo thời gian (ngày càng...)',
    explanation: '"越来越" biểu thị sự biến chuyển mức độ ngày càng sâu sắc hoặc lớn hơn.'
  },
  {
    id: 't4',
    type: 'grammar',
    questionZh: '句子：“除了苹果____，我还买了葡萄。” 横线上应该填什么？',
    questionVn: 'Điền từ thích hợp vào chỗ trống:',
    options: ['以外 (yǐwài)', '中间 (zhōngjiān)', '上面 (shàngmian)', '以后 (yǐhòu)'],
    answer: '以外 (yǐwài)',
    explanation: 'Cấu trúc hoàn chỉnh là "除了……（以外），还……" nghĩa là ngoài... ra còn...'
  },
  {
    id: 't5',
    type: 'grammar',
    questionZh: '如果某种水果卖完了，或者这个季节没有，我们应该说：',
    questionVn: 'Nếu một loại trái cây bán hết hoặc trái mùa không có, ta nói:',
    options: ['买不到 (mǎi bú dào)', '买到了 (mǎi dào le)', '不用买 (bú yòng mǎi)', '不想买 (bù xiǎng mǎi)'],
    answer: '买不到 (mǎi bú dào)',
    explanation: '"买不到" là bổ ngữ khả năng chỉ không thể mua được vì nguyên nhân khách quan.'
  },
  {
    id: 't6',
    type: 'dialogue',
    questionZh: '小明在水果店跟老板打招呼问价钱，最地道的说法是：',
    questionVn: 'Cách hỏi giá trái cây tự nhiên nhất khi đi chợ là gì?',
    options: ['老板，这个火龙果怎么卖？', '老板，这个火龙果卖几号？', '老板，这个火龙果要多少钟？', '老板，为什么卖火龙果？'],
    answer: '老板，这个火龙果怎么卖？',
    explanation: '"怎么卖" (Zěnme mài) là khẩu ngữ tự nhiên chuẩn bản xứ nhất khi hỏi giá hàng hóa.'
  },
  {
    id: 't7',
    type: 'vocab',
    questionZh: '哪种水果被称为“水果皇后”，果肉白如蒜瓣？',
    questionVn: 'Loại trái cây nào được gọi là "nữ hoàng trái cây", ruột trắng như tép tỏi?',
    options: ['山竹 (shānzhú)', '西瓜 (xīguā)', '芒果 (mángguǒ)', '牛油果 (niúyóuguǒ)'],
    answer: '山竹 (shānzhú)',
    explanation: '山竹 (Măng cụt) được ví là nữ hoàng trái cây, tính mát, đối lập với sầu riêng.'
  },
  {
    id: 't8',
    type: 'dialogue',
    questionZh: '在中国的菜市场，“一斤”等于多少克？',
    questionVn: 'Ở chợ Trung Quốc, "1 cân" (一斤) tương đương với bao nhiêu gram?',
    options: ['500克 (0.5 kg)', '1000克 (1 kg)', '250克', '2000克'],
    answer: '500克 (0.5 kg)',
    explanation: 'Ở Trung Quốc đại lục: 1 市斤 (gọi tắt là 斤) = 500 gram. Còn 1 kilogram gọi là 公斤 (gōngjīn).'
  },
  {
    id: 't9',
    type: 'vocab',
    questionZh: '“红心火龙果比白心火龙果更甜”是什么意思？',
    questionVn: 'Câu trên có nghĩa là gì?',
    options: [
      'Thanh long ruột đỏ ngọt hơn thanh long ruột trắng',
      'Thanh long ruột trắng đắt hơn thanh long ruột đỏ',
      'Cả hai loại thanh long đều không ngọt',
      'Thanh long vỏ đỏ ngon hơn thanh long vỏ vàng'
    ],
    answer: 'Thanh long ruột đỏ ngọt hơn thanh long ruột trắng',
    explanation: '红心 = ruột đỏ (tim đỏ), 白心 = ruột trắng.'
  },
  {
    id: 't10',
    type: 'dialogue',
    questionZh: '买水果想要老板便宜一点，可以说：',
    questionVn: 'Muốn người bán giảm giá một chút, bạn nói câu nào?',
    options: ['太贵了，便宜一点儿吧！', '太便宜了，多算一点吧！', '我不要水果了！', '老板你很好看！'],
    answer: '太贵了，便宜一点儿吧！',
    explanation: '"便宜一点儿吧" (piányi yìdiǎnr ba) nghĩa là bớt một chút đi.'
  }
];
