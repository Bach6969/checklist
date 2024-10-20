function addRow() {
    const table = document.getElementById('checklistTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
  
    newRow.innerHTML = `
      <td><input type="text" placeholder="Character Name"></td>
      <td><input type="checkbox"></td>
      <td><input type="text" placeholder="Link to Activity Check"></td>
      <td><button onclick="removeRow(this)">Remove</button></td>
    `;
  }
  
  function removeRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
  }
  
  function clearCheckboxAndLinks() {
    const rows = document.querySelectorAll('#checklistTable tbody tr');
    rows.forEach(row => {
      row.cells[1].querySelector('input[type="checkbox"]').checked = false; // Uncheck activity check
      row.cells[2].querySelector('input[type="text"]').value = ''; // Clear link
    });
  }
  
  function exportToTxt() {
    let data = 'Character Activity Checklist:\n\n';
  
    const rows = document.querySelectorAll('#checklistTable tbody tr');
    rows.forEach((row, index) => {
      const name = row.cells[0].querySelector('input').value || 'N/A';
      const checked = row.cells[1].querySelector('input').checked ? 'Yes' : 'No';
      const link = row.cells[2].querySelector('input').value;
  
      // Construct <a> tag directly as text without automatic HTML escaping
      const formattedLink = link ? `<a href="${link}">Link Here</a>` : 'N/A';
  
      // Add character data with formatted link
      data += `Character ${index + 1}:\n`;
      data += `  Name: ${name}\n`;
      data += `  Activity Check: ${checked}\n`;
      data += `  Link: ${formattedLink}\n\n`;
    });
  
    const blob = new Blob([data], { type: 'text/plain' });
    const linkElement = document.createElement('a');
    linkElement.href = URL.createObjectURL(blob);
    linkElement.download = 'character_activity_checklist.txt';
    linkElement.click();
  }
  