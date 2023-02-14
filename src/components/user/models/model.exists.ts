/** 
 * @param model
 * @param args   
 * @returns Boolean
 */
export async function exists<Model extends { count: any }>(
  model: Model,
  args: Parameters<Model["count"]>[0]
) {
  const count = await model.count(args);
  return Boolean(count);
}
