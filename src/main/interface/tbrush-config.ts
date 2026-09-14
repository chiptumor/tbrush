export interface TBrushConfig {
  syntax?: {
    tbrush?: RegExp;
    statement?: RegExp;
    statementStart?: RegExp;
    statementEnd?: RegExp;
  };
}
