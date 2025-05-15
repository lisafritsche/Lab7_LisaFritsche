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
- **Navigation Mode**: Runs Lighthouse when the page loads. It measures the load performance, interactivity, and other page metrics.  
- **Snapshot Mode**: Analyzes the current page state at a single moment. It’s better for static analysis like accessibility or SEO, but doesn’t reflect runtime behavior or load performance.

---

### 4) Name three things we could do to improve the CSE 110 shop site based on the Lighthouse results.  
**Answer:**  
1. Optimize image sizes and formats to reduce load time.  
2. Minimize JavaScript bundles and remove unused code.  
3. Improve accessibility by adding ARIA labels and ensuring sufficient contrast for text elements.

---

## ✅ Screenshot

A screenshot of the terminal output with all 9 tests passing is included in the submission.

---

## Notes

- All tests in `lab7.test.js` have been completed and passed.
- Local server used with Puppeteer to test all interactions end-to-end.






