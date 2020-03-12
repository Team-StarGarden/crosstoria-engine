데이터 컨셉을 잡아놓은 문서.
이후 논리적 관계 모델링 및 정규화가 필요하다.

## User

-   email!: string, 임시 비밀번호를 받을 수 있는 메일이자 로그인시 사용. 사용자가 직접 설정한다.
-   userID (PK) !: string, 고유해시. 유저들끼리 구분합니다.
-   passpharse?: string || null, 비밀번호. 해시값이 저장됨.
-   userName!: string, 표시되는 사용자 이름. 특수 문자, 이모지 가능(=유니코드 지원해야 함).
-   age!: number(200 이하의 자연수), 나이. 타 사용자에게 공개 설정 가능.
-   openage!: boolean(false), 나이 공개 여부
-   gender?: string || null, 젠더. 언더바(\_)를 제외한 특수 문자 불가능. 타 사용자에게 공개 설정 가능. 입력 폼에 넣을지 선택 가능.
-   openGender!: boolean, 젠더 공개 여부
-   charactersCount!: number(0 이상의 정수), 해당 유저의 캐릭터 소유 갯수. 관리자가 지정한 갯수 이상 신규로 추가할 수는 없다.
-   userState!: string, 멤버의 현재 상태(승인 대기 중, 회원, 차단, 숨김 등).
-   pendingDate?: Date || null, 차단 기한(초기값은 null이며 차단일 때만 쿼리하는 식으로).

## Character

-   charID (PK) !: string, 고유값. 사용자가 설정할 수 없는 해시값이다.
-   userID (FK) !: string 캐릭터의 주인.
-   charName!: string, 표시되는 캐릭터명. 특수 문자, 이모지 가능(=유니코드 지원해야 함).
-   portraitPath!: string, 파일 시스템에 저장되어 있는 프사의 경로. 이 경로로 이미지를 retrieve해 온다.
-   charState!: string, 캐릭터의 현재 상태(생존, 사망, 숨김 등). 관리자가 임의의 캐릭터를 숨김 처리할 수 있는가?

## Profile

-   charID (FK) !: string, 캐릭터 테이블 JOIN용.
-   charProfileItem (PK) !: string, 프로필 항목 고유값(해시).
-   charProfileTopic!: string, 프로필 항목의 제목.
-   superItem!: string || null, 소항목이 갖는 상위 항목의 charProfileItem 값.
-   charProfileSwitch!: string, 항목의 공개 여부.
-   charProfileContents!: string, 항목의 내용. 이곳 외에도 스레드 본문 등에 이모지, 커스텀 이모티콘 지원이 향후 추가되면 좋겠다.

## ProfileConfig

-   configID (PK)!: string, 설정 고유값(해시).
-   charProfileItem (FK) !: string, 해당 설정이 적용된 프로필 항목.
-   charProfileWhitelist?: string || null, 해당 항목을 공개 설정해놓은 charID. 향후 다른 설정이 추가될 때 nullable합니다.

## ProfileRelation

-   relationID (PK)!: string, 설정 고유값(해시).
-   charProfileItem (FK) !: string, 해당 관계에 대응하는 프로필 항목.
-   charProfileTarget (FK): string || null, 관계 항목의 대상 캐릭터의 charID.

## Thread

## Comment
