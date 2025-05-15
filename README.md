# Lab 7 – End-to-End Testing with Puppeteer and Jest

**Names:**  
Lisa Fritsche  
No partner 

**GitHub Repository:**  
[https://github.com/USERNAME/Lab7_LisaFritsche](https://github.com/USERNAME/Lab7_LisaFritsche)  
*(← Replace USERNAME with your actual GitHub username)*

---

## ✅ Check Your Understanding

### 1) Where would you fit your automated tests in your Recipe project development pipeline?  
**Answer:**  
Within a GitHub action that runs whenever code is pushed.  
Automated tests should run on each push or pull request to ensure no regressions are introduced. This keeps the codebase stable and avoids breaking the app unintentionally.

---

### 2) Would you use an end-to-end test to check if a function is returning the correct output?  
**Answer:**  
**No.**  
End-to-end tests are used to test user workflows and UI interactions, not individual functions. Unit tests are better suited for checking if a function returns the correct value.

---

### 3) What is the difference between navigation and snapshot mode?  
**Answer:**  
**Navigation mode** analyzes the performance of a page right after it fully loads.  
It simulates how a user would experience the initial load of the website and measures metrics like First Contentful Paint, LCP, and TTI.

**Snapshot mode** analyzes the current state of the DOM at the moment the test is run.  
It is useful for static checks like accessibility and structure but does not reflect load performance or runtime behavior.


---

### 4) Name three things we could do to improve the CSE 110 shop site based on the Lighthouse results.  
**Answer:**  
Even though the scores are very strong, here are three things that could improve the site further:

1. **Improve Accessibility (currently 90)**  
   → Add additional ARIA labels or roles to improve screen reader compatibility.

2. **Enhance SEO (currently 91)**  
   → Ensure all images have descriptive alt text and meta tags are optimized.

3. **Optimize JavaScript usage**  
   → Reduce or defer unused JS to improve interactivity for slower devices.

---

📸 Lighthouse Result Summary:
- **Performance**: 98
- **Accessibility**: 90
- **Best Practices**: 96
- **SEO**: 91
(Screenshot saved separately)

---

## ✅ Screenshot

A screenshot of the terminal output with all 9 tests passing is included in the submission.

---

## Notes on Environment and Execution

This lab was completed using a **corporate laptop**, where installing Node.js locally is restricted.  
As a result, the tests were executed entirely through **GitHub Codespaces**, without relying on a local Node.js setup.  
Despite this limitation, **all tests were successfully run and passed**, as shown in the attached test result screenshot.

---

## Notes

- All tests in `lab7.test.js` have been completed and passed.
- Local server used with Puppeteer to test all interactions end-to-end.

  






