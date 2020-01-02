데이터 컨셉을 잡아놓은 문서.
이후 논리적 관계 모델링 및 정규화가 필요하다.

## User

* userId (PK): 고유값.
* passpharse: 비밀번호. 해시값이 저장됨.
* displayName: 표시되는 별명. 특수 문자 가능(=유니코드 지원해야 함).
* email: 이메일. 공지나 비밀번호 찾는 데 사용.
* age: 나이. 타 사용자에게 공개 설정 가능.
* gender: 젠더. 언더바(_)를 제외한 특수 문자 불가능. 타 사용자에게 공개 설정 가능. 입력 폼에 넣을지 선택 가능.
* state: 멤버의 현재 상태(승인 대기 중, 회원, 차단 등).

## Config
* configId (PK): 고유값.
* userId (FK): User 테이블 JOIN용.
* pendingDate: 차단 기한(초기값은 null이며 차단일 때만 쿼리하는 식으로).

## Thread

## Comment