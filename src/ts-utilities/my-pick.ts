type KeysOfObjects<TObject> = TObject extends unknown ? keyof TObject : never;

type MyPick<TObject, TPick extends KeysOfObjects<TObject>> = {
  [K in keyof TObject as K extends TPick ? K : never]: TObject[K];
};
