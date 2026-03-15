Run the full Lootix QA verification pass.

Steps:
1. **Build check**: `npm run build` — must complete with 0 errors
2. **Route table**: Verify all expected routes appear in build output
3. **API smoke tests** (if dev server running):
   - `GET /api/products`
   - `GET /api/printify/catalog`
   - `GET /api/printify/products`
4. Report PASS/FAIL per step and any blockers found
