/* 이 파일만 편집하면 카테고리와 글을 추가할 수 있습니다.
   HTML 태그를 포함한 본문은 body 속성에 작성하세요.
   이미지는 images/notes/ 폴더에 넣고 <img src="images/notes/파일명.webp" alt="설명">으로 사용하세요. */
window.ARCHIVE = [
  {id:'linear-algebra', name:'LINEAR ALGEBRA', subtitle:'선형대수', posts:[
    {slug:'matrix',title:'Matrix Basics',date:'2026-10-14',tags:['matrix','행렬'],summary:'행렬과 선형변환의 기본 개념',body:`<h2>01 / 행렬이란?</h2><p>행렬은 숫자를 행과 열로 배열한 것이며, 선형변환을 표현하는 데 사용할 수 있어요.</p><div class="formula">A = [ a₁ &nbsp; a₂ &nbsp; ⋯ &nbsp; aₙ ]</div><h2>02 / 열벡터 관점</h2><p>Ax는 A의 열벡터를 x의 성분으로 선형결합한 결과입니다.</p><div class="note-placeholder">✎ FLEXCIL NOTE AREA<br><small>images/notes/에 내 필기를 넣어 보세요.</small></div>`},
    {slug:'inverse',title:'Inverse Matrix',date:'2026-10-14',tags:['inverse','역행렬'],summary:'가역행렬과 단위행렬',body:`<h2>01 / 정의</h2><p>정사각행렬 A에 대해 AB = BA = I를 만족하는 행렬 B가 존재하면, B를 A의 역행렬이라고 합니다.</p><div class="formula">AA⁻¹ = A⁻¹A = I</div><h2>02 / 직접 필기 삽입</h2><p>아래는 필기 이미지를 삽입할 자리입니다.</p><img class="handwritten" src="images/notes/example.svg" alt="필기 이미지 자리 예시"><p class="annotation">// 실제 Flexcil WebP 이미지로 교체하세요.</p>`}
  ]},
  {id:'data-structures',name:'DATA STRUCTURES',subtitle:'자료구조',posts:[
    {slug:'linked-list',title:'Linked List',date:'2026-10-14',tags:['linked list','연결리스트'],summary:'노드와 포인터로 구성하는 연결 구조',body:`<h2>01 / 연결 리스트</h2><p>각 노드가 데이터와 다음 노드에 대한 참조를 저장하는 자료구조입니다.</p><div class="formula">HEAD → [DATA | NEXT] → [DATA | NEXT] → NULL</div><h2>02 / 시간복잡도</h2><p>노드 위치를 이미 알고 있다면 연결 변경은 O(1)이지만, 그 노드를 탐색하는 데는 O(n)이 걸릴 수 있습니다.</p>`},
    {slug:'stack-queue',title:'Stack & Queue',date:'2026-10-14',tags:['stack','queue'],summary:'LIFO와 FIFO',body:`<h2>STACK / LIFO</h2><p>가장 마지막에 들어온 항목이 가장 먼저 나갑니다.</p><h2>QUEUE / FIFO</h2><p>가장 먼저 들어온 항목이 가장 먼저 나갑니다.</p>`}
  ]},
  {id:'discrete-math',name:'DISCRETE MATH',subtitle:'이산수학',posts:[
    {slug:'logic',title:'Propositional Logic',date:'2026-10-14',tags:['logic','명제'],summary:'명제와 논리 연산',body:`<h2>01 / 명제</h2><p>참 또는 거짓으로 판단할 수 있는 문장을 명제라고 합니다.</p><div class="formula">P → Q ≡ ¬P ∨ Q</div>`}
  ]},
  {id:'python',name:'PYTHON',subtitle:'파이썬',posts:[
    {slug:'classes',title:'Classes & self',date:'2026-10-14',tags:['python','class'],summary:'클래스, 인스턴스, self',body:`<h2>01 / 클래스</h2><p>클래스는 객체의 상태와 동작을 정의합니다.</p><pre><code>class Student:\n    def __init__(self, name):\n        self.name = name\n\ns = Student("Hello")\nprint(s.name)</code></pre>`},
    {slug:'numpy',title:'NumPy Indexing',date:'2026-10-14',tags:['numpy','array'],summary:'배열 인덱싱과 슬라이싱',body:`<h2>01 / 슬라이싱</h2><p>다음 코드는 모든 행에서 첫 번째 열만 가져옵니다.</p><pre><code>import numpy as np\na = np.array([[1,2],[3,4]])\nprint(a[:, 0])  # [1 3]</code></pre>`}
  ]},
  {id:'machine-learning',name:'MACHINE LEARNING',subtitle:'머신러닝',posts:[
    {slug:'knn',title:'K-Nearest Neighbors',date:'2026-10-14',tags:['knn','machine learning'],summary:'K-최근접 이웃 알고리즘',body:`<h2>01 / KNN</h2><p>새로운 샘플과 가까운 K개의 이웃을 참고하여 예측하는 알고리즘입니다.</p><pre><code>from sklearn.neighbors import KNeighborsClassifier\nmodel = KNeighborsClassifier(n_neighbors=5)\nmodel.fit(train_input, train_target)</code></pre>`}
  ]},
  {id:'open-source',name:'OPEN SOURCE',subtitle:'오픈소스',posts:[
    {slug:'git',title:'Git & GitHub',date:'2026-10-14',tags:['git','github'],summary:'Fork, Clone, Pull Request',body:`<h2>01 / Git</h2><p>Git은 분산 버전 관리 시스템입니다.</p><h2>02 / 자주 쓰는 명령어</h2><pre><code>git status\ngit add .\ngit commit -m "Add notes"\ngit push origin main</code></pre>`}
  ]},
  {id:'etc',name:'ETC',subtitle:'기타',posts:[
    {slug:'welcome',title:'About This Archive',date:'2026-10-14',tags:['welcome'],summary:'이 공간에 대하여',body:`<h2>WELCOME</h2><p>공부한 내용을 기록하고 다시 찾기 위한 개인 아카이브입니다. 이 페이지를 자유롭게 수정하세요.</p>`}
  ]}
];
