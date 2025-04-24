document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.querySelector('input[type="file"]');
    fileInput.addEventListener("change", function () {
      if (this.files.length > 0) {
        alert("File selected: " + this.files[0].name);
      }
    });
  });
  