export default async function sleep(timer: number) {
  return new Promise(r => setTimeout(r, timer));
}
