import type { LayoutServerLoad } from './$types';

export const load = (async () => {
  console.log(process.env.CU);
    return {};
}) satisfies LayoutServerLoad;