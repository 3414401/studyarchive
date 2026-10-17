# StudyArchive — HTML + Markdown 편집 버전

이 사이트는 **GitHub Pages에서 바로 동작하는 정적 사이트**입니다. 서버, 빌드, 별도 설치가 필요 없습니다.

앞으로 필기 추가하는 방법
1. GitHub에서 notes/linear-algebra/ 폴더를 연다.
2. Add file → Create new file을 클릭한다.
3. 예를 들어 01-4 Vector Equations.html이라는 파일을 만들고 내용을 작성한다.
4. Commit changes를 누른다.
그러면 GitHub Actions가 실행되어 필기 목록을 자동 갱신하도록 설정된 거야. manifest.json을 직접 수정할 필요 없어.

a b c d e f
g h i j k l
m n o p q r


```
<div class="matrix">
  <table>
    <tr>
      <td>a</td><td>b</td><td>c</td>
      <td>d</td><td>e</td><td>f</td>
    </tr>
    <tr>
      <td>g</td><td>h</td><td>i</td>
      <td>j</td><td>k</td><td>l</td>
    </tr>
    <tr>
      <td>m</td><td>n</td><td>o</td>
      <td>p</td><td>q</td><td>r</td>
    </tr>
  </table>
</div>

```
## 가장 중요한 파일: `index.html`

`index.html`의 아래쪽에서 `id="archive-content"`를 검색하세요.

- **과목명 변경**: `<section class="archive-category" ... data-name="LINEAR ALGEBRA" ...>`의 `data-name` 수정
- **과목 한글명**: `data-subtitle="선형대수"` 수정
- **글 제목 변경**: `<article class="archive-post" ... data-title="Matrix Basics" ...>`의 `data-title` 수정
- **글 내용 변경**: 그 글 안의 `<template data-format="html"> ... </template>`를 직접 수정
- **Markdown 글 작성**: `<template data-format="markdown"> ... </template>` 안에 Markdown 작성
- **글 추가**: 같은 과목의 `<article class="archive-post">...</article>` 전체를 복사한 뒤 `data-slug`를 중복되지 않게 바꾸기
- **과목 추가**: `<section class="archive-category">...</section>` 전체를 복사한 뒤 `data-id`를 중복되지 않게 바꾸기

```
<p>이 문장은 기본적으로 흰색이야.</p>

<p>
  <span class="blue">파란색 강조</span>,
  <span class="yellow">노란색 강조</span>,
  <span class="pink">분홍색 강조</span>
</p>
```
### HTML 본문 예시

```html
<template data-format="html">
  <h2 style="font-size:30px;color:#58b4ff">선형대수 필기</h2>
  <p style="font-size:18px">내가 공부한 내용</p>
  <img src="images/notes/my-note.png" alt="내 필기" style="width:90%">
</template>
```

### Markdown 본문 예시

```html
<template data-format="markdown">
# 선형대수

## 행렬

**중요 개념**과 *보충 설명*.

- 핵심 1
- 핵심 2

![필기](images/notes/my-note.png)

<p style="font-size:22px;color:#58b4ff">HTML로 글자 크기와 색상도 변경 가능</p>
</template>
```

Markdown 지원: 제목 `#`, 굵게 `**`, 기울임 `*`, 취소선 `~~`, 인라인 코드, 코드 블록, 목록, 링크, 이미지, 인용문, 가로선. 복잡한 표/수식 전용 문법은 기본 지원하지 않습니다. HTML을 직접 써서 확장할 수 있습니다.

### 필기 이미지

`images/notes/` 폴더에 PNG/WebP/SVG를 업로드하고 HTML `<img>` 또는 Markdown `![설명](images/notes/파일명.png)`로 연결하세요.

### 둥근 모서리
```
index.html에서 원하는 글의 <template data-format="html"> 안에 다음처럼 작성하면 돼.
<div class="note-box">
  <h3>선형변환이란?</h3>
  <p>선형변환은 벡터의 덧셈과 스칼라곱을 보존한다.</p>
</div>
```
### 디자인 및 기능

- `css/style.css`: 전체 디자인
- `js/app.js`: 화면 렌더링, 검색, 터미널, 별 그래픽, Markdown 처리
- **`js/data.js`는 더 이상 필요하지 않습니다.** 과목과 노트는 모두 `index.html`에 있습니다.

### GitHub에 올리기

ZIP을 풀고 **안쪽 `StudyArchive-Final` 폴더의 내용물**을 저장소 루트에 반영하세요. 기존 저장소에 적용할 때는 `index.html`, `js/app.js`, `css/style.css`, `README.md`를 교체하고 `js/data.js`는 삭제하세요. 이미지 폴더는 유지하세요. GitHub Pages 설정은 `main` / `(root)`입니다.
