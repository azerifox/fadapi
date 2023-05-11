interface AsciiArtFont {
  [key: string]: string[];
  a: string[];
  b: string[];
  c: string[];
  d: string[];
  e: string[];
  f: string[];
  g: string[];
  h: string[];
  i: string[];
  j: string[];
  k: string[];
  l: string[];
  m: string[];
  n: string[];
  o: string[];
  p: string[];
  q: string[];
  r: string[];
  s: string[];
  t: string[];
  u: string[];
  v: string[];
  w: string[];
  x: string[];
  y: string[];
  z: string[];
}

const asciiArtFont: AsciiArtFont = {
  a: ["  $$ ", " $  $", " $$$$", " $  $", " $  $"],
  b: ["$$$$ ", " $  $", " $$$ ", " $  $", "$$$$ "],
  c: ["  $$$", " $   ", " $   ", " $   ", " $$$$"],
  d: ["$$$$ ", " $  $", " $  $", " $  $", "$$$$ "],
  e: ["$$$$$", " $   ", " $$$$", " $   ", "$$$$$"],
  f: ["$$$$$", " $   ", " $$$ ", " $   ", " $   "],
  g: [" $$$$", " $   ", " $ $$", " $  $", " $$$$"],
  h: [" $  $", " $  $", " $$$$", " $  $", " $  $"],
  i: [" $$$ ", "  $  ", "  $  ", "  $  ", " $$$ "],
  j: [" $$$$", "    $", "    $", " $  $", "  $$ "],
  k: [" $  $", " $ $ ", " $$  ", " $ $ ", " $  $"],
  l: [" $   ", " $   ", " $   ", " $   ", "$$$$$"],
  m: ["$   $", "$$ $$", "$ $ $", "$   $", "$   $"],
  n: ["$   $", "$$  $", "$ $ $", "$  $$", "$   $"],
  o: ["  $$ ", " $  $", " $  $", " $  $", "  $$ "],
  p: ["$$$$ ", " $  $", " $$$$", " $   ", " $   "],
  q: [" $$$ ", " $  $", " $  $", " $ $$", " $$$ "],
  r: ["$$$$ ", " $  $", " $$$ ", " $ $ ", " $  $"],
  s: [" $$$$", " $   ", "  $$ ", "    $", "$$$$ "],
  t: ["$$$$$", "  $  ", "  $  ", "  $  ", "  $  "],
  u: [" $  $", " $  $", " $  $", " $  $", " $$$ "],
  v: ["$   $", "$   $", " $ $ ", " $ $ ", "  $  "],
  w: ["$   $", "$   $", "$ $ $", "$$ $$", "$   $"],
  x: ["$   $", " $ $ ", "  $  ", " $ $ ", "$   $"],
  y: ["$   $", " $ $ ", "  $  ", "  $  ", "  $  "],
  z: ["$$$$$", "   $ ", "  $  ", " $   ", "$$$$$"],
};

export default function generateAsciiArtOutput(text: string) {
  const lines = ["", "", "", "", ""];

  for (const char of text.toLowerCase()) {
    const asciiArtChar = asciiArtFont[char] ?? [
      "     ",
      "     ",
      "     ",
      "     ",
      "     ",
    ];

    if (asciiArtChar) {
      lines.forEach((_, index) => {
        lines[index] += asciiArtChar[index] + " ";
      });
    }
  }

  return lines;
}
