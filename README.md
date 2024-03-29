# 1STI Frontend Challenge

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/narcizo/1sti-challenge/blob/master/README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/narcizo/1sti-challenge/blob/master/README.pt-br.md)

This challenge was proposed on this [1STI Github repo](https://github.com/1STi/desafio-frontend/). The goal of this challenge is to build a simple frontend weather app. The weather data is obtained by consuming [Weather API](https://www.weatherapi.com/)'s api. 

The project can be visited at this URL: [https://1sti-challenge.vercel.app/](https://1sti-challenge.vercel.app/)

## Tech stack
* **Typescript**
* **React** (Next.js)
* **Axios**
* **Tailwind**
* **Ant Design**
* **Vercel** (for deployment)

## Topics covered
* **API consumption**
* **Componentization**
* **Responsiveness**
* **Unit/Component testing**
* **CI/CD** (through Vercel and Github)

## Expectation vs Reality
1STI provided some screenshots for the responsive layout they were looking for.
I tried to come as close as possible to the mais source, but since the API they suggested is deprecated, I had to improvise and use another API to fetch the weather data.
This new API doesn't have data like forecast or min/max weather for the day, hence the minor difference in the displayed data.

Here are the "expectation vs reality" screenshots side by side, 1STI's on the left and mine on the right.

<h3 style="text-align: center">Desktop view</h3>

| 1STI                   | Mine                   |
| ---------------------- | ---------------------- |
| ![](https://s3-us-west-1.amazonaws.com/1sti/desafio-desktop1.png) | ![](/imgs/desktop-view.png) |
| ![cat](https://s3-us-west-1.amazonaws.com/1sti/desafio-desktop2.png) | ![dog](/imgs/desktop-view2.png) |
| ![cat](https://s3-us-west-1.amazonaws.com/1sti/desafio-desktop2.png) | ![dog](/imgs/desktop-view3.png) |

<h3 style="text-align: center">Mobile View</h3>

| 1STI                   | Mine                   |
| ---------------------- | ---------------------- |
| ![](https://s3-us-west-1.amazonaws.com/1sti/desafio-mobile1.png) | ![](/imgs/mobile-view.png) |
| ![cat](https://s3-us-west-1.amazonaws.com/1sti/desafio-mobile2.png) | ![dog](/imgs/mobile-view2.png) |
| ![cat](https://s3-us-west-1.amazonaws.com/1sti/desafio-mobile2.png) | ![dog](/imgs/mobile-view3.png) |

## How to run locally
To run locally, download the project and use these commands on your terminal:

```bash
npm install
npm run dev
npm test
```
### Environment Variables - Important!
The API key for the weather app was omitted from this repo for security reasons. To run properly you must use your own API key from Wheater Api.

Create a `.env` in the root of the repo and fill these variables
```
NEXT_PUBLIC_WEATHER_API_BASE_URL=http://api.weatherapi.com/v1
NEXT_PUBLIC_WEATHER_API_KEY=<YOUR_API_KEY>
```

--- 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
