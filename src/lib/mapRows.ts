/**
 * Maps a list through a transform.
 * TIn is the source item; TOut is the result item.
 */
export const mapRows = <TOut extends { id: string }, TIn extends TOut>(
  rows: readonly TIn[],
  map: (row: TOut) => TOut,
): TOut[] => rows.map(map);
