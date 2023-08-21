document.addEventListener("DOMContentLoaded", function() {

  var skillPercentage = {
    barA: 90,
    barB: 95,
    barC: 80,
    barD: 95,
    barE: 75,
    barF: 70,
    barG: 100,
    barH: 90,
    barI: 20,
  };

  /*selects all the g elements in #skillsChart .chart*/
  let  skillBars = document.querySelectorAll("#skillsChart .chart > g");
  /*the same as above*/
  let languageBars = document.querySelectorAll("#languagesChart .chart > g");

  function animateBar(bar) {
    /*selects the foregroundbar element*/
    let foregroundBar = bar.querySelector(".barColorForeground");
    /*selects the percentage text*/
    let percentageText = bar.querySelector(".percentage");
    /*gets the class attribtue*/
    let skillClass = bar.getAttribute("class");

    let width = skillPercentage[skillClass];
    foregroundBar.setAttribute("width", `${width}%`);
    animateTextChange(percentageText, width, 2500);
  }

  function animateTextChange(element, finalValue, duration) {
    const startTime = Date.now();

    function updateText() {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;

      if (elapsedTime >= duration) {
        element.textContent = `${finalValue}%`;
        return;
      }

      const progress = elapsedTime / duration;
      const interpolatedValue = Math.round(progress * finalValue);
      element.textContent = `${interpolatedValue}%`;

      requestAnimationFrame(updateText);
    }

    updateText();
  
  }

  function createIntersectionObserver(bars){
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.8,
  };

    bars.forEach((bar) => {
      let observer = new IntersectionObserver ((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateBar(bar);
            observer.unobserve(entry.target);
          }
        });
      },options);
      
      observer.observe(bar);
    });
  }

    createIntersectionObserver(skillBars);
    createIntersectionObserver(languageBars);
  });
