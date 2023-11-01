# 匯率轉換 API

這是一個簡單的貨幣轉換 API，可以依照內部設定好的匯率，將輸入的來源幣別轉換為目標幣別。

## 需求

- 已安裝 Node.js
- 已安裝 npm

## git clone

```bash
git clone https://github.com/ron208888/ExchangeRateAPI.git
cd ExchangeRateAPI
```

## 使用方式

向"/convert"發送 GET 請求，並帶入以下參數:

- souce : 欲轉換的來源幣別。
- target : 轉換目標幣別。
- amount : 要轉換的來源幣別金額。

轉換金額將四捨五入到小數點第二位，且轉換後的金額顯示格式以逗點分隔做為千分位表示，例如 : 123,456.78

匯率設定值 :

```json
currencies: {
    TWD: {
      TWD: 1,
      JPY: 3.669,
      USD: 0.03281,
    },
    JPY: {
      TWD: 0.26956,
      JPY: 1,
      USD: 0.00885,
    },
    USD: {
      TWD: 30.444,
      JPY: 111.801,
      USD: 1,
    },
  }
```

請求範例:

```bash
GET /convert?source=USD&target=JPY&amount=$1,525
```

回應範例:

```json
{
  "msg": "success",
  "amount": "¥170,496.52"
}
```

由於程式會抓取 target 幣別作為 toLocaleString()的參數，輸出結果將依照 target 幣別顯示 :

```
TWD: TWD
JPY: ¥
USD: $
```

錯誤回應

如果參數無效，例如來源、目標幣別不在匯率設定值中，或是沒有帶轉換金額，則會返回 400 狀態碼及錯誤消息。

錯誤消息範例 :

```json
{
  "msg": "Invalid input"
}
```

## 測試

可執行 :

```bash
npm test
```

可測試

1.轉換成功時回應正確的訊息格式

2.轉換失敗時回應正確的錯誤訊息格式
