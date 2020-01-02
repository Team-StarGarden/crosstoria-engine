데이터 컨셉을 잡아놓은 문서.
이후 논리적 관계 모델링 및 정규화가 필요하다.

## User

* userID (PK): 고유값. 사용자가 직접 설정한다.
* passpharse: 비밀번호. 해시값이 저장됨.
* userName: 표시되는 사용자 이름. 특수 문자, 이모지 가능(=유니코드 지원해야 함).
* email: 이메일. 공지나 비밀번호 찾는 데 사용.
* age: 나이. 타 사용자에게 공개 설정 가능.
* gender: 젠더. 언더바(_)를 제외한 특수 문자 불가능. 타 사용자에게 공개 설정 가능. 입력 폼에 넣을지 선택 가능.
* userState: 멤버의 현재 상태(승인 대기 중, 회원, 차단 등).
* pendingDate: 차단 기한(초기값은 null이며 차단일 때만 쿼리하는 식으로).

## Character

* charID (PK): 고유값. 사용자가 설정할 수 없는 해시값이다.
* userID (FK): 캐릭터의 주인.
* charName: 표시되는 캐릭터명. 특수 문자, 이모지 가능(=유니코드 지원해야 함).
* portraitPath: 파일 시스템에 저장되어 있는 프사의 경로. 이 경로로 이미지를 retrieve해 온다.
* charState: 캐릭터의 현재 상태(생존, 사망, 숨김 등). 관리자가 임의의 캐릭터를 숨김 처리할 수 있는가?

## Profile

* charID (FK): 캐릭터 테이블 JOIN용.
* charProfileItem (FK): 프로필 항목.
* superItem: 소항목이 갖는 상위 항목.
* charProfileSwitch: 항목의 공개 여부.
* charProfileContents: 항목의 내용.

## ProfileConfig

* charProfileItem (FK): 해당 항목 설정을 갖고 있는 프로필.
* charProfileWhitelist: 항목 공개 대상 캐릭터의 charID.

## ProfileRelation

* charProfileItem (FK): 해당 항목 관계를 갖고 있는 프로필.
* charProfileTarget: 관계 항목의 대상 캐릭터의 charID.

## Thread

## Comment