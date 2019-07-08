export const method = async (ctx: Context, next: () => Promise<any>) => {
  if (ctx.method.toUpperCase() !== 'POST') {
    ctx.status = 405
    return
  }

  await next()
}
