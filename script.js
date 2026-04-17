// 全局变量
let currentQuestion = 0;
const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
const totalQuestions = 20;

// 页面元素
const startPage = document.getElementById('startPage');
const quizPage = document.getElementById('quizPage');
const resultPage = document.getElementById('resultPage');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const progressBar = document.getElementById('progressBar');
const typeResult = document.getElementById('typeResult');
const typeTag = document.getElementById('typeTag');
const groupBadge = document.getElementById('groupBadge');
const groupAnalysis = document.getElementById('groupAnalysis');
const personalityAnalysis = document.getElementById('personalityAnalysis');
const careerList = document.getElementById('careerList');

// 初始化事件监听
function initEvents() {
  startBtn.addEventListener('click', startQuiz);
  restartBtn.addEventListener('click', restartQuiz);
}

// 开始测试
function startQuiz() {
  startPage.classList.add('hidden');
  quizPage.classList.remove('hidden');
  loadQuestion(0);
}

// 加载题目
function loadQuestion(index) {
  if (index >= totalQuestions) {
    showResult();
    return;
  }
  
  currentQuestion = index;
  const question = questions[index];
  questionText.textContent = question.text;
  optionsContainer.innerHTML = '';
  
  // 创建选项按钮
  question.options.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.textContent = option.text;
    btn.addEventListener('click', () => {
      // 累加分数
      Object.keys(option.value).forEach(key => {
        scores[key] += option.value[key];
      });
      // 加载下一题
      loadQuestion(currentQuestion + 1);
      // 更新进度条
      progressBar.style.width = `${((currentQuestion + 1) / totalQuestions) * 100}%`;
    });
    optionsContainer.appendChild(btn);
  });
}

// 显示结果
function showResult() {
  // 计算人格类型
  const type = [
    scores.E > scores.I? 'E' : 'I',
    scores.S > scores.N? 'S' : 'N',
    scores.T > scores.F? 'T' : 'F',
    scores.J > scores.P? 'J' : 'P'
  ].join('');
  
  // 获取结果数据
  const result = resultData[type];
  const group = result.group;
  const groupData = groupDataMap[group];
  
  // 更新结果页
  typeResult.textContent = type;
  typeTag.textContent = result.tag;
  typeTag.style.backgroundColor = result.color;
  groupBadge.textContent = group;
  groupBadge.style.backgroundColor = groupData.color;
  groupAnalysis.textContent = groupData.analysis;
  personalityAnalysis.textContent = result.analysis;
  
  // 生成职业列表
  careerList.innerHTML = '';
  result.careers.forEach(career => {
    const li = document.createElement('li');
    li.textContent = career;
    careerList.appendChild(li);
  });
  
  // 切换页面
  quizPage.classList.add('hidden');
  resultPage.classList.remove('hidden');
}

// 重新测试
function restartQuiz() {
  // 重置数据
  currentQuestion = 0;
  Object.keys(scores).forEach(key => scores[key] = 0);
  progressBar.style.width = '0%';
  
  // 切换页面
  resultPage.classList.add('hidden');
  startPage.classList.remove('hidden');
}

// 题库（20题）
const questions = [
  // 一、能量来源（E/I）
  {
    text: "1. 社交后你更倾向于：",
    options: [
      { text: "A. 感到精力充沛，想继续互动", value: { E: 3, I: 0 } },
      { text: "B. 略感疲惫，但能再聊会儿", value: { E: 2, I: 1 } },
      { text: "C. 希望独处片刻恢复精力", value: { E: 1, I: 2 } },
      { text: "D. 极度疲惫，必须立刻独处", value: { E: 0, I: 3 } }
    ]
  },
  {
    text: "2. 你更享受：",
    options: [
      { text: "A. 大型聚会中认识新朋友", value: { E: 3, I: 0 } },
      { text: "B. 小范围好友聚餐", value: { E: 2, I: 1 } },
      { text: "C. 一对一深度聊天", value: { E: 1, I: 2 } },
      { text: "D. 独自做喜欢的事", value: { E: 0, I: 3 } }
    ]
  },
  {
    text: "3. 面对公开演讲，你会：",
    options: [
      { text: "A. 享受展示机会", value: { E: 3, I: 0 } },
      { text: "B. 略紧张但能完成", value: { E: 2, I: 1 } },
      { text: "C. 尽量避免", value: { E: 1, I: 2 } },
      { text: "D. 极度抗拒", value: { E: 0, I: 3 } }
    ]
  },
  {
    text: "4. 长时间独处后，你会：",
    options: [
      { text: "A. 感到无聊，想社交", value: { E: 3, I: 0 } },
      { text: "B. 偶尔想找人聊天", value: { E: 2, I: 1 } },
      { text: "C. 觉得舒适，偶尔需要互动", value: { E: 1, I: 2 } },
      { text: "D. 享受独处，不想被打扰", value: { E: 0, I: 3 } }
    ]
  },
  {
    text: "5. 团队讨论时，你通常：",
    options: [
      { text: "A. 主动发言，主导话题", value: { E: 3, I: 0 } },
      { text: "B. 积极参与，偶尔提出观点", value: { E: 2, I: 1 } },
      { text: "C. 倾听为主，必要时发言", value: { E: 1, I: 2 } },
      { text: "D. 很少发言，默默思考", value: { E: 0, I: 3 } }
    ]
  },

  // 二、感知方式（S/N）
  {
    text: "6. 学习新技能时，你先关注：",
    options: [
      { text: "A. 具体步骤和操作细节", value: { S: 3, N: 0 } },
      { text: "B. 实用技巧和常见问题", value: { S: 2, N: 1 } },
      { text: "C. 整体框架和原理", value: { S: 1, N: 2 } },
      { text: "D. 创新用法和可能性", value: { S: 0, N: 3 } }
    ]
  },
  {
    text: "7. 描述一件事时，你更侧重：",
    options: [
      { text: "A. 时间、地点等具体细节", value: { S: 3, N: 0 } },
      { text: "B. 关键事实和结果", value: { S: 2, N: 1 } },
      { text: "C. 背后的意义和影响", value: { S: 1, N: 2 } },
      { text: "D. 未来的可能性", value: { S: 0, N: 3 } }
    ]
  },
  {
    text: "8. 你对“传统”的态度是：",
    options: [
      { text: "A. 严格遵循，认为有价值", value: { S: 3, N: 0 } },
      { text: "B. 保留有用部分，其他忽略", value: { S: 2, N: 1 } },
      { text: "C. 不排斥，但更愿尝试新方法", value: { S: 1, N: 2 } },
      { text: "D. 觉得束缚，倾向打破", value: { S: 0, N: 3 } }
    ]
  },
  {
    text: "9. 做计划时，你更在意：",
    options: [
      { text: "A. 详细步骤和截止时间", value: { S: 3, N: 0 } },
      { text: "B. 核心目标和大致流程", value: { S: 2, N: 1 } },
      { text: "C. 灵活调整的空间", value: { S: 1, N: 2 } },
      { text: "D. 长远方向，不拘泥细节", value: { S: 0, N: 3 } }
    ]
  },
  {
    text: "10. 你擅长解决：",
    options: [
      { text: "A. 有明确答案的具体问题", value: { S: 3, N: 0 } },
      { text: "B. 结合经验的实际问题", value: { S: 2, N: 1 } },
      { text: "C. 需要逻辑推理的复杂问题", value: { S: 1, N: 2 } },
      { text: "D. 开放性的抽象问题", value: { S: 0, N: 3 } }
    ]
  },

  // 三、判断标准（T/F）
  {
    text: "11. 做决定时，你更依赖：",
    options: [
      { text: "A. 逻辑和客观数据", value: { T: 3, F: 0 } },
      { text: "B. 逻辑为主，兼顾情感", value: { T: 2, F: 1 } },
      { text: "C. 情感和逻辑平衡", value: { T: 1, F: 2 } },
      { text: "D. 他人感受和关系", value: { T: 0, F: 3 } }
    ]
  },
  {
    text: "12. 面对他人错误，你会：",
    options: [
      { text: "A. 直接指出，不绕弯子", value: { T: 3, F: 0 } },
      { text: "B. 客观指出，语气温和", value: { T: 2, F: 1 } },
      { text: "C. 先肯定，再委婉指出", value: { T: 1, F: 2 } },
      { text: "D. 尽量不指出，怕伤和气", value: { T: 0, F: 3 } }
    ]
  },
  {
    text: "13. 你认为“公平”是：",
    options: [
      { text: "A. 所有人按同一规则办事", value: { T: 3, F: 0 } },
      { text: "B. 多数情况按规则，特殊情况微调", value: { T: 2, F: 1 } },
      { text: "C. 考虑个体差异，追求实质公平", value: { T: 1, F: 2 } },
      { text: "D. 让每个人都感到被照顾", value: { T: 0, F: 3 } }
    ]
  },
  {
    text: "14. 评价他人时，你更看重：",
    options: [
      { text: "A. 能力和结果", value: { T: 3, F: 0 } },
      { text: "B. 能力与态度并重", value: { T: 2, F: 1 } },
      { text: "C. 态度和合作性", value: { T: 1, F: 2 } },
      { text: "D. 同理心和亲和力", value: { T: 0, F: 3 } }
    ]
  },
  {
    text: "15. 解决冲突时，你优先：",
    options: [
      { text: "A