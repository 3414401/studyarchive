# StudyArchive — Y2K Cyber Web

HTML + CSS + JavaScript만으로 만든 개인 공부 블로그입니다. 서버, Node.js, 빌드 과정이 필요하지 않습니다.

## 실행

1. `index.html`을 더블클릭해 브라우저에서 열기
2. 상단에 `help`, `ls`, `cd python`, `cat numpy`, `search matrix`, `home` 등을 입력
3. 왼쪽 카테고리나 중앙 검색창을 클릭해도 동일한 글로 이동

## 글 추가하기

`js/data.js`의 `window.ARCHIVE` 배열에서 원하는 카테고리의 `posts` 배열에 새 글을 추가합니다.

```js
{
  slug: 'my-note',
  title: 'My Note',
  date: '2026-10-14',
  tags: ['study'],
  summary: '내 공부 정리',
  body: `<h2>제목</h2><p>본문 내용</p><img class="handwritten" src="images/notes/my-note.webp" alt="내 필기">`
}
```

`slug`는 같은 카테고리 내에서 중복되지 않아야 합니다. 본문은 HTML을 사용할 수 있습니다. 기본 제공 글은 **시연용 예시**이므로 실제 공부 내용을 반영하여 교체하세요.

## Flexcil 필기 이미지

1. Flexcil에서 필기만 내보내기(지원하는 버전/내보내기 옵션 확인)
2. 투명 배경 이미지로 변환하고 검은 배경에 보이는 색인지 확인
3. WebP 또는 PNG 파일을 `images/notes/`에 넣기
4. 본문에 `<img class="handwritten" src="images/notes/파일명.webp" alt="필기 설명">` 추가

배경 제거가 제대로 되었는지, 작은 수식이 읽히는지 꼭 확인하세요. 원본 필기는 별도로 백업하세요.

## GitHub Pages 배포

1. GitHub에 공개 저장소 생성
2. 이 폴더 안의 파일을 저장소 최상위에 업로드 (`index.html`이 최상위에 있어야 함)
3. Settings → Pages → Deploy from a branch → main / (root) → Save
4. 잠시 후 `https://사용자명.github.io/저장소명/`으로 접속

외부 서버가 없는 정적 웹사이트이며, 상대 경로를 사용해 프로젝트 Pages에서도 동작합니다. 모든 콘텐츠가 공개될 수 있으니 개인정보는 업로드하지 마세요.

## 주요 파일

- `index.html`: 사이트 골격
- `css/style.css`: 검정/파랑 Y2K 디자인, 반응형 레이아웃
- `js/data.js`: 과목, 공부 글, 본문 콘텐츠
- `js/app.js`: 터미널 명령어, 검색, 라우팅, 이진수 별 그래픽
- `images/notes/`: Flexcil 필기 이미지

## 참고

- `clear`: 터미널 기록 지우기
- `↑` / `↓`: 이전에 입력한 터미널 명령어 불러오기
- 별 그림은 Canvas로 렌더링되어 별도 이미지 파일을 요구하지 않습니다.
- Cascadia Code가 설치된 PC에서는 해당 폰트를 사용하며, 다른 기기에서는 시스템의 고정폭 글꼴을 사용합니다. 모든 기기에서 동일하게 보이게 하려면 적법한 라이선스의 웹폰트를 별도로 추가해야 합니다.
