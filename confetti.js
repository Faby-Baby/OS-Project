function animate(source, target, action) {
    // ... (existing code)
  
    if (action === "Task complete! 🎉") {
      setTimeout(() => {
        resetAnimation();
        animateProcess();
        showInterruptMessage("Task complete! 🎉");
        confetti();
      }, 2000);
    }
  }
  