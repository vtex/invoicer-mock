// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function method(ctx: Context, next: () => Promise<any>) {
  if (ctx.method.toUpperCase() !== "POST") {
    ctx.status = 405;
    return;
  }

  await next();
}
