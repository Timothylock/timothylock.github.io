---
layout: post
title:  "Reverse Engineering Zhone 6768-W1-NA via HTTP"
date:   2019-04-20 18:39:10 -0400
categories: reverse-engineer
author: Timothy Lock
---

Automating Configuration & Status Checking of Zhone 6768-W1-NA via HTTP
======

Zhone 6768-W1-NA is a broadband gateway that has built-in wireless capabilities and can support VDSL2, ADSL2+, and 3G via USB. It comes with an administration page via the default gateway address of `192.168.1.1` which is where this guide will focus on. 

# Intro
## Background
The admin portal of the gateway can be found at `192.168.1.1` and many actions can be performed by this portal. It is possible to capture and replay these requests.

## Tools Used To Reverse Engineer
These tools were used to reverse-engineer the device. In the interest of being adaptable, these tools will be mentioned minimally in the rest of the guide. 
- [Postman](https://www.getpostman.com/) - Used to easily capture and make HTTP requests
- [Postman Interceptor](https://learning.getpostman.com/docs/postman/sending_api_requests/interceptor_extension/) - Used to intercept the requests. **NOTE: Only compatible with the Chrome version of Postman and _not_ the desktop app**

# Security
## Authentication<a name="authentication"></a>
The gateway uses [BASIC](https://en.wikipedia.org/wiki/Basic_access_authentication) authentication making it extremely easy to reproduce. Simply base64 encode the authentication and you are on your way. For example:

```python
header = "Basic " + b64encode(b"username:password")
```

replacing `username` with the gateway username and `password` with the gateway password. The default users and passwords you can find by consulting the manual for the modem. If at any point the authentication information is incorrect, a [401](https://httpstatuses.com/401) will be returned.

An example with the username being `foo` and the password being `bar`:
```
key: Authorization
value: Basic Zm9vOmJhcg==
```

*_The algorithm for finding the default users and passwords for the gateway is omitted for security reasons_

## Session Keys<a name="skey"></a>
Session keys are used by the gateway to accompany any HTTP requests and are not reusable. They can be obtained by fetching the session key from the respective endpoints. Since they are not reusable, they must be fetched per request. For my research, I have discovered that you have to fetch the 2.4Ghz session key when trying to perform operations to the 2.4G WiFi network and likewise, a 5Ghz session key for 5G WiFi network operations. The endpoints to fetch this information is as follows:

**2.4Ghz:**
```
http://192.168.1.1/wlswitchinterface1.wl
```

**5Ghz**
```
http://192.168.1.1/wlswitchinterface0.wl
```

Both of these endpoints require [the authentication header](#authentication). Due to the fact that the modem never intended to be used this way, it sends back an entire HTML page and we must manually extract the key from the page. In order to get this variable-length session key, we must perform some hacky code to extract the key from the page which starts after `var sessionKey = '`. In Python:

```python
start = data.index("var sessionKey = '") + 18
end = data.index("'", start)

session_key = data[start:end]
```

# Configuration
For some reason, every operation on this gateway uses a GET request rather than a POST ([it would make a lot more sense to be a POST](https://www.w3schools.com/tags/ref_httpmethods.asp)). Using data captured by Postman, we can [intercept/capture](https://learning.getpostman.com/docs/postman/sending_api_requests/capturing_http_requests/) the requests to the gateway and modify the payload before replaying it back to the gateway. This guide will however not focus on how to capture the requests, but rather on their format and how to construct new ones to send to the modem

**IMPORTANT: It is best to wait 10-15 seconds between operations as the gateway will return a 200 regardless of operation as long as the authentication is correct meaning if you send a command immediately after another, the second command may not run even though a 200 was returned**

## Headers
Here is a sample header to send:

```python
headers = {
    'upgrade-insecure-requests': "1",
    'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36",
    'accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    'referer': "http://192.168.1.1/password.html",
    'accept-encoding': "gzip, deflate",
    'accept-language': "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
    'authorization': "Basic " + authToken,
    }
```

with `authToken` being [the authentication header](#authentication).

## Changing WiFi Settings
### WiFi Basic Settings
```python
url = "http://192.168.1.1/wlcfg.wl?wlSsidIdx=0&wlEnableHspot=0&wlEnbl=1&wlHide=0&wlAPIsolation=1&wlSsid=" + wifi2GSSID + "&wlCountry=CA&wlRegRev=0&wlMaxAssoc=16&wlDisableWme=0&wlEnableWmf=1&wlEnbl_wl1v1=0&wlSsid_wl1v1=wl1_Guest1&wlHide_wl1v1=0&wlAPIsolation_wl1v1=0&wlDisableWme_wl1v1=0&wlEnableWmf_wl1v1=1&wlMaxAssoc_wl1v1=16&wlEnbl_wl1v2=0&wlSsid_wl1v2=wl1_Guest2&wlHide_wl1v2=0&wlAPIsolation_wl1v2=0&wlDisableWme_wl1v2=0&wlEnableWmf_wl1v2=1&wlMaxAssoc_wl1v2=16&wlEnbl_wl1v3=0&wlSsid_wl1v3=wl1_Guest3&wlHide_wl1v3=0&wlAPIsolation_wl1v3=0&wlDisableWme_wl1v3=0&wlEnableWmf_wl1v3=1&wlMaxAssoc_wl1v3=16&wlSyncNvram=1&sessionKey=" + session_key
```
To change the basic wifi settings, make a `GET` request to `http://192.168.1.1/wlcfg.wl` with the parameters outlined in the URL above. In the example above, we are only concerned with changing the SSID and turning on AP Isolation (hardcoded). You will notice that we must explicity specify each of the settings even though we aren't changing them. The session key is either the [2.4Ghz or 5Ghz session key](#skey) depending on the band you want to configure.

### WiFi Security
```python
url = "http://192.168.1.1/wlsecurity.wl?wlWscMode=disabled&wlWscIRMode=enabled&wlWscAPMode=1&wlAuthMode=psk2&wlAuth=0&wlMFP=0&wlWpaPsk=" + wifiPass + "&wlWpaGtkRekey=0&wlNetReauth=36000&wlWep=disabled&wlWpa=aes&wlKeyBit=0&wlPreauth=0&wlSsidIdx=0&wlSyncNvram=1&sessionKey=" + session_key
```
To change the basic wifi settings, make a `GET` request to `http://192.168.1.1/wlsecurity.wl` with the parameters outlined in the URL above. In the example above, we are only concerned with changing the wifi network password and security type (hardcoded to `psk2`). You will notice that we must explicity specify each of the settings even though we aren't changing them. The session key is either the [2.4Ghz or 5Ghz session key](#skey) depending on the band you want to configure.

### 2.4Ghz WiFi Advanced Settings
```python
url = "http://192.168.1.1/wlcfgadv.wl?wlChannel=0&wlNmode=auto&wlNReqd=0&wlBasicRate=default&wlFrgThrshld=2346&wlRtsThrshld=2347&wlDtmIntvl=1&wlBcnIntvl=100&wlGlobalMaxAssoc=32&wlFrameBurst=on&wlRifsAdvert=-1&wlObssCoex=0&wlRxChainPwrSaveEnable=1&wlRxChainPwrSaveQuietTime=10&wlRxChainPwrSavePps=10&wlBand=2&wlMCastRate=0&wlAfterBurnerEn=off&wlTxPwrPcnt=100&wlRegMode=0&wlNBwCap=1&wlNCtrlsb=0&wlNProtection=auto&wlNMcsidx=-1&wlWme=1&wlWmeNoAck=0&wlWmeApsd=1&wlMode=ap&wlEnableUre=0&wlStaRetryTime=10&bsdRole=0&bsdHelper=192.168.1.2&bsdHport=9877&bsdPrimary=192.168.1.1&bsdPport=9878&wlTafEnable=0&wlAtf=1&wlPspretendThreshold=0&wlPspretendRetryLimit=0&wlAcsFcsMode=0&wlAcsDfs=0&wlAcsCsScanTimer=900&wlAcsCiScanTimer=4&wlAcsCiScanTimeout=%5Bobject%20HTMLInputElement%5D&wlAcsScanEntryExpire=3600&wlAcsTxIdleCnt=0&wlAcsChanDwellTime=70&wlAcsChanFlopPeriod=70&wlIntferPeriod=1&wlIntferCnt=3&wlIntferTxfail=5&wlIntferTcptxfail=5&wlAcsDfsrImmediate=300%203&wlAcsDfsrDeferred=604800%205&wlAcsDfsrActivity=30%2010240&wlSyncNvram=1&sessionKey=" + session_key_24_ghz

```
To change the basic wifi advanced settings, make a `GET` request to `http://192.168.1.1/wlcfgadv.wl` with the parameters outlined in the URL above. In the example above, we are only concerned with changing the wifi band. You will notice that we must explicitly specify each of the settings even though we aren't changing them. The session key is the [2.4Ghz session key](#skey).

### 5Ghz WiFi Advanced Settings
```python
url = "http://192.168.1.1/wlcfgadv.wl?wlChannel=0&wlNmode=auto&wlNReqd=0&wlBasicRate=default&wlFrgThrshld=2346&wlRtsThrshld=2347&wlDtmIntvl=1&wlBcnIntvl=100&wlGlobalMaxAssoc=32&wlFrameBurst=on&wlRifsAdvert=-1&wlObssCoex=0&wlRxChainPwrSaveEnable=1&wlRxChainPwrSaveQuietTime=10&wlRxChainPwrSavePps=10&wlBand=1&wlMCastRate=0&wlAfterBurnerEn=off&wlTxPwrPcnt=100&wlRegMode=1&wlNBwCap=7&wlNProtection=auto&wlNMcsidx=-1&wlDfsPreIsm=-1&wlDfsPostIsm=-1&wlTpcDb=0&wlWme=1&wlWmeNoAck=0&wlWmeApsd=1&wlMode=ap&wlEnableUre=0&wlStaRetryTime=10&wlEnableBFR=0&wlEnableBFE=0&bsdRole=0&bsdHelper=192.168.1.2&bsdHport=9877&bsdPrimary=192.168.1.1&bsdPport=9878&wlTafEnable=0&wlAtf=1&wlPspretendThreshold=0&wlPspretendRetryLimit=0&wlAcsFcsMode=0&wlAcsDfs=0&wlAcsCsScanTimer=900&wlAcsCiScanTimer=4&wlAcsCiScanTimeout=%5Bobject%20HTMLInputElement%5D&wlAcsScanEntryExpire=3600&wlAcsTxIdleCnt=0&wlAcsChanDwellTime=70&wlAcsChanFlopPeriod=70&wlIntferPeriod=1&wlIntferCnt=3&wlIntferTxfail=5&wlIntferTcptxfail=5&wlAcsDfsrImmediate=300%203&wlAcsDfsrDeferred=604800%205&wlAcsDfsrActivity=30%2010240&wlSyncNvram=1&sessionKey=" + session_key_5Ghz


```
To change the basic wifi advanced settings, make a `GET` request to `http://192.168.1.1/wlcfgadv.wl` with the parameters outlined in the URL above. In the example above, we are only concerned with changing regulatory settings. You will notice that we must explicitly specify each of the settings even though we aren't changing them. The session key is the [5Ghz session key](#skey).

## Changing Usernames and Passwords
If you are a sysadmin or ISP, you probably don't want your users tinkering with these settings. Changing the usernames and passwords are as simple as making a `GET` request to the following URL:

```python
"http://192.168.1.1/password.cgi?inUserName=username&inPassword=" + new_password + "&inOrgPassword=" + current_password + "&sessionKey=" + session_key
```

The [session key](#skey) can be any 2.4Ghz or 5Ghz session key. 

# Obtaining Information From Gateway
A lot of the basic information of the gateway can be obtained by `GET`ing `http://192.168.1.1/info.html` and parsing the response. For example, you can obtain the device serial number by parsing the response:

```javascript
var start = response.search('{6768-W1}-{')
var end = start + 9
var serialNumber = response.substring(start, end)
```

# Bugs
- The modem interface eventually becomes unreachable remotely downstream but is still reachable from the clients when directly connected to the gateway's ethernet ports or WiFi network. Therefore while these methods guarantee the modem is up, a lack of response from downstream does not guarantee that it is down. 

# Conclusion
Hopefully, this document helps you in integrating configuration into your workflow. Happy hacking!
