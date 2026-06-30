---
layout: ../../layouts/BlogPostLayout.astro
date: "2026-06-30"
title: 부산 공공 API에 대하여
---

안녕하세요 오늘은 부산 공공 API에 대해서 글을 써볼려고 합니다.

## 공공 API 간단소개

공공 데이터 OPEN API는 정부나 공공 기관에서 제공하는 데이터를 개발자가 사용할 수 있게 HTTP API 형태로 공개한 것입니다.

교통정보, 지역별 기상 정보 등 여러 공공데이터가 API로 제공되고 있습니다.

## 사용법

사용법은 HTTP API에 익숙하다면 굉장히 간단합니다.

1. [공공 데이터 센터](https://www.data.go.kr/index.do) 회원가입 후, API 활용 신청
2. API 문서를 보고 인증키와 함께 API 요청

상용 서비스의 API 처럼 공공 데이터 센터에 가입한 다음, API를 사용할 권한을 확인하기 위한 인증키를 받습니다.

그런 다음 API 문서를 참고하여 인증키와 함께 각자 환경(Postman, curl, 각 언어별 HTTP 라이브러리 등등)에 맞는 방식으로
API 주소에 HTTP 요청을 보내는 방식으로 사용하실 수 있습니다.

## 부산 지역 API 소개

공공 API 중에서 부산지역 데이터를 제공하는 API를 몇가지 소개 해드릴려고 합니다.

### AVI 교통량

- [AVI 교통량](https://www.data.go.kr/data/15121018/openapi.do#/API%20%EB%AA%A9%EB%A1%9D/AVIList)

부산 지역 곳곳에 설치된 AVI(자동차량인식장치)를 통해 인식된 교통량 데이터를 실시간으로 활용할 수 있는 API입니다.

Swagger 명세도 함께 있어서 테스트 해보기도 좋았습니다.

### 실시간 강우량 & 대기질 정보 조회

- [실시간 강우량 정보](https://www.data.go.kr/data/15058365/openapi.do)
- [대기질 정보](https://www.data.go.kr/data/15057173/openapi.do)

사실 실시간 기상정보 API의 경우 기상청 API가 있지만 명세를 보니 다소 복잡해보였고 원치않는 데이터도 가져와야하는 것 같았습니다.

실시간 강우량과 대기질 조회 API의 경우 각각 강우량과 대기질에 관한 데이터만 제공하기 때문에 사용하기 수월한 것 같습니다.

제가 생각했을 때, API는 자주 바뀌는 데이터를 다루고, 데이터의 실시간성이 중요할 때 의미가 있다고 판단하여 날씨와 교통에 관련된 API를 소개 해 드렸습니다.

그 밖에 API는 [공공 데이터 포털](https://www.data.go.kr/tcs/dss/selectDataSetList.do?dType=API&keyword=%EB%B6%80%EC%82%B0&detailKeyword=&publicDataPk=&recmSe=&detailText=&relatedKeyword=&commaNotInData=&commaAndData=&commaOrData=&must_not=&tabId=&dataSetCoreTf=&coreDataNm=&sort=&relRadio=&orgFullName=&orgFilter=&org=&orgSearch=&currentPage=1&perPage=10&brm=&instt=&svcType=&kwrdArray=&extsn=&coreDataNmArray=&operator=AND&pblonsipScopeCode=PBDE07)에서 확인하실 수 있습니다.

## 아쉬운 점

다만, 여러 부산의 데이터를 API를 통해 활용할 수 있지만, 공공 API에 대해서는 몇 가지 아쉬운 점이 있었습니다.

### 컨벤션 문제

API를 사용할 때, 개발자가 원하는 경험은 API를 쉽게 호출하고, 응답된 결과를 쉽게 사용하는 것에 있습니다.

그렇게 하기 위해서는 납득할 수 있는 API 컨벤션 규칙을 만들고 지키면서 통일성을 주는 것도 중요하다고 생각합니다.

예로 [부산버스정보시스템 API](https://www.data.go.kr/data/15092750/openapi.do)에서는 응답 결과 필드를 살펴보면,

| 항목명(국문)      | 항목명(영문) | 항목크기 |
| ----------------- | ------------ | -------- |
| 결과코드          | resultCode   | 2        |
| 결과메시지        | resultMsg    | 50       |
| 한 페이지 결과 수 | numOfRows    | 4        |
| 페이지 번호       | pageNo       | 4        |
| 전체 결과 수      | totalCount   | 4        |
| 정류소 번호       | arsno        | 5        |
| 정류소 아이디     | bstopid      | 9        |
| 정류소 명         | bstopnm      | 50       |
| GPS X 좌표        | gpsx         | 28       |
| GPS Y 좌표        | gpsy         | 28       |
| 정류장 구분       | stoptype     | 4        |

결과코드는 `resultCode`는 2번째 단어부터 영문 대문자로 표기하는 `camelCase`인 반면에 정류장 구분은 `stoptype`으로 하는 일관되지 않은 모습을 보여주고 있습니다.

거기에다 버스 정류소 번호나 이름 등에서 영단어를 줄여 쓰고 있습니다. 정류소 명을 나타내는 `bstopnm` 은 아마 `busStopName`을 줄인 것 같네요.

반면에, 일반 기업인 Google의 [Youtube Search API](https://developers.google.com/youtube/v3/docs/search?hl=ko#properties) 명세를 살펴보면 응답 컨벤션이 줄이지 않은 영단어, camelCase로 항상 일관되게 적용되어 있습니다.

솔직히 말하면 영단어를 줄여쓰고, `camelCase`를 사용하지 않는 것은 상관없습니다. 다만, 그렇게 하기 위해서는 확실한 규칙을 통해 적어도 하나의 API에서는 일관성있게 보여주는 것이 좋을 거 같아요.

### JSON 응답 지원

올해는 2026년입니다. 제가 지금까지 경험했던 대부분의 상용 API는 대부분 XML을 지원하지 않고 JSON 형식을 응답 형태로 제공하고 있습니다.

그런 상황에서 XML**만** 단독으로 지원하는 것은 솔직히 아쉽습니다.

물론 XML을 그냥 파싱해서 사용해도 되지만, 보통 서비스에서는 API 여러개를 함께 사용하는 경우가 많기에 이왕이면 JSON으로 통일해서 개발하는 것이 더 좋습니다.

### 즉시 사용불가한 경우 존재

공공 데이터 포털에서 API를 신청하면 보통 즉시 활용 승인됩니다. 하지만 인증에 시간이 소요되는 지 바로 사용할 수 없는 경우가 종종 있네요. 즉시 사용가능하면 좋을 것 같습니다.

### Swagger 명세일 경우 openapi.json 있었으면

이건 정말 개인적인 바램? 이긴 합니다만, 가끔 문서가 Swagger로 구현된 경우가 있습니다. 이 때 `openapi.json` 같은 명세를 json으로 되어있는 파일을 제공하면 더 좋을 거 같습니다. [`openapi-ts` ](https://github.com/openapi-ts/openapi-typescript)같은 라이브러리를 사용해서 스키마에 맞게 타입을 정의하거나, AI를 활용해서 API 호출할 때 큰 도움이 되기 때문입니다.

일반 기업의 API 명세는 대부분 친절하고 사용하기 쉽게 되어있습니다. 컨벤션도 잘 통일 되어있고요. 그런 API를 사용하다가 공공 API를 사용하게 되면 위와 같은 이유로 당황하는 경우가 많은 것 같습니다.

# 마치며

이번 글을 적으면서 생각보다 부산에서 제공하는 공공 API가 많다고 생각들었고 Swagger 문서까지 제공한다는 것이 새로웠던 것 같네요. 아쉬운 점이 있었지만 시간이 지날 수록 더 발전할 거라 생각합니다.

아무튼 지금까지 읽어주셔서 감사하고 더 좋은 글로 찾아오겠습니다.

감사합니다.
