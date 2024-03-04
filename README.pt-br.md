# Desafio Frontend 1STI

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/narcizo/1sti-challenge/blob/master/README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/narcizo/1sti-challenge/blob/master/README.pt-br.md)

Este desafio foi proposto neste [repositório Github da 1STI](https://github.com/1STi/desafio-frontend/). O objetivo deste desafio é construir um simples aplicativo de clima para o frontend. Os dados do clima são obtidos consumindo a API do [Weather API](https://www.weatherapi.com/).

O projeto pode ser visitado neste URL: [https://1sti-challenge.vercel.app/](https://1sti-challenge.vercel.app/)

## Tecnologias utilizadas
* **Typescript**
* **React** (Next.js)
* **Axios**
* **Tailwind**
* **Ant Design**
* **Vercel** (para implantação)

## Tópicos abordados
* **Consumo de API**
* **Componentização**
* **Responsividade**
* **Testes de unidade/componente**
* **CI/CD** (através do Vercel e Github)

## Expectativa vs Realidade
A 1STI forneceu algumas capturas de tela para o layout responsivo que eles estavam procurando.
Tentei chegar o mais próximo possível da fonte principal, mas como a API que eles sugeriram está depreciada, tive que improvisar e usar outra API para buscar os dados do clima.
Esta nova API não tem dados como previsão ou temperatura mínima/máxima para o dia, daí a pequena diferença nos dados exibidos.

Aqui estão as capturas de tela de "expectativa vs realidade" lado a lado, a da 1STI à esquerda e a minha à direita.

<h3 style="text-align: center">Visualização Desktop</h3>

| 1STI                   | Minha                   |
| ---------------------- | ---------------------- |
| ![](https://s3-us-west-1.amazonaws.com/1sti/desafio-desktop1.png) | ![](/imgs/desktop-view.png) |
| ![cat](https://s3-us-west-1.amazonaws.com/1sti/desafio-desktop2.png) | ![dog](/imgs/desktop-view2.png) |
| ![cat](https://s3-us-west-1.amazonaws.com/1sti/desafio-desktop2.png) | ![dog](/imgs/desktop-view3.png) |

<h3 style="text-align: center">Visualização Mobile</h3>

| 1STI                   | Minha                   |
| ---------------------- | ---------------------- |
| ![](https://s3-us-west-1.amazonaws.com/1sti/desafio-mobile1.png) | ![](/imgs/mobile-view.png) |
| ![cat](https://s3-us-west-1.amazonaws.com/1sti/desafio-mobile2.png) | ![dog](/imgs/mobile-view2.png) |
| ![cat](https://s3-us-west-1.amazonaws.com/1sti/desafio-mobile2.png) | ![dog](/imgs/mobile-view3.png) |

## Como executar localmente
Para executar localmente, baixe o projeto e use estes comandos no seu terminal:

```bash
npm install
npm run dev
npm test
```

## Variáveis de Ambiente - Importante!
A chave API para o aplicativo de clima foi omitida deste repositório por razões de segurança. Para funcionar corretamente, você deve usar sua própria chave API do Weather API.

Crie um arquivo `.env` na raiz do repositório e preencha estas variáveis

---
```
NEXT_PUBLIC_WEATHER_API_BASE_URL=http://api.weatherapi.com/v1
NEXT_PUBLIC_WEATHER_API_KEY=<SUA_CHAVE_API>
```

Este é um projeto [Next.js](https://nextjs.org/) iniciado com [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).