// Dropdown
document.addEventListener('DOMContentLoaded', function() {
    const dropdownBtn = document.querySelector('.dropbtn');
    const dropdownContent = document.getElementById('myDropdown');
  
    dropdownBtn.addEventListener('click', function() {
      if (dropdownContent.style.display === 'block') {
        dropdownContent.style.display = 'none';
      } else {
        dropdownContent.style.display = 'block';
      }
    });
  
    // Close the dropdown when clicking outside of it
    window.addEventListener('click', function(event) {
      if (!event.target.matches('.dropbtn')) {
        dropdownContent.style.display = 'none';
      }
    });
  });
  
  // Modal
  document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementsByClassName('close')[0];
  
    modal.style.display = 'block'; // Open the modal automatically when the page loads
  
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  });
  