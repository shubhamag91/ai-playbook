# Deployment Checklist — May 2026

## Pre-Deployment Verification ✅

### Build Status
- [x] `npm run build` passes without errors (42 pages)
- [x] No TypeScript errors
- [x] No MDX parsing errors
- [x] Sitemap generated
- [x] Search index created (3,160 words indexed)

### Content Migration
- [x] All Phase 2A file moves complete
  - [x] glossary → reference/glossary
  - [x] confusions → reference/confusions
  - [x] principles → reference/principles
  - [x] history → research/whats-new
  - [x] opensource → research/models/guide
- [x] All Phase 2B consolidations complete
  - [x] 7 interview cheatsheets → learn/interview-prep
  - [x] tools + productivity-tools → decide/tools/guide
  - [x] llm-comparison → model-specs + benchmarks
- [x] All Phase 2C cleanup complete
  - [x] Redirects configured (public/_redirects)
  - [x] Sidebar verified
  - [x] Navigation tested

### Page Testing
- [x] Homepage (`/`) renders correctly
- [x] Interview prep (`/learn/interview-prep/`) HTTP 200
- [x] Tools guide (`/decide/tools/guide/`) HTTP 200
- [x] Benchmarks (`/reference/benchmarks/`) HTTP 200
- [x] Model specs (`/reference/model-specs/`) HTTP 200
- [x] Deep dives (`/deep-dive/how-llms-work/`) HTTP 200

### Redirects
- [x] _redirects file created for Cloudflare Pages
- [x] Old URLs mapped to new locations (10+ redirects)
- [x] 301 permanent redirects configured
- [x] File is in `public/` directory (will be copied to dist/)

### Git Status
- [x] All changes staged and committed
- [x] Commit message descriptive (Phase 2 completion)
- [x] No uncommitted changes remaining
- [x] Remote branch tracking configured

### Browser Testing (Manual)
- [ ] Test on Chrome desktop
- [ ] Test on Safari mobile
- [ ] Verify dark/light mode toggle works
- [ ] Check breadcrumbs on nested pages
- [ ] Verify mobile navigation responsive
- [ ] Test that old URLs redirect properly (after deploy)

---

## Deployment Steps (Cloudflare Pages)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Verify Cloudflare Pages Auto-Deploy**
   - Cloudflare Pages watches the `main` branch
   - Build command: `npm run build`
   - Build output: `dist/`
   - Automatically deploys when push is detected

3. **Monitor Deployment**
   - Check Cloudflare Pages dashboard
   - Wait for build to complete (~30-60s)
   - Verify production URL responds

4. **Smoke Tests (Post-Deploy)**
   - Visit https://your-playbook.example.com/
   - Click through main nav sections
   - Verify old URLs redirect (e.g., /tools → /decide/tools/guide)
   - Test search functionality
   - Check mobile responsiveness

5. **Post-Deployment**
   - Update documentation if URLs changed
   - Notify users of new structure (if applicable)
   - Monitor analytics for traffic patterns

---

## Rollback Plan

If deployment has issues:

1. **Revert commit** (if needed)
   ```bash
   git revert <commit-hash>
   git push origin main
   ```

2. **Check Cloudflare dashboard** for deployment history
3. **Restore previous version** if needed

---

## Success Metrics

After deployment, verify:
- ✅ Site builds and deploys within 60s
- ✅ Old URLs redirect to new locations
- ✅ All pages load with HTTP 200
- ✅ Search index works (Pagefind)
- ✅ Mobile site is responsive
- ✅ No console errors in browser DevTools
- ✅ Sitemap.xml is accessible

---

## Future Work (Optional)

1. **MOS-245:** Create substantive learning path content
   - `/learn/beginner.md` - comprehensive intro
   - `/learn/builder.md` - hands-on tools + RAG
   - `/learn/researcher.md` - trends + staying current

2. **Content enhancements:**
   - Expand "Who to Follow" (follow.mdx)
   - Add case studies
   - Add interactive demos

3. **Performance optimization:**
   - Image optimization
   - Lazy loading
   - Caching headers

---

## Notes

- All 301 redirects are permanent and SEO-friendly
- Cloudflare Pages serves from global CDN (~30s worldwide)
- Build is deterministic (same output each time)
- No database or server-side code needed
