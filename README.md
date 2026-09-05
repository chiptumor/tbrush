# tbrush

## Glossary

<dl>
<dt>Template</dt><dd>

Bare HTML content.

</dd>
<dt>TBrush</dt><dd>

Short for "Toothbrush"; a node created with surrounding double braces
("{{...}}").

</dd>
<dt>Expression</dt><dd>

A TBrush that does *not* start with an "@" symbol and whose contents are parsed
as a regular JavaScript expression.

</dd>
<dt>Statement</dt><dd>

A pair of TBrushes with an "@" symbol for the first character of their contents,
both with the same keyword. The first one--the "opening TBrush" or the
"statement start"--starts with the keyword, followed by the statement's
parameters. The second one--the "closing TBrush" or "statement end"--starts
immediately with a slash, followed by the keyword. Everything between the
opening and closing TBrushes constitutes the statement's body.

</dd>
</dl>
