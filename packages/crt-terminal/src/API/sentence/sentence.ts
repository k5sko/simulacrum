type AnchorCallback = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
type ButtonCallback = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

enum WordTypes {
  ANCHOR = 'ANCHOR',
  TEXT = 'TEXT',
  INLINE_TEXT = 'INLINE_TEXT',
  BUTTON = 'BUTTON',
  COMMAND = 'COMMAND',
}

interface ElementBase {
  dataAttribute?: string;
  className?: string;
  id?: string;
}

interface BaseWord extends ElementBase {
  characters: string;
}

interface AnchorWord extends BaseWord {
  type: WordTypes.ANCHOR;
  href?: string;
  onClick?: AnchorCallback;
}

interface TextWord extends BaseWord {
  type: WordTypes.TEXT;
}

interface InlineTextWord extends BaseWord {
  type: WordTypes.INLINE_TEXT;
}

interface ButtonWord extends BaseWord {
  type: WordTypes.BUTTON;
  onClick?: ButtonCallback;
}

interface CommandWord extends BaseWord {
  type: WordTypes.COMMAND;
  prompt: string;
}

type Words = AnchorWord | TextWord | InlineTextWord | ButtonWord | CommandWord;

type AnchorProps = Omit<AnchorWord, 'type'>;

const anchorWord = ({
  characters,
  href,
  onClick,
  dataAttribute,
  className,
  id,
}: AnchorProps): AnchorWord => ({
  type: WordTypes.ANCHOR,
  characters,
  href,
  onClick,
  dataAttribute,
  id,
  className,
});

type TextProps = Omit<TextWord, 'type'>;

const textWord = ({ characters, dataAttribute, className, id }: TextProps): TextWord => ({
  type: WordTypes.TEXT,
  characters,
  dataAttribute,
  id,
  className,
});

const inlineTextWord = ({ characters, dataAttribute, className, id }: TextProps): InlineTextWord => ({
  type: WordTypes.INLINE_TEXT,
  characters,
  dataAttribute,
  id,
  className,
});

type ButtonProps = Omit<ButtonWord, 'type'>;

const buttonWord = ({
  characters,
  onClick,
  dataAttribute,
  className,
  id,
}: ButtonProps): ButtonWord => ({
  type: WordTypes.BUTTON,
  characters,
  onClick,
  dataAttribute,
  id,
  className,
});

type CommandProps = Omit<CommandWord, 'type'>;

const commandWord = ({
  characters,
  prompt,
  dataAttribute,
  className,
  id,
}: CommandProps): CommandWord => ({
  type: WordTypes.COMMAND,
  characters,
  prompt,
  dataAttribute,
  className,
  id,
});

enum LineTypes {
  TEXT = 'TEXT',
  COMMAND = 'COMMAND',
  INLINE_TEXT = 'INLINE_TEXT'
}

interface BaseLine extends ElementBase {
  marginChars?: number 
  words: Words[];
}

interface TextLine extends BaseLine {
  type: LineTypes.TEXT;
}

interface InlineTextLine extends BaseLine {
  type: LineTypes.INLINE_TEXT;
}

interface CommandLine extends BaseLine {
  type: LineTypes.COMMAND;
}

type Lines = TextLine | InlineTextLine | CommandLine;

type CommandLineProps = Omit<CommandLine, 'type'>;

const commandLine = ({ words, dataAttribute, className, id }: CommandLineProps): CommandLine => ({
  type: LineTypes.COMMAND,
  words,
  dataAttribute,
  className,
  id,
});

type TextLineProps = Omit<TextLine, 'type'>;

const textLine = ({ words, dataAttribute, className, id, marginChars }: TextLineProps): TextLine => ({
  type: LineTypes.TEXT,
  words,
  dataAttribute,
  className,
  id,
  marginChars
});

type InlineTextLineProps = Omit<InlineTextLine, 'type'>;

const inlineTextLine = ({ words, dataAttribute, className, id }: InlineTextLineProps): InlineTextLine => ({
  type: LineTypes.INLINE_TEXT,
  words,
  dataAttribute,
  className,
  id,
});

export type {
  AnchorWord,
  TextWord,
  InlineTextWord,
  ButtonWord,
  Words,
  TextLine,
  InlineTextLine,
  CommandLine,
  Lines
};
export {
  WordTypes,
  LineTypes,
  textWord,
  inlineTextWord,
  buttonWord,
  commandWord,
  anchorWord,
  commandLine,
  textLine,
  inlineTextLine,
};
