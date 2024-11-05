export type IsoDateString =
  | string
  | `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`;

export type DateString = string | `${number}-${number}-${number}`;
