// 全局变量
let current = 0;
let scores = { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 };

// 题库（20题完整）
const questions = [
  // E/I维度（5题）
  {
    text: "1. 社交后你会：",
    options: [
      { text: "感到精力充沛", value: {E:3} },
      { text: "略累但还能聊", value: {E:2,I:1} },
      { text: "想独处休息", value: {E:1,I:2} },
      { text: "极度疲惫", value: {I:3} }
    ]
  },
  {
    text: "2. 你喜欢：",
    options: [
      { text: "大型聚会", value: {E:3} },
      { text: "小范围聚餐", value: {E:2,I:1} },
      { text: "一对一聊天", value: {E:1,I:2} },
      { text: "独自活动", value: {I:3} }
    ]
  },
  {
    text: "3. 公开演讲时：",
    options: [
      { text: "很享受", value: {E:3} },
      { text: "有点紧张但能完成", value: {E:2,I:1} },
      { text: "尽量避免", value: {E:1,I:2} },
      { text: "非常抗拒", value: {I:3} }
    ]
  },
  {
    text: "4. 长时间独处后：",
    options: [
      { text: "想社交", value: {E:3} },
      { text: "偶尔想聊天", value: {E:2,I:1} },
      { text: "还好，偶尔需要互动", value: {E:1,I:2} },
      { text: "很舒服不想被打扰", value: {I:3} }
    ]
  },
  {
    text: "5. 团队讨论时：",
    options: [
      { text: "主动主导", value: {E:3} },
      { text: "积极参与", value: {E:2,I:1} },
      { text: "偶尔发言", value: {E:1,I:2} },
      { text: "很少说话", value: {I:3} }
    ]
  },

  // S/N维度（5题）
  {
    text: "6. 学习新技能先看：",
    options: [
      { text: "具体步骤", value: {S:3} },
      { text: "实用技巧", value: {S:2,N:1} },
      { text: "整体框架", value: {S:1,N:2} },
      { text: "创新可能", value: {N:3} }
    ]
  },
  {
    text: "7. 描述事情侧重：",
    options: [
      { text: "时间地点细节", value: {S:3} },
      { text: "关键事实", value: {S:2,N:1} },
      { text: "背后意义", value: {S:1,N:2} },
      { text: "未来可能", value: {N:3} }
    ]
  },
  {
    text: "8. 对传统的态度：",
    options: [
      { text: "严格遵循", value: {S:3} },
      { text: "保留有用部分", value: {S:2,N:1} },
      { text: "不排斥但尝试新方法", value: {S:1,N:2} },
      { text: "觉得束缚", value: {N:3} }
    ]
  },
  {
    text: "9. 做计划在意：",
    options: [
      { text: "详细步骤", value: {S:3} },
      { text: "大致流程", value: {S:2,N:1} },
      { text: "调整空间", value: {S:1,N:2} },
      { text: "长远方向", value: {N:3} }
    ]
  },
  {
    text: "10. 擅长解决：",
    options: [
      { text: "具体问题", value: {S:3} },
      { text: "实际问题", value: {S:2,N:1} },
      { text: "复杂问题", value: {S:1,N:2} },
      { text: "抽象问题", value: {N:3} }
    ]
  },

  // T/F维度（5题）
  {
    text: "11. 做决定依赖：",
    options: [
      { text: "逻辑数据", value: {T:3} },
      { text: "逻辑为主，兼顾情感", value: {T:2,F:1} },
      { text: "平衡情感和逻辑", value: {T:1,F:2} },
      { text: "他人感受", value: {F:3} }
    ]
  },
  {
    text: "12. 他人犯错时：",
    options: [
      { text: "直接指出", value: {T:3} },
      { text: "客观指出，语气温和", value: {T:2,F:1} },
      { text: "先肯定再委婉指出", value: {T:1,F:2} },
      { text: "尽量不指出", value: {F:3} }
    ]
  },
  {
    text: "13. 认为公平是：",
    options: [
      { text: "同一规则", value: {T:3} },
      { text: "多数按规则，特殊微调", value: {T:2,F:1} },
      { text: "考虑个体差异", value: {T:1,F:2} },
      { text: "让每个人舒服", value: {F:3} }
    ]
  },
  {
    text: "14. 评价他人看重：",
    options: [
      { text: "能力结果", value: {T:3} },
      { text: "能力与态度", value: {T:2,F:1} },
      { text: "态度和合作性", value: {T:1,F:2} },
      { text: "同理心", value: {F:3} }
    ]
  },
  {
    text: "15. 解决冲突优先：",
    options: [
      { text: "最优解", value: {T:3} },
      { text: "解决问题，减少不快", value: {T:2,F:1} },
      { text: "平衡双方感受", value: {T:1,F:2} },
      { text: "安抚情绪", value: {F:3} }
    ]
  },

  // J/P维度（5题）
  {
    text: "16. 喜欢的生活节奏：",
    options: [
      { text: "严格按计划", value: {J:3} },
      { text: "大致计划，灵活调整", value: {J:2,P:1} },
      { text: "少量计划，随情况变", value: {J:1,P:2} },
      { text: "顺其自然", value: {P:3} }
    ]
  },
  {
    text: "17. 面对截止日期：",
    options: [
      { text: "提前完成", value: {J:3} },
      { text: "按计划准时完成", value: {J:2,P:1} },
      { text: "临近时集中完成", value: {J:1,P:2} },
      { text: "拖延到最后", value: {P:3} }
    ]
  },
  {
    text: "18. 物品摆放：",
    options: [
      { text: "整齐有序", value: {J:3} },
      { text: "大致整齐", value: {J:2,P:1} },
      { text: "有点乱但能找到", value: {J:1,P:2} },
      { text: "随性摆放", value: {P:3} }
    ]
  },
  {
    text: "19. 突发变化时：",
    options: [
      { text: "烦躁，尽快恢复计划", value: {J:3} },
      { text: "略不适但能适应", value: {J:2,P:1} },
      { text: "无所谓，灵活调整", value: {J:1,P:2} },
      { text: "觉得新鲜", value: {P:3} }
    ]
  },
  {
    text: "20. 做事方式：",
    options: [
      { text: "一次做一件，做完再换", value: {J:3} },
      { text: "主要做一件，偶尔兼顾其他", value: {J:2,P:1} },
      { text: "同时处理几件，灵活切换", value: {J:1,P:2} },
      { text: "想到什么做什么", value: {P:3} }
    ]
  }
];

// 16种人格结果数据（完整）
const resultData = {
  // 分析家 (NT)
  "INTJ": { 
    group: "分析家", 
    analysis: "独立、有远见，擅长战略规划，重视逻辑和创新，喜欢独立解决复杂问题。", 
    careers: ["战略顾问", "科学家", "建筑师", "策划师"] 
  },
  "INTP": { 
    group: "分析家", 
    analysis: "好奇、逻辑缜密，喜欢探索原理，对抽象概念感兴趣，善于通过思考解决问题。", 
    careers: ["研究员", "程序员", "哲学家", "数学家"] 
  },
  "ENTJ": { 
    group: "分析家", 
    analysis: "果断、领导力强，善于组织和指挥，目标明确，能高效推动计划执行。", 
    careers: ["CEO", "指挥官", "部门主管", "项目经理"] 
  },
  "ENTP": { 
    group: "分析家", 
    analysis: "机智、创新，擅长辩论和挑战常规，喜欢探索新可能性，适应力强。", 
    careers: ["律师", "创业者", "营销策划", "发明家"] 
  },
  
  // 外交官 (NF)
  "INFJ": { 
    group: "外交官", 
    analysis: "富有洞察力，追求理想和意义，善于理解他人情感，致力于帮助他人成长。", 
    careers: ["心理咨询师", "导师", "作家", "公益组织负责人"] 
  },
  "INFP": { 
    group: "外交官", 
    analysis: "理想主义，重视价值观和内心和谐，富有创造力，对美和情感敏感。", 
    careers: ["作家", "艺术家", "社工", "设计师"] 
  },
  "ENFJ": { 
    group: "外交官", 
    analysis: "热情、有感染力，善于激励他人，重视人际关系和谐，天生的领导者。", 
    careers: ["教师", "演讲家", "人力资源总监", "心理咨询师"] 
  },
  "ENFP": { 
    group: "外交官", 
    analysis: "乐观、创造力强，喜欢社交和探索新事物，能快速适应环境，富有同理心。", 
    careers: ["活动策划", "设计师", "记者", "培训师"] 
  },
  
  // 守护者 (SJ)
  "ISTJ": { 
    group: "守护者", 
    analysis: "可靠、严谨，重视规则和传统，做事有条理，善于执行细节，值得信赖。", 
    careers: ["会计师", "管理员", "编辑", "图书管理员"] 
  },
  "ISFJ": { 
    group: "守护者", 
    analysis: "体贴、有责任心，关心他人需求，注重实际帮助，善于维护和谐氛围。", 
    careers: ["护士", "社工", "秘书", "幼教老师"] 
  },
  "ESTJ": { 
    group: "守护者", 
    analysis: "务实、组织能力强，重视秩序和效率，善于制定规则并确保执行，果断坚定。", 
    careers: ["项目经理", "行政主管", "军官", "财务总监"] 
  },
  "ESFJ": { 
    group: "守护者", 
    analysis: "友好、乐于助人，擅长协调人际关系，重视传统和集体利益，善于照顾他人。", 
    careers: ["公关", "客服经理", "社区工作者", "宴会策划"] 
  },
  
  // 探险家 (SP)
  "ISTP": { 
    group: "探险家", 
    analysis: "灵活、动手能力强，善于解决实际问题，注重效率，喜欢通过实践学习。", 
    careers: ["工程师", "技师", "消防员", "工匠"] 
  },
  "ISFP": { 
    group: "探险家", 
    analysis: "敏感、注重体验，喜欢艺术和自然，善于通过行动表达自己，灵活随性。", 
    careers: ["摄影师", "工匠", "厨师", "美容师"] 
  },
  "ESTP": { 
    group: "探险家", 
    analysis: "精力充沛、务实，适应力强，喜欢刺激和挑战，善于应对突发情况。", 
    careers: ["企业家", "销售", "警察", "运动员"] 
  },
  "ESFP": { 
    group: "探险家", 
    analysis: "活泼、擅长社交，享受当下和人际互动，能给周围带来活力，善于表演。", 
    careers: ["演员", "主持人", "导游", "娱乐行业从业者"] 
  }
};

// 开始测试
function startTest() {
  document.getElementById("start").classList.add("hidden");
  document.getElementById("test").classList.remove("hidden");
  loadQuestion(0);
}

// 加载题目
function loadQuestion(index