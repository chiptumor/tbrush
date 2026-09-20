import * as TBrush from "./src/index.ts";

const _testPages: [ string, Record<string, any> ][] = [
  [
    `
<ul>
  {{@ for (blinky of blinkies) }}
    <li>
      {{@ if (blinky.href) }}
        <a href="{{ blinky.href }}">
          <img src="{{ blinky.img }}" />
        </a>
      {{@ else /}}
        <img src="{{ blinky.img }}" />
      {{@ /if }}
    </li>
  {{@ /for }}
</ul>
    `.trim(),
    { blinkies: [
      { href: "https://blinky.com/1", img: "/res/blinky/1.png" },
      { href: "https://blinky.com/2", img: "/res/blinky/2.png" }
    ]}
  ],

  [
    `
{{@test}}
  {{@ void /}}
{{@/test}}    
    `.trim(),
    {}
  ]
];

//@ts-ignore
_testPages.forEach(i => console.dir(
  TBrush.compose(i[0]).apply({}),
{ depth: null }));
