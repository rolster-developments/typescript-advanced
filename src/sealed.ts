export type StateSealed<R> = Record<string, (value?: any) => R>;

export class Sealed<R, V, T extends StateSealed<R>> {
  protected constructor(
    private key: keyof T,
    private value?: V
  ) {}

  public when(resolver: T, otherwise?: () => void): R {
    const handler = resolver[this.key];

    if (otherwise) {
      otherwise();
    }

    if (handler) {
      return handler(this.value);
    }

    throw Error('Sealed class could not resolve call');
  }
}

export class PartialSealed<R, V, T extends StateSealed<R>> {
  protected constructor(
    private key: keyof T,
    private value?: V
  ) {}

  public when(resolver: Partial<T>, otherwise?: () => void): Undefined<R> {
    const handler = resolver[this.key];

    if (otherwise) {
      otherwise();
    }

    return handler ? handler(this.value) : undefined;
  }
}
