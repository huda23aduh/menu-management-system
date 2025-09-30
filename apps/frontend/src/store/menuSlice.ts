import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMenus = createAsyncThunk('menus/fetch', async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3001'}/menus`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
});

const menuSlice = createSlice({
  name: 'menu',
  initialState: { menus: [], loading: false },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchMenus.pending, (s) => { s.loading = true; });
    b.addCase(fetchMenus.fulfilled, (s, a) => { s.menus = a.payload; s.loading = false; });
    b.addCase(fetchMenus.rejected, (s) => { s.loading = false; });
  }
});
export default menuSlice.reducer;
