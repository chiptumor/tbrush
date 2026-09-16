import * as TBrush from "./src/index.ts";

const _testPages: [ string, Record<string, any> ][] = [
  [
    `
<ul>
  {{@for (blinky of blinkies) }}
    <li><a href="{{ blinky.href }}">
      <img src="{{ blinky.img }}" />
    </a></li>
  {{@/for}}
</ul>
    `.trim(),
    { blinkies: [
      { href: "https://blinky.com/1", img: "/res/blinky/1.png" },
      { href: "https://blinky.com/2", img: "/res/blinky/2.png" }
    ]}
  ]
];

_testPages.forEach(i => console.log(TBrush.compose(i[0])));
