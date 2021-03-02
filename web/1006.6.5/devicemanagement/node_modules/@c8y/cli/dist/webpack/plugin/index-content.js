"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:max-line-length
exports.default = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style type="text/css">
      [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {display: none !important;}
      body {
        background: #F2F3F2;
      }

      .init-load{
        max-width: 320px;
        height: 100vh;
        margin: 0 auto;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
            -ms-flex-direction: column;
                flex-direction: column;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
      }

      .spinner-snake {
        color: #d9d9d9;
        text-indent: -99999em;
        margin: 16px auto;
        position: relative;
        width: 4em;
        height: 4em;
        border-radius: 50%;
        -webkit-box-shadow: inset 0 0 0 .6em;
                box-shadow: inset 0 0 0 .6em;
        -webkit-transform: translateZ(0) rotate(180deg);
                transform: translateZ(0) rotate(180deg);
        -webkit-animation: rotator 1.95s infinite linear;
                animation: rotator 1.95s infinite linear;
      }

      .spinner-snake:before {
        width: 2.2em;
        height: 4.2em;
        border-radius: 2.2em 0 0em 2.2em;
        top: -0.1em;
        left: -0.1em;
        -webkit-transform-origin: 2.2em 2.1em;
                transform-origin: 2.2em 2.1em;
        -webkit-animation: rotator 1s infinite ease 0.75s;
                animation: rotator 1s infinite ease 0.75s;
      }

      .spinner-snake:before, .spinner-snake:after {
        position: absolute;
        content: '';
        background: #F2F3F2;
      }

      .spinner-snake:after {
        width: 2.2em;
        height: 4.2em;
        border-radius: 0 2.2em 2.2em 0;
        top: -0.1em;
        left: 2.1em;
        -webkit-transform-origin: 0 2.1em;
                transform-origin: 0 2.1em;
        -webkit-animation: rotator 1s infinite ease;
                animation: rotator 1s infinite ease;
      }

      @-webkit-keyframes rotator {
        0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); }
      }

      @keyframes rotator {
        0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); }
      }
    </style>
  </head>
  <body>

    <div class="init-load">
      <div class="spinner-snake"></div>
      <img class="mainlogo">
    </div>
  </body>
</html>`;
//# sourceMappingURL=index-content.js.map