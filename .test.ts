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

//@ts-ignore
_testPages.forEach(i => console.dir(TBrush.compose(i[0]).apply({})[1].children));
