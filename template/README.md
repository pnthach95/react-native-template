# ProjectName

## Android

```sh
yarn android
```

## iOS

Cài pod bằng 1 trong 2 cách:

```sh
npx pod-install@latest
```

```sh
bundle install;cd ios;bundle exec pod install;cd ..
```

Chạy app bằng lệnh `yarn ios` hoặc file xcworkspace trong thư mục `ios`.

## Theme

Để chỉnh sửa theme cho app, xem document của HeroUI [về theme](https://v3.heroui.com/docs/native/getting-started/theming) và [về màu](https://v3.heroui.com/docs/native/getting-started/colors) để biết tên biến màu và đổi trong file [global.css](src/global.css).

## Component

Project sử dụng bộ HeroUI làm giao diện: https://v3.heroui.com/docs/native/components

Nếu thiếu hoặc không có component nào phù hợp, tham khảo thêm từ React Native Reusables. Cài đặt bằng cách copy code theo chế độ Manual + Uniwind và sửa code lại cho phù hợp: https://reactnativereusables.com/docs/components/skeleton

Tạo thêm các component sử dụng được `className` bằng `withUniwind` trong file [src/components/uniwind/index.tsx](src/components/uniwind/index.tsx).

## Cấu trúc thư mục:

```sh
src/
├─ api/                       # - Thư mục chứa cấu hình về API
│  ├─ index.ts                #  • Cấu hình API chính bằng apisauce.
│  └─ links.ts (*)            #  • Trong trường hợp `LINKS` nhiều quá thì tách ra file riêng
├─ assets/                    # - Thư mục chứa file asset (ảnh, json…) bỏ vào từng thư mục riêng cho từng loại (img, json)
│  ├─ img
│  └─ svg
├─ components/                # - Thư mục chứa component dùng chung cho các màn hình
│  └─ <tên component>
│     └─ index.tsx
├─ locales/                   # - Thư mục chứa file ngôn ngữ
│  ├─ <tên ngôn ngữ>.json
│  └─ index.ts
├─ routes/                    # - Thư mục chứa cấu hình navigation
│  ├─ index.tsx               #  • File cấu hình các provider, file index.js ở thư mục gốc trỏ vào file này
│  ├─ routes.tsx              #  • File cấu hình route @react-navigation/stack
│  └─ tabs.tsx                #  • File cấu hình @react-navigation/bottom-tabs
├─ screens/                   # - Thư mục chứa các màn hình
│  └─ <tên màn hình>
│     ├─ <các file khác chỉ sử dụng riêng cho màn hình này>.tsx
│     └─ index.tsx
├─ stores/                    # - Thư mục cấu hình store, state
│  ├─ index.ts                #  • File cấu hình state management
│  └─ localstorage.ts         #  • File cấu hình MMKV
├─ typings/                   # - Thư mục chứa cấu hình typescript
│  ├─ declaration.d.ts        #  • File dùng để declare các file cho parser đọc được
│  ├─ i18next.d.ts            #  • File dùng cho i18next
│  ├─ index.ts                #  • File định nghĩa type cho app
│  ├─ navigation.d.ts         #  • File định nghĩa navigation
│  └─ uniwind-types.d.ts      #  • File do Uniwind tạo ra, không được chỉnh sửa file này
├─ utils/                     # - Thư mục chứa các loại file ts cho chức năng khác
│ ├─ index.ts                 #  • File chứa định nghĩa hằng, function phụ trợ
│ └─ styles.ts                #  • File chứa style dùng chung cho app, chỉ sử dụng nếu không dùng được className
└─ global.css                 # - File CSS cho Uniwind và HeroUI. Đọc thêm: https://docs.uniwind.dev/theming/global-css, https://v3.heroui.com/docs/native/getting-started/theming
```

## Quy định về code

Mọi định danh (tên biến, hằng, phương thức, lớp, đối tượng v.v.) nên bằng tiếng anh, đúng chính tả, và có nghĩa.

| Khai báo            | Quy định                                                                                                                          | Ví dụ                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Tên component       | Tên component sẽ theo dạng PascalCase, viết hoa chữ đầu tiên của mỗi từ. Tên màn hình luôn có chữ Screen ở cuối.                  | `function Raster;`<br/>`const ImageSprite;`<br/>`const EditorScreen;` |
| Tên phương thức/hàm | Tên hàm/phương thức sẽ theo chuẩn camelCase, từ đầu tiên viết thường, các từ tiếp sau viết hoa chữ cái đầu.                       | `run();`<br/>`runFast();`<br/>`getBackground();`                      |
| Tên biến            | Tương tự như tên hàm.                                                                                                             | `let i;`<br/>`const currentUserLog;`                                  |
| Tên hằng            | Viết hoa tất cả kí tự, các từ cách nhau bằng dấu "\_"                                                                             | `const MAX_PARTICIPANTS = 10;`                                        |
| Tên prop            | Tương tự như tên hàm. Hoặc PascalCase nếu prop là component.                                                                      | `<Foo userName="hello" phoneNumber={12345678} />`                     |
| Tên type            | Tên global type luôn có tiền tố T cho type hoặc I cho interface, local type thì không cần.                                        | `type TUserData;`<br/>`interface IOrderData;`                         |
| Tên file, folder    | Tên file, folder theo chuẩn viết liền chữ thường. Tên file chính trong folder đặt là `index.ts` hoặc `index.tsx` nếu là component |                                                                       |

## Ghi chú khác

- Đổi icon app cho iOS trong file AppDev.icon và AppProd.icon bằng [Icon Composer của Xcode 26+](https://developer.apple.com/documentation/Xcode/creating-your-app-icon-using-icon-composer)

- Nếu sử dụng `...ClassName` mà không có gợi ý, thêm nó vào `tailwindCSS.classAttributes` trong file `.vscode/settings.json` và `tailwindAttributes` trong file `.prettierrc`.

- Nếu build iOS + Firebase lỗi, đọc workaround, paste fix vào Podfile: https://github.com/invertase/react-native-firebase/issues/8883#issuecomment-3991498731

- Sau khi upgrade node, xóa file `ios/.xcode.env.local` và chạy lại pod để tránh lỗi build
