import {
  Static,
  Array,
  String,
  Dictionary,
  Record,
  Union,
  Undefined,
  Runtype,
} from 'runtypes';

export const Optional = (type: Runtype) => type.Or(Undefined);

export const Mapping = Dictionary(String, 'string');
export type Mapping = Static<typeof Mapping>;

export const Base = String.Or(
  Record({
    template: Optional(String),
    output: Optional(String),
  })
);
export type Base = Static<typeof Base>;

export const Context = Record({
  cmd: String,
  base: Optional(Base),
  prompt: Optional(Array(String)),
  default: Optional(Mapping),
});
export type Context = Static<typeof Context>;

const Temple = Record({
  template: String,
  output: String,
  default: Optional(Mapping),
});
export type Temple = Static<typeof Temple>;

export const Temples = Array(Temple);
export type Temples = Static<typeof Temples>;

export const Command = Record({ temples: Temples }).And(Context);
export type Command = Static<typeof Command>;
